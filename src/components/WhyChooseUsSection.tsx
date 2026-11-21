"use client";

import React from "react";
import { motion } from "framer-motion";
import { WHY_CHOOSE_US_ITEMS } from "@/data/pizzaData";
import {
  Wheat,
  Flame,
  Award,
  Bike,
  ChefHat,
  Leaf,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

export const WhyChooseUsSection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Wheat: <Wheat className="w-6 h-6 text-amber-400" />,
    Flame: <Flame className="w-6 h-6 text-[#FF6B6B]" />,
    Award: <Award className="w-6 h-6 text-amber-400" />,
    Bike: <Bike className="w-6 h-6 text-emerald-400" />,
    ChefHat: <ChefHat className="w-6 h-6 text-amber-300" />,
    Leaf: <Leaf className="w-6 h-6 text-emerald-400" />,
  };

  return (
    <section id="why-us" className="py-24 sm:py-32 bg-[#0F0E0D] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#C92A2A]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1D1B] border border-white/10 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Perché Sceglierci</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why Discerning Diners Choose Forno Antico
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            From the volcanic soils of Campania to your dinner table, we uphold
            the stringent centuries-old discipline of true Neapolitan pizza
            craftsmanship.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_US_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-[#161413] border border-white/10 hover:border-[#C92A2A]/40 transition-all shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#221F1D] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg group-hover:border-[#C92A2A]/40">
                  {iconMap[item.icon] || <CheckCircle className="w-6 h-6 text-white" />}
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-amber-500/90 font-serif italic mt-0.5">
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-semibold text-stone-400 group-hover:text-stone-200 transition-colors">
                <span className="w-1 h-1 rounded-full bg-[#C92A2A]" />
                <span>Certified Artisanal Standard</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
