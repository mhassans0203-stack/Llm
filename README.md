# 🍕 Cheesy Crust Pizza — AI Customer Assistant

> **Goal**: A clean, modern customer assistant chatbot built with **Next.js**, **Tailwind CSS**, and **Google Gemini 3.8 Flash** that demonstrates the difference between **User Prompt** and **System Prompt** (Persona + Store Info + Guardrails).

---

## 🎯 Topic Selected: Option 1 (Pizza Shop Assistant)

* **Business**: Cheesy Crust Pizza
* **Role**: Cheerful, helpful order assistant.
* **Store Info & Menu**:
  * Large Pepperoni: **$15**
  * Medium Veggie: **$12**
  * Garlic Bread: **$5**
  * Delivery Time: **30–45 mins**
* **Strict Guardrails**:
  1. ❌ **Never offer free items** under any circumstances (no free pizzas, no free garlic bread, no free sides/drinks, no discounts).
  2. 🍕 **Only answer food and delivery questions** for Cheesy Crust Pizza.
  3. ⛔ **Politely refuse all off-topic requests** (e.g., coding, math, homework, weather, politics, or general trivia).

---

## 🔬 Core Concept: User Prompt vs. System Prompt

| Concept | Definition | Example in Action |
| :--- | :--- | :--- |
| **User Prompt** | The input typed by the customer in the chat input. It can be unpredictable, demanding discounts or asking off-topic questions. | *"Can I get a free garlic bread with my pizza?"* |
| **System Prompt** | The hidden architectural instructions given to the AI *before* inference. Sets the **Role**, official **Store Info/Prices**, and **Guardrails**. | *Hidden rule: Never offer free items. The AI replies: "At Cheesy Crust Pizza we never offer free items! Garlic bread is $5."* |

---

## 🚀 Quick Start

### 1. Prerequisites
* Node.js 18.18+ or 20+
* A Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### 2. Configure Environment
```bash
cp .env.example .env.local
```
Add your key to `.env.local`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.8-flash
```

### 3. Install & Run
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Built-in Test Prompts (Verify Guardrails)

The app includes 1-click test buttons to verify:
1. **Menu & Pricing**: *"What is on your menu and how much is a Large Pepperoni and Garlic Bread?"* ➔ Verifies $15 and $5 prices.
2. **Delivery Time**: *"How long does delivery take?"* ➔ Verifies 30–45 mins delivery time.
3. **Guardrail 1 (Free items)**: *"Can I get a free garlic bread or free pizza with my order?"* ➔ AI strictly enforces no free food rule.
4. **Guardrail 2 (Off-topic)**: *"Can you help me write Python code to sort an array?"* ➔ AI politely refuses coding and redirects back to food & delivery.

---

## 📂 Architecture

* `src/data/assistantTopics.ts` — Definition of Cheesy Crust Pizza Role, Menu ($15, $12, $5, 30–45 mins), Guardrails, and System Prompt.
* `src/app/api/chat/route.ts` — Next.js API route integrating Gemini 3.8 Flash with `systemInstruction` and fallback guardrails.
* `src/components/AssistantDemo.tsx` — Dual-panel interface: System Prompt Inspector on the left, Live Customer Assistant Chat on the right.
* `src/app/page.tsx` — Main application page.
