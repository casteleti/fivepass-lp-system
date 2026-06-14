import { whatsappUrl } from "@/lib/whatsapp"

const proofs = ["3% a 5% de taxa", "Dinheiro na hora, na sua conta", "Sua marca, seu domínio", "Centenas de eventos"]

// Pitch da Hero — aparece APENAS no mobile (no desktop a Hero já mostra tudo).
// Existe pra deixar a Hero mobile limpa (só headline) pro vídeo de fundo.
export function HeroPitch() {
  return (
    <section id="hero-pitch" className="sec theme-black" style={{ paddingTop: "clamp(28px, 7vw, 56px)" }}>
      <style>{`@media (min-width: 768px) { #hero-pitch { display: none; } }`}</style>
      <div className="sec-in">
        <p className="lead" style={{ maxWidth: 600 }}>
          Chega de pagar taxas abusivas em plataformas, esperar semanas para sacar seu dinheiro e ficar divulgando a
          marca do sistema, ao invés da sua. Conheça a Fivepass, plataforma segura e com a{" "}
          <strong style={{ color: "var(--accent)" }}>MENOR TAXA</strong> do mercado.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
          <a className="cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Quero testar o sistema
          </a>
          <a className="cta-ghost" href="#virada">
            ver como funciona ↓
          </a>
        </div>

        <div style={{ display: "flex", gap: "12px 24px", flexWrap: "wrap", marginTop: 36 }}>
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
