"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import confetti from "canvas-confetti";
import {
  X,
  CheckCircle2,
  Bike,
  CreditCard,
  Banknote,
  Flame,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    total,
    orderType,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    fullName: "Marco Rossi",
    email: "marco.rossi@example.com",
    phone: "+1 (555) 349-2819",
    address: "742 Evergreen Terrace, Suite 4B",
    deliveryNotes: "Ring bell #4, leave at door with care.",
    paymentMethod: "card" as "card" | "applepay" | "cash",
    cardNumber: "•••• •••• •••• 4829",
    cardExp: "08/28",
    cardCvc: "742",
    tipPercentage: 18,
  });

  const [orderNumber, setOrderNumber] = useState<string>("");
  const [cookingStage, setCookingStage] = useState<number>(1);

  // Trigger celebration when reaching step 3
  useEffect(() => {
    if (step === 3) {
      setOrderNumber(
        "FA-" + Math.floor(100000 + Math.random() * 900000).toString()
      );
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#C92A2A", "#F59E0B", "#FDFBF7", "#2E6F40"],
        });
      } catch {
        // ignore
      }

      // Simulate cooking stages
      const t1 = setTimeout(() => setCookingStage(2), 2500);
      const t2 = setTimeout(() => setCookingStage(3), 5500);
      const t3 = setTimeout(() => setCookingStage(4), 9000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [step]);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      clearCart();
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    if (step === 3) {
      setStep(1);
      setCookingStage(1);
    }
  };

  const tipAmount = (total * formData.tipPercentage) / 100;
  const finalPayTotal = total + tipAmount;

  if (!isCheckoutOpen) return null;

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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          className="relative w-full max-w-xl bg-[#161413] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 border-b border-white/10 bg-[#1A1816] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C92A2A]/20 border border-[#C92A2A]/40 flex items-center justify-center text-[#FF6B6B]">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">
                  {step === 3
                    ? "Order Confirmed!"
                    : step === 2
                    ? "Payment & Tip"
                    : "Delivery Information"}
                </h3>
                <p className="text-xs text-stone-400">
                  {step === 3
                    ? "Your pizza is being prepared in our 450°C wood oven"
                    : `Step ${step} of 2 • Total: $${finalPayTotal.toFixed(2)}`}
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stepper Indicator */}
          {step < 3 && (
            <div className="grid grid-cols-2 bg-[#121110] border-b border-white/5 text-xs text-stone-400">
              <div
                className={`py-2 text-center font-medium border-b-2 transition-colors ${
                  step === 1
                    ? "border-[#C92A2A] text-white bg-white/[0.02]"
                    : "border-transparent text-emerald-400"
                }`}
              >
                1. Delivery Details
              </div>
              <div
                className={`py-2 text-center font-medium border-b-2 transition-colors ${
                  step === 2
                    ? "border-[#C92A2A] text-white bg-white/[0.02]"
                    : "border-transparent"
                }`}
              >
                2. Review & Payment
              </div>
            </div>
          )}

          {/* Content Body */}
          <div className="p-6 overflow-y-auto flex-1">
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full bg-[#1F1D1B] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C92A2A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-[#1F1D1B] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C92A2A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Email Address (for live tracker link) *
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-[#1F1D1B] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C92A2A]"
                  />
                </div>

                {orderType === "delivery" && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                        Street Address & Apt/Suite *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="w-full bg-[#1F1D1B] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C92A2A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                        Delivery Instructions (optional)
                      </label>
                      <input
                        type="text"
                        value={formData.deliveryNotes}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            deliveryNotes: e.target.value,
                          })
                        }
                        placeholder="Gate code, drop at door, etc."
                        className="w-full bg-[#1F1D1B] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C92A2A]"
                      />
                    </div>
                  </>
                )}

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#C92A2A] hover:bg-[#B02525] text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleNextStep} className="space-y-4">
                {/* Payment Selection */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, paymentMethod: "card" })
                      }
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-medium cursor-pointer ${
                        formData.paymentMethod === "card"
                          ? "bg-[#C92A2A]/15 border-[#C92A2A] text-white"
                          : "bg-[#1C1A18] border-white/10 text-stone-400 hover:text-white"
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-[#FF6B6B]" />
                      <span>Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, paymentMethod: "applepay" })
                      }
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-medium cursor-pointer ${
                        formData.paymentMethod === "applepay"
                          ? "bg-[#C92A2A]/15 border-[#C92A2A] text-white"
                          : "bg-[#1C1A18] border-white/10 text-stone-400 hover:text-white"
                      }`}
                    >
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      <span>Apple Pay</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, paymentMethod: "cash" })
                      }
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-medium cursor-pointer ${
                        formData.paymentMethod === "cash"
                          ? "bg-[#C92A2A]/15 border-[#C92A2A] text-white"
                          : "bg-[#1C1A18] border-white/10 text-stone-400 hover:text-white"
                      }`}
                    >
                      <Banknote className="w-5 h-5 text-emerald-400" />
                      <span>Cash on Delivery</span>
                    </button>
                  </div>
                </div>

                {/* Card Fields Preview */}
                {formData.paymentMethod === "card" && (
                  <div className="p-3.5 bg-[#1F1D1B] rounded-xl border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-400">
                      <span>Card Details</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      readOnly
                      className="w-full bg-[#121110] border border-white/10 rounded-lg px-3 py-2 text-sm text-stone-300 font-mono"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={formData.cardExp}
                        readOnly
                        className="bg-[#121110] border border-white/10 rounded-lg px-3 py-2 text-xs text-stone-300 text-center font-mono"
                      />
                      <input
                        type="text"
                        value={formData.cardCvc}
                        readOnly
                        className="bg-[#121110] border border-white/10 rounded-lg px-3 py-2 text-xs text-stone-300 text-center font-mono"
                      />
                    </div>
                  </div>
                )}

                {/* Driver Tip */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-stone-300">
                      Pizzaiolo & Driver Tip
                    </label>
                    <span className="text-xs text-amber-400 font-medium">
                      +${tipAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 15, 18, 20].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, tipPercentage: t })
                        }
                        className={`py-2 rounded-lg text-xs font-semibold transition-all border ${
                          formData.tipPercentage === t
                            ? "bg-[#C92A2A] border-[#C92A2A] text-white"
                            : "bg-[#1F1D1B] border-white/10 text-stone-400 hover:text-white"
                        }`}
                      >
                        {t}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary Box */}
                <div className="p-3 bg-[#121110] rounded-xl border border-white/5 space-y-1 text-xs">
                  <div className="flex justify-between text-stone-400">
                    <span>Order Subtotal + Taxes</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Tip ({formData.tipPercentage}%)</span>
                    <span>${tipAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-sm pt-1 border-t border-white/10">
                    <span>Final Amount</span>
                    <span className="text-amber-400">
                      ${finalPayTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3 bg-[#2A2624] hover:bg-[#383330] text-stone-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 bg-gradient-to-r from-[#C92A2A] to-[#B02525] hover:from-[#B02525] hover:to-[#8F1D1D] text-white font-bold rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Place Order (${finalPayTotal.toFixed(2)})</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center py-2">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold tracking-wider uppercase mb-2">
                    Order #{orderNumber}
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-white">
                    Grazie Mille, {formData.fullName.split(" ")[0]}!
                  </h4>
                  <p className="text-xs text-stone-300 mt-1 max-w-sm mx-auto">
                    Your authentic Neapolitan pizza is in the hands of Master Pizzaiolo
                    Marco. Estimated delivery time:{" "}
                    <strong className="text-amber-400">24-32 minutes</strong>.
                  </p>
                </div>

                {/* Animated Cooking Tracker */}
                <div className="p-4 bg-[#1C1A18] rounded-xl border border-white/10 text-left space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-400" /> Live Kitchen Tracker
                    </span>
                    <span className="text-emerald-400 font-semibold animate-pulse">
                      ● Active Now
                    </span>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        stage: 1,
                        title: "Order Received & Verified",
                        desc: "Ticket sent directly to the oven station",
                        icon: CheckCircle2,
                      },
                      {
                        stage: 2,
                        title: "48h Sourdough Hand-Tossed",
                        desc: "San Marzano D.O.P. & Buffalo Mozzarella layered",
                        icon: Flame,
                      },
                      {
                        stage: 3,
                        title: "Baking at 450°C in Wood Oven",
                        desc: "Volcanic stone blistering the cornicione crust",
                        icon: Sparkles,
                      },
                      {
                        stage: 4,
                        title: "Insulated Thermal Delivery En Route",
                        desc: "Driver heading to your address at peak heat",
                        icon: Bike,
                      },
                    ].map((st) => {
                      const isCompleted = cookingStage > st.stage;
                      const isCurrent = cookingStage === st.stage;
                      const Icon = st.icon;

                      return (
                        <div key={st.stage} className="flex items-center gap-3">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs transition-colors ${
                              isCompleted
                                ? "bg-emerald-500 text-black font-bold"
                                : isCurrent
                                ? "bg-[#C92A2A] text-white animate-pulse"
                                : "bg-[#252220] text-stone-500"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p
                              className={`text-xs font-semibold leading-tight ${
                                isCompleted || isCurrent
                                  ? "text-white"
                                  : "text-stone-500"
                              }`}
                            >
                              {st.title}
                            </p>
                            <p className="text-[11px] text-stone-400 truncate">
                              {st.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-[#C92A2A] hover:bg-[#B02525] text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
