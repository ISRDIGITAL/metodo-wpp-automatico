import { ReactNode, useEffect, useState } from "react";
import { Check, X, ShieldCheck, Lock, Instagram, MessageCircle } from "lucide-react";
import ChatDemo from "@/components/ChatDemo";
import PrimaryCTA from "@/components/PrimaryCTA";
import Reveal from "@/components/Reveal";
import ScrollProgress from "@/components/ScrollProgress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackEvent } from "@/lib/metaPixel";

/* ------------------------------------------------------------------ */
/* CONFIG — troque aqui, sem mexer no resto da página                  */
/* ------------------------------------------------------------------ */

// Link do checkout da Cakto. Enquanto estiver vazio, o botão abre o WhatsApp.
const CHECKOUT_URL = "";

const PRICE = "R$47";
const ANCHOR_PRICE = "R$1.497"; // preço do Setup (eu instalo para você)
// Confirmar antes de publicar: menor plano que inclui o canal de WhatsApp.
const TOOL_COST = "cerca de R$57 por mês";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=554796528371&text=Oi+Ivan%2C+quero+o+rob%C3%B4+no+WhatsApp.&type=phone_number&app_absent=0";
const INSTAGRAM_URL = "https://instagram.com/oivansodre";

const CTA_LABEL = "Quero meu robô no WhatsApp";

const goToCheckout = (place: string) => {
  trackEvent("InitiateCheckout", { content_name: "robo_whatsapp", place });
  if (!CHECKOUT_URL) {
    window.open(WHATSAPP_URL, "_blank");
    return;
  }
  // Repassa UTMs da visita para o checkout (atribuição das vendas).
  const search = window.location.search;
  const url = new URL(CHECKOUT_URL);
  new URLSearchParams(search).forEach((v, k) => {
    if (!url.searchParams.has(k)) url.searchParams.set(k, v);
  });
  window.location.href = url.toString();
};

/* ------------------------------------------------------------------ */
/* DADOS                                                               */
/* ------------------------------------------------------------------ */

const PROBLEMS = [
  "O vendedor demora para responder.",
  "Você responde só à noite, entre uma coisa e outra.",
  "Metade de quem chama só queria saber o preço.",
  "Quem disse “vou pensar” some e ninguém chama de volta.",
];

const ROBOT_DOES = [
  { t: "Atende na hora", d: "Nem às 23h nem no domingo ninguém fica esperando." },
  { t: "Faz as perguntas certas", d: "Cidade, interesse, prazo, nome. Você sabe quem é quem antes de falar." },
  { t: "Chama de volta quem sumiu", d: "Mensagem automática no dia 1, 3 e 7." },
  { t: "Entrega o contato pronto", d: "Só chega até você quem está perto de comprar." },
];

const DELIVERABLES = [
  {
    phase: "Preparação",
    items: [
      { t: "Escolha como montar e conecte o seu WhatsApp", d: "Eu te mostro a opção mais barata." },
    ],
  },
  {
    phase: "O robô",
    items: [
      { t: "As perguntas que qualificam o cliente", d: "Você responde 5 perguntas e a IA monta o roteiro do seu negócio." },
      { t: "Resposta na hora", d: "O robô atende e conversa no tom da sua empresa." },
      { t: "O contato pronto para o vendedor", d: "Quem chega até você já vem com nome, interesse e prazo." },
    ],
  },
  {
    phase: "Follow-up",
    items: [
      { t: "Mensagens para quem sumiu", d: "Dia 1, 3 e 7, prontas para colar." },
      { t: "Chamar cliente antigo de volta", d: "Sem parecer desesperado." },
    ],
  },
  {
    phase: "Números",
    items: [
      { t: "De onde veio cada venda", d: "Uma planilha simples e 10 minutos por dia." },
    ],
  },
];

const BONUSES = [
  "Roteiros prontos para 6 tipos de negócio (restaurante, barbearia, clínica, loja, imobiliária, serviço)",
  "Checklist de uma tarde",
  "Mensagens que soam humanas",
];

const FOR_YOU = [
  "Vende pelo WhatsApp (produto, serviço ou consultoria).",
  "Recebe mais mensagem do que consegue atender, ou perde cliente que “vai pensar”.",
  "Quer o robô funcionando, não aula de teoria.",
];

const NOT_FOR_YOU = [
  "Não vende pelo WhatsApp.",
  "Quer resultado sem configurar nada. É uma tarde de trabalho.",
  "Vai comprar, salvar e nunca montar.",
];

const FAQ = [
  { q: "Preciso entender de tecnologia?", a: "Não. É passo a passo, e na pré-venda eu te acompanho por videochamada." },
  {
    q: "Quanto custa a ferramenta?",
    a: `Para começar, nada. O robô completo usa uma ferramenta a partir de ${TOOL_COST}, cobrada por ela, e eu te mostro a mais barata antes de você pagar qualquer coisa.`,
  },
  { q: "Funciona no WhatsApp que eu já uso?", a: "Eu te mostro, na primeira instrução, qual jeito de montar serve para o seu caso. Existe um jeito que usa o WhatsApp Business que você já tem." },
  { q: "O cliente vai perceber que é robô?", a: "O robô se apresenta como assistente da empresa, conversa de forma simples e passa para uma pessoa quando precisa." },
  { q: "Serve para o meu negócio?", a: "Para quem vende pelo WhatsApp. Tem roteiro pronto para 6 tipos de negócio." },
  { q: "E se eu não gostar?", a: "Garantia de 7 dias. Você pede o reembolso e recebe os R$47 de volta." },
  { q: "Qual a diferença para o Setup?", a: `Aqui você monta com o passo a passo. No Setup (${ANCHOR_PRICE}), eu monto tudo no seu WhatsApp em 7 dias.` },
];

/* ------------------------------------------------------------------ */
/* PEÇAS                                                               */
/* ------------------------------------------------------------------ */

const Section = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <section className={`px-5 py-16 sm:py-24 ${className}`}>
    <div className="mx-auto max-w-3xl">{children}</div>
  </section>
);

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{children}</p>
);

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="font-display text-3xl font-bold leading-[1.1] text-balance sm:text-4xl">{children}</h2>
);

const Robo = () => {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    document.title = "Robô no WhatsApp que atende, qualifica e cobra resposta · Ivan Sodré";
    trackEvent("ViewContent", { content_name: "robo_whatsapp" });
    const onScroll = () => setShowSticky(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative overflow-x-clip bg-background pb-24 text-foreground sm:pb-0">
      <ScrollProgress />

      {/* 1. HERO */}
      <header className="relative px-5 pb-16 pt-14 sm:pb-24 sm:pt-24">
        <div className="bg-hero-glow pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Para quem vende pelo WhatsApp
          </span>
          <h1 className="mt-6 font-display text-[2.1rem] font-extrabold leading-[1.08] text-balance sm:text-6xl">
            Seu WhatsApp responde só quando você pode?{" "}
            <span className="text-gold-gradient">Ponha um robô para atender, qualificar e cobrar resposta.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
            Monte, passo a passo, um robô que conversa com cada cliente que chama, descobre quem realmente quer
            comprar e te entrega o contato pronto.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3">
            <PrimaryCTA onClick={() => goToCheckout("hero")}>{CTA_LABEL}</PrimaryCTA>
            <p className="text-xs text-muted-foreground">
              Pré-venda: de {ANCHOR_PRICE} por <b className="text-foreground">{PRICE}</b> · Garantia de 7 dias
            </p>
          </div>
        </div>
      </header>

      {/* 2. PROBLEMA */}
      <Section>
        <Reveal>
          <Eyebrow>O problema</Eyebrow>
          <H2>Você paga pelo anúncio. O cliente chama. E aí?</H2>
          <ul className="mt-8 space-y-3">
            {PROBLEMS.map((p) => (
              <li key={p} className="surface-card rounded-xl px-5 py-4 text-[15px] text-foreground/90">
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-8 font-display text-xl font-bold leading-snug text-balance">
            O problema não é falta de cliente. É o que acontece nos primeiros minutos da conversa.
          </p>
        </Reveal>
      </Section>

      {/* 3. VIRADA */}
      <Section className="bg-surface/60">
        <Reveal>
          <H2>E se cada pessoa que chamasse fosse atendida na hora, e você só falasse com quem quer comprar?</H2>
          <p className="mt-5 text-lg font-light text-muted-foreground">
            Sem contratar atendente. Sem ficar preso no celular.
          </p>
        </Reveal>
      </Section>

      {/* 4. DEMO */}
      <Section className="max-w-none">
        <Reveal>
          <div className="mb-10 text-center">
            <Eyebrow>Veja como fica</Eyebrow>
            <H2>É assim que o robô conversa com o seu cliente</H2>
          </div>
        </Reveal>
        <ChatDemo />
        <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-relaxed text-muted-foreground">
          Exemplo ilustrativo. O robô se apresenta como assistente da empresa e passa para uma pessoa quando
          precisa.
        </p>
      </Section>

      {/* 5. O QUE O ROBÔ FAZ */}
      <Section className="bg-surface/60">
        <Reveal>
          <Eyebrow>O que o robô faz por você</Eyebrow>
          <div className="grid gap-4 sm:grid-cols-2">
            {ROBOT_DOES.map((r, i) => (
              <div key={r.t} className="surface-card rounded-2xl p-6">
                <span className="font-display text-sm font-bold text-primary">0{i + 1}</span>
                <h3 className="mt-2 font-display text-lg font-bold">{r.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{r.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* 6. POR QUE FUNCIONA SEMPRE */}
      <Section>
        <Reveal>
          <H2>Por que isso funciona sempre</H2>
          <div className="mt-6 space-y-4 text-[17px] font-light leading-relaxed text-foreground/85">
            <p>Todo dia alguém novo chama o seu WhatsApp. Amanhã outra pessoa. Depois de amanhã, outra.</p>
            <p>
              Quem recebe resposta em minutos compra. Quem recebe no dia seguinte já comprou de outro.
            </p>
            <p className="font-semibold text-foreground">
              O robô responde sempre. E o problema que ele resolve não para de acontecer.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* 7. HISTÓRIA */}
      <Section className="bg-surface/60">
        <Reveal>
          <Eyebrow>Quem monta isso com você</Eyebrow>
          <H2>De eletricista a operador de growth.</H2>
          <div className="mt-6 space-y-3 text-[17px] font-light leading-relaxed text-foreground/85">
            <p>Fui eletricista.</p>
            <p>Aprendi a vender pela internet quando precisei.</p>
            <p>Atendi barbearias, restaurantes e imobiliárias.</p>
            <p>Vi a mesma cena se repetir: o cliente chamava no WhatsApp e ninguém respondia a tempo.</p>
            <p>Então passei a montar o robô que cuida dessa conversa.</p>
            <p className="font-semibold text-foreground">Agora eu te mostro, passo a passo, como montar o seu.</p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="font-display font-semibold text-foreground">Ivan Sodré</span>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-primary hover:underline"
            >
              <Instagram className="h-4 w-4" /> @oivansodre
            </a>
          </div>
        </Reveal>
      </Section>

      {/* 8. O QUE VOCÊ RECEBE */}
      <Section>
        <Reveal>
          <Eyebrow>O que você recebe</Eyebrow>
          <H2>Você monta o seu robô comigo, passo a passo, com a IA ao lado.</H2>
        </Reveal>
        <div className="mt-10 space-y-8">
          {DELIVERABLES.map((phase) => (
            <Reveal key={phase.phase}>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {phase.phase}
              </p>
              <div className="space-y-3">
                {phase.items.map((it) => (
                  <div key={it.t} className="surface-card flex gap-4 rounded-xl p-5">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold">{it.t}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{it.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-10 rounded-2xl border border-primary/25 bg-primary/[0.06] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Bônus</p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/90">
              {BONUSES.map((b) => (
                <li key={b} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {b}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            <b className="text-foreground">Como a pré-venda funciona:</b> as instruções são liberadas em ordem.
            Os primeiros compradores montam comigo por videochamada. Acesso vitalício, inclusive às que ainda
            vão sair.
          </p>
        </Reveal>
      </Section>

      {/* 9. PARA QUEM É */}
      <Section className="bg-surface/60">
        <Reveal>
          <H2>Antes de ver o preço, veja se é para você</H2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="surface-card rounded-2xl p-6">
              <p className="mb-4 font-display font-bold text-primary">É para você se:</p>
              <ul className="space-y-3 text-sm">
                {FOR_YOU.map((t) => (
                  <li key={t} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface-card rounded-2xl p-6">
              <p className="mb-4 font-display font-bold text-destructive">Não é para você se:</p>
              <ul className="space-y-3 text-sm">
                {NOT_FOR_YOU.map((t) => (
                  <li key={t} className="flex gap-2">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 10. PREÇO */}
      <Section>
        <Reveal>
          <div className="glass-card shadow-elegant relative overflow-hidden rounded-3xl p-8 text-center sm:p-12">
            <div className="bg-converge-glow pointer-events-none absolute inset-0" aria-hidden />
            <div className="relative">
              <Eyebrow>Pré-lançamento</Eyebrow>
              <p className="text-sm text-muted-foreground">O preço sobe quando a última instrução for publicada.</p>
              <p className="mt-6 text-sm text-muted-foreground">
                De <s>{ANCHOR_PRICE}</s> (eu instalar para você) por apenas
              </p>
              <p className="font-display text-6xl font-extrabold text-gold-gradient sm:text-7xl">{PRICE}</p>
              <p className="mt-1 text-sm text-muted-foreground">pagamento único</p>
              <div className="mt-8 flex justify-center">
                <PrimaryCTA onClick={() => goToCheckout("price")}>{CTA_LABEL}</PrimaryCTA>
              </div>
              <p className="mx-auto mt-6 max-w-md text-xs leading-relaxed text-muted-foreground">
                Para começar você não paga ferramenta. Para o robô completo, a ferramenta custa a partir de{" "}
                {TOOL_COST}, paga direto a ela, e eu te mostro a mais barata.
              </p>
              <div className="mt-6 flex items-center justify-center gap-5 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" /> Pagamento 100% seguro
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" /> Garantia de 7 dias
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 11. GARANTIA */}
      <Section className="bg-surface/60">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <ShieldCheck className="h-12 w-12 text-primary" />
            <H2>7 dias. Incondicional.</H2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Se não for o que eu falei, peça o reembolso e pronto. 100% dos {PRICE} de volta, sem perguntas.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* 12. FAQ */}
      <Section>
        <Reveal>
          <H2>Perguntas frequentes</H2>
          <Accordion type="single" collapsible className="mt-8">
            {FAQ.map((f, i) => (
              <AccordionItem key={f.q} value={`f${i}`}>
                <AccordionTrigger className="text-left font-display text-base font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Section>

      {/* 13. DOIS CAMINHOS */}
      <Section className="bg-surface/60">
        <Reveal>
          <H2>Dois caminhos</H2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="surface-card rounded-2xl p-6">
              <p className="font-display font-bold">1. Continuar respondendo na mão</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Às 23h, no domingo, na segunda de manhã. Celular cheio, vendedor devagar, cliente indo embora.
              </p>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/[0.07] p-6">
              <p className="font-display font-bold text-primary">2. Investir {PRICE} uma vez</p>
              <p className="mt-2 text-sm text-foreground/85">
                E ter um robô que atende, qualifica e chama de volta.
              </p>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center gap-3">
            <PrimaryCTA onClick={() => goToCheckout("final")}>{CTA_LABEL}</PrimaryCTA>
            <p className="text-xs text-muted-foreground">
              De {ANCHOR_PRICE} por {PRICE} · Garantia de 7 dias
            </p>
          </div>
        </Reveal>
      </Section>

      {/* RODAPÉ */}
      <footer className="border-t border-white/[0.07] px-5 py-10">
        <div className="mx-auto max-w-3xl space-y-4 text-center text-xs leading-relaxed text-muted-foreground">
          <p>
            Garantia de 7 dias. Oferta de pré-lançamento: o preço sobe quando a última instrução for publicada.
            Este produto não garante resultado de vendas; os resultados dependem da aplicação. Ferramentas citadas
            são de terceiros e eventuais links são de afiliado, sempre avisados antes.
          </p>
          <p className="flex items-center justify-center gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground">
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground">
              <Instagram className="h-3.5 w-3.5" /> @oivansodre
            </a>
          </p>
          <p>© {new Date().getFullYear()} Ivan Sodré · ISR Digital</p>
        </div>
      </footer>

      {/* CTA fixo no celular */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-background/95 px-4 py-3 backdrop-blur transition-transform duration-300 sm:hidden ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <PrimaryCTA size="md" onClick={() => goToCheckout("sticky")}>
          {CTA_LABEL} · {PRICE}
        </PrimaryCTA>
      </div>
    </main>
  );
};

export default Robo;
