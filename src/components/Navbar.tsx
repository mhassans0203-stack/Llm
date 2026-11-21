"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Flame,
  Phone,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const { totalItemsCount, total, setIsCartOpen, setIsReservationOpen } =
    useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About Heritage", href: "#about" },
    { name: "Our Menu", href: "#menu" },
    { name: "Special Offers", href: "#offers" },
    { name: "AI Assistant (Option 1)", href: "#ai-assistant" },
    { name: "Why Forno", href: "#why-us" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact & Hours", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0F0E0D]/95 backdrop-blur-md py-3 border-b border-white/10 shadow-2xl"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C92A2A] to-[#8F1D1D] flex items-center justify-center text-white shadow-lg shadow-[#C92A2A]/30 group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white">
                  FORNO ANTICO
                </span>
                <span className="flex gap-0.5" title="Made in Naples Tradition">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E6F40]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C92A2A]" />
                </span>
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-amber-400 font-medium">
                Pizzeria Napoletana Artigianale
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isAI = link.href === "#ai-assistant";
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest relative py-1 transition-all flex items-center gap-1.5 ${
                    isAI
                      ? "text-amber-300 font-bold px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500/25 shadow-sm shadow-amber-500/20"
                      : "text-stone-300 hover:text-white font-semibold group"
                  }`}
                >
                  {isAI && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                  <span>{link.name}</span>
                  {!isAI && (
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C92A2A] group-hover:w-full transition-all duration-200" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Table Reservation Button */}
            <button
              onClick={() => setIsReservationOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-amber-300 border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 transition-all cursor-pointer"
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Book a Table</span>
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#C92A2A] hover:bg-[#B02525] text-white text-xs font-bold transition-all shadow-lg shadow-[#C92A2A]/30 cursor-pointer active:scale-95"
              aria-label="View shopping cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {totalItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber-400 text-black text-[10px] font-black flex items-center justify-center shadow"
                  >
                    {totalItemsCount}
                  </motion.span>
                )}
              </div>
              <span className="hidden sm:inline">Order</span>
              {totalItemsCount > 0 && (
                <span className="text-amber-200 pl-1 border-l border-white/20">
                  ${total.toFixed(2)}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-4/5 max-w-sm bg-[#161413] border-r border-white/10 p-6 flex flex-col justify-between shadow-2xl lg:hidden text-white"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#C92A2A] flex items-center justify-center text-white">
                      <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
                    </div>
                    <span className="font-serif text-lg font-bold">
                      FORNO ANTICO
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-stone-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="py-6 flex flex-col gap-3">
                  {navLinks.map((link) => {
                    const isAI = link.href === "#ai-assistant";
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-sm py-2 px-3 rounded-xl uppercase tracking-wider transition-colors flex items-center justify-between ${
                          isAI
                            ? "text-amber-300 font-bold bg-amber-500/15 border border-amber-500/30"
                            : "text-stone-300 hover:text-white font-semibold border-b border-white/5"
                        }`}
                      >
                        <span>{link.name}</span>
                        {isAI && (
                          <span className="text-[10px] bg-amber-400 text-black px-2 py-0.5 rounded font-extrabold">
                            Option 1
                          </span>
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsReservationOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl border border-amber-500/40 text-amber-300 bg-amber-500/10 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Reserve a Table</span>
                </button>

                <a
                  href="tel:+15553492819"
                  className="flex items-center justify-center gap-2 text-xs text-stone-400 hover:text-white py-1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C92A2A]" />
                  <span>Call Us: +1 (555) 349-2819</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
