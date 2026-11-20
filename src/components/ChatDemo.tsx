import { useEffect, useRef, useState } from "react";

type Msg = { from: "bot" | "client"; text: string };

const MESSAGES: Msg[] = [
  { from: "bot", text: "Oi! Aqui é o assistente virtual da empresa. Você é de qual cidade?" },
  { from: "client", text: "Florianópolis" },
  { from: "bot", text: "Boa! E o que você está procurando hoje?" },
  { from: "client", text: "Quero um orçamento" },
  { from: "bot", text: "Perfeito. Para quando você precisa?" },
  { from: "client", text: "Essa semana" },
  { from: "bot", text: "Anotado. Qual o seu nome?" },
  { from: "client", text: "João" },
  { from: "bot", text: "Obrigado, João. Já passei para o nosso time e em instantes alguém continua com você." },
];

const STEP_MS = 1150;

/** Animated WhatsApp-style conversation. Starts when it enters the viewport. */
const ChatDemo = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setShown(MESSAGES.length + 2);
      setStarted(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    // MESSAGES.length + 1 = lead card, + 2 = next-day follow-up
    if (shown >= MESSAGES.length + 2) return;
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 300 : STEP_MS);
    return () => clearTimeout(t);
  }, [started, shown]);

  const typing = started && shown < MESSAGES.length && MESSAGES[shown]?.from === "bot" && shown > 0;

  return (
    <div ref={wrapRef} className="mx-auto grid max-w-4xl gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-start">
      {/* Phone */}
      <div className="mx-auto w-full max-w-[380px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0b141a] shadow-elegant">
        <div className="flex items-center gap-3 border-b border-white/5 bg-[#1f2c34] px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
            AI
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">Assistente da empresa</p>
            <p className="text-[11px] text-white/50">{typing ? "digitando..." : "online 24h"}</p>
          </div>
        </div>

        <div className="flex min-h-[420px] flex-col gap-2 px-3 py-4">
          <p className="mx-auto mb-1 rounded-full bg-white/5 px-3 py-1 text-[11px] text-white/50">Domingo · 23:47</p>
          {MESSAGES.slice(0, shown).map((m, i) => (
            <div
              key={i}
              className={`max-w-[84%] animate-fade-up rounded-2xl px-3.5 py-2 text-[13.5px] leading-snug ${
                m.from === "bot"
                  ? "self-start rounded-tl-sm bg-primary text-primary-foreground"
                  : "self-end rounded-tr-sm bg-[#202c33] text-white"
              }`}
            >
              {m.text}
            </div>
          ))}
          {typing && (
            <div className="self-start rounded-2xl rounded-tl-sm bg-primary/30 px-4 py-2.5 text-primary-foreground">
              <span className="inline-flex gap-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/80" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/80 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/80 [animation-delay:300ms]" />
              </span>
            </div>
          )}
        </div>
      </div>

      {/* What the owner receives */}
      <div className="space-y-4">
        <div
          className={`rounded-2xl border border-primary/30 bg-primary/10 p-5 transition-all duration-700 ${
            shown > MESSAGES.length ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            O que chega para você
          </p>
          <p className="mt-2 font-display text-lg font-bold leading-snug">
            Contato quente
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            João · Florianópolis · Orçamento · Essa semana
          </p>
        </div>

        <div
          className={`rounded-2xl border border-white/10 bg-[#0b141a] p-5 transition-all duration-700 ${
            shown > MESSAGES.length + 1 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            No dia seguinte, se ele sumir
          </p>
          <p className="mt-3 w-fit max-w-full rounded-2xl rounded-tl-sm bg-primary px-3.5 py-2 text-[13.5px] leading-snug text-primary-foreground">
            Oi, João! Conseguiu ver o orçamento? Qualquer dúvida é só falar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatDemo;
