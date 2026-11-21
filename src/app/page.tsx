"use client";

import React from "react";
import { AssistantDemo } from "@/components/AssistantDemo";
import { Flame, Pizza, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0F0E0D] text-[#F3ECE0] flex flex-col justify-between">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[#161413]/95 backdrop-blur-md border-b border-white/10 px-4 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C92A2A] to-amber-600 flex items-center justify-center text-xl shadow-lg shadow-[#C92A2A]/30">
              🍕
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-extrabold text-base sm:text-lg text-white tracking-wide">
                  Cheesy Crust Pizza
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-400 text-black font-extrabold uppercase">
                  Option 1
                </span>
              </div>
              <p className="text-[11px] text-amber-400 font-medium">
                Customer Assistant &bull; System Prompt &amp; Guardrails Demo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Gemini 3.8 Flash Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Cheesy Crust Pizza Customer Assistant */}
      <main className="flex-1">
        <AssistantDemo />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0A0908] py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-stone-400">
            Cheesy Crust Pizza Customer Assistant &bull; Next.js &amp; Google Gemini 3.8 Flash
          </p>
          <p className="text-[11px]">
            Demonstrating User Prompt vs. System Prompt (Role + Store Info + Guardrails)
          </p>
        </div>
      </footer>
    </div>
  );
}
