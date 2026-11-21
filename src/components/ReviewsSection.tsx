"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CUSTOMER_REVIEWS } from "@/data/pizzaData";
import { Star, CheckCircle2, Quote, Award } from "lucide-react";

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-24 sm:py-32 bg-[#121110] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1D1B] border border-white/10 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>Recensioni & Critiche</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Loved by Food Critics & Pizza Enthusiasts
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Over 3,450 five-star reviews celebrate the smoky, airy crust and
            uncompromising authentic Italian flavor created at Forno Antico.
          </p>

          {/* Rating Summary Pill */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-white">4.9 / 5.0</span>
            <span className="text-xs text-stone-400 border-l border-white/10 pl-3">
              Google & TripAdvisor Verified
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {CUSTOMER_REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -4 }}
              className="p-8 rounded-3xl bg-[#171514] border border-white/10 hover:border-amber-500/40 transition-all shadow-xl flex flex-col justify-between relative group"
            >
              {/* Quote Mark Icon */}
              <Quote className="w-10 h-10 text-white/5 absolute top-6 right-6 pointer-events-none group-hover:text-amber-500/10 transition-colors" />

              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <span className="text-[11px] text-stone-500 font-mono">
                    {review.date}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-stone-200 text-sm sm:text-base leading-relaxed font-serif italic">
                  &ldquo;{review.comment}&rdquo;
                </p>

                {/* Pizza Mentioned */}
                <div className="inline-block px-3 py-1 rounded-md bg-[#221F1D] text-[11px] text-amber-400/90 font-medium border border-white/5">
                  Ordered: <strong className="text-white">{review.pizzaOrdered}</strong>
                </div>
              </div>

              {/* Reviewer Info */}
              <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/30 bg-[#252220]">
                    <Image
                      src={review.avatar}
                      alt={review.author}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-white text-sm">
                      {review.author}
                    </h4>
                    <p className="text-xs text-stone-400">{review.role}</p>
                  </div>
                </div>

                {review.verified && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Michelin Guide & Accolade Bar */}
        <div className="mt-16 p-6 rounded-2xl bg-[#161413] border border-amber-500/20 text-center flex flex-col sm:flex-row items-center justify-around gap-6">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-amber-400 shrink-0" />
            <div className="text-left">
              <p className="font-serif font-bold text-white text-sm">
                Gambero Rosso Top Pizzeria
              </p>
              <p className="text-xs text-stone-400">Awarded 3 Spicchi (Highest Honor)</p>
            </div>
          </div>

          <div className="h-8 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-[#C92A2A] shrink-0" />
            <div className="text-left">
              <p className="font-serif font-bold text-white text-sm">
                AVPN Associazione Verace Pizza Napoletana
              </p>
              <p className="text-xs text-stone-400">Official Certificate #842</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
