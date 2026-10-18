/**
 * GASPAR — camada de métricas (lgpd-friendly, sem cookies).
 *
 * Eventos do negócio são emitidos UMA vez aqui e os adapters decidem
 * o que fazer com eles. Trocar de backend (Umami, Plausible, GA4...)
 * não exige reescrever nenhum evento — só configurar o adapter.
 *
 * Adapters:
 *  - clarity            (grátis, qualitativo: heatmaps/sessões + eventos)
 *  - cfWebAnalytics     (grátis, números: só pageview via beacon)
 *  - umami              (self-host: pageview + eventos custom)
 *  - noop               (fallback seguro)
 */

import settings from "../../content/settings.json";

export type EventData = Record<string, string | number | boolean>;

interface AnalyticsAdapter {
  init(): void;
  track(name: string, data?: EventData): void;
}

/* ---------- Clarity (Microsoft, cookieless) ---------- */
declare global {
  interface Window {
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
    umami?: { track: (name: string, data?: EventData) => void };
  }
}

const clarityAdapter: AnalyticsAdapter = {
  init() {
    const id = settings.analytics.clarityId;
    if (!id) return;
    window.clarity = window.clarity || ((...args: unknown[]) => {
      (window.clarity!.q = window.clarity!.q || []).push(args);
    });
    injectScript(`https://www.clarity.ms/tag/${id}`);
  },
  track(name, data) {
    if (!settings.analytics.clarityId || typeof window.clarity !== "function") return;
    // Clarity espera atributos simples
    window.clarity("event", name);
    if (data) {
      for (const [k, v] of Object.entries(data)) window.clarity("set", `ev_${k}`, String(v));
    }
  },
};

/* ---------- Cloudflare Web Analytics (números, cookieless) ---------- */
const cfAdapter: AnalyticsAdapter = {
  init() {
    const token = settings.analytics.cfBeaconToken;
    if (!token) return;
    injectScript("https://static.cloudflareinsights.com/beacon.min.js", { "data-cf-beacon": `{"token": "${token}"}` });
  },
  /* CF não tem eventos custom — no-op */
  track() {},
};

/* ---------- Umami (self-host, quando configurado) ---------- */
const umamiAdapter: AnalyticsAdapter = {
  init() {
    const { umamiUrl, umamiWebsiteId } = settings.analytics;
    if (!umamiUrl || !umamiWebsiteId) return;
    injectScript(`${umamiUrl}/script.js`, { "data-website-id": umamiWebsiteId, defer: "" });
  },
  track(name, data) {
    if (!settings.analytics.umamiUrl || typeof window.umami?.track !== "function") return;
    window.umami.track(name, data);
  },
};

/* ---------- Noop ---------- */
const noopAdapter: AnalyticsAdapter = { init() {}, track() {} };

/* ---------- Composição ---------- */
const adapters: AnalyticsAdapter[] = [
  settings.analytics.clarityId ? clarityAdapter : noopAdapter,
  settings.analytics.cfBeaconToken ? cfAdapter : noopAdapter,
  settings.analytics.umamiUrl && settings.analytics.umamiWebsiteId ? umamiAdapter : noopAdapter,
];

export function initAnalytics(): void {
  for (const a of adapters) {
    try {
      a.init();
    } catch (err) {
      console.warn("[analytics] init falhou:", err);
    }
  }
}

export function track(name: string, data?: EventData): void {
  for (const a of adapters) {
    try {
      a.track(name, data);
    } catch (err) {
      console.warn(`[analytics] track(${name}) falhou:`, err);
    }
  }
}

/* ---------- Util ---------- */
function injectScript(src: string, attrs: Record<string, string> = {}): void {
  const s = document.createElement("script");
  s.src = src;
  s.defer = true;
  for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
  document.head.appendChild(s);
}
