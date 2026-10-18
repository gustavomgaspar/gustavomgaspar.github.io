import "./styles.css";
import { initAnalytics, track } from "./lib/analytics";
import settings from "../content/settings.json";

/* ============================================================
   GASPAR — interações da landing
   JS mínimo: links de WhatsApp rastreáveis, máscara/validação
   do formulário, marcos de scroll e reveal. Zero framework.
   ============================================================ */

initAnalytics();

/* ---------- Links de WhatsApp (deep-link + UTM + evento) ---------- */
function waUrl(secao: string): string {
  const params = new URLSearchParams({
    text: settings.whatsappMsg,
    utm_source: "site",
    utm_medium: "cta",
    utm_campaign: "analise_gratis",
    utm_content: secao,
  });
  return `https://wa.me/${settings.whatsapp}?${params.toString()}`;
}

for (const el of document.querySelectorAll<HTMLAnchorElement>("[data-wa]")) {
  const secao = el.dataset.secao ?? "site";
  el.href = waUrl(secao);
  el.target = "_blank";
  el.rel = "noopener";
  el.addEventListener("click", () => track("clique_whatsapp", { secao }));
}

/* ---------- FAQ ---------- */
for (const el of document.querySelectorAll<HTMLDetailsElement>(".faq-item")) {
  el.addEventListener("toggle", () => {
    if (el.open) track("faq_abrir", { pergunta: el.querySelector("summary span")?.textContent ?? "" });
  });
}

/* ---------- Marcos de scroll (uma vez cada) ---------- */
const milestones = [50, 90] as const;
const seen = new Set<number>();
function scrollCheck(): void {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  if (max <= 0) return;
  const pct = Math.round((window.scrollY / max) * 100);
  for (const m of milestones) {
    if (!seen.has(m) && pct >= m) {
      seen.add(m);
      track(`scroll_${m}`);
    }
  }
}
window.addEventListener("scroll", scrollCheck, { passive: true });

/* ============================================================
   Formulário de lead
   Fluxo: valida → POST /api/lead (Cloudflare Pages Function)
   → sucesso: mensagem inline; falha (dev/404): abre o WhatsApp
   com mensagem pré-preenchida — nunca perde o lead.
   ============================================================ */

const form = document.querySelector<HTMLFormElement>("#lead-form");
const feedback = document.querySelector("#form-feedback");
const waInput = document.querySelector<HTMLInputElement>("#lead-whatsapp");

/* Máscara leve de telefone BR: (15) 99999-9999 */
function maskPhone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, d.length === 11 ? 7 : 6)}-${d.slice(d.length === 11 ? 7 : 6)}`;
}

waInput?.addEventListener("input", () => {
  waInput.value = maskPhone(waInput.value);
});

function setFeedback(msg: string, kind: "ok" | "err"): void {
  if (!feedback) return;
  feedback.textContent = msg;
  feedback.className = `form-feedback ${kind}`;
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = form.elements.namedItem("nome") as HTMLInputElement;
  const whatsapp = form.elements.namedItem("whatsapp") as HTMLInputElement;
  const negocio = form.elements.namedItem("negocio") as HTMLInputElement;
  const honeypot = form.elements.namedItem("website") as HTMLInputElement;

  /* Honeypot: bots preenchem, humanos não veem */
  if (honeypot?.value) return;

  const digits = whatsapp.value.replace(/\D/g, "");
  let invalid = false;
  for (const input of [nome, whatsapp, negocio]) {
    const bad = !input.value.trim() || (input === whatsapp && digits.length < 10);
    input.classList.toggle("is-invalid", bad);
    if (bad) invalid = true;
  }
  if (invalid) {
    setFeedback("Confere os campos destacados aí em cima.", "err");
    return;
  }

  const submitBtn = form.querySelector<HTMLButtonElement>("button[type=submit]")!;
  submitBtn.disabled = true;

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        nome: nome.value.trim(),
        whatsapp: digits,
        negocio: negocio.value.trim(),
        origem: location.href,
      }),
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    track("submit_form", { resultado: "enviado" });
    setFeedback("Recebido! Resposta em até 1 dia útil, direto no seu WhatsApp.", "ok");
    form.reset();
  } catch {
    /* Sem backend (dev ou falha): não perde o lead — abre o WhatsApp */
    track("submit_form", { resultado: "fallback_whatsapp" });
    setFeedback("Te leva direto ao WhatsApp…", "ok");
    window.open(waUrl("form_fallback"), "_blank", "noopener");
  } finally {
    submitBtn.disabled = false;
  }
});
