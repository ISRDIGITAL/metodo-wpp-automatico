import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const NOTIFY_TO = "ivanricarte6@gmail.com";

const buildWhatsappLink = (telefone: string, nome: string) => {
  const digits = telefone.replace(/\D/g, "");
  const phone = digits.startsWith("55") ? digits : `55${digits}`;
  const text = encodeURIComponent(
    `Olá ${nome}! Aqui é o Ivan Sodré. Recebi seu formulário do diagnóstico. Podemos falar?`,
  );
  return `https://api.whatsapp.com/send/?phone=${phone}&text=${text}&type=phone_number&app_absent=0`;
};

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const lead = await req.json();
    const required = ["nome", "tipo_negocio", "investimento", "whatsapp", "urgencia"];
    for (const f of required) {
      if (!lead?.[f] || typeof lead[f] !== "string" || lead[f].length > 200) {
        return new Response(
          JSON.stringify({ error: `Campo inválido: ${f}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    const wppLink = buildWhatsappLink(lead.whatsapp, lead.nome);
    const row = (label: string, value: string) =>
      `<tr><td style="padding:12px;border-bottom:1px solid #262626;color:#00C896;font-weight:bold;width:42%">${label}</td><td style="padding:12px;border-bottom:1px solid #262626">${escapeHtml(value)}</td></tr>`;

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0f0f0f;color:#fff;border-radius:12px">
        <h1 style="color:#00C896;margin:0 0 16px;font-size:22px">Novo lead do Diagnóstico R$97</h1>
        <p style="margin:0 0 20px;color:#bbb">Alguém acabou de preencher o formulário no site.</p>
        <table style="width:100%;border-collapse:collapse;background:#1a1a1a;border-radius:8px;overflow:hidden">
          ${row("Nome", lead.nome)}
          ${row("Tipo de negócio", lead.tipo_negocio)}
          ${row("Investimento/mês", lead.investimento)}
          ${row("WhatsApp", lead.whatsapp)}
          ${row("Urgência", lead.urgencia)}
        </table>
        <div style="text-align:center;margin-top:24px">
          <a href="${wppLink}" style="display:inline-block;background:#00C896;color:#0f0f0f;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold">Abrir WhatsApp do lead</a>
        </div>
        <p style="margin-top:24px;color:#777;font-size:12px;text-align:center">Ivan Sodré — captação automática</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Diagnóstico <onboarding@resend.dev>",
        to: [NOTIFY_TO],
        subject: `Novo lead: ${lead.nome} — ${lead.tipo_negocio} (${lead.urgencia})`,
        html,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend error:", data);
      return new Response(JSON.stringify({ error: "Email send failed", data }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
