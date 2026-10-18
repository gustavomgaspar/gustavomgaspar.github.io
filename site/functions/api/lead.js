/**
 * GASPAR — Cloudflare Pages Function
 * POST /api/lead
 *
 * Recebe o formulário da landing e envia o lead por e-mail.
 * Configuração (dashboard Cloudflare → Pages → Settings → Variables):
 *
 *   RESEND_API_KEY   re_...  (Resend, tier gratuito: 100 e-mails/dia)
 *   LEAD_TO          e-mail que recebe os leads (ex.: gaspar@...)
 *   LEAD_FROM        remetente (ex.: "Landing Gaspar <leads@seudominio.com>")
 *
 * Sem nenhuma variável: responde ok (o cliente JS cai no fallback
 * de WhatsApp pré-preenchido — o lead nunca se perde).
 */

interface LeadPayload {
  nome: string;
  whatsapp: string;
  negocio: string;
  origem?: string;
}

export async function onRequestPost({ request, env }: { request: Request; env: Record<string, string> }): Promise<Response> {
  let lead: LeadPayload;
  try {
    lead = await request.json();
  } catch {
    return json({ ok: false, erro: "payload inválido" }, 400);
  }

  const nome = String(lead.nome ?? "").trim();
  const whatsapp = String(lead.whatsapp ?? "").replace(/\D/g, "");
  const negocio = String(lead.negocio ?? "").trim();

  if (nome.length < 2 || whatsapp.length < 10 || negocio.length < 1) {
    return json({ ok: false, erro: "campos inválidos" }, 422);
  }

  const texto =
    `Novo lead do site — análise gratuita\n` +
    `Nome: ${nome}\n` +
    `WhatsApp: +55 ${whatsapp}\n` +
    `Negócio: ${negocio}\n` +
    `Origem: ${lead.origem ?? "-"}`;

  try {
    if (env.RESEND_API_KEY && env.LEAD_TO) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          authorization: `Bearer ${env.RESEND_API_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from: env.LEAD_FROM ?? "Landing Gaspar <leads@resend.dev>",
          to: env.LEAD_TO,
          subject: `Análise grátis: ${negocio} — ${nome}`,
          text: texto,
        }),
      });
      if (!res.ok) throw new Error(`resend HTTP ${res.status}`);
      return json({ ok: true, modo: "email" });
    }
    return json({ ok: true, modo: "nenhum", nota: "configure RESEND_API_KEY e LEAD_TO" });
  } catch (err) {
    return json({ ok: false, erro: String(err) }, 500);
  }
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
