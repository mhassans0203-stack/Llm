"use client";

import React, { useState } from "react";
import { CartProvider } from "@/context/CartContext";
import { AssistantDemo } from "@/components/AssistantDemo";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { MenuSection } from "@/components/MenuSection";
import { SpecialOffersSection } from "@/components/SpecialOffersSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { PizzaCustomizerModal } from "@/components/PizzaCustomizerModal";
import { TableReservationModal } from "@/components/TableReservationModal";
import { ToastContainer } from "@/components/Toast";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { Bot, UtensilsCrossed, Sparkles } from "lucide-react";

export default function Home() {
  const [activeView, setActiveView] = useState<"chatbot" | "restaurant">(
    "chatbot"
  );

  return (
    <CartProvider>
      <div className="relative min-h-screen bg-[#0F0E0D] text-[#F3ECE0]">
        {/* Top View Mode Switcher Header */}
        <div className="sticky top-0 z-50 bg-[#161413]/95 backdrop-blur-md border-b border-white/10 px-4 py-3">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">🍕</span>
              <div>
                <h2 className="font-serif font-bold text-sm sm:text-base text-white leading-tight">
                  Cheesy Crust Pizza &bull; Customer Assistant
                </h2>
                <p className="text-[11px] text-amber-400 font-medium">
                  Next.js AI Assistant (Role + Store Info + Guardrails)
                </p>
              </div>
            </div>

            {/* Toggle Switcher */}
            <div className="flex items-center bg-[#1F1D1B] p-1 rounded-xl border border-white/10 text-xs font-semibold">
              <button
                onClick={() => setActiveView("chatbot")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeView === "chatbot"
                    ? "bg-[#C92A2A] text-white shadow-md font-bold"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <Bot className="w-4 h-4" />
                <span>AI Chatbot (Assignment Mode)</span>
              </button>

              <button
                onClick={() => setActiveView("restaurant")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeView === "restaurant"
                    ? "bg-[#C92A2A] text-white shadow-md font-bold"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Full Restaurant Website</span>
              </button>
            </div>
          </div>
        </div>

        {/* View 1: Primary Assignment Chatbot Mode (Option 1: Cheesy Crust Pizza) */}
        {activeView === "chatbot" && (
          <main className="min-h-screen pt-4 pb-16">
            <AssistantDemo />
          </main>
        )}

        {/* View 2: Full Restaurant Experience */}
        {activeView === "restaurant" && (
          <>
            <Navbar />
            <main>
              <HeroSection />
              <AboutSection />
              <MenuSection />
              <SpecialOffersSection />
              <WhyChooseUsSection />
              <ReviewsSection />
              <ContactSection />
            </main>
            <Footer />
            <CartDrawer />
            <CheckoutModal />
            <PizzaCustomizerModal />
            <TableReservationModal />
            <ToastContainer />
            <ChatbotWidget />
          </>
        )}
      </div>
    </CartProvider>
  );
}
