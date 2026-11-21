import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Read COMPANY_INFO.md once or fallback to inline
let companyInfoCache: string = "";

function getCompanyInfo(): string {
  if (companyInfoCache) return companyInfoCache;
  try {
    const filePath = path.join(process.cwd(), "COMPANY_INFO.md");
    if (fs.existsSync(filePath)) {
      companyInfoCache = fs.readFileSync(filePath, "utf-8");
      return companyInfoCache;
    }
  } catch {
    // fallback
  }
  return "Forno Antico is an authentic Neapolitan Pizzeria in Little Italy serving 48-hour fermented sourdough pizza wood-fired at 450°C.";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

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

    const companyKnowledge = getCompanyInfo();

    const systemInstruction = `You are "Gianni", the exceptionally polite, gracious, and knowledgeable Master AI Concierge of Forno Antico Pizzeria & Bar in Little Italy.

CORE MANNERS & HOSPITALITY:
- Always be exceedingly polite, warm, refined, and courteous in every message.
- Use welcoming Italian hospitality phrases such as:
  * "It is my absolute pleasure to assist you,"
  * "With greatest pleasure,"
  * "Please allow me to recommend,"
  * "May I suggest,"
  * "Thank you kindly for visiting us,"
  * "Prego!" and "Buon appetito!"
- Always conclude with a polite, gracious offer of further assistance.

CONCISE & COMPLETE RESPONSES:
- Keep your answers concise, elegant, and focused (aim for 100–160 words / 2–3 brief paragraphs or tidy bullet points).
- IMPORTANT: ALWAYS complete every sentence and thought fully. Never stop mid-sentence.
- Use clean formatting with bolding and bullet points so guests can easily browse your recommendations on mobile or desktop.

OFFICIAL KNOWLEDGE BASE:
${companyKnowledge}

KEY KNOWLEDGE DIRECTIVES:
1. MENU OVERVIEW: When asked about the menu, introduce the 4 categories: I Grandi Classici (e.g. Margherita D.O.P.), Le Creazioni Speciali (e.g. Prosciutto di Parma & Burrata, Tartufo & Funghi), I Grandi Formaggi (e.g. Cinque Formaggi & Hot Honey), and Fuoco & Peperoncino (e.g. Diavola Piccante). Mention the 48-hour fermented sourdough crust baked at 450°C.
2. PROMO CODES: When asked about deals, politely share code 'FORNO20' (20% off) and 'VIVAITALIA10' ($10 off newsletter).
3. SPECIAL COMBOS: Gracefully suggest our 'Napoli Family Feast' ($49.50, save 25%) or 'Duo Date Night' ($41.00).
4. ALLERGIES: For gluten-free guests, courteously mention our Artisanal Gluten-Free Cauliflower & Cassava crust, noting that airborne flour is present in our open kitchen.
5. RESERVATIONS: Politely inform guests that tables for 1–12 can be booked via the 'Book a Table' button or by calling +1 (555) 349-2819.
6. ACCURACY: Rely strictly on the knowledge base; never fabricate items or prices.`;

    // Map conversation history to Gemini format
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
        const timeoutId = setTimeout(() => controller.abort(), 8000);

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
              temperature: 0.6,
              maxOutputTokens: 1200, // Generous token ceiling so responses never truncate mid-thought
              thinkingConfig: { thinkingBudget: 0 }, // Disable thinking tokens to prevent token starvation
            },
          }),
        });

        clearTimeout(timeoutId);

        const data = await res.json();

        if (res.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          let text = data.candidates[0].content.parts[0].text.trim();

          // Safety check: ensure response does not end abruptly mid-sentence
          const lastChar = text.slice(-1);
          if (![".", "!", "?", "\"", "'", "*", ")"].includes(lastChar)) {
            const lastPeriod = Math.max(
              text.lastIndexOf("."),
              text.lastIndexOf("!"),
              text.lastIndexOf("?")
            );
            if (lastPeriod > 40) {
              text = text.substring(0, lastPeriod + 1);
            }
          }

          replyText = text;
          usedModel = model;
          break;
        } else {
          console.warn(`Model ${model} returned error:`, data?.error?.message);
        }
      } catch (err) {
        console.warn(`Attempt with ${model} timed out or failed:`, err);
      }
    }

    // Smart, Courteous, and Complete Fallback
    if (!replyText) {
      const lastUserMsg =
        messages[messages.length - 1]?.content?.toLowerCase() || "";
      usedModel = "forno-concierge-fallback";

      if (
        lastUserMsg.includes("menu") ||
        lastUserMsg.includes("offer") ||
        lastUserMsg.includes("pizza") ||
        lastUserMsg.includes("food")
      ) {
        replyText =
          "*Benvenuto!* It is my absolute pleasure to introduce you to the culinary artistry of Forno Antico. Our menu honors the authentic traditions of Napoli, featuring our 48-hour fermented sourdough crust flash-baked at 450°C in our volcanic stone oven.\n\nWe offer four delightful categories:\n* **I Grandi Classici**: Timeless recipes like our renowned **Margherita D.O.P.** ($18.50) and garden-fresh **Ortolana del Giardino**.\n* **Le Creazioni Speciali**: Gourmet masterworks like **Prosciutto di Parma & Burrata** ($25.50) and **Tartufo & Wild Funghi** ($24.00).\n* **I Grandi Formaggi**: Rich creations including our **Cinque Formaggi & Hot Honey** ($23.00).\n* **Fuoco & Peperoncino**: Spicy favorites like **Diavola Piccante** with 'Nduja ($21.00).\n\nMay I suggest our **Napoli Family Feast** combo ($49.50) to enjoy multiple pizzas and tiramisù at 25% savings? Please let me know how I may assist your selection further!";
      } else if (
        lastUserMsg.includes("promo") ||
        lastUserMsg.includes("discount") ||
        lastUserMsg.includes("coupon") ||
        lastUserMsg.includes("deal") ||
        lastUserMsg.includes("code")
      ) {
        replyText =
          "Benvenuto! It is my absolute pleasure to share our best savings with you.\n\n* **FORNO20**: Enjoy **20% OFF** your entire order at checkout.\n* **VIVAITALIA10**: Receive **$10 OFF** by joining our VIP Club in the footer.\n\nMay I assist you with selecting your pizzas today?";
      } else if (
        lastUserMsg.includes("popular") ||
        lastUserMsg.includes("recommend") ||
        lastUserMsg.includes("best")
      ) {
        replyText =
          "With greatest pleasure! Allow me to recommend our most cherished pizzas:\n\n* **Margherita D.O.P.** ($18.50) — Sweet San Marzano tomatoes, buffalo mozzarella from Caserta, and wild basil.\n* **Prosciutto di Parma & Burrata** ($25.50) — Crowned with creamy whole burrata and 24-month prosciutto.\n* **Diavola Piccante** ($21.00) — Spicy Calabrian soppressata with artisanal hot honey.\n\nWhich of these would delight you most?";
      } else if (
        lastUserMsg.includes("table") ||
        lastUserMsg.includes("reserv") ||
        lastUserMsg.includes("book")
      ) {
        replyText =
          "Thank you kindly for considering an evening with us! It would be our honor to host you.\n\nYou may reserve your table for 1–12 guests via the **'Book a Table'** button above or by calling us at **+1 (555) 349-2819**. We offer our Main Hall, Heated Veranda, and Chef's Counter.\n\nMay I assist you with any special requests?";
      } else if (
        lastUserMsg.includes("gluten") ||
        lastUserMsg.includes("vegan") ||
        lastUserMsg.includes("allerg")
      ) {
        replyText =
          "We take extraordinary care of all our valued guests. We proudly offer an **Artisanal Gluten-Free Cauliflower & Cassava Crust** (+$3.00) and numerous vegetarian selections.\n\n*Please kindly note that airborne flour is present in our open kitchen, so we advise caution for severe celiac conditions.*\n\nHow may I tailor a dish for you?";
      } else if (
        lastUserMsg.includes("delivery") ||
        lastUserMsg.includes("hours") ||
        lastUserMsg.includes("time") ||
        lastUserMsg.includes("location") ||
        lastUserMsg.includes("where")
      ) {
        replyText =
          "It is our pleasure to serve you! We are located at **482 Via Bellini Boulevard** in Little Italy, open daily from 12:00 PM.\n\nDelivery is available until 11:00 PM and is **FREE for all orders over $40** ($3.99 otherwise), kept piping hot in thermal induction packs.\n\nMay I help you place an order?";
      } else {
        replyText =
          "Benvenuto! I am Gianni, your dedicated concierge at Forno Antico. It is my true pleasure to assist you with menu suggestions, table reservations, or applying our **FORNO20** discount. How may I be of gracious service today?";
      }
    }

    return NextResponse.json({
      reply: replyText,
      model: usedModel,
    });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "Benvenuto! It is my sincere pleasure to greet you. I am currently attending to guests in our dining hall, but you may use code FORNO20 for 20% off or click 'Book a Table' above. How may I assist you further?",
        model: "forno-concierge-fallback",
      },
      { status: 200 }
    );
  }
}
