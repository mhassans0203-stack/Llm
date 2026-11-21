"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { PIZZA_MENU } from "@/data/pizzaData";
import { PizzaItem } from "@/types/pizza";
import {
  Flame,
  Plus,
  SlidersHorizontal,
  Sparkles,
  Search,
  Check,
  Eye,
  ShoppingBag,
} from "lucide-react";

export const MenuSection: React.FC = () => {
  const { addToCart, setQuickViewPizza, setIsCartOpen } = useCart();

  const [activeCategory, setActiveCategory] = useState<
    "All" | "Classic" | "Special" | "Cheese" | "Spicy"
  >("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [spicyOnly, setSpicyOnly] = useState(false);

  const categories = ["All", "Classic", "Special", "Cheese", "Spicy"] as const;

  const filteredPizzas = useMemo(() => {
    return PIZZA_MENU.filter((pizza) => {
      // Category filter
      if (activeCategory !== "All" && pizza.category !== activeCategory) {
        return false;
      }
      // Dietary filters
      if (vegetarianOnly && !pizza.isVegetarian) return false;
      if (spicyOnly && !pizza.isSpicy) return false;
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = pizza.name.toLowerCase().includes(query);
        const matchItalian = pizza.italianName.toLowerCase().includes(query);
        const matchDesc = pizza.description.toLowerCase().includes(query);
        const matchIng = pizza.ingredients.some((ing) =>
          ing.toLowerCase().includes(query)
        );
        if (!matchName && !matchItalian && !matchDesc && !matchIng) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, vegetarianOnly, spicyOnly, searchQuery]);

  return (
    <section id="menu" className="py-24 sm:py-32 bg-[#0F0E0D] relative">
      {/* Background accents */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#C92A2A]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1D1B] border border-white/10 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-[#C92A2A] fill-[#C92A2A]" />
            <span>La Nostra Carta</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Artisanal Pizza Menu
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Every pizza is hand-stretched to order, dressed with certified
            Italian ingredients, and fired to charred blistered crust perfection
            in our 450°C wood oven.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-12 space-y-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider transition-all cursor-pointer relative ${
                    isActive
                      ? "text-white shadow-lg shadow-[#C92A2A]/30"
                      : "text-stone-400 hover:text-stone-200 bg-[#1A1816] hover:bg-[#24211F] border border-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-gradient-to-r from-[#C92A2A] to-[#B02525] rounded-full -z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {cat === "All" && "🍕 All Pizzas"}
                    {cat === "Classic" && "🇮🇹 Classic Tradition"}
                    {cat === "Special" && "✨ Chef's Special"}
                    {cat === "Cheese" && "🧀 Cheese Lovers"}
                    {cat === "Spicy" && "🌶️ Spicy & Fire"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search bar and dietary toggles */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-4xl mx-auto pt-2">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ingredients, truffle, burrata..."
                className="w-full bg-[#181614] border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C92A2A]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Dietary Filters */}
            <div className="flex items-center gap-2 self-center sm:self-auto">
              <button
                onClick={() => setVegetarianOnly(!vegetarianOnly)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  vegetarianOnly
                    ? "bg-emerald-950/60 border-emerald-500 text-emerald-300"
                    : "bg-[#181614] border-white/10 text-stone-400 hover:text-stone-300"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Vegetarian</span>
                {vegetarianOnly && <Check className="w-3 h-3" />}
              </button>

              <button
                onClick={() => setSpicyOnly(!spicyOnly)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  spicyOnly
                    ? "bg-red-950/60 border-red-500 text-red-300"
                    : "bg-[#181614] border-white/10 text-stone-400 hover:text-stone-300"
                }`}
              >
                <span>🌶️ Spicy Only</span>
                {spicyOnly && <Check className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Cards Grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredPizzas.map((pizza) => (
              <motion.div
                key={pizza.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group relative rounded-2xl bg-[#161413] border border-white/10 hover:border-[#C92A2A]/40 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#C92A2A]/10 transition-all flex flex-col"
              >
                {/* Pizza Image Frame */}
                <div
                  className="relative h-60 w-full overflow-hidden bg-[#1E1C1A] cursor-pointer"
                  onClick={() => setQuickViewPizza(pizza)}
                >
                  <Image
                    src={pizza.image}
                    alt={pizza.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161413] via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
                    {pizza.isBestseller && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#C92A2A] text-white shadow-md">
                        🔥 Bestseller
                      </span>
                    )}
                    {pizza.isChefSpecial && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-black shadow-md flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Chef&apos;s Pick
                      </span>
                    )}
                    {pizza.isSpicy && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-red-950/80 text-red-300 border border-red-500/40">
                        🌶️ Spicy
                      </span>
                    )}
                    {pizza.isVegetarian && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                        Vegetarian
                      </span>
                    )}
                  </div>

                  {/* Quick View Hover Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                    <span className="px-4 py-2 rounded-xl bg-white/90 text-stone-900 text-xs font-bold flex items-center gap-1.5 shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-all">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Customize & Details</span>
                    </span>
                  </div>

                  {/* Category tag bottom left */}
                  <div className="absolute bottom-2 left-3">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-md">
                      {pizza.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3
                          onClick={() => setQuickViewPizza(pizza)}
                          className="font-serif text-xl font-bold text-white group-hover:text-amber-200 transition-colors cursor-pointer"
                        >
                          {pizza.name}
                        </h3>
                        <p className="text-xs text-amber-500/90 italic font-serif mt-0.5">
                          {pizza.italianName}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-serif text-xl font-bold text-amber-400">
                          ${pizza.price.toFixed(2)}
                        </span>
                        {pizza.originalPrice && (
                          <span className="block text-[11px] text-stone-500 line-through">
                            ${pizza.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-stone-300 text-xs sm:text-sm mt-2.5 line-clamp-2 leading-relaxed">
                      {pizza.description}
                    </p>

                    {/* Ingredient tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {pizza.ingredients.slice(0, 3).map((ing, i) => (
                        <span
                          key={i}
                          className="text-[10px] text-stone-400 bg-[#211E1C] px-2 py-0.5 rounded border border-white/5"
                        >
                          {ing}
                        </span>
                      ))}
                      {pizza.ingredients.length > 3 && (
                        <span className="text-[10px] text-stone-500 self-center">
                          +{pizza.ingredients.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-white/5 flex items-center gap-2">
                    <button
                      onClick={() => setQuickViewPizza(pizza)}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#24211F] hover:bg-[#302B28] text-stone-300 hover:text-white text-xs font-semibold border border-white/5 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Customize</span>
                    </button>

                    <button
                      onClick={() => addToCart(pizza)}
                      className="py-2 px-4 rounded-xl bg-[#C92A2A] hover:bg-[#B02525] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
                      aria-label={`Add ${pizza.name} to cart`}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPizzas.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <p className="font-serif text-xl text-stone-400">
              No pizzas found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-xs text-stone-500">
              Try adjusting your dietary filters or search term.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
                setVegetarianOnly(false);
                setSpicyOnly(false);
              }}
              className="px-4 py-2 bg-[#252220] hover:bg-[#322E2B] text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
