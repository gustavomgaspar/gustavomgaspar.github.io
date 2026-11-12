# Design System — Gaspar

Sistema visual da landing "O Balcão de Engenharia". Extraído de `.impeccable/design.json`
e materializado nos tokens de `site.css`, que é a fonte executável.

## North star

> O Balcão de Engenharia — prova técnica antes de emotividade, estrutura de documento
> antes de palco de agência.

Papel quente quase branco com tinta azul-escura: um extrato/relatório bem impresso. Um único
acento índigo forte indica ação; um único momento preto — o painel de métricas — funciona
como objeto de evidência sobre a mesa. A densidade é de relatório executivo: cartões com
filete de 1px, listas separadas por régua, números em mono tabular.

**Zero fotos. Zero logos. Zero dependências.** A página sobrevive com texto, dado e
arquitetura de página.

## O campo de linhas do hero

O hero carrega uma única camada gráfica gerada em tempo real: um campo de linhas onduladas
que deriva devagar, como a hachura de um desenho técnico. Ele é **decorativo** — não
interage com o mouse, não entra na árvore de acessibilidade e some por completo se o
navegador não tiver WebGL2.

- **Shader próprio em WebGL2**, em `waves.js`. Sem biblioteca, sem `import`, sem build.
  O campo é desenhado em tinta escura (matiz derivada das três cores do campo) sobre o
  papel, nunca como fundo colorido — por isso o texto do hero mantém o mesmo contraste.
- **Sem interação.** O canvas tem `pointer-events: none` e `aria-hidden="true"`. Não há
  uniforms de mouse nem de ripple no shader: o código que os alimentaria não existe.
- **Opacidade baixa de propósito** (`0.045`): o campo é textura de fundo, não elemento
  gráfico. O pior pixel do campo é `rgb(209 214 222)`, o que mantém o headline em
  **11.8:1** e o lede em **5.8:1** sobre ele — ambos acima de WCAG AA.
- **Passo fixo de ~24fps** (`frameInterval: 42ms`). O movimento é lento por definição;
  redesenhar a 60fps não compra nada visível e satura a CPU.
- **Custo limitado por pixels** (`PIXEL_BUDGET: 1.1e6`, `MAX_RATIO: 1`). É uma textura
  de fundo: não precisa de resolução nativa.
- **Pausa fora da tela** (`IntersectionObserver`) e com a aba em segundo plano
  (`visibilitychange`). A GPU não queima bateria à toa.
- **Movimento reduzido**: um único frame estático, e para.
- **Sem WebGL2**: o canvas é removido e o hero fica como papel liso. Nada da página
  depende dele.

O campo é full-bleed: `.hero` é a camada, `.hero__inner` carrega o conteúdo com
`z-index: 1` por cima.

## Cor

Todos os valores em OKLCH. Nenhuma cor fora desta lista.

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `oklch(0.977 0.004 262)` | Fundo da página |
| `--paper-alt` | `oklch(0.945 0.007 262)` | Fundo de seção alternada |
| `--ink` | `oklch(0.22 0.022 262)` | Texto principal |
| `--ink-soft` | `oklch(0.42 0.02 262)` | Texto secundário, lede |
| `--line` | `oklch(0.875 0.012 262)` | Filetes, réguas |
| `--line-control` | `oklch(0.65 0.012 262)` | Borda de controle de formulário |
| `--accent` | `oklch(0.55 0.185 262)` | Ação: botões, links, realce |
| `--accent-fg` | `oklch(0.99 0.005 85)` | Texto sobre o acento |
| `--accent-strong` | `oklch(0.47 0.185 262)` | Hover do acento |
| `--accent-hover` | `oklch(0.4 0.185 262)` | Pressionado |
| `--accent-tint` | `oklch(0.55 0.185 262 / 0.1)` | Fundo de realce suave |
| `--accent-faint` | `oklch(0.75 0.1 262)` | Borda de realce fraco |
| `--selection-bg` | `oklch(0.88 0.06 262)` | Seleção de texto |
| `--danger` | `oklch(0.45 0.16 25)` | Erro de validação |
| `--danger-strong` | `oklch(0.5 0.17 25)` | Erro em hover |
| `--success` | `oklch(0.42 0.13 155)` | Validação_OK |
| `--wa` | `oklch(0.74 0.155 155)` | WhatsApp |

### O painel (único objeto escuro)

| Token | Valor |
|---|---|
| `--panel-bg` | `oklch(0.155 0.02 262)` |
| `--panel-line` | `oklch(0.32 0.025 262)` |
| `--panel-fg` | `oklch(0.955 0.008 85)` |
| `--panel-fg-soft` | `oklch(0.78 0.02 262)` |

`--panel-fg-soft` é uma **correção sobre o valor de `design.json`**: lá rendia 3,29:1 sobre
`--panel-bg`; com 0,72 de luminosidade o contraste ficava abaixo de AA. Subiu para 0,78.
Não reintroduza o valor original.

### Verde do painel

O delta do gráfico (`+8%`, `69% dos leads`) usa `--success` — **a única cor quente da
página**, e só existe dentro do painel preto.

## Tipografia

Duas famílias, ambas de sistema: zero download de fonte, zero requisição extra.

- `--sans` — `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- `--mono` — `ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace`

Mono tabular para todo número (métricas, tiles, eixo do gráfico) — alinhamento vertical é
parte da leitura de relatório.

### Escala fluida

| Classe | Tamanho | Peso | Tracking | Line-height |
|---|---|---|---|---|
| `.display` | `clamp(2.2rem, 4.1vw, 4.1rem)` | 800 | -0.03em | 1 |
| `.headline` | `clamp(1.6rem, 3vw, 2.55rem)` | 750 | -0.022em | 1.08 |
| `.lede` | `clamp(1.06rem, 1.35vw, 1.24rem)` | — | — | 1.55 |
| `.section__intro` | `clamp(1.02rem, 1.2vw, 1.12rem)` | — | — | — |
| `--step--1` | `0.9rem` | — | — | — |

Títulos usam `text-wrap: balance`; corpo usa `text-wrap: pretty` (herdado de `body`) para
que a última linha do parágrafo não fique com uma palavra órfã.

## Espaço e layout

- `--shell: 71rem` — largura máxima do contêiner
- `--gutter: clamp(1.15rem, 4vw, 2.5rem)` — respiro lateral
- `--header-h: 4.25rem` — altura do cabeçalho fixo
- Corpo de texto: `max-width: 68ch`; lede `58ch`; cabeçalho de seção `46rem`

O hero é uma grade de duas colunas com áreas nomeadas:

```
grid-template-areas:
  "copy panel"
  "facts panel";
grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
```

A coluna do painel atravessa as duas linhas — o objeto escuro fica à direita e vertical.

### Breakpoints

| Largura | Mudança |
|---|---|
| `≤ 900px` | Hero colapsa para coluna única |
| `≤ 860px` | Cards da oferta empilham |
| `≤ 560px` | Ajustes de padding e CTA em largura total |
| `≤ 420px` | Ajustes finais de espaçamento |

## Superfícies

| Elemento | Token | Nota |
|---|---|---|
| Botão primário | `--accent` bg, `--accent-fg` fg | Uma ação comercial por bloco |
| Botão secundário | transparente + `--accent` | Link de texto com sublinhado |
| Cartão | `--paper` bg, filete `--line`, `--shadow-card` | Sombra discreta de relatório |
| Chip (período) | borda `--panel-fg-soft`; ativo `--accent` | Dentro do painel |
| Campo de formulário | borda `--line-control` | Erro usa `--danger` |

## Sombra

- `--shadow-card` — `0 1px 2px oklch(0.22 0.022 262 / 0.06), 0 10px 28px oklch(0.22 0.022 262 / 0.08)`
- `--shadow-lift` — `0 12px 28px oklch(0.15 0.02 262 / 0.22)`

Sombra sempre em dois níveis: um contato de 1px e uma difusão larga e fraca. Nenhum
elemento usa sombra dura ou glow.

## Movimento

- `--ease: cubic-bezier(0.4, 0, 0.2, 1)` — estado e hover
- `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` — entrada dos elementos do painel

As entradas do painel (`translateY(12px)` → 0, opacidade 0 → 1) rodam só sob
`@media (prefers-reduced-motion: no-preference)`. Sob `reduce`, tudo aparece sem
transformação. O `scroll-behavior: smooth` também está sob a mesma guarda.

O campo de linhas do hero segue a mesma regra: sob `reduce`, desenha um frame único e
para — nenhuma animação contínua.

## Acessibilidade

- WCAG 2.2 AA é a meta interna.
- Link de salto para o conteúdo; navegação por teclado; foco visível.
- O contraste de `--panel-fg-soft` foi corrigido para atender AA — não reverta.
- Toda informação do gráfico existe também em texto; o gráfico é reforço, não o único canal.

## Regras de uso

1. Nenhuma cor nova fora dos tokens. Se falta uma cor, o problema é o design, não a paleta.
2. Nenhuma foto, logo ou ilustração na landing.
3. Mono para número, sans para texto corrido.
4. Uma ação comercial principal por bloco.
5. O painel preto é o único objeto escuro — não replicar o efeito.
6. Sombra em dois níveis, sempre.
7. O campo de linhas é o único elemento gráfico da página. Não somar outros.
