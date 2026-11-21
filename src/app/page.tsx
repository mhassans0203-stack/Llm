"use client";

import React, { useState } from "react";
import { CartProvider } from "@/context/CartContext";
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
import { AssistantDemo } from "@/components/AssistantDemo";
import {
  Bot,
  Layout,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Flame,
} from "lucide-react";

export default function Home() {
  const [viewMode, setViewMode] = useState<"full" | "assistant-only">("full");

  return (
    <CartProvider>
      <div className="relative min-h-screen bg-[#0F0E0D] text-[#F3ECE0]">
        {/* Top Interactive Switcher & Assignment Notification Bar */}
        <div className="sticky top-0 z-50 bg-[#141211]/95 backdrop-blur-md border-b border-amber-500/20 px-4 py-2.5 text-xs shadow-xl">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="font-semibold text-stone-200">
                🍕 Forno Antico Restaurant &amp;{" "}
                <span className="text-amber-400 font-bold">
                  Option 1: Cheesy Crust Pizza Assistant
                </span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                Gemini 3.8 Flash
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("full")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === "full"
                    ? "bg-[#C92A2A] text-white shadow-md shadow-[#C92A2A]/40"
                    : "bg-white/5 text-stone-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Layout className="w-3.5 h-3.5" />
                <span>Full Website Experience</span>
              </button>

              <button
                onClick={() => setViewMode("assistant-only")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === "assistant-only"
                    ? "bg-amber-500 text-black shadow-md shadow-amber-500/40"
                    : "bg-white/5 text-stone-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Option 1 Assistant (Focus Mode)</span>
              </button>
            </div>
          </div>
        </div>

        {viewMode === "full" ? (
          <>
            {/* Navigation Bar */}
            <Navbar />

            {/* Main Content Sections */}
            <main>
              {/* 1. Hero Section */}
              <HeroSection />

              {/* 2. About Us Heritage */}
              <AboutSection />

              {/* 3. Our Menu Section */}
              <MenuSection />

              {/* 4. Special Offers Section */}
              <SpecialOffersSection />

              {/* 5. Option 1: Cheesy Crust Pizza Assistant & Prompt Inspector */}
              <section
                id="ai-assistant"
                className="py-16 bg-gradient-to-b from-[#0F0E0D] via-[#141211] to-[#0F0E0D] border-y border-white/10 relative overflow-hidden"
              >
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                <AssistantDemo />
              </section>

              {/* 6. Why Choose Us Section */}
              <WhyChooseUsSection />

              {/* 7. Customer Reviews Section */}
              <ReviewsSection />

              {/* 8. Contact & Opening Hours */}
              <ContactSection />
            </main>

            {/* Footer */}
            <Footer />
          </>
        ) : (
          <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 mb-6 flex items-center justify-between">
              <button
                onClick={() => setViewMode("full")}
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 transition-all hover:bg-amber-500/20"
              >
                &larr; Return to Full Restaurant Website
              </button>
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Option 1 Focus Mode Active (Gemini 3.8 Flash)</span>
              </div>
            </div>
            <AssistantDemo />
          </div>
        )}

        {/* Interactive Modals, Drawers & Floating AI Concierge */}
        <CartDrawer />
        <CheckoutModal />
        <PizzaCustomizerModal />
        <TableReservationModal />
        <ToastContainer />
        <ChatbotWidget />
      </div>
    </CartProvider>
  );
}
