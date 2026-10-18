import { defineConfig, type Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";

/**
 * Content plugin — injeção de conteúdo em build-time.
 *
 * O index.html usa tokens `{{caminho.no.json}}` (ex.: `{{hero.title1}}`).
 * Em build/dev, cada token é substituído pelo valor de content/*.json,
 * escapado para HTML. Fonte única de verdade: content/ (editável pelo
 * Sveltia CMS na Fase 2). Um token não resolvido quebra o build —
 * ótimo para pegar typos cedo.
 */

const settings = JSON.parse(fs.readFileSync(path.resolve("content/settings.json"), "utf-8"));
const home = JSON.parse(fs.readFileSync(path.resolve("content/home.json"), "utf-8"));

const data: Record<string, unknown> = {
  ...home,
  settings,
  year: new Date().getFullYear(),
};

function lookup(obj: unknown, dotted: string): unknown {
  return dotted.split(".").reduce<unknown>((o, k) => {
    if (o != null && typeof o === "object") return (o as Record<string, unknown>)[k];
    return undefined;
  }, obj);
}

function esc(v: unknown): string {
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* Substituições internas nos valores de conteúdo (ex.: "© {year}") */
function deepYear(obj: unknown, year: string): unknown {
  if (typeof obj === "string") return obj.replace(/\{year\}/g, year);
  if (Array.isArray(obj)) return obj.map((o) => deepYear(o, year));
  if (obj != null && typeof obj === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) out[k] = deepYear(v, year);
    return out;
  }
  return obj;
}

function contentInject(): Plugin {
  return {
    name: "content-inject",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        const resolved = deepYear(data, String(new Date().getFullYear()));
        return html.replace(/\{\{([^}]+)\}\}/g, (_, dotted: string) => {
          const value = lookup(resolved, dotted.trim());
          if (value === undefined) throw new Error(`[content-inject] Token não resolvido: {{${dotted}}}`);
          return esc(value);
        });
      },
    },
  };
}

export default defineConfig({
  plugins: [contentInject()],
});
