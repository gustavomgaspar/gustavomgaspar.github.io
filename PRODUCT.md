# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

HTML, CSS e JavaScript estáticos, sem build e sem dependências. Escolhidos pelo usuário.

Sem etapa de build: `index.html`, `site.css` e `site.js` são servidos como estão. Todo o
conteúdo comercial já existe no HTML inicial.

Deploy: **GitHub Pages**, no repositório de site de usuário `gustavomgaspar.github.io`, servido
na raiz do domínio em `https://gustavomgaspar.github.io/`.

Publicação: a branch `main` do repositório de site de usuário recebe o conteúdo do repositório
de trabalho por force-push, e o Pages reconstrói sozinho a cada push. O `.nojekyll` impede
que o GitHub rode Jekyll sobre o conteúdo estático.

Sem backend, sem runtime de servidor e sem healthcheck: a página não tem servidor próprio.

## Users

Donos e gestores de empresas consolidadas, fortes no mercado físico, mas com presença digital insuficiente ou ineficiente. Chegam à página avaliando se vale contratar modernização digital para reduzir invisibilidade online, destravar processos manuais e gerar mais oportunidades comerciais.

## Product Purpose

Apresentar a oferta de modernização digital do Gaspar e converter visitantes qualificados em conversas de diagnóstico. O sucesso significa que um visitante entende rapidamente:

1. que o problema é maior do que “ter um site”;
2. que o trabalho une engenharia, processos e automação comercial;
3. que existe uma próxima ação clara: agendar uma Reunião de Diagnóstico Digital Gratuita de 20 minutos.

## Positioning

Gaspar não vende “tecnologia pela tecnologia”. A promessa é engenharia digital aplicada para sustentar, proteger e expandir o faturamento que a empresa já possui — unificando desenvolvimento web, integração de sistemas, automação de atendimento e vendas, e métricas operacionais.

A diferença frente a uma agência comum é a combinação de execução Full-Stack, melhoria de processos internos e automação comercial com foco em ROI e entregas rápidas.

## Operating Context

A avaliação típica acontece em desktop ou celular, antes de uma conversa comercial. O visitante pode chegar por indicação, busca, anúncio ou rede social. A página precisa comunicar credibilidade sem exigir leitura longa, e o CTA principal abre uma conversa de WhatsApp com o Gaspar.

A operação não inclui, nesta fase, dashboard autenticado, banco de dados, envio/captura de leads por backend ou métricas reais do cliente.

## Capabilities and Constraints

- A landing segue o conteúdo de `copy.md`.
- CTAs confirmados apontam para o WhatsApp `+55 15 99818-2559`.
- A seção “Painel de Métricas Operacionais” será uma demonstração ilustrativa, com dados sintéticos e rótulo visível.
- Não fabricar depoimentos, métricas de ROI, clientes, logos, prêmios, endereço, horário ou resultados.
- Sem backend de lead/formulário nesta fase.
- Sem autenticação, banco de dados, volume, storage persistente ou runtime de servidor.
- O formulário de contato monta a mensagem e abre o WhatsApp; um eventual endpoint de captura
  futuro troca o manipulador de `submit`, não o desenho da página.
- Todo o conteúdo comercial deve existir no HTML inicial, sem depender de JavaScript para ser lido.
- Sem etapa de build e sem dependências de runtime: a página é servida como está.
- O campo de linhas do hero não pode virar dependência: se o WebGL2 faltar, a página
  continua idêntica sem ele. Nenhuma informação pode depender do canvas.
- Deploy target decidido: GitHub Pages na raiz do domínio (`https://gustavomgaspar.github.io/`).
- Custom domain/DNS: continua em decisão. Quando houver, basta criar o `CNAME` no repositório
  de site de usuário e apontar o DNS — o restante do setup não muda.
- Nicho-alvo e sistemas legados tipicamente integrados: deliberadamente em aberto — são as perguntas deixadas sem resposta no final de `copy.md`. Não nichar a oferta sem decisão registrada do usuário.

## Brand Commitments

Nome: Gaspar.

Tom: direto, executivo e comercial, sem hype vazio; fala para decisores de empresas consolidadas, não para startups em estágio inicial.

Idioma: português do Brasil.

Marca e oferta se apoiam em credibilidade técnica, responsabilidade comercial e clareza de ROI. O site não deve prometer crescimento garantido nem usar provas inventadas.

O hero carrega um único elemento gráfico decorativo: um campo de linhas onduladas gerado em
tempo real, com movimento lento e sem interação com o mouse. Ele é decorativo — não
interage, não aparece na árvore de acessibilidade e some por completo onde não há
WebGL2. O texto do hero mantém contraste WCAG AA sobre ele.

A única imagem da página é a logo da marca (o mascote do Gaspar), usada como lockup no
header e no rodapé e como favicon. É a assinatura da marca, não decoração — a regra é
zero ilustrações, não zero marca.

## Evidence on Hand

- `copy.md` — conteúdo comercial confirmado, fornecido pelo usuário.
- Número de contato confirmado: WhatsApp `+55 15 99818-2559`.
- Não há cases públicos, métricas de clientes, depoimentos, logos, certificações ou resultados verificados disponíveis no repositório.
- O site anterior e seus assets (Rust/Leptos, `Dockerfile`, `Cargo.toml`) foram removidos do working tree por decisão do usuário; o histórico Git pode ser inspecionado como evidência, mas não é autoridade visual.
- A fase anterior foi encerrada: a landing entregue nesta rodada é HTML/CSS/JS estático.
- Estado do working tree em 2026-11-12: a fase anterior (Rust/Leptos + `Dockerfile`) estava de fato presente e idêntica ao HEAD (`040ee23`), apesar de o init registrar o contrário. O usuário confirmou a remoção como decisão nesta rodada; o histórico Git preserva o código anterior.

## Product Principles

1. **Clareza antes de persuasão vazia:** explicar o mecanismo e a promessa com linguagem comercial concreta.
2. **Prova permitida, não inventada:** usar demonstração ilustrativa e o diagnóstico gratuito como evidência, sem fabricar resultados.
3. **Do clique ao caixa:** manter a narrativa ligando site, processos, CRM/ERP, automação e métricas ao faturamento.
4. **Execução enxuta:** poucos caminhos, poucos elementos, uma conversão principal.
5. **Robustez sem espetáculo:** acessibilidade, performance e operação simples em primeiro lugar.

## Accessibility & Inclusion

Meta interna: WCAG 2.2 AA.

- Conteúdo e CTAs legíveis no HTML inicial;
- navegação por teclado e foco visível;
- contraste suficiente;
- layout responsivo e sem dependência de hover;
- suporte a `prefers-reduced-motion`;
- demo interativa operável por teclado;
- WhatsApp como link real, com rótulo acessível.
