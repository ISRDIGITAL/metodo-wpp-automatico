# Redesign da página — copy afiada + layout com ritmo

Diagnóstico: hoje as 9 seções são visualmente idênticas (mesmo padding `py-20/28`, mesmo tamanho de h2, fundo alternando preto/preto-mais-escuro), a copy é longa e uniforme, e não existe nenhum elemento visual — nenhuma foto, print, gráfico ou dado renderizado. Isso é o que faz a página parecer "fraca".

Paleta: verde #00C896 sobre #0f0f0f (mais contido, usado como acento raro).
Tipografia: **Sora** (títulos) + **Manrope** (corpo) — substitui Playfair/Inter.

## 1. Sistema visual novo

- Trocar as fontes em `index.html` e `tailwind.config.ts`; escala tipográfica com mais contraste (hero enorme, títulos de seção menores que hoje, olho-de-seção em caixa alta pequena e verde).
- Verde vira acento cirúrgico: números, uma palavra por título, bordas de card, ícones. Nada de gradiente verde em bloco grande.
- Superfícies: 3 níveis (fundo #0f0f0f, card #151515, card elevado #1c1c1c) com bordas hairline em branco/8%, em vez de "verde em tudo".
- Ruído/grão sutil + halo verde único no hero e no CTA final (não em toda seção).

## 2. Quebrar o ritmo — cada seção com layout próprio


| Seção         | Novo tratamento                                                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Hero          | Título gigante assimétrico, badge de autoridade, CTA + micro-copy, e uma **faixa de métricas em movimento** logo abaixo (R$8M+ · +120 contas · 5 anos) |
| Dor           | Lista vertical densa em fundo quase preto, cada item numerado com linha divisória — sem cards                                                          |
| Quem sou      | Layout 2 colunas assimétrico (60/40): texto à esquerda, bloco de credenciais/foto à direita                                                            |
| Resultados    | 3 cards com **número gigante como herói** e mini-gráfico de barras em CSS mostrando o antes/depois                                                     |
| Depoimentos   | Grid escalonado (masonry leve), aspas grandes, frase-gancho em destaque e corpo menor                                                                  |
| Como funciona | Timeline horizontal no desktop / vertical no mobile, com barra de progresso 0→90 min                                                                   |
| Oferta        | Card único centralizado, largo, com ancoragem De R$497 → R$97 em escala dramática e garantia embutida                                                  |
| FAQ           | Acordeão minimalista de largura estreita, sem card                                                                                                     |
| CTA final     | Full-bleed, convergência escura, formulário ao lado do argumento (2 colunas no desktop)                                                                |


## 3. Copy mais afiada

Manter a estrutura e as promessas já validadas (R$97, 4 vagas, garantia Pix, casos reais), mas reescrever com frases mais curtas e concretas:

- Hero: manter "Você não tem problema de tráfego. Você tem problema de vendas." e enxugar o subtítulo para 2 linhas de leitura rápida.
- Dor: transformar em perguntas diretas na segunda pessoa, cada uma com 1 linha.
- Quem sou: abrir com a linha do eletricista, cortar adjetivos, terminar em "Não te entrego lead. Te entrego vendas."
- Resultados: número primeiro, contexto depois, tag "Caso real · dados sob NDA".
- Oferta: cada bullet com no máximo 8 palavras.
- FAQ: respostas em 2 frases.

Nenhuma métrica nova será inventada — só os dados já fornecidos.

## 4. Movimento e acabamento

- Reveal em cascata (stagger) por seção, contadores animados nas métricas, hover com elevação nos cards, barra de progresso do scroll no topo, CTA fixo no mobile.
- Respeita `prefers-reduced-motion`.

## Detalhes técnicos

- `index.html`: fontes Sora/Manrope; pixels Meta (27377822458575339) e GTM (GTM-T5JXS23F) intactos.
- `tailwind.config.ts`: `fontFamily.display` = Sora, `sans` = Manrope; tokens de superfície.
- `src/index.css`: revisão dos tokens (superfícies, bordas hairline, grão, novos keyframes de stagger/marquee).
- `src/pages/Index.tsx`: reescrita da camada de apresentação — cada seção com componente/layout próprio em vez do molde repetido.
- Novos componentes: `Marquee` (faixa de métricas), `StatCounter`, `Timeline`, `SectionEyebrow`.
- `src/components/GoldCTA.tsx`: renomeado para `PrimaryCTA` com o novo estilo.
- `src/components/LeadForm.tsx`: só ajuste visual — campos, validação, gravação no banco e notificação por e-mail permanecem como estão.
- Verificação com Playwright em desktop e mobile (sem overflow, sem erro de console).