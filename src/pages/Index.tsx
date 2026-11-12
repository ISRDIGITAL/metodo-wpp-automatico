import { ReactNode } from 'react';
import {
  MessageCircle,
  ShieldCheck,
  Instagram,
  Quote,
  Check,
  X,
  Play,
  Lock,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import Reveal from '@/components/Reveal';
import ScrollProgress from '@/components/ScrollProgress';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { trackLead, trackContact } from '@/lib/metaPixel';

const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=554796528371&text=Oi+Ivan%2C+quero+saber+mais+sobre+o+diagn%C3%B3stico+de+R%2497.&type=phone_number&app_absent=0';
const INSTAGRAM_URL = 'https://instagram.com/oivansodre';

const scrollToForm = () => {
  trackLead('cta_click');
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* ---------------- DATA ---------------- */

const STATS = [
  { v: 'R$8M+', l: 'em anúncios geridos' },
  { v: '+120', l: 'contas auditadas' },
  { v: '90 min', l: 'ao vivo, comigo' },
];

const PROMISES = [
  <>"Agência com relatório semanal" e <b>nenhuma venda rastreada</b>.</>,
  <>"Mais leads pelo menor custo", <b>WhatsApp lotado. Fechamento? Zero.</b></>,
  <>Trocar de gestor, de criativo, de plataforma e o próximo cliente <b>continua sendo surpresa</b>.</>,
  <>Aumentar a verba e <b>gastar mais em anúncio do que fatura</b> com ele.</>,
];

const RESULTS = [
  { big: 'R$16k/mês', small: 'Barbearia · SC', quote: 'Saímos de R$5k para R$16k/mês em 90 dias. O problema era a conversão na recepção, não o anúncio.' },
  { big: 'R$60k', small: 'Sushi delivery', quote: 'Com R$2k investidos, R$60k faturados em 30 dias. ROAS de 30x com oferta de recompra.' },
  { big: 'R$430k/mês', small: 'Empresa local · SC', quote: 'De R$240k para R$430k/mês em 4 meses com funil estruturado e recompra no WhatsApp.' },
];

const TESTIMONIALS = [
  {
    hook: 'Curtida não paga folha de pagamento.',
    text: 'A gente gastava um rio de dinheiro com agência que só entregava post bonito. Quando fizemos o diagnóstico, ficou claro que o problema não era falta de clique — era a ausência de um funil ligando o anúncio ao atendimento do delivery e das reservas. Fechar a gestão completa foi a decisão mais lógica que já tomei. Hoje marketing e comercial falam a mesma língua.',
    name: 'Marcos T.',
    role: 'Sócio-proprietário de Restaurante',
  },
  {
    hook: 'Eu tinha preconceito com gestor de tráfego.',
    text: 'A maioria só aperta botão, promete milagre e some no fim do mês. Paguei o diagnóstico desconfiado, achando que era pitch disfarçado. Foi mapeado exatamente onde eu perdia cliente no WhatsApp depois do clique. Parecia que ele conhecia minha operação melhor que eu. Contratei a gestão na mesma semana e hoje minha agenda tem previsibilidade total.',
    name: 'Felipe C.',
    role: 'Fundador de Barbearia',
  },
  {
    hook: 'Eu queria previsibilidade, não promessa de semana.',
    text: 'O que me chamou atenção não foi só o conhecimento técnico, foi a postura de não ser imediatista. O foco não ficou no custo por clique, e sim em como minha equipe recebia os leads e como atrair público mais qualificado. A gestão mensal se paga na primeira semana do mês, porque agora existe processo comercial — não campanha rodando solta.',
    name: 'Carla M.',
    role: 'Diretora de Marca de Vestuário',
  },
];

const STORY: (string | ReactNode)[][] = [
  ['Eu demorei pra entender isso.', 'Deixa eu te contar como cheguei aqui.'],
  ['Comecei como eletricista.', 'Nada de marketing, nada de agência.', 'Só conta pra pagar e vontade de crescer.'],
  ['Quando entrei no tráfego, fiz tudo que mandavam fazer.', 'Subi campanha.', 'Baixei o custo por clique.', 'Entreguei relatório bonito.'],
  ['E o resultado?', 'Cliente com WhatsApp cheio.', 'Que respondia.', 'Que pedia orçamento.', 'Mas não comprava.'],
  ['Aí entendi o que ninguém fala:', <span className="text-primary">o problema quase nunca é o anúncio.</span>, 'É o que acontece depois do clique.'],
  ['Parei de entregar lead.', 'Comecei a rastrear do primeiro clique até a venda fechada.', 'A organizar o atendimento.', 'A criar recompra e reativação da base.'],
  ['Barbearia de R$5k foi pra R$16k/mês.', 'Delivery fez R$60k com R$2k investidos.', 'Empresa local saiu de R$240k pra R$430k/mês.'],
  [<>Hoje são <b className="text-foreground">mais de R$8 milhões em anúncios geridos</b>.</>, 'Sem fórmula mágica.', 'Sem promessa de semana.', 'Só processo.'],
  ['Isso funciona pra qualquer negócio que vende.', 'Restaurante que quer pedido todo dia, não só no fim de semana.', 'Imobiliária que quer visita qualificada, não curioso.', 'Clínica que quer agenda cheia sem depender de indicação.', 'Loja que quer cliente comprando de novo, não uma vez só.'],
  ['O que falta no seu negócio não é mais um anúncio.', <b className="text-foreground">É um sistema que transforma clique em venda.</b>],
];

const STEPS = [
  { phase: 'Ponto de partida', items: [{ t: 'Raio-X da sua operação', d: <>Abro seu gerenciador, CRM e planilhas. <b>Sua conta aberta, ao vivo.</b></> }] },
  { phase: 'Diagnóstico', items: [
    { t: 'Auditoria de Google Ads e Meta Ads', d: <>Onde está o desperdício de verba. <b>Com número, não com achismo.</b></> },
    { t: 'Rastreamento do clique até a venda', d: <>Descubra qual campanha trouxe cada cliente. <b>Sem rastreio, não existe escala.</b></> },
    { t: 'Gargalos do atendimento', d: <>Onde o lead esfria no WhatsApp. <b>Lead sem processo é dinheiro jogado fora.</b></> },
    { t: 'Ticket, LTV e recompra', d: <>Quanto vale cada cliente de verdade. <b>E como fazer ele comprar de novo.</b></> },
  ] },
  { phase: 'Plano', items: [
    { t: 'Mapa de correção semana a semana', d: <>Semana 1, 2, 3 e 4 em PDF. <b>Pronto pra executar.</b></> },
    { t: 'Estratégia de reativação dos top clientes', d: <>Como trazer de volta quem já comprou. <b>A venda mais barata que existe.</b></> },
  ] },
  { phase: 'Execução', items: [
    { t: 'Implemente sozinho ou delegue', d: <>Você aplica com sua equipe <b>ou me contrata pra executar.</b> Você decide.</> },
  ] },
];

const VALUE = [
  ['Auditoria completa de anúncios', 'R$497'],
  ['Mapa de rastreamento clique → venda', 'R$397'],
  ['Análise do processo comercial', 'R$397'],
  ['Plano de execução semana a semana', 'R$297'],
  ['Estratégia de recompra e reativação', 'R$297'],
];

const FAQ = [
  { q: 'Funciona pro meu tipo de negócio?', a: <>Sim. Já apliquei em barbearias, restaurantes, imobiliárias, clínicas, e-commerce e B2B. <b>O que muda é o mapa — não a lógica.</b></> },
  { q: 'Por que só R$97?', a: <>Meu objetivo não é ganhar R$97 — é te mostrar como trabalho na prática. <b>Se o plano valer 10x o que pagou</b>, conversamos sobre gestão. Se não, você sai com o mapa do mesmo jeito.</> },
  { q: 'Você mesmo faz a sessão?', a: <>Sim. <b>Sem estagiário, sem template.</b> Só eu e você, com sua conta aberta.</> },
  { q: 'E se eu ainda não invisto em tráfego?', a: <>Melhor ainda. Você começa <b>do jeito certo</b>, com rastreamento e processo antes de colocar verba.</> },
  { q: 'E depois do diagnóstico?', a: <>Se fizer sentido, apresento a gestão completa: Google Ads, Meta Ads e processo comercial integrados. <b>Você decide, sem pressão.</b></> },
  { q: 'E se eu não gostar?', a: <>Se a sessão não te entregar clareza, <b>devolvo seus R$97 via PIX</b>. Sem perguntas.</> },
];

/* ---------------- UI ---------------- */

const CTA = ({ label = 'Quero meu diagnóstico' }: { label?: string }) => (
  <div className="flex justify-center">
    <button
      type="button"
      onClick={scrollToForm}
      className="group relative inline-flex w-full max-w-sm flex-col items-center overflow-hidden rounded-xl bg-primary px-8 py-4 text-primary-foreground shadow-glow transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_54px_hsl(var(--primary)/0.45)]"
    >
      <span className="flex items-center gap-2 font-display text-[15px] font-bold">
        {label}
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground/15">
          <ArrowRight className="h-3 w-3" />
        </span>
      </span>
      <span className="mt-1 text-[11px] font-medium opacity-80">
        Vagas limitadas: <s>R$497</s> por <b>R$97</b>
      </span>
    </button>
  </div>
);

const Eyebrow = ({ children }: { children: string }) => (
  <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary sm:text-[11px]">
    <span className="h-3 w-0.5 bg-primary" />
    {children}
  </span>
);

const H2 = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <h2 className={`font-display text-[1.8rem] font-bold leading-[1.1] tracking-tight sm:text-[2.5rem] ${className}`}>
    {children}
  </h2>
);

const Section = ({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`px-5 py-16 sm:px-8 sm:py-24 ${className}`}>
    <div className="mx-auto max-w-4xl">{children}</div>
  </section>
);

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary/30 [&_b]:font-semibold [&_b]:text-foreground">
      <ScrollProgress />

      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-8">
          <div className="font-display text-[15px] font-bold tracking-tight">Ivan Sodré</div>
          <a
            href={WHATSAPP_URL}
            onClick={() => trackContact('header')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2 text-[11px] font-medium transition hover:border-primary/50 hover:text-primary sm:text-xs"
          >
            <MessageCircle className="h-3.5 w-3.5" /> Falar comigo
          </a>
        </div>
      </header>

      <main>
        {/* 1. HERO + VSL */}
        <section className="grain relative overflow-hidden px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16">
          <div className="pointer-events-none absolute inset-0 grid-texture" />
          <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
          <div className="relative mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-[10.5px]">
                Funciona pra qualquer negócio ou nicho
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display mt-6 text-[2.5rem] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] sm:text-[4.2rem]">
                Diagnóstico <span className="text-primary">Estratégico</span>
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="mx-auto mt-5 max-w-xl text-[16px] font-medium leading-snug sm:text-[19px]">
                Descubra em 90 minutos <b className="text-primary">de onde vêm seus clientes</b> e onde
                o seu dinheiro em anúncio está vazando.
              </p>
              <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
                Você não tem problema de tráfego. Tem problema de vendas. Ao vivo, comigo, com sua conta aberta.
              </p>
            </Reveal>

            <Reveal delay={220}>
              {/* Espaço reservado para o vídeo de vendas */}
              <div className="relative mx-auto mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-elegant">
                <div className="absolute inset-0 bg-hero-glow opacity-70" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow">
                    <Play className="ml-1 h-6 w-6" fill="currentColor" />
                  </span>
                  <span className="text-[12px] text-muted-foreground">Vídeo em breve</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={280} className="mt-7">
              <CTA />
            </Reveal>
          </div>
        </section>

        {/* 2. STATS */}
        <section className="px-5 sm:px-8">
          <Reveal>
            <div className="surface-card mx-auto grid max-w-3xl grid-cols-3 divide-x divide-white/[0.08] rounded-2xl py-6">
              {STATS.map((s) => (
                <div key={s.l} className="px-2 text-center">
                  <div className="font-display text-[1.4rem] font-bold leading-none sm:text-[2.2rem]">{s.v}</div>
                  <div className="mt-2 text-[10px] text-muted-foreground sm:text-[11px]">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* 3. PROBLEMA */}
        <Section>
          <Reveal>
            <H2 className="max-w-2xl">O mercado te prometeu que mais tráfego resolveria o problema de vendas.</H2>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {PROMISES.map((p, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="surface-card flex h-full gap-3 rounded-xl p-4 text-[14px] leading-relaxed text-muted-foreground">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <p>{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-7 font-display text-[16px] font-semibold sm:text-[18px]">
              O problema não é "falta de lead". O problema é "falta de processo que VENDE."
            </p>
          </Reveal>
        </Section>

        {/* 4. O QUE MUDA TUDO */}
        <Section className="bg-[hsl(0_0%_4%)]">
          <div className="text-center">
            <Reveal><Eyebrow>O que muda tudo</Eyebrow></Reveal>
            <Reveal delay={80}><H2 className="mt-4">1 cliente que volta vale mais que 10 novos</H2></Reveal>
            <Reveal delay={140}>
              <p className="mt-4 text-[15px] text-muted-foreground">
                O mercado te vende <b>clique</b>. Eu te entrego <b>venda rastreada</b>.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mx-auto mt-10 grid max-w-2xl items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
                <div className="surface-card rounded-xl p-6 text-[15px] text-muted-foreground line-through decoration-destructive/60">
                  1.000 leads que ninguém atende
                </div>
                <span className="text-[12px] uppercase tracking-widest text-muted-foreground">vs.</span>
                <div className="rounded-xl border border-primary/40 bg-primary/[0.07] p-6 font-display text-[15px] font-bold text-primary">
                  1 sistema que vende e faz recomprar.
                </div>
              </div>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-8 text-[14px] text-muted-foreground">
                É a diferença entre alimentar o algoritmo e alimentar o seu caixa.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* 5. POR QUE FUNCIONA */}
        <Section>
          <div className="mx-auto max-w-2xl">
            <Reveal><H2>Por que esse método não depende do seu nicho?</H2></Reveal>
            <div className="mt-8 space-y-5 text-[15.5px] leading-relaxed text-muted-foreground sm:text-[17px]">
              <Reveal><p>Promoção tem prazo de validade. Você roda, vende um pouco, a oferta cansa e você volta pra estaca zero.</p></Reveal>
              <Reveal><p className="text-foreground">Agora pensa no seguinte:</p></Reveal>
              <Reveal><p>Todo dia, alguém novo decide que precisa do seu produto. Todo dia, um cliente antigo está pronto pra comprar de novo — e ninguém chamou ele.</p></Reveal>
              <Reveal><p>Quem rastreia sabe quem é essa pessoa. Quem tem processo atende na hora. Quem tem recompra traz de volta quem já confia.</p></Reveal>
              <Reveal><p>Isso vale pra restaurante, imobiliária, clínica, loja ou serviço.</p></Reveal>
              <Reveal><p className="font-display text-[18px] font-semibold text-foreground sm:text-[20px]">
                Campanha solta acaba. <span className="text-primary">Sistema de vendas, não.</span>
              </p></Reveal>
            </div>
          </div>
        </Section>

        {/* 6. RESULTADOS */}
        <Section className="bg-[hsl(0_0%_4%)]">
          <Reveal><Eyebrow>Resultados reais</Eyebrow></Reveal>
          <Reveal delay={80}><H2 className="mt-4">de quem aplicou o diagnóstico</H2></Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {RESULTS.map((r, i) => (
              <Reveal key={i} delay={i * 90}>
                <article className="surface-card h-full rounded-2xl p-6 transition hover:border-primary/35">
                  <div className="font-display text-[2rem] font-extrabold leading-none text-primary">{r.big}</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{r.small}</div>
                  <p className="mt-4 text-[13.5px] italic leading-relaxed text-muted-foreground">"{r.quote}"</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-10"><CTA /></div>
        </Section>

        {/* 7. HISTÓRIA */}
        <Section>
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <H2>R$8 milhões geridos começando como eletricista.</H2>
              <p className="mt-5 text-[16px] text-muted-foreground">
                Se o seu produto é bom, você já tem o que vender. Só precisa de um processo que prove isso por você.
              </p>
            </Reveal>
            <div className="mt-10 space-y-8 border-l border-primary/30 pl-6 text-[15.5px] leading-relaxed text-muted-foreground sm:text-[17px]">
              {STORY.map((block, i) => (
                <Reveal key={i}>
                  <div className="space-y-1">
                    {block.map((line, j) => <p key={j}>{line}</p>)}
                  </div>
                </Reveal>
              ))}
              <Reveal><p className="font-display text-[15px] font-semibold text-foreground">— Ivan Sodré</p></Reveal>
            </div>
            <div className="mt-12"><CTA /></div>
          </div>
        </Section>

        {/* 8. O QUE VOCÊ RECEBE */}
        <Section className="bg-[hsl(0_0%_4%)]">
          <Reveal>
            <H2>O que você recebe</H2>
            <p className="mt-3 max-w-lg text-[14.5px] text-muted-foreground">
              Não é uma call de vendas disfarçada. É uma sessão estratégica, ponto por ponto, na sua operação.
            </p>
          </Reveal>
          <div className="mt-10 space-y-8">
            {(() => {
              let n = 0;
              return STEPS.map((g) => (
                <div key={g.phase}>
                  <div className="mb-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {g.phase}
                    <span className="h-px flex-1 bg-white/[0.07]" />
                  </div>
                  <div className={`grid gap-3 ${g.items.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                    {g.items.map((it) => {
                      n += 1;
                      return (
                        <Reveal key={it.t}>
                          <div className="surface-card flex h-full gap-4 rounded-xl p-5">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary font-display text-[12px] font-bold text-primary-foreground">
                              {n}
                            </span>
                            <div>
                              <h3 className="font-display text-[15px] font-semibold">{it.t}</h3>
                              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{it.d}</p>
                            </div>
                          </div>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              ));
            })()}
          </div>
          <div className="mt-10"><CTA /></div>
          <p className="mt-4 text-center text-[12px] text-muted-foreground">8 entregas diretas. Do caos ao plano de vendas.</p>
        </Section>

        {/* 9. MAIS PROVAS */}
        <Section>
          <Reveal><Eyebrow>Mais provas</Eyebrow></Reveal>
          <Reveal delay={80}><H2 className="mt-4">Não sou só eu falando.</H2></Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 90}>
                <figure className="glass-card flex h-full flex-col rounded-2xl p-6">
                  <Quote className="h-6 w-6 text-primary/40" strokeWidth={1.4} />
                  <blockquote className="font-display mt-4 text-[17px] font-semibold leading-snug">"{t.hook}"</blockquote>
                  <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">{t.text}</p>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-white/[0.08] pt-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 font-display text-xs font-bold text-primary">
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-[13px] font-semibold">{t.name}</span>
                      <span className="block text-[11.5px] text-muted-foreground">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div className="mt-10"><CTA /></div>
        </Section>

        {/* 10. ANCORAGEM */}
        <Section className="bg-[hsl(0_0%_4%)]">
          <div className="mx-auto max-w-xl">
            <Reveal><H2 className="text-center">Se eu fosse cobrar separado:</H2></Reveal>
            <Reveal delay={100}>
              <div className="surface-card mt-8 overflow-hidden rounded-2xl">
                {VALUE.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-white/[0.06] px-5 py-3.5 text-[14px]">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
                <div className="flex justify-between px-5 py-4 font-display text-[16px] font-bold">
                  <span>De:</span>
                  <span className="text-destructive line-through">R$1.885</span>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* 11. PRA QUEM É */}
        <Section>
          <Reveal><H2 className="text-center">Antes de ver o preço, veja se é pra você.</H2></Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-primary/30 bg-primary/[0.05] p-6">
                <div className="font-display text-[16px] font-bold text-primary">É pra você, se:</div>
                <ul className="mt-4 space-y-3 text-[14px] text-muted-foreground">
                  {[
                    'Você tem um negócio: restaurante, imobiliária, clínica, loja, barbearia, serviço...',
                    'Já investe (ou quer investir) em anúncio e não sabe de onde vem cada venda.',
                    'Está cansado de depender de indicação e de meses imprevisíveis.',
                    'Quer clientes novos e quer que os antigos voltem a comprar.',
                  ].map((s) => (
                    <li key={s} className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{s}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="surface-card h-full rounded-2xl p-6">
                <div className="font-display text-[16px] font-bold text-destructive">NÃO é pra você, se:</div>
                <ul className="mt-4 space-y-3 text-[14px] text-muted-foreground">
                  {[
                    'Você quer fórmula mágica pra vender amanhã.',
                    'Acredita que só aumentar a verba resolve.',
                    'Vai receber o plano e deixar na gaveta.',
                  ].map((s) => (
                    <li key={s} className="flex gap-2.5"><X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />{s}</li>
                  ))}
                </ul>
                <p className="mt-4 text-[13px] text-foreground/80">Aí os R$97 viram dinheiro rasgado.</p>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* 12. OFERTA + FORMULÁRIO */}
        <section id="oferta" className="grain relative overflow-hidden bg-[hsl(0_0%_4%)] px-5 py-16 sm:px-8 sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-converge-glow" />
          <div className="relative mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div className="rounded-3xl border border-primary/40 bg-surface p-7 text-center shadow-glow sm:p-9">
                <span className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                  Apenas 4 vagas por semana
                </span>
                <p className="mt-6 text-[14px] text-muted-foreground">
                  De <s>R$1.885</s> por apenas
                </p>
                <div className="font-display text-[4rem] font-extrabold leading-none tracking-tight text-primary sm:text-[5rem]">
                  R$97
                </div>
                <p className="mt-2 text-[13px] text-muted-foreground">pagamento único</p>
                <ul className="mx-auto mt-7 max-w-xs space-y-2.5 text-left text-[14px]">
                  {[...VALUE.map((v) => v[0]), 'Sessão 1:1 de 90 min comigo'].map((s) => (
                    <li key={s} className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{s}</li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center justify-center gap-1.5 text-[11.5px] text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" /> Dados 100% seguros · Garantia total
                </div>
                <p className="mt-4 text-[13px] font-medium text-foreground/90">
                  Um único cliente novo cobre o valor investido várias vezes.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div id="lead-form" className="surface-card scroll-mt-20 rounded-3xl p-6 shadow-elegant sm:p-8">
                <LeadForm />
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="relative mx-auto mt-10 flex max-w-xl flex-col items-center text-center">
              <ShieldCheck className="h-10 w-10 text-primary" strokeWidth={1.4} />
              <h3 className="font-display mt-3 text-[1.4rem] font-bold">Garantia de clareza. Incondicional.</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                Se no fim dos 90 minutos você não sair com clareza total sobre onde está perdendo dinheiro,
                devolvo seus R$97 via PIX. Sem perguntas. <b>O risco é todo meu.</b>
              </p>
            </div>
          </Reveal>
        </section>

        {/* 13. FAQ */}
        <Section>
          <div className="mx-auto max-w-2xl">
            <Reveal><H2>Perguntas frequentes</H2></Reveal>
            <Accordion type="single" collapsible className="mt-8">
              {FAQ.map((f, i) => (
                <AccordionItem key={i} value={`f${i}`} className="border-white/[0.08]">
                  <AccordionTrigger className="text-left font-display text-[15px] font-semibold hover:text-primary hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[14px] leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>

        {/* 14. 2 CAMINHOS */}
        <Section className="bg-[hsl(0_0%_4%)]">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal><H2>Você tem 2 caminhos:</H2></Reveal>
            <div className="mt-8 space-y-4 text-left">
              <Reveal>
                <div className="surface-card rounded-xl p-5 text-[15px] text-muted-foreground">
                  <b>1 -</b> Continuar investindo no escuro, trocando de agência, aumentando verba e torcendo pro mês fechar.
                  <span className="mt-1 block text-foreground/80">WhatsApp cheio. Caixa vazio.</span>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="rounded-xl border border-primary/40 bg-primary/[0.06] p-5 text-[15px] text-muted-foreground">
                  <b>2 -</b> Investir R$97 uma vez e ter <b className="text-primary">o mapa exato de onde vêm e pra onde vão suas vendas</b>.
                </div>
              </Reveal>
            </div>
            <div className="mt-10"><CTA /></div>
            <p className="mt-4 text-[12px] text-muted-foreground">Garantia total · Vagas limitadas por semana</p>
          </div>
        </Section>
      </main>

      <footer className="border-t border-white/[0.07] px-5 py-10 pb-28 sm:px-8 sm:pb-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <div>
            <div className="font-display text-[15px] font-bold">Ivan Sodré</div>
            <div className="text-[11.5px] text-muted-foreground">Gestor de Tráfego e Estrategista Digital</div>
          </div>
          <div className="flex items-center gap-5">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-primary">
              <Instagram className="h-3.5 w-3.5" /> @oivansodre
            </a>
            <a href={WHATSAPP_URL} onClick={() => trackContact('footer')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-primary">
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
          <div className="text-[11px] text-muted-foreground/60">© {new Date().getFullYear()} Ivan Sodré</div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-background/95 p-3 backdrop-blur-xl sm:hidden">
        <CTA label="Garantir minha vaga" />
      </div>
    </div>
  );
};

export default Index;
