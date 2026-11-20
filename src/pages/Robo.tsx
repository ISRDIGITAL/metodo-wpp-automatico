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
/* CONFIG: troque aqui, sem mexer no resto da página                   */
/* ------------------------------------------------------------------ */

// Link do checkout da Cakto. Enquanto estiver vazio, o botão abre o WhatsApp.
const CHECKOUT_URL = "";

const PRICE = "R$97";
const ANCHOR_PRICE = "R$1.497"; // preço do Setup (eu instalo para você)
// Confirmar antes de publicar: menor plano que inclui o canal de WhatsApp.
const TOOL_COST = "cerca de R$57 por mês";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=554796528371&text=Oi+Ivan%2C+quero+o+Atendente+24h+no+meu+WhatsApp.&type=phone_number&app_absent=0";
const INSTAGRAM_URL = "https://instagram.com/oivansodre";

const CTA_LABEL = "Quero meu Atendente 24h";
const HERO_CTA_LABEL = "Ver como o Atendente 24h funciona";

// O primeiro botão não vai direto ao checkout: leva à explicação da oferta.
const goToExplanation = () => {
  trackEvent("ViewContent", { content_name: "atendente_24h", place: "hero_explicacao" });
  document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const goToCheckout = (place: string) => {
  trackEvent("InitiateCheckout", { content_name: "atendente_24h", place });
  if (!CHECKOUT_URL) {
    window.open(WHATSAPP_URL, "_blank");
    return;
  }
  // Repassa UTMs da visita para o checkout (atribuição das vendas).
  const url = new URL(CHECKOUT_URL);
  new URLSearchParams(window.location.search).forEach((v, k) => {
    if (!url.searchParams.has(k)) url.searchParams.set(k, v);
  });
  window.location.href = url.toString();
};

/* ------------------------------------------------------------------ */
/* DADOS                                                               */
/* ------------------------------------------------------------------ */

const PROOF_BAR = [
  "Atendimento 24h com IA",
  "7 instruções",
  "Roteiros para 6 tipos de negócio",
  "Mensagens de follow-up prontas",
];

const SCENES = [
  {
    when: "Domingo, 21h47",
    text: "Chega uma mensagem: “quanto custa?”. Você está no jantar com a família e deixa para depois. Na segunda de manhã você responde. Ele já fechou com outro, que respondeu na hora, no domingo à noite.",
  },
  {
    when: "Terça, 15h",
    text: "Você paga o anúncio, o WhatsApp enche e o dia inteiro vira “tabela de preço” para gente que nunca ia comprar. Quando chama alguém bom, você já está cansado ou ocupado demais para tratar como merece.",
  },
  {
    when: "Sexta, fim do dia",
    text: "O cliente disse “vou pensar”. Você mandou um “qualquer coisa me chama” e nunca mais ouviu falar. Você nem sabe se ele comprou de outro ou se só esqueceu de você.",
  },
];

const STEPS = [
  {
    n: "1",
    t: "Atende 24h",
    d: "A IA responde em segundos, às 3 da manhã, no domingo e no feriado, apresentando-se como assistente da sua empresa. Ninguém fica no vácuo.",
  },
  {
    n: "2",
    t: "Filtra",
    d: "Faz as 4 perguntas que importam: cidade, o que procura, para quando e o nome. Quando chega até você, a conversa já vem triada.",
  },
  {
    n: "3",
    t: "Persegue",
    d: "Quem some recebe mensagem no dia 1, 3 e 7, escrita para não soar cobrança. E o contato quente chega pronto para o vendedor.",
  },
];

const BEFORE = [
  "Celular na mão no jantar, no domingo, no feriado",
  "O mesmo preço respondido 20 vezes por semana",
  "“Vou pensar” e silêncio",
  "Venda que você nem sabe de onde veio",
  "Resultado que depende do humor de quem atende",
];

const AFTER = [
  "A IA atende de madrugada, no domingo e no feriado, e você dorme",
  "Você só abre conversa com quem tem cidade, interesse e prazo",
  "Quem sumiu volta para a conversa sem você precisar lembrar",
  "Você sabe qual anúncio, post ou indicação trouxe cada venda",
  "Atendimento igual todo dia, com ou sem vendedor",
];

const DELIVERABLES = [
  {
    t: "Escolha como montar e conecte o seu WhatsApp",
    d: "Eu te mostro o caminho mais barato para o seu caso. Para começar você não paga ferramenta nenhuma.",
  },
  {
    t: "As 4 perguntas que separam curioso de comprador",
    d: "Você responde 5 perguntas sobre o seu negócio e a IA monta o roteiro no seu tom de voz. Sai pronto para colar.",
  },
  {
    t: "Resposta na hora",
    d: "A IA atende em segundos, 24 horas por dia, inclusive de madrugada, no domingo e no feriado. É aqui que a venda deixa de escorrer.",
  },
  {
    t: "O contato quente",
    d: "Cada conversa vira um cartão com nome, cidade, interesse e prazo. Seu vendedor só abre quem vale o tempo dele.",
  },
  {
    t: "Mensagens para quem sumiu",
    d: "Dia 1, 3 e 7, escritas para retomar a conversa sem parecer cobrança.",
  },
  {
    t: "Trazer cliente antigo de volta",
    d: "Quem já comprou e sumiu é o contato mais barato que você tem. Aqui está o que mandar para ele.",
  },
  {
    t: "De onde veio cada venda",
    d: "Uma planilha simples e 10 minutos por dia. Você para de adivinhar o que dá dinheiro.",
  },
];

const BONUSES = [
  { t: "Roteiros prontos para 6 tipos de negócio", kills: "“Meu negócio é diferente.” Restaurante, barbearia, clínica, loja, imobiliária e prestador de serviço." },
  { t: "Mensagens que soam humanas", kills: "“Vai parecer robô.” Frases curtas, sem aquele tom de atendimento automático." },
  { t: "Checklist de implantação", kills: "“Não sei por onde começar.” Você marca item por item até o robô estar no ar." },
  { t: "Montagem acompanhada por videochamada", kills: "“Vou travar no meio.” Na pré-venda, os primeiros compradores montam comigo." },
];

const FOR_YOU = [
  "Vende pelo WhatsApp: produto, serviço ou consultoria.",
  "Paga anúncio ou recebe indicação e sente que parte dessa gente se perde na conversa.",
  "Quer o robô funcionando, não curso de teoria.",
  "Aceita gastar uma tarde configurando para ganhar noites e fins de semana de volta.",
];

const NOT_FOR_YOU = [
  "Não vende pelo WhatsApp.",
  "Espera resultado sem configurar nada. Tem que montar.",
  "Vai comprar, salvar e nunca abrir.",
  "Quer promessa de faturamento. Eu não faço.",
];

const FAQ = [
  { q: "Preciso entender de tecnologia?", a: "Não. Você não programa nada. Segue as instruções e usa a IA para escrever os textos. Na pré-venda eu acompanho a montagem por videochamada." },
  {
    q: "Quanto custa a ferramenta do robô?",
    a: `Para começar, nada. O robô completo usa uma ferramenta paga a partir de ${TOOL_COST}, cobrada por ela e não por mim. Eu te mostro a mais barata antes de você gastar um real.`,
  },
  { q: "Funciona no WhatsApp que eu já uso?", a: "Existe um jeito que usa o WhatsApp Business que você já tem e outro que usa a conexão oficial. Eu explico o risco e a diferença de cada um antes de você escolher." },
  { q: "O cliente vai perceber que é robô?", a: "O robô se apresenta como assistente da empresa, escreve curto e passa para uma pessoa quando precisa. Ninguém é enganado, e quem quer falar com humano fala." },
  { q: "Serve para o meu tipo de negócio?", a: "Serve para quem vende pelo WhatsApp. Tem roteiro pronto para restaurante, barbearia, clínica, loja, imobiliária e prestador de serviço." },
  { q: "A IA atende mesmo 24 horas por dia?", a: "Sim. Depois de montada e conectada, ela responde a qualquer hora, sem você precisar estar online. Quando o cliente quer falar com uma pessoa, ela passa a conversa para você ou para o seu vendedor." },
  { q: "Quanto tempo leva para montar?", a: "Depende do jeito que você escolher. Você faz no seu ritmo, e na pré-venda eu acompanho para você não ficar parado em nenhuma etapa." },
  { q: "E se eu não gostar?", a: `Você tem 7 dias. Pediu o reembolso, recebe os ${PRICE} de volta, sem perguntas.` },
  { q: "Qual a diferença para o Setup?", a: `Aqui você monta com o passo a passo. No Setup (${ANCHOR_PRICE}) eu monto tudo no seu WhatsApp em 7 dias, para quem prefere pagar e não mexer.` },
];

/* ------------------------------------------------------------------ */
/* PEÇAS                                                               */
/* ------------------------------------------------------------------ */

const Section = ({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={`scroll-mt-4 px-5 py-16 sm:py-24 ${className}`}>
    <div className="mx-auto max-w-3xl">{children}</div>
  </section>
);

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{children}</p>
);

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="font-display text-3xl font-bold leading-[1.1] text-balance sm:text-4xl">{children}</h2>
);

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const clamp = (v: string, max: number) => Math.min(Math.max(Number(v.replace(/\D/g, "")) || 0, 0), max);

/** Calculadora: quanto fica na mesa por mês. Começa com valores de exemplo. */
const Calculator = ({ onCta }: { onCta: () => void }) => {
  const [chats, setChats] = useState(60);
  const [lostPct, setLostPct] = useState(30);
  const [ticket, setTicket] = useState(300);

  const lost = chats * (lostPct / 100) * ticket;
  const recovered = lost / 4;

  const field =
    "mt-2 h-12 w-full rounded-lg border border-primary/25 bg-background/60 px-4 text-lg font-semibold text-foreground outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30";
  const label = "text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/75";

  return (
    <div className="glass-card shadow-elegant rounded-3xl p-6 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-3">
        <label className="block">
          <span className={label}>Conversas novas por mês</span>
          <input
            inputMode="numeric"
            className={field}
            value={chats}
            onChange={(e) => setChats(clamp(e.target.value, 100000))}
          />
        </label>
        <label className="block">
          <span className={label}>% que some ou esfria</span>
          <input
            inputMode="numeric"
            className={field}
            value={lostPct}
            onChange={(e) => setLostPct(clamp(e.target.value, 100))}
          />
        </label>
        <label className="block">
          <span className={label}>Valor médio da venda (R$)</span>
          <input
            inputMode="numeric"
            className={field}
            value={ticket}
            onChange={(e) => setTicket(clamp(e.target.value, 10000000))}
          />
        </label>
      </div>

      <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/10 p-6 text-center">
        <p className="text-sm text-muted-foreground">É o que fica na mesa todo mês</p>
        <p className="mt-1 font-display text-5xl font-extrabold text-gold-gradient sm:text-6xl">{brl(lost)}</p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-foreground/85">
          Se o robô trouxer de volta só 1 a cada 4 dessas vendas, são{" "}
          <b className="text-foreground">{brl(recovered)} por mês</b>. O Atendente 24h custa {PRICE}, uma vez.
        </p>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Os números iniciais são só um ponto de partida. Troque pelos seus.
      </p>
      <div className="mt-6 flex justify-center">
        <PrimaryCTA size="md" onClick={onCta}>
          {CTA_LABEL}
        </PrimaryCTA>
      </div>
    </div>
  );
};

const Robo = () => {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    document.title = "Atendente 24h: IA atendendo o seu WhatsApp 24 horas por dia · Ivan Sodré";
    trackEvent("ViewContent", { content_name: "atendente_24h" });
    const onScroll = () => setShowSticky(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative overflow-x-clip bg-background pb-24 text-foreground sm:pb-0">
      <ScrollProgress />

      {/* 1. HERO */}
      <header className="relative px-5 pb-14 pt-14 sm:pb-20 sm:pt-24">
        <div className="bg-hero-glow pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Para quem vende pelo WhatsApp
          </span>
          <h1 className="mt-6 font-display text-[2.1rem] font-extrabold leading-[1.08] text-balance sm:text-6xl">
            Uma IA atendendo o seu WhatsApp 24 horas por dia,{" "}
            <span className="text-gold-gradient">para você parar de perder venda.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-foreground/80 sm:text-lg">
            Cliente que espera horas por resposta não fica esperando. Chama o próximo da lista. O{" "}
            <b className="font-semibold text-foreground">Atendente 24h</b> é um robô com IA que responde na hora,
            de madrugada e no domingo, descobre quem quer comprar e chama de volta quem sumiu. Você monta
            sozinho, sem programar e sem pagar atendente.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3">
            <PrimaryCTA onClick={goToExplanation}>{HERO_CTA_LABEL}</PrimaryCTA>
            <p className="text-xs text-muted-foreground">
              {PRICE} pagamento único · Garantia de 7 dias
            </p>
          </div>
        </div>
      </header>

      {/* 2. BARRA: o que o produto tem */}
      <div className="border-y border-white/[0.07] bg-surface/60 px-5 py-4">
        <ul className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {PROOF_BAR.map((p) => (
            <li key={p} className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-primary" /> {p}
            </li>
          ))}
        </ul>
      </div>

      {/* 3. DOR EM CENAS */}
      <Section>
        <Reveal>
          <Eyebrow>Você conhece essas cenas</Eyebrow>
          <H2>O cliente chamou. E o que aconteceu depois?</H2>
        </Reveal>
        <div className="mt-10 space-y-5">
          {SCENES.map((s) => (
            <Reveal key={s.when}>
              <div className="surface-card rounded-2xl p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">{s.when}</p>
                <p className="mt-3 text-[16px] leading-relaxed text-foreground/90">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-10 font-display text-xl font-bold leading-snug text-balance sm:text-2xl">
            Você não tem um problema de tráfego. Tem uma porta aberta sem ninguém na recepção.
          </p>
        </Reveal>
      </Section>

      {/* 4. MECANISMO DO PROBLEMA */}
      <Section className="bg-surface/60">
        <Reveal>
          <Eyebrow>Por que nada resolveu até hoje</Eyebrow>
          <H2>O cliente está quente por poucos minutos.</H2>
          <div className="mt-6 space-y-4 text-[17px] font-light leading-relaxed text-foreground/85">
            <p>
              Quem chama no WhatsApp quer resposta agora, e chama a qualquer hora: 22h, domingo, feriado. Passou o
              tempo, ele abriu conversa com mais dois concorrentes, e quem respondeu primeiro e fez a pergunta
              certa levou.
            </p>
            <p>
              Só que você não consegue estar disponível 24 horas por dia. E contratar alguém para isso custa caro,
              tem folga, tem dia ruim e responde cada pessoa de um jeito. Uma IA não tem nada disso.
            </p>
            <p className="font-semibold text-foreground">
              Por isso trocar de agência, de criativo e de vendedor não mudou o seu caixa. O dinheiro vaza depois
              do clique, no meio da conversa.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* 5. MECANISMO DA SOLUÇÃO */}
      <Section id="como-funciona">
        <Reveal>
          <Eyebrow>O mecanismo</Eyebrow>
          <H2>Atendente 24h: uma IA que atende o seu WhatsApp o dia inteiro e a noite inteira</H2>
          <p className="mt-5 text-[17px] font-light leading-relaxed text-foreground/85">
            Um atendente que trabalha 24 horas por dia, 7 dias por semana, não esquece de ninguém e não perde a
            paciência na quinta pergunta de preço. Ele faz três coisas, sempre na mesma ordem.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <Reveal key={s.n}>
              <div className="surface-card h-full rounded-2xl p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 font-display text-sm font-bold text-primary">
                  {s.n}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 6. DEMO */}
      <Section className="max-w-none bg-surface/60">
        <Reveal>
          <div className="mb-10 text-center">
            <Eyebrow>Olha como fica na prática</Eyebrow>
            <H2>É assim que o Atendente 24h conversa com o seu cliente, às 23h47 de um domingo</H2>
          </div>
        </Reveal>
        <ChatDemo />
        <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
          Em menos de um minuto: o cliente foi atendido, você sabe quem ele é e o que quer, e você nem estava com o
          celular na mão. Se ele sumir, o robô volta atrás dele amanhã.
        </p>
      </Section>

      {/* 7. A CONTA */}
      <Section>
        <Reveal>
          <div className="mb-8 text-center">
            <Eyebrow>Faça a sua conta</Eyebrow>
            <H2>Quanto o seu WhatsApp deixa na mesa por mês?</H2>
          </div>
          <Calculator onCta={() => goToCheckout("calculadora")} />
        </Reveal>
      </Section>

      {/* 8. TRANSFORMAÇÃO */}
      <Section className="bg-surface/60">
        <Reveal>
          <Eyebrow>Sua rotina antes e depois</Eyebrow>
          <H2>O mesmo dinheiro de anúncio, passando por uma recepção que não deixa ninguém sem resposta</H2>
        </Reveal>
        <Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="surface-card rounded-2xl p-6">
              <p className="mb-4 font-display font-bold text-destructive">Hoje</p>
              <ul className="space-y-3 text-sm text-foreground/85">
                {BEFORE.map((t) => (
                  <li key={t} className="flex gap-2">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/[0.07] p-6">
              <p className="mb-4 font-display font-bold text-primary">Com o Atendente 24h</p>
              <ul className="space-y-3 text-sm text-foreground/90">
                {AFTER.map((t) => (
                  <li key={t} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 text-[17px] font-light leading-relaxed text-foreground/85">
            Você volta a ter noite e fim de semana. O negócio deixa de depender de você estar com o celular na mão.
            E quando for hora de investir mais em anúncio, cada real novo vai entrar numa operação que sabe
            atender.
          </p>
        </Reveal>
      </Section>

      {/* 9. HISTÓRIA */}
      <Section>
        <Reveal>
          <Eyebrow>Quem monta isso com você</Eyebrow>
          <H2>De eletricista a operador de growth</H2>
          <div className="mt-6 space-y-3 text-[17px] font-light leading-relaxed text-foreground/85">
            <p>Eu era eletricista. Aprendi a vender pela internet porque precisei.</p>
            <p>
              Atendi barbearias, restaurantes e imobiliárias. Em todas, a mesma cena: o anúncio funcionava, o
              cliente chamava no WhatsApp e ninguém respondia a tempo.
            </p>
            <p>
              Eu via o dinheiro do anúncio ir embora na conversa e ficava com raiva. Aí passei a montar o robô que
              cuida dessa conversa.
            </p>
            <p className="font-semibold text-foreground">
              Agora eu te mostro, passo a passo, como montar o seu.
            </p>
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

      {/* 10. O QUE VOCÊ RECEBE */}
      <Section className="bg-surface/60">
        <Reveal>
          <Eyebrow>O que você recebe</Eyebrow>
          <H2>7 instruções para colocar o seu Atendente 24h no ar</H2>
        </Reveal>
        <div className="mt-10 space-y-3">
          {DELIVERABLES.map((it, i) => (
            <Reveal key={it.t}>
              <div className="surface-card flex gap-4 rounded-xl p-5">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold">{it.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8 flex justify-center">
            <PrimaryCTA size="md" onClick={() => goToCheckout("entregas")}>
              {CTA_LABEL}
            </PrimaryCTA>
          </div>
        </Reveal>
      </Section>

      {/* 11. BÔNUS */}
      <Section>
        <Reveal>
          <Eyebrow>Bônus</Eyebrow>
          <H2>Para você não travar no meio do caminho</H2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {BONUSES.map((b) => (
            <Reveal key={b.t}>
              <div className="h-full rounded-2xl border border-primary/25 bg-primary/[0.06] p-6">
                <p className="font-display font-bold">{b.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.kills}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            <b className="text-foreground">Como a pré-venda funciona:</b> as instruções são liberadas em ordem.
            Os primeiros compradores montam comigo por videochamada. Você tem acesso vitalício, inclusive às que
            ainda vão sair.
          </p>
        </Reveal>
      </Section>

      {/* 12. PARA QUEM É */}
      <Section className="bg-surface/60">
        <Reveal>
          <H2>Antes de ver o preço, veja se isso é para você</H2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="surface-card rounded-2xl p-6">
              <p className="mb-4 font-display font-bold text-primary">É para você se</p>
              <ul className="space-y-3 text-sm">
                {FOR_YOU.map((t) => (
                  <li key={t} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface-card rounded-2xl p-6">
              <p className="mb-4 font-display font-bold text-destructive">Não é para você se</p>
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

      {/* 13. PREÇO */}
      <Section>
        <Reveal>
          <div className="glass-card shadow-elegant relative overflow-hidden rounded-3xl p-8 text-center sm:p-12">
            <div className="bg-converge-glow pointer-events-none absolute inset-0" aria-hidden />
            <div className="relative">
              <Eyebrow>Pré-lançamento</Eyebrow>
              <p className="text-sm text-muted-foreground">
                Eu instalar isso no seu WhatsApp custa {ANCHOR_PRICE}. Montando você mesmo, com o meu passo a
                passo:
              </p>
              <p className="mt-4 font-display text-6xl font-extrabold text-gold-gradient sm:text-7xl">{PRICE}</p>
              <p className="mt-1 text-sm text-muted-foreground">pagamento único</p>
              <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-foreground/85">
                Se uma única venda que você perderia por demora for salva pelo robô, o produto já se pagou.
              </p>
              <div className="mt-8 flex justify-center">
                <PrimaryCTA onClick={() => goToCheckout("price")}>{CTA_LABEL}</PrimaryCTA>
              </div>
              <p className="mx-auto mt-6 max-w-md text-xs leading-relaxed text-muted-foreground">
                Para começar você não paga ferramenta. Para o robô completo, a ferramenta custa a partir de{" "}
                {TOOL_COST}, paga direto a ela, e eu te mostro a mais barata. O preço sobe quando a última
                instrução for publicada.
              </p>
              <div className="mt-6 flex items-center justify-center gap-5 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" /> Pagamento seguro
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" /> Garantia de 7 dias
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 14. GARANTIA */}
      <Section className="bg-surface/60">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <ShieldCheck className="mb-4 h-12 w-12 text-primary" />
            <H2>7 dias para decidir, sem risco</H2>
            <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
              Entre, veja as instruções, comece a montar. Se achar que não é isso, manda uma mensagem dentro de 7
              dias e eu devolvo os {PRICE}, sem perguntar o motivo.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* 15. FAQ */}
      <Section>
        <Reveal>
          <H2>Perguntas que você deve estar fazendo</H2>
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

      {/* 16. CTA FINAL */}
      <Section className="bg-surface/60">
        <Reveal>
          <H2>Duas formas de passar a próxima segunda-feira</H2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="surface-card rounded-2xl p-6">
              <p className="font-display font-bold">1. Do jeito que está</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Acordar com o WhatsApp acumulado do fim de semana, responder um por um e descobrir que metade já
                foi para o concorrente.
              </p>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/[0.07] p-6">
              <p className="font-display font-bold text-primary">2. Com o Atendente 24h no ar</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                Acordar com a conversa já triada, os contatos quentes separados e quem sumiu sendo chamado de volta.
              </p>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center gap-3">
            <PrimaryCTA onClick={() => goToCheckout("final")}>{CTA_LABEL}</PrimaryCTA>
            <p className="text-xs text-muted-foreground">{PRICE} pagamento único · Garantia de 7 dias</p>
          </div>
          <p className="mx-auto mt-10 max-w-xl text-sm leading-relaxed text-muted-foreground">
            <b className="text-foreground">P.S.</b> Cada hora sem resposta é mais uma conversa que esfria. O
            Atendente 24h custa {PRICE}, você tem 7 dias para testar e o pior que pode acontecer é você pedir o
            dinheiro de volta.
          </p>
        </Reveal>
      </Section>

      {/* RODAPÉ */}
      <footer className="border-t border-white/[0.07] px-5 py-10">
        <div className="mx-auto max-w-3xl space-y-4 text-center text-xs leading-relaxed text-muted-foreground">
          <p>
            Garantia de 7 dias. Oferta de pré-lançamento: o preço sobe quando a última instrução for publicada.
            Este produto não garante resultado de vendas; os resultados dependem da aplicação. Os valores da
            calculadora são uma conta aberta com os números que você digitar e não uma promessa de resultado.
            Ferramentas citadas são de terceiros e eventuais links são de afiliado, sempre avisados antes.
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
