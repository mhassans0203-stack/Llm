"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import confetti from "canvas-confetti";
import {
  X,
  Calendar,
  Users,
  Clock,
  CheckCircle2,
  Sparkles,
  UtensilsCrossed,
  MapPin,
} from "lucide-react";

export const TableReservationModal: React.FC = () => {
  const { isReservationOpen, setIsReservationOpen, showToast } = useCart();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resCode, setResCode] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    guests: "2",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    time: "19:30",
    seatingArea: "Main Dining Hall",
    specialRequests: "",
  });

  if (!isReservationOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = "TAVOLA-" + Math.floor(1000 + Math.random() * 9000);
    setResCode(code);
    setIsSubmitted(true);
    showToast(`Table confirmed for ${formData.name}!`, "success");

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#C92A2A", "#F59E0B", "#FDFBF7", "#2E6F40"],
      });
    } catch {
      // ignore
    }
  };

  const handleClose = () => {
    setIsReservationOpen(false);
    setIsSubmitted(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-lg bg-[#161413] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col"
        >
          {/* Header */}
          <div className="p-5 border-b border-white/10 bg-[#1A1816] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C92A2A]/20 border border-[#C92A2A]/40 flex items-center justify-center text-[#FF6B6B]">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Prenota un Tavolo
                </h3>
                <p className="text-xs text-amber-500/90 font-serif italic">
                  Reserve an Artisanal Italian Table
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Guest Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Matteo Moretti"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-[#1F1D1B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C92A2A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-[#1F1D1B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C92A2A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-[#1F1D1B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C92A2A]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Guests
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({ ...formData, guests: e.target.value })
                      }
                      className="w-full bg-[#1F1D1B] border border-white/10 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-[#C92A2A]"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full bg-[#1F1D1B] border border-white/10 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-[#C92A2A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Time Slot
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className="w-full bg-[#1F1D1B] border border-white/10 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-[#C92A2A]"
                    >
                      <option value="12:00">12:00 PM (Pranzo)</option>
                      <option value="13:30">1:30 PM (Pranzo)</option>
                      <option value="17:30">5:30 PM (Aperitivo)</option>
                      <option value="18:30">6:30 PM (Cena)</option>
                      <option value="19:30">7:30 PM (Cena)</option>
                      <option value="20:30">8:30 PM (Cena)</option>
                      <option value="21:30">9:30 PM (Tardi)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Seating Ambience
                  </label>
                  <select
                    value={formData.seatingArea}
                    onChange={(e) =>
                      setFormData({ ...formData, seatingArea: e.target.value })
                    }
                    className="w-full bg-[#1F1D1B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C92A2A]"
                  >
                    <option value="Main Dining Hall">
                      Main Dining Hall (Candlelight & Wood Oven View)
                    </option>
                    <option value="Veranda & Garden">
                      Romantic Veranda & Olive Garden (Outdoor Heaters)
                    </option>
                    <option value="Chef's Counter">
                      Chef&apos;s Marble Counter (Watch the Pizzaiolos Live)
                    </option>
                    <option value="Private Wine Room">
                      Private Tuscan Wine Room (Parties of 6+)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Occasion or Special Dietary Notes (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Birthday, anniversary, gluten allergy, quiet table..."
                    value={formData.specialRequests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialRequests: e.target.value,
                      })
                    }
                    className="w-full bg-[#1F1D1B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C92A2A]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-[#C92A2A] to-[#B02525] hover:from-[#B02525] hover:to-[#8F1D1D] text-white font-bold rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Confirm Table Reservation</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold tracking-wider mb-2">
                    {resCode}
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-white">
                    Tavolo Riservato!
                  </h4>
                  <p className="text-xs text-stone-300 mt-1 max-w-sm mx-auto">
                    We look forward to welcoming you,{" "}
                    <strong>{formData.name}</strong>. A confirmation SMS & email
                    have been sent to {formData.email}.
                  </p>
                </div>

                <div className="p-3.5 bg-[#1F1D1B] rounded-xl border border-white/5 text-left text-xs space-y-1.5 text-stone-300">
                  <p className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>{formData.guests} Guests</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {formData.date} at {formData.time}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{formData.seatingArea}</span>
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  className="px-6 py-2 bg-[#C92A2A] hover:bg-[#B02525] text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Close & Browse Menu
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
