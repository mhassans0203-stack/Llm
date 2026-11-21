"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  X,
  Plus,
  Minus,
  Sparkles,
  Flame,
  Clock,
  Check,
  ShoppingBag,
} from "lucide-react";

export const PizzaCustomizerModal: React.FC = () => {
  const { quickViewPizza, setQuickViewPizza, addToCart, setIsCartOpen } =
    useCart();

  const [size, setSize] = useState<"12 inch" | "16 inch">("12 inch");
  const [crust, setCrust] = useState<
    | "Classic Neapolitan"
    | "Gluten-Free (+ $3.00)"
    | "Stuffed Mozzarella Crust (+ $4.00)"
  >("Classic Neapolitan");
  const [spiceLevel, setSpiceLevel] = useState<
    "Mild" | "Medium" | "Hot Calabrian 🔥"
  >("Mild");
  const [extraToppings, setExtraToppings] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!quickViewPizza) return null;

  const availableExtras = [
    { name: "Extra Buffalo Mozzarella", price: 2.5 },
    { name: "Black Truffle Glaze", price: 2.5 },
    { name: "Calabrian Hot Honey", price: 2.5 },
    { name: "Shaved 24m Parmigiano", price: 2.5 },
    { name: "Spicy 'Nduja Dollops", price: 2.5 },
    { name: "Fresh Sweet Basil", price: 1.5 },
  ];

  const toggleTopping = (toppingName: string) => {
    setExtraToppings((prev) =>
      prev.includes(toppingName)
        ? prev.filter((t) => t !== toppingName)
        : [...prev, toppingName]
    );
  };

  // calculate price
  let calculatedPrice = quickViewPizza.price;
  if (size === "16 inch") calculatedPrice += 6.0;
  if (crust.includes("Gluten-Free")) calculatedPrice += 3.0;
  if (crust.includes("Stuffed Mozzarella")) calculatedPrice += 4.0;
  calculatedPrice += extraToppings.length * 2.5;
  const totalPrice = calculatedPrice * quantity;

  const handleAddToCart = () => {
    addToCart(quickViewPizza, {
      quantity,
      size,
      crust,
      extraToppings,
      spiceLevel,
      notes,
    });
    setQuickViewPizza(null);
    setIsCartOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewPizza(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-2xl bg-[#161413] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewPizza(null)}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Image Banner */}
          <div className="relative h-56 sm:h-64 w-full bg-[#1F1D1B] shrink-0">
            <Image
              src={quickViewPizza.image}
              alt={quickViewPizza.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 700px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161413] via-[#161413]/40 to-transparent" />

            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#C92A2A] text-white">
                  {quickViewPizza.category}
                </span>
                {quickViewPizza.isSpicy && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                    <Flame className="w-3 h-3" /> Spicy
                  </span>
                )}
                {quickViewPizza.isVegetarian && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Vegetarian
                  </span>
                )}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {quickViewPizza.name}
              </h3>
              <p className="text-sm text-amber-400/90 italic font-serif">
                {quickViewPizza.italianName}
              </p>
            </div>
          </div>

          {/* Scrollable Customization Content */}
          <div className="p-6 overflow-y-auto space-y-5 flex-1 text-sm text-[#F3ECE0]">
            {/* Description & Specs */}
            <div>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                {quickViewPizza.description}
              </p>

              <div className="flex items-center gap-4 mt-3 text-xs text-stone-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {quickViewPizza.prepTime || "90s wood-fired at 450°C"}
                </span>
                {quickViewPizza.calories && (
                  <span>🔥 {quickViewPizza.calories} kcal</span>
                )}
              </div>
            </div>

            {/* Ingredients Tags */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                Featured Ingredients
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {quickViewPizza.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-xs bg-[#24211F] border border-white/5 text-stone-300"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                Select Pizza Size
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSize("12 inch")}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    size === "12 inch"
                      ? "bg-[#C92A2A]/15 border-[#C92A2A] text-white"
                      : "bg-[#1F1D1B] border-white/10 text-stone-300 hover:border-white/20"
                  }`}
                >
                  <p className="font-bold text-sm">12&quot; Classic Individual</p>
                  <p className="text-xs text-stone-400">6 Slices • Ideal for 1-2</p>
                  <p className="text-xs font-semibold text-amber-400 mt-1">
                    ${quickViewPizza.price.toFixed(2)}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSize("16 inch")}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    size === "16 inch"
                      ? "bg-[#C92A2A]/15 border-[#C92A2A] text-white"
                      : "bg-[#1F1D1B] border-white/10 text-stone-300 hover:border-white/20"
                  }`}
                >
                  <p className="font-bold text-sm">16&quot; Large Feast</p>
                  <p className="text-xs text-stone-400">8 Slices • Ideal for 3-4</p>
                  <p className="text-xs font-semibold text-amber-400 mt-1">
                    + $6.00 (${(quickViewPizza.price + 6).toFixed(2)})
                  </p>
                </button>
              </div>
            </div>

            {/* Crust Type */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                Hand-Stretched Crust Style
              </h4>
              <div className="space-y-2">
                {[
                  {
                    id: "Classic Neapolitan",
                    title: "Traditional Neapolitan (48h Sourdough Ferment)",
                    desc: "Airy blistered cornicione, soft and smoky",
                    add: "Included",
                  },
                  {
                    id: "Gluten-Free (+ $3.00)",
                    title: "Artisanal Gluten-Free Cauliflower & Cassava",
                    desc: "Crispy thin crust prepared in dedicated zone",
                    add: "+ $3.00",
                  },
                  {
                    id: "Stuffed Mozzarella Crust (+ $4.00)",
                    title: "Stuffed Buffalo Mozzarella & Ricotta Crust",
                    desc: "Ring filled with melting mozzarella & fresh herbs",
                    add: "+ $4.00",
                  },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() =>
                      setCrust(
                        c.id as
                          | "Classic Neapolitan"
                          | "Gluten-Free (+ $3.00)"
                          | "Stuffed Mozzarella Crust (+ $4.00)"
                      )
                    }
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                      crust === c.id
                        ? "bg-[#C92A2A]/15 border-[#C92A2A] text-white"
                        : "bg-[#1F1D1B] border-white/10 text-stone-300 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">{c.title}</p>
                      <p className="text-[11px] text-stone-400">{c.desc}</p>
                    </div>
                    <span className="text-xs font-semibold text-amber-400 shrink-0 ml-2">
                      {c.add}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Spice Level */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                Heat / Spice Preference
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {(["Mild", "Medium", "Hot Calabrian 🔥"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSpiceLevel(lvl)}
                    className={`py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      spiceLevel === lvl
                        ? "bg-[#C92A2A] border-[#C92A2A] text-white"
                        : "bg-[#1F1D1B] border-white/10 text-stone-400 hover:text-white"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Extra Toppings */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                Add Premium Artisanal Toppings (+ $2.50 ea)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availableExtras.map((extra) => {
                  const isChecked = extraToppings.includes(extra.name);
                  return (
                    <button
                      key={extra.name}
                      type="button"
                      onClick={() => toggleTopping(extra.name)}
                      className={`p-2 rounded-lg border text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? "bg-amber-500/15 border-amber-500/50 text-amber-200"
                          : "bg-[#1F1D1B] border-white/10 text-stone-300 hover:border-white/20"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                            isChecked
                              ? "bg-amber-500 text-black font-bold"
                              : "border border-stone-500"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        {extra.name}
                      </span>
                      <span className="text-stone-400 font-mono text-[11px]">
                        +${extra.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                Special Kitchen Note
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., Well-done crust, slice in 8, extra crispy..."
                className="w-full bg-[#1F1D1B] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C92A2A]"
              />
            </div>
          </div>

          {/* Sticky Bottom Bar */}
          <div className="p-4 bg-[#1A1816] border-t border-white/10 flex items-center justify-between gap-4">
            {/* Quantity */}
            <div className="flex items-center gap-2 bg-[#252220] p-1.5 rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-[#302B28] hover:bg-[#3D3734] flex items-center justify-center text-stone-300 transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-sm text-white px-2">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-[#302B28] hover:bg-[#3D3734] flex items-center justify-center text-stone-300 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to order button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 px-5 bg-gradient-to-r from-[#C92A2A] to-[#B02525] hover:from-[#B02525] hover:to-[#8F1D1D] text-white font-bold rounded-xl transition-all shadow-xl flex items-center justify-between cursor-pointer group"
            >
              <span className="flex items-center gap-2 text-xs sm:text-sm">
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Artisanal Order</span>
              </span>
              <span className="font-serif text-amber-300 font-bold text-sm sm:text-base">
                ${totalPrice.toFixed(2)}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
