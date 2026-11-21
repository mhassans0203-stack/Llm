"use client";

import React, { useState, useRef, useEffect } from "react";
import { ASSISTANT_TOPICS, AssistantTopic } from "@/data/assistantTopics";
import {
  Send,
  RotateCcw,
  ShieldCheck,
  Store,
  User,
  Sparkles,
  Bot,
  Info,
  CheckCircle2,
  AlertTriangle,
  Code2,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Flame,
  Check,
  Copy,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  model?: string;
  isGuardrailTriggered?: boolean;
}

export const AssistantDemo: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>("pizza");
  const topic: AssistantTopic =
    ASSISTANT_TOPICS[selectedTopicId] || ASSISTANT_TOPICS.pizza;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      role: "assistant",
      content:
        "Welcome to Cheesy Crust Pizza! 🍕 I'm your cheerful, helpful order assistant. We have Large Pepperoni for $15, Medium Veggie for $12, and Garlic Bread for $5. Delivery is 30–45 mins. What can I get started for you today?",
      timestamp: "Just now",
      model: "gemini-3.8-flash",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRawSystemPrompt, setShowRawSystemPrompt] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // When changing topics, reset with that topic's initial greeting
  const handleTopicChange = (newTopicId: string) => {
    setSelectedTopicId(newTopicId);
    const newTopic = ASSISTANT_TOPICS[newTopicId];
    let greeting = "";
    if (newTopicId === "pizza") {
      greeting =
        "Welcome to Cheesy Crust Pizza! 🍕 I'm your cheerful, helpful order assistant. We have Large Pepperoni for $15, Medium Veggie for $12, and Garlic Bread for $5. Delivery takes 30–45 mins. What can I get for you today?";
    } else if (newTopicId === "sneaker") {
      greeting =
        "Welcome to KicksLab! 👟 I'm your trendy, polite footwear specialist. We offer Running Shoes ($80) and High-Tops ($110), with a 7-day return policy and $5 flat rate shipping. What can I help you find today?";
    } else {
      greeting =
        "Welcome to Daily Brew! ☕ I'm your friendly coffee barista. I highly recommend our specialty Caramel Cold Brew ($5.00)! We also have Iced Lattes ($4.50) and Blueberry Muffins ($3.50). We are open 7 AM – 9 PM daily. What can I get brewing for you?";
    }

    setMessages([
      {
        id: "init-" + Date.now(),
        role: "assistant",
        content: greeting,
        timestamp: "Just now",
        model: "gemini-3.8-flash",
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: "user-" + Date.now(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: selectedTopicId,
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      const assistantMsg: Message = {
        id: "asst-" + Date.now(),
        role: "assistant",
        content:
          data.reply ||
          "I am here to help you with Cheesy Crust Pizza food and delivery questions!",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        model: data.model || "gemini-3.8-flash",
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          role: "assistant",
          content:
            "I'm here to help with Cheesy Crust Pizza food and delivery! Large Pepperoni is $15, Medium Veggie is $12, and Garlic Bread is $5.",
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

  const handleResetChat = () => {
    handleTopicChange(selectedTopicId);
  };

  const handleCopySystemPrompt = () => {
    navigator.clipboard?.writeText(topic.systemPromptTemplate);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Educational Goal Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Next.js Customer Assistant Chatbot</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          System Prompt vs. User Prompt
        </h1>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          Demonstrating how <strong className="text-amber-400">System Prompts</strong> (Persona, Store Info, and Guardrails) control the AI&apos;s behavior to answer accurately and reject off-topic or forbidden requests.
        </p>

        {/* Topic Selector Tabs (Option 1 default) */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          {Object.values(ASSISTANT_TOPICS).map((t) => {
            const isSelected = selectedTopicId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleTopicChange(t.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-[#C92A2A] text-white shadow-lg shadow-[#C92A2A]/40 scale-105"
                    : "bg-[#1C1A18] text-stone-400 hover:text-white border border-white/10 hover:border-white/20"
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.businessName}</span>
                {t.id === "pizza" && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-400 text-black font-extrabold uppercase ml-1">
                    Option 1
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Split: System Prompt Inspector (Left) & Live Chat (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ========================================================= */}
        {/* LEFT COLUMN: System Prompt Inspector (5 cols)             */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#161413] border border-white/10 shadow-2xl space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-white">
                    System Prompt
                  </h3>
                  <p className="text-[11px] text-amber-400 font-medium">
                    Hidden instructions given to the AI
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono text-stone-400 bg-black/40 px-2 py-1 rounded border border-white/5">
                Role + Info + Guardrails
              </span>
            </div>

            {/* Pillar 1: Role & Persona */}
            <div className="p-4 rounded-2xl bg-[#1C1A18] border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="text-base">🎭</span>
                <span>1. Role &amp; Persona</span>
              </div>
              <p className="text-xs text-stone-300 pl-6 leading-relaxed">
                {topic.role}
              </p>
            </div>

            {/* Pillar 2: Store Info & Menu */}
            <div className="p-4 rounded-2xl bg-[#1C1A18] border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="text-base">📋</span>
                <span>2. Store Info &amp; Menu</span>
              </div>
              <div className="pl-6 space-y-1.5">
                <div className="grid grid-cols-1 gap-1 text-xs">
                  {topic.storeInfo.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 rounded-lg bg-black/30 text-stone-200 border border-white/5"
                    >
                      <span className="font-semibold">{item.name}</span>
                      <span className="text-amber-400 font-bold">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
                {topic.storeInfo.extraInfo.map((info, idx) => (
                  <p key={idx} className="text-[11px] text-stone-400 font-medium">
                    &bull; {info}
                  </p>
                ))}
              </div>
            </div>

            {/* Pillar 3: Strict Guardrails */}
            <div className="p-4 rounded-2xl bg-[#201414] border border-red-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-red-300">
                <span className="text-base">🛡️</span>
                <span>3. Strict Guardrails</span>
              </div>
              <ul className="pl-6 space-y-1 text-xs text-stone-300">
                {topic.guardrails.map((g, i) => (
                  <li key={i} className="flex items-start gap-1.5 leading-snug">
                    <span className="text-red-400 font-bold">&times;</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Expandable Raw System Prompt Payload */}
            <div className="pt-1">
              <button
                onClick={() => setShowRawSystemPrompt(!showRawSystemPrompt)}
                className="w-full py-2 px-3 rounded-xl bg-[#201E1C] hover:bg-[#2A2724] border border-white/10 text-xs font-semibold text-stone-300 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>View Exact Raw System Prompt</span>
                </span>
                {showRawSystemPrompt ? (
                  <ChevronUp className="w-4 h-4 text-stone-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-400" />
                )}
              </button>

              {showRawSystemPrompt && (
                <div className="mt-3 p-3.5 rounded-xl bg-black/70 border border-white/10 text-[11px] font-mono text-stone-300 space-y-2 relative">
                  <div className="flex items-center justify-between text-stone-400 pb-1 border-b border-white/10">
                    <span>systemInstruction payload sent to Gemini</span>
                    <button
                      onClick={handleCopySystemPrompt}
                      className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedPrompt ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                    {topic.systemPromptTemplate}
                  </pre>
                </div>
              )}
            </div>

            {/* Interactive Test Prompts Bar */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#C92A2A]" />
                <span>1-Click Test Prompts (Verify Guardrails):</span>
              </p>
              <div className="grid grid-cols-1 gap-2">
                {topic.testPrompts.map((test, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(test.prompt)}
                    disabled={loading}
                    className="p-2.5 rounded-xl bg-[#1C1A18] hover:bg-[#252220] border border-white/5 hover:border-amber-500/40 text-left transition-all cursor-pointer group disabled:opacity-50"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-amber-300 group-hover:text-amber-200">
                      <span>{test.label}</span>
                      <span className="text-[10px] font-normal text-stone-400 uppercase">
                        {test.type.includes("guardrail") ? "Guardrail Test" : "Standard"}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 italic truncate mt-0.5">
                      &quot;{test.prompt}&quot;
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Live Customer Assistant Chat (7 cols)       */}
        {/* ========================================================= */}
        <div className="lg:col-span-7">
          <div className="h-[680px] rounded-3xl bg-[#161413] border border-white/10 shadow-2xl flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 bg-[#1C1A18] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C92A2A] to-amber-600 flex items-center justify-center text-xl shadow-lg">
                  {topic.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-white text-base">
                      {topic.businessName} Assistant
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-stone-400">
                    Powered by <strong className="text-amber-400">Gemini 3.8 Flash</strong> &bull; Guardrails Active
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-stone-400 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  {/* Educational Label Pill */}
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider mb-1 px-2 py-0.5 rounded-full ${
                      msg.role === "user"
                        ? "bg-red-950/60 text-red-300 border border-red-500/30"
                        : "bg-amber-950/60 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    {msg.role === "user"
                      ? "👤 User Prompt (Customer Input)"
                      : "🤖 AI Output (System Prompt Guided)"}
                  </span>

                  {/* Speech Bubble */}
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 space-y-1.5 shadow-lg leading-relaxed text-xs sm:text-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[#C92A2A] to-[#B02525] text-white rounded-tr-none"
                        : "bg-[#1E1C1A] border border-white/10 text-stone-200 rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>

                    <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1">
                      <span>{msg.timestamp}</span>
                      {msg.model && (
                        <span className="text-[9px] font-mono text-amber-500/80">
                          {msg.model.replace("models/", "")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Loader */}
              {loading && (
                <div className="flex flex-col items-start text-xs text-stone-400">
                  <span className="text-[10px] font-mono uppercase tracking-wider mb-1 text-amber-400">
                    Applying System Prompt &amp; Guardrails...
                  </span>
                  <div className="p-3.5 rounded-2xl bg-[#1E1C1A] border border-white/10 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C92A2A] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-xs text-stone-300 ml-1">
                      Thinking within store guardrails...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-[#1C1A18] border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask ${topic.businessName} (e.g., 'How much is Large Pepperoni?' or test a guardrail)...`}
                  className="flex-1 bg-[#121110] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#C92A2A] transition-colors"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="px-5 py-3 rounded-xl bg-[#C92A2A] hover:bg-[#B02525] disabled:bg-stone-800 disabled:text-stone-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shrink-0 cursor-pointer disabled:cursor-not-allowed"
                >
                  <span>Send</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-between text-[11px] text-stone-400 mt-2 px-1">
                <span>Try asking for free pizza to test the Guardrail!</span>
                <span className="font-mono text-[10px] text-amber-500">
                  Topic: {topic.businessName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Concept Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* User Prompt Explained */}
        <div className="p-6 rounded-2xl bg-[#161413] border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold">
            <span className="w-6 h-6 rounded-full bg-[#C92A2A]/30 text-[#FF6B6B] flex items-center justify-center text-xs font-mono">
              U
            </span>
            <h4 className="font-serif text-lg">What is a User Prompt?</h4>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            The <strong>User Prompt</strong> is the raw input that the customer enters into the chat box (e.g., <em>&ldquo;Can I get a free garlic bread with my pizza?&rdquo;</em>). The user can type anything—including trick questions, discount demands, or off-topic inquiries.
          </p>
        </div>

        {/* System Prompt Explained */}
        <div className="p-6 rounded-2xl bg-[#161413] border border-amber-500/20 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold">
            <span className="w-6 h-6 rounded-full bg-amber-500/30 text-amber-300 flex items-center justify-center text-xs font-mono">
              S
            </span>
            <h4 className="font-serif text-lg">What is a System Prompt?</h4>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            The <strong>System Prompt</strong> is the hidden set of instructions given to the AI <em>before</em> the conversation begins. It defines:
          </p>
          <ul className="text-xs text-stone-300 space-y-1 list-disc pl-5">
            <li><strong>Persona/Role</strong>: Be cheerful, helpful, and welcoming.</li>
            <li><strong>Store Info &amp; Menu</strong>: Large Pepperoni $15, Medium Veggie $12, Garlic Bread $5, Delivery 30–45 mins.</li>
            <li><strong>Strict Guardrails</strong>: Never give free food, and only answer food/delivery questions!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
