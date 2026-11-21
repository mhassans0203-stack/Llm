# Forno Antico | Artisanal Neapolitan Wood-Fired Pizza & AI Concierge 🍕🇮🇹

> A modern, visually stunning, and responsive Italian restaurant web application built with **Next.js 16, React 19, Tailwind CSS v4, Framer Motion**, and an integrated **Gemini 3.8 Flash AI Concierge**.

---

## 🌟 Key Highlights

* **Authentic Italian Theme**: Deep obsidian charcoal, rustic warm red, ivory cream, and gold accents with Playfair Display & Plus Jakarta Sans typography.
* **Animated Hero Section**: Large wood-fired pizza presentation with **Framer Motion floating ingredients** (sweet basil, San Marzano tomato, Calabrian chili, buffalo mozzarella, wild mushroom), active 450°C oven status badge, and an infinite marquee ticker.
* **Artisanal Pizza Menu**: 12 authentic Neapolitan pizzas across 4 categories (*Classic, Special, Cheese, Spicy*), live search, dietary filters (Vegetarian, Spicy), and quick "+ Add" and "Customize" buttons.
* **Interactive Pizza Customizer Modal**: Customize 12" vs 16" size, 3 crust styles (Classic Sourdough, Gluten-Free, Stuffed Mozzarella), 3 spice levels, and premium toppings (Truffle Glaze, Hot Honey, Buffalo Mozzarella, 'Nduja).
* **Slide-Over Cart Drawer**: Quantity controls, delivery vs pickup toggle, dynamic free delivery progress bar ($40 threshold), and working coupon system (e.g. `FORNO20` for 20% off).
* **Multi-Step Checkout Flow**: Contact details, delivery instructions, tip selector, and an **animated live 4-stage cooking tracker** (*Order Confirmed ➔ Dough Tossed ➔ In 450°C Wood Oven ➔ En Route*) with confetti celebration.
* **Table Reservation Modal**: Reserve seating for 1–12 guests across the Main Hall, Heated Olive Garden Veranda, Chef's Counter, or Private Wine Room with instant confirmation.
* **Gianni — AI Neapolitan Concierge**: Conversational assistant powered by **Gemini 3.8 Flash** grounded in [`COMPANY_INFO.md`](./COMPANY_INFO.md). Provides polite, concise menu recommendations, allergy guidance, and in-chat 1-click action buttons to apply promo codes or book tables.

---

## 🚀 Quick Start

### 1. Prerequisites
* Node.js 18.18+ or 20+ installed
* A Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### 2. Setup Environment Variables
Clone the repository and copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.8-flash
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 📁 Project Architecture

```
├── COMPANY_INFO.md              # Authoritative knowledge base for the AI Chatbot
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts    # Secure Gemini 3.8 Flash backend API with knowledge grounding
│   │   ├── globals.css          # Theme tokens, custom animations, keyframes & fonts
│   │   ├── layout.tsx           # Playfair Display & Plus Jakarta Sans typography
│   │   └── page.tsx             # Main page uniting all sections & modals
│   ├── components/
│   │   ├── Navbar.tsx           # Sticky navigation, tricolore badge & cart trigger
│   │   ├── HeroSection.tsx      # Hero banner, floating ingredients & continuous ticker
│   │   ├── AboutSection.tsx     # 35-year Bellini family heritage & 450°C oven story
│   │   ├── MenuSection.tsx      # 12 handcrafted pizzas with category & dietary filters
│   │   ├── SpecialOffersSection.tsx # Combos, discount ribbons & 1-click coupon copy
│   │   ├── WhyChooseUsSection.tsx# 6 quality pillars with icons
│   │   ├── ReviewsSection.tsx   # Verified diner reviews & culinary accolades
│   │   ├── ContactSection.tsx   # Opening hours, location, directions & catering form
│   │   ├── Footer.tsx           # Brand footer, newsletter with $10 voucher & social links
│   │   ├── CartDrawer.tsx       # Slide-over interactive cart with promo engine
│   │   ├── CheckoutModal.tsx    # Multi-step checkout & live 4-stage cooking tracker
│   │   ├── PizzaCustomizerModal.tsx # Size, crust, spice & topping customizer
│   │   ├── TableReservationModal.tsx # Instant table booking modal
│   │   ├── ChatbotWidget.tsx    # Floating Gemini AI Concierge with quick starter chips
│   │   └── Toast.tsx            # Floating feedback alerts
│   ├── context/
│   │   └── CartContext.tsx      # Cart state, modals & order calculations
│   ├── data/
│   │   └── pizzaData.ts         # Pizza menu, specials, reviews & company data
│   └── types/
│       └── pizza.ts             # TypeScript definitions
├── next.config.ts               # Remote images & Turbopack configurations
└── package.json
```

---

## 📜 License & Credits

* Crafted with dedication by Famiglia Bellini • Forno Antico Pizzeria Inc.
* Associazione Verace Pizza Napoletana (AVPN) Certificate #842.
