// Link único de WhatsApp usado por todos os CTAs da landing page.
// Para trocar o número/mensagem, edite NEXT_PUBLIC_WHATSAPP_PHONE / _MESSAGE no .env.
// (Se um dia o CTA virar formulário, basta trocar os <a> por <button> — a copy não muda.)

export const WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "5511999999999" // ⚠️ placeholder — trocar pelo número real

export const WHATSAPP_MESSAGE =
  process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
  "Olá! Quero saber como a Fivepass dá mais margem no meu evento."

export const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`
