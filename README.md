# Gaspar — Landing de Modernização Digital

Landing page SSR (Rust + Leptos + Axum) para a oferta de modernização digital
do Gaspar, destinada a empresas consolidadas. Conteúdo comercial derivado de
`copy.md`; nada de provas ou métricas inventadas.

## Stack

- **Leptos 0.8 SSR + Axum** — todo o conteúdo real existe no HTML inicial;
  a demo do painel de métricas interativa entra via hidratação.
- **cargo-leptos 0.3.11** — coordena o build do binário nativo e do Wasm.
- **CSS puro com tokens OKLCH** (`public/styles/app.css`), sem Tailwind.
- **Deploy: Railway** via Dockerfile multi-stage.

## Desenvolvimento local

```bash
rustup target add wasm32-unknown-unknown          # uma única vez
cargo leptos watch                                # http://127.0.0.1:3000
```

Verificações:

```bash
cargo fmt --all
cargo clippy --all-targets -- -D warnings
cargo check --no-default-features --features hydrate --target wasm32-unknown-unknown
```

## Estrutura

```text
src/
  app.rs            shell SSR + rotas
  main.rs           servidor Axum (PORT, /healthz, arquivos estáticos)
  lib.rs            hidratação do cliente
  content.rs        constantes do conteúdo (link do WhatsApp)
  components/       header, hero, gargalos, oferta, painel, objeções, CTA, footer
public/styles/      app.css (tokens + layout responsivo)
```

## Build e deploy (Railway)

1. Faça push deste repositório para o GitHub.
2. No Railway: **New Project → Deploy from GitHub repo**, selecione o repositório
   e a branch. O Railway detecta o `Dockerfile` da raiz automaticamente.
3. Na aba **Networking**, gere um **public domain** (ou conecte um domínio próprio).
4. Em **Deploy**, confirme o healthcheck apontando para `/healthz`.
5. A porta é automática: o servidor faz bind em `0.0.0.0:$PORT` (a variável
   `PORT` é injetada pelo Railway). Não precisa configurar manualmente.

Deploy manual via CLI, se preferir:

```bash
railway up       # build + deploy usando o Dockerfile
railway logs     # acompanhar o boot
```

## Healthcheck

`GET /healthz` → `200 OK` com corpo `ok`. Requisição leve, sem lógica, usada
pelo Railway (e pelo `HEALTHCHECK` do Dockerfile) para validar o boot.

## Limites assumidos

- Sem backend de leads/formulários — conversão direto no WhatsApp.
- Sem banco de dados, volume ou storage persistente (serviço stateless).
- O painel de métricas é **demo ilustrativa com dados sintéticos**, rotulada
  como tal na própria página (ver `PRODUCT.md`).
