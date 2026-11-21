"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Bot,
  User,
  ShoppingBag,
  Calendar,
  UtensilsCrossed,
  ChefHat,
  Flame,
  Check,
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
  model?: string;
  actions?: Array<{ label: string; action: () => void }>;
}

export const ChatbotWidget: React.FC = () => {
  const { applyPromoCode, setIsReservationOpen, setIsCartOpen, showToast } =
    useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content:
        "Benvenuto a Forno Antico! 🍕 It is an absolute pleasure to welcome you. I am Gianni, your Italian AI Concierge powered by Gemini 3.8 Flash. How may I be of gracious service to you today?",
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    { label: "🍕 Top Recommendations", query: "What are your most popular pizzas?" },
    { label: "🏷️ Promo Codes & Deals", query: "Do you have any discount codes or combo deals?" },
    { label: "🌾 Gluten-Free Options", query: "What gluten-free and vegetarian options do you have?" },
    { label: "🛵 Delivery & Hours", query: "What are your opening hours and delivery fees?" },
    { label: "🍷 Reserve a Table", query: "How do I book a table for dinner?" },
  ];

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = {
      id: "usr-" + Date.now(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: "asst-" + Date.now(),
        role: "assistant",
        content: data.reply || "Grazie! How else may I assist your dining experience?",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        model: data.model,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          role: "assistant",
          content:
            "Benvenuto! I apologize sincerely for the brief delay. It would be my greatest pleasure to assist you with our menu, apply promo code FORNO20 for 20% off, or help you book a table. How may I be of gracious service?",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content:
          "Benvenuto! It is my sincere pleasure to assist you again. Please feel free to ask about our 48-hour fermented sourdough pizzas, exclusive savings, or reserving an evening with us.",
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 pl-4 pr-5 py-3 rounded-full bg-gradient-to-r from-[#C92A2A] via-[#B02525] to-[#8F1D1D] text-white shadow-2xl border border-white/20 hover:border-amber-400/50 transition-all cursor-pointer"
            style={{
              boxShadow:
                "0 15px 35px -5px rgba(201, 42, 42, 0.5), 0 0 20px 2px rgba(245, 158, 11, 0.3)",
            }}
            aria-label="Open AI Italian Concierge"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold">
                <ChefHat className="w-4 h-4" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#C92A2A] animate-pulse" />
            </div>

            <div className="text-left">
              <p className="text-xs font-bold leading-tight flex items-center gap-1.5">
                <span>Ask Gianni</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-300 text-[9px] uppercase tracking-wider font-extrabold border border-amber-400/40">
                  AI
                </span>
              </p>
              <p className="text-[10px] text-stone-300">
                Neapolitan Concierge
              </p>
            </div>
          </motion.button>
        )}
      </div>

      {/* Expandable Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[95vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#161413] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-200"
            style={{
              boxShadow:
                "0 25px 60px -10px rgba(0, 0, 0, 0.95), 0 0 30px rgba(201, 42, 42, 0.25)",
            }}
          >
            {/* Header */}
            <div className="p-4 bg-[#1C1A18] border-b border-white/10 flex items-center justify-between relative">
              {/* Italian flag accent strip */}
              <div className="absolute top-0 left-0 right-0 h-1 flex">
                <div className="w-1/3 bg-[#2E6F40]" />
                <div className="w-1/3 bg-white" />
                <div className="w-1/3 bg-[#C92A2A]" />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C92A2A] to-amber-500 p-0.5 shadow-md">
                    <div className="w-full h-full rounded-full bg-[#161413] flex items-center justify-center text-amber-300">
                      <ChefHat className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#1C1A18]" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-white text-base">
                      Gianni
                    </h3>
                    <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                      Concierge
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Gemini 3.8 Flash • Online</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 pt-1">
                <button
                  onClick={handleClearChat}
                  title="Clear conversation"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-[#252220] border border-white/10 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl p-3.5 space-y-1.5 shadow-md leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[#C92A2A] to-[#B02525] text-white rounded-tr-none"
                        : "bg-[#1E1C1A] border border-white/10 text-stone-200 rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line text-xs sm:text-sm">
                      {msg.content}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1">
                      <span>{msg.timestamp}</span>
                      {msg.model && (
                        <span className="font-mono text-[9px] text-amber-500/80">
                          {msg.model.replace("models/", "")}
                        </span>
                      )}
                    </div>

                    {/* Quick Smart Actions inside AI responses */}
                    {msg.role === "assistant" && (
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                        {msg.content.includes("FORNO20") && (
                          <button
                            onClick={() => {
                              applyPromoCode("FORNO20");
                              setIsCartOpen(true);
                              showToast("Promo FORNO20 applied to cart!", "success");
                            }}
                            className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Apply FORNO20 (20% Off)</span>
                          </button>
                        )}
                        {(msg.content.includes("reserve") ||
                          msg.content.includes("table") ||
                          msg.content.includes("Book a Table")) && (
                          <button
                            onClick={() => setIsReservationOpen(true)}
                            className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#C92A2A]/30 hover:bg-[#C92A2A]/50 text-white border border-[#C92A2A]/50 flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Calendar className="w-3 h-3 text-amber-300" />
                            <span>Book a Table Now</span>
                          </button>
                        )}
                        {msg.content.includes("Margherita") && (
                          <a
                            href="#menu"
                            onClick={() => setIsOpen(false)}
                            className="text-[10px] font-bold px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 flex items-center gap-1 transition-colors"
                          >
                            <UtensilsCrossed className="w-3 h-3 text-[#C92A2A]" />
                            <span>Jump to Menu</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-[#C92A2A] flex items-center justify-center text-white shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing loader */}
              {loading && (
                <div className="flex gap-2.5 items-center text-stone-400 text-xs">
                  <div className="w-7 h-7 rounded-full bg-[#252220] border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
                    <Bot className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="p-3 rounded-2xl bg-[#1E1C1A] border border-white/10 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C92A2A] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[11px] text-stone-400 ml-1.5">
                      Gianni is thinking...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Starters Carousel */}
            <div className="px-3 py-2 bg-[#141211] border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((p, i) => (
                <button
                  key={i}
                  disabled={loading}
                  onClick={() => handleSend(p.query)}
                  className="px-2.5 py-1 rounded-full bg-[#1F1D1B] hover:bg-[#2A2724] border border-white/10 text-[11px] text-stone-300 hover:text-white whitespace-nowrap transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#1C1A18] border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Gianni about pizzas, dough, deals..."
                  className="flex-1 bg-[#141211] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C92A2A] transition-colors"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 rounded-xl bg-[#C92A2A] hover:bg-[#B02525] disabled:bg-stone-800 disabled:text-stone-600 text-white flex items-center justify-center transition-all shadow-md shrink-0 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[10px] text-stone-500 text-center mt-1.5">
                Forno Antico AI Concierge • Powered by Gemini 3.8 Flash
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
