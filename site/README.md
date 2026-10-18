# GASPAR — Landing (Vite + vanilla TS)

Landing de alta conversão baseada no redesign DesignCraft
(`../gaspar-presenca-digital.designcraft`). Zero framework —
JS mínimo só para interações.

## Comandos

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # dist/ (estático, SEO pronto)
npm run preview   # serve o build
```

## Estrutura

```
index.html            ← markup com tokens {{caminho.no.json}}
vite.config.ts        ← plugin content-inject (tokens → content/*.json)
content/
  settings.json       ← marca, telefone/WhatsApp, nav, ids de analytics
  home.json           ← TODA a copy (editável pelo Sveltia CMS — Fase 2)
src/
  styles.css          ← tokens do redesign (creme/tinta/coral) + layout
  main.ts             ← interações: wa.me rastreável, form, scroll, reveal
  lib/analytics.ts    ← camada de métricas (clarity/CF/umami pluggables)
public/
  fonts/              ← subset woff2 self-hosted (~61 KB total)
  _headers, robots.txt, favicon.svg
functions/api/lead.js ← Cloudflare Pages Function (envio de lead)
```

## Fontes (licenças)

- **Rubik** — OFL, instâncias 400/500/700 geradas da variável (Google Fonts)
- **ProFont IIx** — freeware (Mike Smith), usada nos títulos/wordmark
- Subsets gerados com `pyftsubset` (fonttools)

## Métricas (LGPD-friendly, cookieless)

Configurar em `content/settings.json → analytics`:

- `clarityId` — Microsoft Clarity (heatmaps/sessões grátis)
- `cfBeaconToken` — Cloudflare Web Analytics (números grátis)
- `umamiUrl` + `umamiWebsiteId` — quando subir o Umami self-host

Eventos já instrumentados: `clique_whatsapp{secao}`, `faq_abrir`,
`scroll_50`, `scroll_90`, `submit_form{resultado}`.

Sem cookies → não exige banner de consentimento (manter política
de privacidade publicada).

## Formulário

`POST /api/lead` (Pages Function). Env vars no Cloudflare:

- `RESEND_API_KEY` (tier grátis 100/dia) + `LEAD_TO` + `LEAD_FROM`

Sem backend configurado, o JS cai no fallback: abre o WhatsApp com
mensagem pré-preenchida — o lead nunca se perde.

## Próximas fases

- **Fase 4** — GitHub → Cloudflare Pages + domínio próprio

## CMS (Sveltia) — Fase 2 ✓

Admin: `/admin/` (Sveltia CMS via CDN; edita os JSONs de `content/` direto).

**Local (dev):**
1. `npm run dev`
2. Chrome/Edge/Brave → `http://localhost:5173/admin/index.html`
3. **"Work with Local Repository"** → selecione a pasta raiz do projeto
   (precisa de `.git` — já inicializado). Sem login.
4. Opcional: Settings → Developer → **Commit Changes to Git** (o CMS comita por você)

**Produção (deploy na Fase 4):**
- Abra `/admin/` no site no ar → **Sign In with Token** → cole um
  [PAT do GitHub](https://github.com/settings/personal-access-tokens/new)
  (fine-grained: **Contents + Pull requests** read/write)
- Sem OAuth app, sem worker, sem custo

**Validação de sincronia config ↔ conteúdo:**

```bash
npm run check
```

Rodar sempre que editar `config.yml` ou os JSONs de conteúdo.
