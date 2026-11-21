"use client";

import React from "react";
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

export default function Home() {
  return (
    <CartProvider>
      <div className="relative min-h-screen bg-[#0F0E0D] text-[#F3ECE0]">
        {/* Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          {/* 1. Hero Section */}
          <HeroSection />

          {/* 2. About Us Section */}
          <AboutSection />

          {/* 3. Our Menu Section */}
          <MenuSection />

          {/* 4. Special Offers Section */}
          <SpecialOffersSection />

          {/* 5. Why Choose Us Section */}
          <WhyChooseUsSection />

          {/* 6. Customer Reviews Section */}
          <ReviewsSection />

          {/* 7. Contact & Opening Hours */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Modals, Drawers & AI Chatbot */}
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
