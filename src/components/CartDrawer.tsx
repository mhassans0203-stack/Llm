"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  CheckCircle2,
  Bike,
  Store,
  Sparkles,
} from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    orderType,
    setOrderType,
    subtotal,
    discountRate,
    discountAmount,
    deliveryFee,
    taxAmount,
    total,
    promoCode,
    promoMessage,
    applyPromoCode,
    removePromoCode,
    setIsCheckoutOpen,
  } = useCart();

  const [inputCode, setInputCode] = useState("");
  const [promoError, setPromoError] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const success = applyPromoCode(inputCode);
    if (!success) {
      setPromoError(true);
      setTimeout(() => setPromoError(false), 3000);
    } else {
      setInputCode("");
      setPromoError(false);
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const freeDeliveryThreshold = 40.0;
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryPercent = Math.min(
    100,
    Math.round((subtotal / freeDeliveryThreshold) * 100)
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#161413] border-l border-white/10 flex flex-col shadow-2xl text-[#F3ECE0]"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#1A1816]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C92A2A]/20 border border-[#C92A2A]/40 flex items-center justify-center text-[#FF6B6B]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                    Artisanal Cart
                  </h3>
                  <p className="text-xs text-stone-400">
                    {cart.length === 0
                      ? "Cart is empty"
                      : `${cart.reduce((a, b) => a + b.quantity, 0)} items selected`}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-stone-400 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Order Type Selector */}
            <div className="p-4 bg-[#141211] border-b border-white/5">
              <div className="grid grid-cols-2 p-1 bg-[#1F1D1B] rounded-xl border border-white/5">
                <button
                  onClick={() => setOrderType("delivery")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    orderType === "delivery"
                      ? "bg-[#C92A2A] text-white shadow-md"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  <Bike className="w-4 h-4" />
                  <span>Delivery (25-35m)</span>
                </button>
                <button
                  onClick={() => setOrderType("pickup")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    orderType === "pickup"
                      ? "bg-[#C92A2A] text-white shadow-md"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <span>Pickup (15m)</span>
                </button>
              </div>

              {/* Free Delivery Bar (Delivery only) */}
              {orderType === "delivery" && cart.length > 0 && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    {amountToFreeDelivery > 0 ? (
                      <span className="text-stone-300">
                        Add{" "}
                        <strong className="text-amber-400">
                          ${amountToFreeDelivery.toFixed(2)}
                        </strong>{" "}
                        more for <strong className="text-white">FREE Delivery</strong>
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> FREE Delivery Unlocked!
                      </span>
                    )}
                    <span className="text-stone-400 text-[11px]">
                      {freeDeliveryPercent}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#252220] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-[#C92A2A] transition-all duration-300 rounded-full"
                      style={{ width: `${freeDeliveryPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-[#1F1D1B] border border-white/10 flex items-center justify-center text-stone-500">
                    <ShoppingBag className="w-9 h-9" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white mb-1">
                      Your Cart is Quiet
                    </h4>
                    <p className="text-xs text-stone-400 max-w-xs">
                      Our wood-fired oven is heated to 450°C. Select from our
                      traditional Neapolitan pizzas and artisanal combos to get started!
                    </p>
                  </div>
                  <a
                    href="#menu"
                    onClick={() => setIsCartOpen(false)}
                    className="px-5 py-2.5 bg-[#C92A2A] hover:bg-[#B02525] text-white text-xs font-semibold rounded-lg tracking-wider uppercase transition-all shadow-lg"
                  >
                    Explore Menu
                  </a>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-[#1C1A18] border border-white/5 hover:border-white/10 transition-colors flex gap-3"
                  >
                    <div className="relative w-18 h-18 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-[#252220]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-serif font-bold text-sm text-white truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-amber-500/90 italic truncate">
                            {item.italianName}
                          </p>
                        </div>
                        <span className="font-bold text-amber-400 text-sm shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Options summary */}
                      <div className="text-[11px] text-stone-400 mt-1 space-y-0.5">
                        <p>
                          <span className="text-stone-300">{item.size}</span> •{" "}
                          <span>{item.crust}</span>
                        </p>
                        {item.extraToppings && item.extraToppings.length > 0 && (
                          <p className="truncate text-stone-400">
                            + {item.extraToppings.join(", ")}
                          </p>
                        )}
                        {item.notes && (
                          <p className="italic text-stone-500 truncate">
                            &quot;{item.notes}&quot;
                          </p>
                        )}
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/5">
                        <span className="text-xs text-stone-400">
                          ${item.price.toFixed(2)} each
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-6 h-6 rounded bg-[#2A2624] hover:bg-[#383330] flex items-center justify-center text-stone-300 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            {item.quantity === 1 ? (
                              <Trash2 className="w-3 h-3 text-[#FF6B6B]" />
                            ) : (
                              <Minus className="w-3 h-3" />
                            )}
                          </button>
                          <span className="text-xs font-bold text-white px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-6 h-6 rounded bg-[#2A2624] hover:bg-[#383330] flex items-center justify-center text-stone-300 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-4 bg-[#181614] border-t border-white/10 space-y-3">
                {/* Promo Code Form */}
                {discountRate === 0 ? (
                  <div>
                    <form
                      onSubmit={handleApplyPromo}
                      className="flex gap-2 items-center"
                    >
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="text"
                          value={inputCode}
                          onChange={(e) => setInputCode(e.target.value)}
                          placeholder="Promo code (e.g. FORNO20)"
                          className="w-full bg-[#121110] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C92A2A]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-[#2A2624] hover:bg-[#383330] text-white text-xs font-semibold rounded-lg transition-colors shrink-0"
                      >
                        Apply
                      </button>
                    </form>
                    {promoError && (
                      <p className="text-[11px] text-[#FF6B6B] mt-1 pl-1">
                        Invalid code. Try &ldquo;FORNO20&rdquo; for 20% off!
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        <strong>{promoCode}</strong>: {promoMessage}
                      </span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-stone-400 hover:text-white text-[11px] underline ml-2"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs text-stone-300 pt-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {discountRate > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount ({(discountRate * 100).toFixed(0)}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>
                      {orderType === "delivery" ? "Delivery Fee" : "Pickup"}
                    </span>
                    <span>
                      {orderType === "pickup"
                        ? "FREE"
                        : deliveryFee === 0
                        ? "FREE (Over $40)"
                        : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Taxes & Fees (8.25%)</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                    <span className="font-serif">Estimated Total</span>
                    <span className="text-amber-400 font-sans">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#C92A2A] to-[#B02525] hover:from-[#B02525] hover:to-[#8F1D1D] text-white font-bold text-sm rounded-xl tracking-wide transition-all shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
