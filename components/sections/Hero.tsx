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
      {/* Fundo em vídeo — só no mobile (no desktop fica o gradiente) */}
      <video
        className="hero-bg-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/hero-mobile-poster.jpg"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
      >
        <source src="/videos/hero-mobile.mp4" type="video/mp4" />
      </video>
      <div
        className="hero-bg-overlay"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,.62) 0%, rgba(0,0,0,.58) 38%, rgba(4,6,11,.96) 100%)",
        }}
      />

      <div className="sec-in" style={{ position: "relative", zIndex: 2 }}>
        <style>{`
          @media (min-width: 768px) { .eyebrow-hero { font-size: 22px; letter-spacing: .06em; } .hero-bg-video, .hero-bg-overlay { display: none !important; } }
          @media (max-width: 767px) { .hero-hide-mobile { display: none !important; } }
        `}</style>
        <span className="eyebrow eyebrow-hero" style={{ whiteSpace: "nowrap" }}>Plataforma de Ingressos para Eventos</span>

        <TypewriterHeadline />

        <p className="lead hero-hide-mobile" style={{ maxWidth: 600, marginTop: 22 }}>
          Chega de pagar taxas abusivas em plataformas, esperar semanas para sacar seu dinheiro e ficar divulgando a
          marca do sistema, ao invés da sua. Conheça a Fivepass, plataforma segura e com a{" "}
          <strong style={{ color: "var(--accent)" }}>MENOR TAXA</strong> do mercado.
        </p>

        <div className="hero-hide-mobile" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }}>
          <a className="cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Quero pagar menos taxa
          </a>
          <a className="cta-ghost" href="#virada">
            ver como funciona ↓
          </a>
        </div>

        <div className="hero-hide-mobile" style={{ display: "flex", gap: "12px 24px", flexWrap: "wrap", marginTop: 46 }}>
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
