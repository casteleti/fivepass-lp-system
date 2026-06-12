import { whatsappUrl } from "@/lib/whatsapp"

export function FinalCTA() {
  return (
    <section
      id="cta"
      className="sec theme-blue"
      style={{
        background:
          "radial-gradient(ellipse 90% 80% at 50% 120%, rgba(0,217,255,.22) 0%, transparent 60%), linear-gradient(180deg, #0b2447, #0a1c38)",
      }}
    >
      <div className="sec-in" style={{ maxWidth: 680, textAlign: "center" }}>
        <h2 className="h2">
          Seu evento terminou. Seu dinheiro já está na <span className="accent">sua conta</span>.
        </h2>

        <p className="lead" style={{ marginTop: 20 }}>
          Fale com a gente no WhatsApp. Mostramos a plataforma rodando e calculamos, na sua frente, quanto a sua
          operação para de perder em taxa.
        </p>

        <div style={{ marginTop: 32 }}>
          <a className="cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ padding: "18px 40px", fontSize: 17 }}>
            Quero testar o sistema
          </a>
        </div>

        <p style={{ fontSize: 13, color: "var(--sec-text-3)", marginTop: 18 }}>
          Sem compromisso. Atendimento humano, resposta rápida.
        </p>
      </div>
    </section>
  )
}
