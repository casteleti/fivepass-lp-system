import { whatsappUrl } from "@/lib/whatsapp"
import { TypewriterHeadline } from "@/components/ui/TypewriterHeadline"

const proofs = ["3% a 5% de taxa", "Dinheiro na hora, na sua conta", "Sua marca, seu domínio", "Centenas de eventos"]

export function Hero() {
  return (
    <section
      id="hero"
      className="sec theme-black"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "clamp(112px, 16vw, 150px)",
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(ellipse 90% 60% at 50% -10%, #0b2f5e 0%, transparent 60%), #07090e",
      }}
    >
      <div className="sec-in" style={{ position: "relative" }}>
        <style>{`@media (min-width: 768px) { .eyebrow-hero { font-size: 22px; letter-spacing: .06em; } }`}</style>
        <span className="eyebrow eyebrow-hero" style={{ whiteSpace: "nowrap" }}>Plataforma de Ingressos para Eventos</span>

        <TypewriterHeadline />

        <p className="lead" style={{ maxWidth: 600, marginTop: 22 }}>
          Chega de pagar taxas abusivas em plataformas, esperar semanas para sacar seu dinheiro e ficar divulgando a
          marca do sistema, ao invés da sua. Conheça a Fivepass, plataforma segura e com a{" "}
          <strong style={{ color: "var(--accent)" }}>MENOR TAXA</strong> do mercado.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }}>
          <a className="cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Quero testar o sistema
          </a>
          <a className="cta-ghost" href="#virada">
            ver como funciona ↓
          </a>
        </div>

        <div style={{ display: "flex", gap: "12px 24px", flexWrap: "wrap", marginTop: 46 }}>
          {proofs.map((p) => (
            <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--sec-text-3)" }}>
              <span style={{ color: "var(--success)", fontWeight: 800 }}>✓</span>
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
