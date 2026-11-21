"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { SPECIAL_OFFERS } from "@/data/pizzaData";
import {
  Tag,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Flame,
  ShoppingBag,
  Percent,
} from "lucide-react";

export const SpecialOffersSection: React.FC = () => {
  const { addSpecialOfferToCart, applyPromoCode, showToast } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    applyPromoCode(code);
    showToast(`Code "${code}" copied and applied to order!`, "success");
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <section id="offers" className="py-24 sm:py-32 bg-[#121110] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C92A2A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1D1B] border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Percent className="w-3.5 h-3.5 text-amber-400" />
            <span>Offerte Speciali & Combinazioni</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Curated Artisanal Deals & Combos
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Feast together with our hand-assembled bundles. Each package pairs
            our flagship wood-fired pizzas with artisanal appetizers, desserts,
            and Italian beverages.
          </p>

          {/* Quick Promo Banner */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-3 p-2 pl-4 bg-gradient-to-r from-[#201514] via-[#2A1817] to-[#201514] border border-[#C92A2A]/40 rounded-full shadow-lg">
              <span className="text-xs text-stone-300">
                Use code <strong className="text-white font-mono">FORNO20</strong>{" "}
                for <span className="text-amber-400 font-bold">20% OFF</span> your order!
              </span>
              <button
                onClick={() => handleCopyCode("FORNO20")}
                className="px-3 py-1.5 rounded-full bg-[#C92A2A] hover:bg-[#B02525] text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedCode === "FORNO20" ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-300" />
                    <span>Applied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Apply Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Offers Cards Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SPECIAL_OFFERS.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="relative rounded-3xl bg-[#171514] border border-white/10 hover:border-[#C92A2A]/40 overflow-hidden shadow-2xl transition-all flex flex-col justify-between group"
            >
              {/* Top Banner & Image */}
              <div className="relative h-56 w-full overflow-hidden bg-[#221F1D]">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171514] via-black/30 to-transparent" />

                {/* Discount Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-gradient-to-r from-[#C92A2A] to-[#B02525] text-white shadow-xl">
                    {offer.discountBadge}
                  </span>
                </div>

                {/* Tag */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-300 bg-black/70 backdrop-blur-md border border-amber-500/30">
                    {offer.tag}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-white group-hover:text-amber-200 transition-colors">
                        {offer.title}
                      </h3>
                      <p className="text-xs text-amber-500/90 font-serif italic mt-0.5">
                        {offer.italianSubtitle}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-serif text-2xl font-bold text-amber-400">
                        ${offer.discountPrice.toFixed(2)}
                      </span>
                      <span className="block text-xs text-stone-500 line-through">
                        ${offer.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <p className="text-stone-300 text-xs sm:text-sm mt-3 leading-relaxed">
                    {offer.description}
                  </p>

                  {/* Included Items Checklist */}
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                      Combo Inclusions:
                    </p>
                    {offer.itemsIncluded.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-stone-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C92A2A] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <button
                    onClick={() => addSpecialOfferToCart(offer)}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#C92A2A] to-[#B02525] hover:from-[#B02525] hover:to-[#8F1D1D] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 group/btn"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Claim & Add to Cart</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
