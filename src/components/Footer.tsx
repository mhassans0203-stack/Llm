"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  Flame,
  Heart,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

export const Footer: React.FC = () => {
  const { showToast, setIsReservationOpen } = useCart();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    showToast("Benvenuto! Your $10 pizza voucher code is: VIVAITALIA10", "success");
    setEmail("");
  };

  return (
    <footer className="bg-[#0A0908] border-t border-white/10 text-stone-300 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#C92A2A]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Heritage (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C92A2A] to-[#8F1D1D] flex items-center justify-center text-white shadow-lg shadow-[#C92A2A]/30">
                <Flame className="w-5 h-5 text-amber-300 fill-amber-300" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wider text-white">
                  FORNO ANTICO
                </span>
                <p className="text-[10px] tracking-[0.2em] uppercase text-amber-400 font-medium">
                  Pizzeria Napoletana Artigianale
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Authentic Neapolitan wood-fired pizza crafted in accordance with the
              centuries-old tradition of Naples. Naturally fermented 48-hour
              sourdough, San Marzano D.O.P. tomatoes, and Campania buffalo
              mozzarella flash-baked at 450°C.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {/* Instagram SVG */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1A1816] hover:bg-[#C92A2A] border border-white/10 hover:border-transparent flex items-center justify-center text-stone-400 hover:text-white transition-all shadow-md"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook SVG */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1A1816] hover:bg-[#C92A2A] border border-white/10 hover:border-transparent flex items-center justify-center text-stone-400 hover:text-white transition-all shadow-md"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <span className="text-xs text-stone-500 font-mono pl-2">
                @fornoantico.pizzeria
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Naples Heritage
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Artisanal Menu
                </a>
              </li>
              <li>
                <a href="#offers" className="hover:text-white transition-colors">
                  Special Combos
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Diner Reviews
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="hover:text-amber-400 text-left transition-colors cursor-pointer text-amber-500/90 font-semibold"
                >
                  Book a Table
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Contact Quick Info (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Hours &amp; Location
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C92A2A] shrink-0 mt-0.5" />
                <span>482 Via Bellini Blvd, Little Italy District</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+1 (555) 349-2819</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ciao@fornoantico.com</span>
              </p>

              <div className="pt-2 border-t border-white/5 space-y-1 text-[11px]">
                <p className="text-white font-medium">Mon &ndash; Thu: 12PM &ndash; 10:30PM</p>
                <p className="text-white font-medium">Fri &ndash; Sat: 12PM &ndash; 11:30PM</p>
                <p className="text-white font-medium">Sunday: 12PM &ndash; 10:00PM</p>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter & Club dei Pizzaioli (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Il Club Degli Amici</span>
            </div>
            <h4 className="font-serif text-base font-bold text-white leading-tight">
              Get $10 Off Your Next Wood-Fired Feast
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Subscribe to receive secret seasonal pizza releases, wine pairings,
              and VIP table bookings.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Voucher code &ldquo;VIVAITALIA10&rdquo; sent to your email!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-[#181614] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C92A2A]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#C92A2A] hover:bg-[#B02525] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Join &amp; Claim $10</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Artisanal Signature */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} Forno Antico Pizzeria Inc. All rights
            reserved.
          </p>

          <p className="flex items-center gap-1.5 text-stone-400">
            <span>Fatto a mano con amore</span>
            <Heart className="w-3.5 h-3.5 text-[#C92A2A] fill-[#C92A2A]" />
            <span>nella tradizione di Napoli</span>
          </p>

          <div className="flex gap-4 text-stone-500 text-[11px]">
            <a href="#hero" className="hover:text-stone-300 transition-colors">
              Privacy Policy
            </a>
            <span>&bull;</span>
            <a href="#hero" className="hover:text-stone-300 transition-colors">
              Terms of Service
            </a>
            <span>&bull;</span>
            <a href="#menu" className="hover:text-stone-300 transition-colors">
              Allergen Guide
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
