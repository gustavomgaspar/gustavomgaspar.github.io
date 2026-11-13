---
version: 1
slug: "landing"
primary_target: "landing"
related_targets: []
---

# Brief de superfície — Landing (página única)

Atualização: 2026-11-11. A superfície muda de escopo comercial: o pedido desta rodada coloca **venda de landing pages** como oferta primária e inclui **formulário de contato** como conversão principal. O mundo visual gravado em `.impeccable/design.json` é mantido como sistema; apenas a composição e a oferta da página são reabertas.

## Escopo e modo

- **Modo:** Persuade. Página única de geração de leads, sem backend.
- **Público:** donos e gestores de empresas consolidadas, fortes no mercado físico, com presença digital insuficiente.
- **Trabalho do visitante:** entender em poucos segundos que a Gaspar constrói a landing page — e a infraestrutura atrás dela — para transformar visita em contato comercial qualificado.
- **Ação primária:** enviar o formulário de contato. O formulário sem backend composta a mensagem e abre o WhatsApp confirmado (+55 15 99818-2559) com o texto pronto; o link direto de WhatsApp permanece como caminho paralelo sempre visível.
- **Prova:** o painel de métricas é demonstração ilustrativa, com rótulo visível de dados sintéticos; o processo de trabalho e a régua da oferta são a prova restante. Nenhum depoimento, cliente, logo, prêmio, endereço ou número de resultado.
- **Restrições:** conteúdo completo no HTML inicial; WCAG 2.2 AA; teclado e foco visível; `prefers-reduced-motion`; transições apenas em cor/transform; sem dependência de hover.

## Direction contract

**THESIS**
A página é um balcão de engenharia comercial que vende uma coisa concreta — landing pages que viram conversa — e recusa o arranjo padrão de landing de agência: carrossel de depoimentos, blocos coloridos com gradientes, promessa vaga de "presença digital". O decisor julga profissionalismo pela organização, não pelo espetáculo.

**OWN-WORLD**
Papel quente quase branco (`oklch(0.977 0.004 262)`), tinta azul-escura (`oklch(0.22 0.022 262)`), exatamente um acento índigo (`oklch(0.55 0.185 262)`) e um único momento preto: o painel de métricas (`oklch(0.155 0.02 262)`), o único elemento levantado. Cartões com filete de 1px e sombra baixa, listas com régua horizontal, números em mono tabular. Sem fotos, sem ilustrações decorativas, sem gradientes decorativos. Voz tipográfica: a system stack aprovada, com hierarquia fluida agressiva. Verde só dentro do painel escuro, como sinal de canal.

**STORY**
Em oito segundos o visitante entende: o problema é perder para concorrentes mais visíveis mesmo liderando no mercado físico; a solução é uma landing page integrada ao processo comercial, não "um site novo"; a prova é o painel de demonstração mostrando onde o contato nasce; a ação é enviar o formulário ou falar no WhatsApp.

**FIRST VIEWPORT**
Header enxuto de 1px de filete com o wordmark Gaspar à esquerda e CTA fantasma permanente "Falar com o Gaspar" à direita. Abaixo, duas colunas: à esquerda o H1 em display fluido (clamp até 6rem, tracking até -0.03em) com a promessa de landing pages, uma linha de apoio em corpo e o CTA primário em índigo; à direita, no mesmo plano vertical, o painel escuro de métricas como objeto de evidência — rótulo visível "Demonstração · dados sintéticos", tiles com valor mono tabular e delta em verde de canal, operável por teclado. O CTA primário e o primeiro tile do painel ficam visíveis sem scroll em 1440×900 e em 390×844. Abaixo da dobra começa a régua da oferta.

**FORM**
Forma escolhida: documento/relatório de balcão — uma coluna de leitura larga com uma coluna de evidência ao lado, filetes no lugar de caixas decorativas, e o painel escuro como único objeto levantado. É a primeira da lista ordenada de formas derivadas do mundo (1. documento/balcão; 2. extrato tabular; 3. folha de processo numerada; 4. painel de operação; 5. capa de proposta). Nenhum comp foi gerado nesta rodada.
seed: none (unavailable)

**FINISH**
unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Momento memorável

O painel preto na dobra, com os tiles contando em mono tabular enquanto o delta acende em verde — a única cor quente da página, dentro do único objeto escuro.

## Decisões em aberto

- Stack decidida: HTML/CSS/JS estático, sem build e sem dependências; a fase Rust/Leptos anterior foi removida do working tree (recuperável em `040ee23`). O **deploy target segue em decisão** (registrado no `PRODUCT.md`).
- Formulário sem backend: envio por composição de mensagem no WhatsApp; se um endpoint de captura entrar depois, é uma troca do manipulador de `submit`, não do desenho.
