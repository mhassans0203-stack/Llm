"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  UtensilsCrossed,
  Send,
  Navigation,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export const ContactSection: React.FC = () => {
  const { setIsReservationOpen, showToast } = useCart();
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquirySent, setInquirySent] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    showToast("Thank you! Your message was received.", "success");
    setInquiryName("");
    setInquiryEmail("");
    setInquiryMessage("");
    setTimeout(() => setInquirySent(false), 5000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#0F0E0D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1D1B] border border-white/10 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#C92A2A]" />
            <span>Dove Trovarci & Orari</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Visit Our Pizzeria or Get in Touch
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Join us under the warm candlelight and oak-smoke aroma of our dining
            hall, or order direct for piping hot Neapolitan delivery.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Location, Hours & Direct Contact (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Opening Hours Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#161413] border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">
                      Orari di Apertura (Opening Hours)
                    </h3>
                    <p className="text-xs text-stone-400">Wood oven hot all day</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Open Now Until 11:00 PM</span>
                </div>
              </div>

              {/* Hours Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#1D1B19] border border-white/5 space-y-1">
                  <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                    Monday &ndash; Thursday
                  </p>
                  <p className="text-amber-400 font-medium">
                    12:00 PM &ndash; 10:30 PM
                  </p>
                  <p className="text-stone-400 text-[11px]">
                    Lunch Service &amp; Dinner
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1D1B19] border border-amber-500/20 space-y-1">
                  <p className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center justify-between">
                    <span>Friday &ndash; Saturday</span>
                    <span className="text-amber-400 text-[10px]">Peak Vibes</span>
                  </p>
                  <p className="text-amber-400 font-medium">
                    12:00 PM &ndash; 11:30 PM
                  </p>
                  <p className="text-stone-400 text-[11px]">
                    Live Acoustic Jazz &amp; Aperitivo
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1D1B19] border border-white/5 space-y-1">
                  <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                    Sunday Family Feast
                  </p>
                  <p className="text-amber-400 font-medium">
                    12:00 PM &ndash; 10:00 PM
                  </p>
                  <p className="text-stone-400 text-[11px]">
                    All-Day Wood-Fired Service
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1D1B19] border border-white/5 space-y-1">
                  <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                    Delivery Hours
                  </p>
                  <p className="text-emerald-400 font-medium">
                    11:30 AM &ndash; 11:00 PM Daily
                  </p>
                  <p className="text-stone-400 text-[11px]">
                    Hot Thermal Transport
                  </p>
                </div>
              </div>
            </div>

            {/* Address & Simulated Map Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#161413] border border-white/10 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C92A2A]/20 border border-[#C92A2A]/40 flex items-center justify-center text-[#FF6B6B] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">
                      Forno Antico Pizzeria &amp; Bar
                    </h3>
                    <p className="text-xs text-stone-300 mt-0.5">
                      482 Via Bellini Boulevard, Little Italy District
                    </p>
                    <p className="text-xs text-stone-400">
                      Valet Parking Available &bull; Patio &amp; Olive Garden
                    </p>
                  </div>
                </div>

                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#221F1D] hover:bg-[#2C2825] border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Styled Visual Map Preview */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-white/10 bg-[#1F1D1B]">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] bg-[#1a1715]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-[#C92A2A] text-white flex items-center justify-center shadow-2xl shadow-[#C92A2A] animate-bounce mb-2">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <p className="font-serif font-bold text-sm text-white">
                    Forno Antico &bull; Central Little Italy
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Corner of Via Bellini &amp; Naples Square
                  </p>
                </div>
              </div>

              {/* Direct Hotlines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <a
                  href="tel:+15553492819"
                  className="p-3 rounded-xl bg-[#1D1B19] hover:bg-[#262320] border border-white/5 flex items-center gap-3 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <p className="text-[11px] text-stone-400">Telephone / Order</p>
                    <p className="text-xs font-bold text-white">+1 (555) 349-2819</p>
                  </div>
                </a>

                <a
                  href="mailto:ciao@fornoantico.com"
                  className="p-3 rounded-xl bg-[#1D1B19] hover:bg-[#262320] border border-white/5 flex items-center gap-3 transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[11px] text-stone-400">General Inquiries</p>
                    <p className="text-xs font-bold text-white">ciao@fornoantico.com</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Table Reservation CTA & Contact Form (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Table Reservation Highlight Box */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#241716] via-[#1D1615] to-[#161413] border border-[#C92A2A]/40 shadow-2xl relative overflow-hidden text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#C92A2A] text-white flex items-center justify-center mx-auto shadow-xl shadow-[#C92A2A]/40">
                <UtensilsCrossed className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">
                  Book an Italian Evening
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  Reserve Your Table
                </h3>
                <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                  Join us for romantic candlelit dinners, festive family
                  gatherings, or chef counter seats right beside the wood oven.
                </p>
              </div>

              <button
                onClick={() => setIsReservationOpen(true)}
                className="w-full py-3.5 px-6 rounded-xl bg-[#C92A2A] hover:bg-[#B02525] text-white font-bold text-sm tracking-wider uppercase transition-all shadow-xl shadow-[#C92A2A]/40 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table Now</span>
              </button>
            </div>

            {/* Quick Message / Catering Inquiry Form */}
            <div className="p-8 rounded-3xl bg-[#161413] border border-white/10 shadow-xl space-y-4">
              <h3 className="font-serif text-xl font-bold text-white">
                Send Us a Note / Private Events
              </h3>
              <p className="text-xs text-stone-400">
                Planning a corporate event, wedding rehearsal, or private pizza
                making class? Write to our team.
              </p>

              {inquirySent ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="font-serif font-bold text-white text-sm">
                    Messaggio Ricevuto!
                  </p>
                  <p className="text-xs text-stone-300">
                    Our events concierge will reach out to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Leonardo Bianchi"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full bg-[#1E1C1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C92A2A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Your Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="name@company.com"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      className="w-full bg-[#1E1C1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C92A2A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell us about your event, catering, or questions..."
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full bg-[#1E1C1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C92A2A] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-[#2A2624] hover:bg-[#383330] text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
