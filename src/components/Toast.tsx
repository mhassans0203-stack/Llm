"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, ShoppingBag, Info, X } from "lucide-react";

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast, setIsCartOpen } = useCart();

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-xl bg-[#1A1816]/95 border-white/10 text-cream-100"
            style={{
              boxShadow: "0 10px 35px -5px rgba(0, 0, 0, 0.7), 0 0 15px -3px rgba(201, 42, 42, 0.25)",
            }}
          >
            <div className="flex items-center gap-3">
              {toast.type === "cart" && (
                <div className="w-8 h-8 rounded-full bg-[#C92A2A]/20 border border-[#C92A2A]/40 flex items-center justify-center text-[#FF6B6B] shrink-0">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              )}
              {toast.type === "success" && (
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              {toast.type === "info" && (
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Info className="w-4 h-4" />
                </div>
              )}
              <p className="text-sm font-medium text-stone-200 leading-snug">
                {toast.message}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {toast.type === "cart" && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="text-xs font-semibold px-2 py-1 bg-[#C92A2A] hover:bg-[#B02525] text-white rounded-md transition-colors"
                >
                  View Cart
                </button>
              )}
              <button
                onClick={() => dismissToast(toast.id)}
                className="text-stone-400 hover:text-white transition-colors p-1"
                aria-label="Dismiss toast"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
