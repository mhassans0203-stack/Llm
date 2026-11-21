"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  Flame,
  Star,
  Clock,
  ArrowRight,
  Sparkles,
  Award,
  ChevronDown,
} from "lucide-react";

export const HeroSection: React.FC = () => {
  const { setIsCartOpen, setIsReservationOpen } = useCart();

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-center overflow-hidden bg-[#0F0E0D]"
    >
      {/* Background Ambience & Warm Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#C92A2A]/20 via-[#F59E0B]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#C92A2A]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Italian Wood-Fired Texture Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Description & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F1D1B] border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase shadow-lg shadow-black/40"
            >
              <Flame className="w-3.5 h-3.5 text-[#C92A2A] fill-[#C92A2A]" />
              <span>Wood-Fired Neapolitan Tradition • Est. 1988</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
            >
              Born in Napoli.{" "}
              <span className="block mt-1 text-gradient-red">
                Fired by Passion.
              </span>
              <span className="block font-normal text-3xl sm:text-5xl text-stone-200 mt-2 font-serif italic">
                Artisanal Wood-Fired Pizza
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              Crafted with naturally fermented 48-hour sourdough, sweet San
              Marzano D.O.P. tomatoes from the slopes of Mount Vesuvius, and creamy
              Campania buffalo mozzarella. Flash-baked at 450°C in just 90
              seconds.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <a
                href="#menu"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#C92A2A] via-[#B02525] to-[#8F1D1D] hover:from-[#B02525] hover:to-[#6F1414] text-white font-bold text-sm tracking-wider uppercase transition-all shadow-xl shadow-[#C92A2A]/30 flex items-center justify-center gap-3 group cursor-pointer"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>

              <a
                href="#menu"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#1C1A18] hover:bg-[#282522] border border-white/10 hover:border-white/20 text-[#F3ECE0] font-semibold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Full Menu</span>
              </a>

              <button
                onClick={() => setIsReservationOpen(true)}
                className="w-full sm:w-auto px-5 py-4 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer underline underline-offset-4 decoration-amber-500/40"
              >
                <span>Reserve Table</span>
              </button>
            </motion.div>

            {/* Quick Stats Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0"
            >
              <div>
                <p className="font-serif text-2xl font-bold text-amber-400">
                  48h
                </p>
                <p className="text-xs text-stone-400">Slow Sourdough Fermentation</p>
              </div>
              <div className="border-x border-white/10 px-3">
                <p className="font-serif text-2xl font-bold text-white">
                  450°C
                </p>
                <p className="text-xs text-stone-400">Volcanic Stone Oak Oven</p>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-serif text-2xl font-bold text-amber-400">
                    4.9
                  </span>
                  <div className="flex text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </div>
                </div>
                <p className="text-xs text-stone-400">3,400+ Diner Reviews</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Pizza Showcase with Animated Floating Ingredients */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Oven Glow behind the pizza */}
            <div className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-tr from-[#C92A2A]/40 via-amber-600/30 to-transparent blur-3xl" />

            {/* Rotating Decorative Circular Ring */}
            <div className="absolute w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] rounded-full border border-dashed border-amber-500/20 animate-spin-slow pointer-events-none" />

            {/* Main Pizza Card Container with subtle 3D floating effect */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full p-2 bg-gradient-to-br from-amber-500/30 via-white/5 to-[#C92A2A]/30 shadow-2xl z-10"
              style={{
                boxShadow:
                  "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 50px -10px rgba(201, 42, 42, 0.4)",
              }}
            >
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#24211F]">
                <Image
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop"
                  alt="Authentic Neapolitan Wood-Fired Pizza"
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 300px, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* ======================================================== */}
            {/* FLOATING PIZZA INGREDIENTS (Animated with Framer Motion) */}
            {/* ======================================================== */}

            {/* 1. Fresh Italian Basil Leaf (Top Left) */}
            <motion.div
              animate={{
                y: [0, -14, 0],
                rotate: [0, 8, 0],
                x: [0, 4, 0],
              }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-4 -left-2 sm:top-2 sm:left-4 z-20 pointer-events-none"
            >
              <div className="p-2 sm:p-3 rounded-2xl bg-[#1A1917]/90 backdrop-blur-md border border-emerald-500/30 shadow-xl flex items-center gap-2 text-xs font-semibold text-emerald-300">
                <span className="text-xl">🌿</span>
                <span className="hidden sm:inline">Fresh Sweet Basil</span>
              </div>
            </motion.div>

            {/* 2. San Marzano Plum Tomato (Top Right) */}
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, -6, 0],
                x: [0, -5, 0],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
              className="absolute -top-6 -right-2 sm:top-6 sm:-right-4 z-20 pointer-events-none"
            >
              <div className="p-2 sm:p-3 rounded-2xl bg-[#1A1917]/90 backdrop-blur-md border border-[#C92A2A]/40 shadow-xl flex items-center gap-2 text-xs font-semibold text-[#FF8585]">
                <span className="text-xl">🍅</span>
                <span className="hidden sm:inline">San Marzano D.O.P.</span>
              </div>
            </motion.div>

            {/* 3. Fiery Calabrian Chili Pepper (Bottom Left) */}
            <motion.div
              animate={{
                y: [0, -16, 0],
                rotate: [0, -10, 0],
                x: [0, 6, 0],
              }}
              transition={{
                duration: 5.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
              className="absolute -bottom-4 -left-4 sm:bottom-4 sm:left-2 z-20 pointer-events-none"
            >
              <div className="p-2 sm:p-3 rounded-2xl bg-[#1A1917]/90 backdrop-blur-md border border-amber-500/40 shadow-xl flex items-center gap-2 text-xs font-semibold text-amber-300">
                <span className="text-xl">🌶️</span>
                <span className="hidden sm:inline">Calabrian Chili Fire</span>
              </div>
            </motion.div>

            {/* 4. Buffalo Mozzarella & Olive Slice (Bottom Right) */}
            <motion.div
              animate={{
                y: [0, 12, 0],
                rotate: [0, 7, 0],
                x: [0, -4, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9,
              }}
              className="absolute -bottom-6 -right-2 sm:bottom-8 sm:right-2 z-20 pointer-events-none"
            >
              <div className="p-2 sm:p-3 rounded-2xl bg-[#1A1917]/90 backdrop-blur-md border border-white/20 shadow-xl flex items-center gap-2 text-xs font-semibold text-stone-200">
                <span className="text-xl">🧀</span>
                <span className="hidden sm:inline">Campania Buffalo Mozzarella</span>
              </div>
            </motion.div>

            {/* 5. Wild Forest Mushroom (Floating Center-Right) */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="absolute top-1/2 -right-6 sm:-right-8 -translate-y-1/2 z-20 pointer-events-none"
            >
              <div className="w-10 h-10 rounded-full bg-[#1F1D1B]/90 backdrop-blur-md border border-amber-500/30 shadow-lg flex items-center justify-center text-lg">
                🍄
              </div>
            </motion.div>

            {/* Floating Chef's Guarantee Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-10 sm:-bottom-12 left-1/2 -translate-x-1/2 z-30"
            >
              <div className="px-4 py-2 rounded-full bg-[#1A1816] border border-amber-500/40 shadow-2xl flex items-center gap-2.5 text-xs text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-semibold text-stone-200">
                  Oven at <strong className="text-amber-400">450°C</strong>
                </span>
                <span className="text-stone-500">•</span>
                <span className="text-stone-300">Baking Fresh Right Now</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee Ticker at the base of the Hero Section */}
      <div className="mt-16 sm:mt-24 border-y border-white/10 bg-[#141211]/90 py-3.5 overflow-hidden">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee text-xs font-semibold tracking-widest uppercase text-stone-400">
          {[
            "🔥 48-Hour Natural Sourdough Fermentation",
            "🍕 Authentic Neapolitan Wood-Fired at 450°C",
            "🍅 100% Certified San Marzano D.O.P.",
            "🧀 Fresh Buffalo Mozzarella di Caserta",
            "🛵 Thermal Induction Fast Delivery Under 30 Mins",
            "🌿 Hand-Picked Wild Herbs & Sicilian EVOO",
            "🇮🇹 Certified AVPN Master Pizzaiolo Tradition",
            "🔥 48-Hour Natural Sourdough Fermentation",
            "🍕 Authentic Neapolitan Wood-Fired at 450°C",
            "🍅 100% Certified San Marzano D.O.P.",
            "🧀 Fresh Buffalo Mozzarella di Caserta",
            "🛵 Thermal Induction Fast Delivery Under 30 Mins",
            "🌿 Hand-Picked Wild Herbs & Sicilian EVOO",
            "🇮🇹 Certified AVPN Master Pizzaiolo Tradition",
          ].map((item, index) => (
            <span key={index} className="flex items-center gap-6">
              <span className="text-stone-200">{item}</span>
              <span className="text-[#C92A2A] font-bold">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
