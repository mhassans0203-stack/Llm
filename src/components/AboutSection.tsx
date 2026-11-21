"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Flame, Award, Heart, CheckCircle2, Sparkles } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#121110] relative overflow-hidden">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#C92A2A]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Collage with Badge Overlay */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            {/* Primary Large Image */}
            <div className="relative h-[380px] sm:h-[480px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#1C1A18]">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop"
                alt="Master Pizzaiolo hand-stretching pizza dough"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1 rounded-full bg-[#C92A2A] text-white text-[11px] font-bold uppercase tracking-wider">
                  Handcrafted in Napoli Style
                </span>
                <p className="font-serif text-xl sm:text-2xl font-bold text-white mt-2">
                  &ldquo;A true pizza is not merely baked; it is forged by time, wood, and devotion.&rdquo;
                </p>
                <p className="text-xs text-amber-400 mt-1 italic font-serif">
                  — Maestro Marco Bellini, Head Pizzaiolo
                </p>
              </div>
            </div>

            {/* Floating Secondary Mini Image Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -bottom-8 -right-4 sm:-right-8 w-48 sm:w-60 h-48 sm:h-60 rounded-2xl overflow-hidden border-4 border-[#121110] shadow-2xl hidden sm:block bg-[#1A1816]"
            >
              <Image
                src="https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=800&auto=format&fit=crop"
                alt="Fresh San Marzano tomatoes and basil"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="240px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="text-[11px] font-bold text-amber-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-amber-500/30">
                  D.O.P. Certified Caserta
                </span>
              </div>
            </motion.div>

            {/* Experience Floating Badge */}
            <div className="absolute -top-6 -left-4 sm:-left-6 bg-[#1A1816]/95 border border-amber-500/40 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C92A2A] to-[#801818] flex items-center justify-center text-white">
                <Award className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-white leading-none">
                  35+
                </p>
                <p className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold mt-1">
                  Years of Heritage
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Modern Split-Layout Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1A18] border border-white/10 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Italian Roots</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Where Ancient Vesuvian Tradition Meets Culinary Art.
            </h2>

            {/* Body copy */}
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Founded in 1988 by the Bellini family, Forno Antico was born with a singular mission: to preserve the soul of authentic Neapolitan pizza. We believe that extraordinary pizza cannot be hurried. That is why our dough undergoes a slow, natural 48-hour fermentation cycle using genuine Caputo &ldquo;Tipo 00&rdquo; wheat flour.
            </p>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Our oven was sculpted on-site by third-generation Neapolitan craftsmen using volcanic Mount Vesuvius refractory stone. Heated by cured beech and olive wood to 450°C, it blisters the cornicione in 90 seconds, producing that airy, cloud-like chew revered in Southern Italy.
            </p>

            {/* Key Quality Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                {
                  title: "48-Hour Cold Sourdough",
                  desc: "Ultra-digestible, zero commercial bloating.",
                },
                {
                  title: "San Marzano D.O.P. Only",
                  desc: "Sweet volcanic soil tomatoes harvested in Agro Sarnese.",
                },
                {
                  title: "Daily Flown Buffalo Mozzarella",
                  desc: "Creamy, rich Fior di Latte & Buffalo cheese from Campania.",
                },
                {
                  title: "Wood-Fired Volcanic Oven",
                  desc: "Oak-fired flames flash-baking at 450°C for crisp perfection.",
                },
              ].map((pill, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-[#181615] border border-white/5 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {pill.title}
                    </h4>
                    <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                      {pill.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Italian Signature */}
            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <div>
                <p className="font-serif text-lg font-bold text-white">
                  Famiglia Bellini
                </p>
                <p className="text-xs text-amber-500/90 font-serif italic">
                  Napoli &bull; Maestri Pizzaioli dal 1988
                </p>
              </div>

              <div className="flex items-center gap-2 text-stone-400 text-xs italic">
                <Heart className="w-4 h-4 text-[#C92A2A] fill-[#C92A2A]" />
                <span>Fatto con Amore</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
