import { NextRequest, NextResponse } from "next/server";
import { ASSISTANT_TOPICS } from "@/data/assistantTopics";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, topicId = "pizza", customSystemPrompt } = body;

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

    // Select the topic data (defaults to Option 1: Cheesy Crust Pizza)
    const selectedTopic = ASSISTANT_TOPICS[topicId] || ASSISTANT_TOPICS.pizza;

    // The System Prompt (Hidden instructions given to the AI)
    const systemInstruction =
      customSystemPrompt?.trim() || selectedTopic.systemPromptTemplate;

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
              maxOutputTokens: 800,
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

    // Guardrail-accurate Fallback in case Google API is temporarily unreachable
    if (!replyText) {
      usedModel = "system-prompt-enforced-fallback";
      const lastUserMsg =
        messages[messages.length - 1]?.content?.toLowerCase() || "";

      if (topicId === "pizza") {
        if (
          lastUserMsg.includes("free") ||
          lastUserMsg.includes("complimentary") ||
          lastUserMsg.includes("discount")
        ) {
          replyText =
            "I'd love to help you order, but at Cheesy Crust Pizza we never offer free items! Our delicious Large Pepperoni is $15, Medium Veggie is $12, and Garlic Bread is $5. What would you like to order today?";
        } else if (
          lastUserMsg.includes("python") ||
          lastUserMsg.includes("code") ||
          lastUserMsg.includes("weather") ||
          lastUserMsg.includes("math") ||
          lastUserMsg.includes("history")
        ) {
          replyText =
            "I'm sorry, but I only answer questions about Cheesy Crust Pizza food, our menu, and delivery! Can I help you with a Large Pepperoni ($15), Medium Veggie ($12), or Garlic Bread ($5)?";
        } else if (
          lastUserMsg.includes("delivery") ||
          lastUserMsg.includes("time") ||
          lastUserMsg.includes("long")
        ) {
          replyText =
            "Our delivery time is 30–45 mins! We deliver piping hot straight to your door. Would you like to place an order?";
        } else {
          replyText =
            "Welcome to Cheesy Crust Pizza! 🍕 I'm your cheerful order assistant. We have Large Pepperoni for $15, Medium Veggie for $12, and Garlic Bread for $5. Delivery takes 30–45 mins. How can I help you today?";
        }
      } else if (topicId === "sneaker") {
        if (
          lastUserMsg.includes("food") ||
          lastUserMsg.includes("pizza") ||
          lastUserMsg.includes("code")
        ) {
          replyText =
            "At KicksLab, I only specialize in footwear and shipping questions! We have Running Shoes for $80 and High-Tops for $110. Can I help you find your size?";
        } else {
          replyText =
            "Welcome to KicksLab! 👟 We offer Running Shoes ($80) and High-Tops ($110). We have a 7-day return policy and $5 flat rate shipping. What can I help you find today?";
        }
      } else {
        replyText =
          "Welcome to Daily Brew! ☕ I'm your friendly barista. I highly recommend our specialty Caramel Cold Brew ($5.00)! We also have Iced Lattes ($4.50) and Blueberry Muffins ($3.50). We are open 7 AM – 9 PM daily. What can I brew for you?";
      }
    }

    return NextResponse.json({
      reply: replyText,
      model: usedModel,
      activeSystemPrompt: systemInstruction,
      topicId: selectedTopic.id,
      topicName: selectedTopic.name,
    });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "Welcome to Cheesy Crust Pizza! We have Large Pepperoni for $15, Medium Veggie for $12, and Garlic Bread for $5. Delivery is 30–45 mins. How can I assist you?",
        model: "system-prompt-enforced-fallback",
      },
      { status: 200 }
    );
  }
}
