import { NextRequest, NextResponse } from "next/server";
import { CHEESY_CRUST_CONFIG } from "@/data/assistantTopics";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, customSystemPrompt } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error(
        "GEMINI_API_KEY is not defined in environment variables (.env.local)"
      );
    }

    // System Prompt for Cheesy Crust Pizza
    const systemInstruction =
      customSystemPrompt?.trim() || CHEESY_CRUST_CONFIG.systemPromptTemplate;

    // Convert messages to Gemini format
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Primary requested model: Gemini 3.8 Flash, with automatic fallback if temporarily busy (503/429)
    const modelsToTry = [
      process.env.GEMINI_MODEL || "gemini-3.8-flash",
      "gemini-3-flash-preview",
      "gemini-3.1-flash-lite",
    ];

    let replyText = "";
    let usedModel = "";

    for (const model of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8500);

        const res = await fetch(url, {
          method: "POST",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemInstruction }],
            },
            contents,
            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 600,
              thinkingConfig: { thinkingBudget: 0 },
            },
          }),
        });

        clearTimeout(timeoutId);

        const data = await res.json();

        if (res.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          replyText = data.candidates[0].content.parts[0].text.trim();
          usedModel = model;
          break;
        } else {
          console.warn(`Model ${model} returned error:`, data?.error?.message);
        }
      } catch (err) {
        console.warn(`Attempt with ${model} timed out or failed:`, err);
      }
    }

    // Guardrail-enforced Fallback in case Google API is temporarily unreachable
    if (!replyText) {
      usedModel = "cheesy-crust-guardrail-fallback";
      const lastUserMsg =
        messages[messages.length - 1]?.content?.toLowerCase() || "";

      // Guardrail 1: Never offer free items
      if (
        lastUserMsg.includes("free") ||
        lastUserMsg.includes("complimentary") ||
        lastUserMsg.includes("discount") ||
        lastUserMsg.includes("no charge")
      ) {
        replyText =
          "I'd love to help you order, but at Cheesy Crust Pizza we never offer free items! Our delicious Large Pepperoni is $15, Medium Veggie is $12, and Garlic Bread is $5. Which one can I get started for you?";
      }
      // Guardrail 2: Off-topic refusal (only answer food and delivery questions)
      else if (
        lastUserMsg.includes("python") ||
        lastUserMsg.includes("code") ||
        lastUserMsg.includes("weather") ||
        lastUserMsg.includes("math") ||
        lastUserMsg.includes("homework") ||
        lastUserMsg.includes("history") ||
        lastUserMsg.includes("quantum")
      ) {
        replyText =
          "I can only answer questions about Cheesy Crust Pizza food and delivery! Would you like to order our Large Pepperoni ($15), Medium Veggie ($12), or Garlic Bread ($5)?";
      }
      // Delivery question
      else if (
        lastUserMsg.includes("delivery") ||
        lastUserMsg.includes("time") ||
        lastUserMsg.includes("long")
      ) {
        replyText =
          "Our delivery time is 30–45 mins! We deliver piping hot right to your doorstep. Would you like to place an order?";
      }
      // Menu question
      else if (
        lastUserMsg.includes("menu") ||
        lastUserMsg.includes("price") ||
        lastUserMsg.includes("have") ||
        lastUserMsg.includes("cost")
      ) {
        replyText =
          "Welcome to Cheesy Crust Pizza! 🍕 Here is our menu:\n• Large Pepperoni: $15\n• Medium Veggie: $12\n• Garlic Bread: $5\nDelivery takes 30–45 mins. What can I get for you?";
      }
      // Default cheerful greeting
      else {
        replyText =
          "Welcome to Cheesy Crust Pizza! 🍕 I'm your cheerful, helpful order assistant. We have Large Pepperoni for $15, Medium Veggie for $12, and Garlic Bread for $5. Delivery is 30–45 mins. How can I help you today?";
      }
    }

    return NextResponse.json({
      reply: replyText,
      model: usedModel,
      activeSystemPrompt: systemInstruction,
      businessName: CHEESY_CRUST_CONFIG.businessName,
    });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "Welcome to Cheesy Crust Pizza! We have Large Pepperoni for $15, Medium Veggie for $12, and Garlic Bread for $5. Delivery is 30–45 mins. How can I help you?",
        model: "cheesy-crust-guardrail-fallback",
      },
      { status: 200 }
    );
  }
}
