"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, PizzaItem, SpecialOffer } from "@/types/pizza";

interface ToastInfo {
  id: string;
  message: string;
  type: "success" | "info" | "cart";
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    item: PizzaItem,
    customOptions?: {
      quantity?: number;
      size?: "12 inch" | "16 inch";
      crust?: "Classic Neapolitan" | "Gluten-Free (+ $3.00)" | "Stuffed Mozzarella Crust (+ $4.00)";
      extraToppings?: string[];
      spiceLevel?: "Mild" | "Medium" | "Hot Calabrian 🔥";
      notes?: string;
    }
  ) => void;
  addSpecialOfferToCart: (offer: SpecialOffer) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  orderType: "delivery" | "pickup";
  setOrderType: (type: "delivery" | "pickup") => void;
  promoCode: string;
  discountRate: number;
  promoMessage: string;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  taxAmount: number;
  total: number;
  totalItemsCount: number;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewPizza: PizzaItem | null;
  setQuickViewPizza: (pizza: PizzaItem | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;

  // Toast
  toasts: ToastInfo[];
  showToast: (message: string, type?: "success" | "info" | "cart") => void;
  dismissToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [promoCode, setPromoCode] = useState<string>("");
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>("");

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [quickViewPizza, setQuickViewPizza] = useState<PizzaItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Load from local storage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("forno_antico_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem("forno_antico_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const showToast = (
    message: string,
    type: "success" | "info" | "cart" = "cart"
  ) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      dismissToast(id);
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (
    item: PizzaItem,
    customOptions?: {
      quantity?: number;
      size?: "12 inch" | "16 inch";
      crust?: "Classic Neapolitan" | "Gluten-Free (+ $3.00)" | "Stuffed Mozzarella Crust (+ $4.00)";
      extraToppings?: string[];
      spiceLevel?: "Mild" | "Medium" | "Hot Calabrian 🔥";
      notes?: string;
    }
  ) => {
    const qty = customOptions?.quantity || 1;
    const size = customOptions?.size || "12 inch";
    const crust = customOptions?.crust || "Classic Neapolitan";
    const extraToppings = customOptions?.extraToppings || [];
    const spiceLevel = customOptions?.spiceLevel || "Mild";
    const notes = customOptions?.notes || "";

    // calculate unit price with customizations
    let unitPrice = item.price;
    if (size === "16 inch") unitPrice += 6.0;
    if (crust.includes("Gluten-Free")) unitPrice += 3.0;
    if (crust.includes("Stuffed Mozzarella")) unitPrice += 4.0;
    unitPrice += extraToppings.length * 2.5;

    // generate a stable key for identical options
    const optionsKey = `${item.id}-${size}-${crust}-${extraToppings.sort().join(",")}-${spiceLevel}-${notes}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((ci) => ci.id === optionsKey);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        const newItem: CartItem = {
          id: optionsKey,
          pizzaId: item.id,
          name: item.name,
          italianName: item.italianName,
          price: unitPrice,
          image: item.image,
          quantity: qty,
          size,
          crust,
          extraToppings,
          spiceLevel,
          notes,
        };
        return [...prevCart, newItem];
      }
    });

    showToast(`Added ${qty}x ${item.name} to your order!`, "cart");
  };

  const addSpecialOfferToCart = (offer: SpecialOffer) => {
    const specialItem: CartItem = {
      id: `offer-${offer.id}-${Date.now()}`,
      pizzaId: offer.id,
      name: offer.title,
      italianName: offer.italianSubtitle,
      price: offer.discountPrice,
      image: offer.image,
      quantity: 1,
      size: "16 inch",
      crust: "Classic Neapolitan",
      extraToppings: ["Combo Bundle Inclusions"],
      spiceLevel: "Medium",
      notes: offer.itemsIncluded.join(", "),
    };

    setCart((prev) => [...prev, specialItem]);
    showToast(`Special offer "${offer.title}" added to cart!`, "success");
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast("Item removed from your cart", "info");
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "BELLA20" || cleanCode === "FORNO20") {
      setPromoCode(cleanCode);
      setDiscountRate(0.2); // 20%
      setPromoMessage("20% Italian Heritage Discount Applied!");
      showToast("Coupon applied: 20% discount granted! 🍕", "success");
      return true;
    } else if (cleanCode === "LUNCH18") {
      setPromoCode(cleanCode);
      setDiscountRate(0.15); // 15%
      setPromoMessage("15% Lunch Special Applied!");
      showToast("Lunch discount 15% applied!", "success");
      return true;
    } else if (cleanCode === "DATENIGHT") {
      setPromoCode(cleanCode);
      setDiscountRate(0.15);
      setPromoMessage("15% Date Night Discount Applied!");
      showToast("Date Night discount applied!", "success");
      return true;
    } else {
      setPromoMessage("Invalid or expired coupon code.");
      showToast("Invalid promo code. Try FORNO20", "info");
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode("");
    setDiscountRate(0);
    setPromoMessage("");
    showToast("Promo code removed", "info");
  };

  // Calculations
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discountAmount = subtotal * discountRate;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const deliveryFee =
    orderType === "pickup" || subtotal === 0 || subtotal >= 40 ? 0 : 3.99;
  const taxAmount = taxableAmount * 0.0825; // 8.25% tax
  const total = taxableAmount + deliveryFee + taxAmount;
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addSpecialOfferToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        orderType,
        setOrderType,
        promoCode,
        discountRate,
        promoMessage,
        applyPromoCode,
        removePromoCode,
        subtotal,
        discountAmount,
        deliveryFee,
        taxAmount,
        total,
        totalItemsCount,
        isCartOpen,
        setIsCartOpen,
        quickViewPizza,
        setQuickViewPizza,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isReservationOpen,
        setIsReservationOpen,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
