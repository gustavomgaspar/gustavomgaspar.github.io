# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Leptos SSR + Axum + cargo-leptos, escolhidos pelo usuário.

Deploy: Railway, usando Dockerfile no root.

Runtime: servidor Rust stateless em `0.0.0.0`, porta via variável `PORT`; fallback local `3000`.

Healthcheck: `/healthz`.

Build: `cargo-leptos`; assets em `target/site`.

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
- Sem autenticação, banco de dados, volume Railway ou storage persistente.
- SSR + hidratação Leptos/Axum; conteúdo principal deve existir no HTML inicial.
- Deploy em Railway via Dockerfile; serviço stateless e escalável horizontalmente.
- Deploy target não inclui custom domain ou DNS nesta definição.

## Brand Commitments

Nome: Gaspar.

Tom: direto, executivo e comercial, sem hype vazio; fala para decisores de empresas consolidadas, não para startups em estágio inicial.

Idioma: português do Brasil.

Marca e oferta se apoiam em credibilidade técnica, responsabilidade comercial e clareza de ROI. O site não deve prometer crescimento garantido nem usar provas inventadas.

## Evidence on Hand

- `copy.md` — conteúdo comercial confirmado, fornecido pelo usuário.
- Número de contato confirmado: WhatsApp `+55 15 99818-2559`.
- Não há cases públicos, métricas de clientes, depoimentos, logos, certificações ou resultados verificados disponíveis no repositório.
- O site anterior e seus assets estão deletados no working tree; o histórico Git pode ser inspecionado como evidência, mas não é autoridade visual.
- `Dockerfile` será configurado para Railway; Railway fornece `PORT` e public domain.

## Product Principles

1. **Clareza antes de persuasão vazia:** explicar o mecanismo e a promessa com linguagem comercial concreta.
2. **Prova permitida, não inventada:** usar demonstração ilustrativa e o diagnóstico gratuito como evidência, sem fabricar resultados.
3. **Do clique ao caixa:** manter a narrativa ligando site, processos, CRM/ERP, automação e métricas ao faturamento.
4. **Execução enxuta:** poucos caminhos, poucos elementos, uma conversão principal.
5. **Robustez sem espetáculo:** acessibilidade, SSR, performance e operação simples em primeiro lugar.

## Accessibility & Inclusion

Meta interna: WCAG 2.2 AA.

- Conteúdo e CTAs legíveis no HTML inicial;
- navegação por teclado e foco visível;
- contraste suficiente;
- layout responsivo e sem dependência de hover;
- suporte a `prefers-reduced-motion`;
- demo interativa operável por teclado;
- WhatsApp como link real, com rótulo acessível.
