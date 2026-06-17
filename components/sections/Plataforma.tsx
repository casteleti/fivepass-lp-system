import { whatsappUrl } from "@/lib/whatsapp"

/* Sites de vendas (white-label) — sem citar nome de cliente. */
const sites = [
  { src: "/clientes/clientes-01.jpeg", alt: "Site de vendas de eventos com a marca do produtor" },
  { src: "/clientes/clientes-02.jpeg", alt: "Página de evento pronta para vender ingressos" },
  { src: "/clientes/clientes-03.jpeg", alt: "Loja de ingressos personalizada do produtor" },
]

/* Telas do painel — gestão e recebimento. */
const telas = [
  { src: "/sistema/sistema-01.jpeg", alt: "Painel com faturamento, ingressos vendidos e vendas do dia", w: 1038, h: 957 },
  { src: "/sistema/sistema-02.jpeg", alt: "Painel de público: compradores, recorrência e distribuição", w: 1138, h: 961 },
]

const dots = ["#ff5f57", "#febc2e", "#28c840"]

export function Plataforma() {
  return (
    <section id="plataforma" className="sec theme-white">
      <div className="sec-in">
        <div className="sec-head">
          <span className="eyebrow">Na prática</span>
          <h2 className="h2">
            Gerencie eventos, ingressos e <span className="accent">recebimentos</span> — num lugar só.
          </h2>
          <p className="lead" style={{ marginTop: 18 }}>
            Do clique do seu público ao dinheiro no seu caixa: tudo numa plataforma só, fácil de operar.
          </p>
        </div>

        {/* ── Bloco 1 · Site de vendas (3 celulares) ───────────────────── */}
        <div style={{ textAlign: "center", marginBottom: "clamp(22px,3vw,32px)" }}>
          <h3 style={{ fontSize: "clamp(18px,2.6vw,22px)", fontWeight: 800, letterSpacing: "-0.01em", color: "var(--sec-text)" }}>
            Seu site de vendas
          </h3>
          <p className="lead" style={{ maxWidth: 560, margin: "8px auto 0" }}>
            Seus eventos no ar, com a sua marca. O público acha, escolhe e compra em segundos.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "clamp(16px,3vw,28px)" }}>
          {sites.map((s) => (
            <div key={s.src} style={{ flex: "0 1 220px", maxWidth: 240 }}>
              <div style={{ background: "#0e1626", borderRadius: 30, padding: 7, boxShadow: "0 22px 50px rgba(14,22,38,.20)" }}>
                <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "739 / 1600", background: "#000" }}>
                  <img
                    src={s.src} alt={s.alt} width={739} height={1600} loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bloco 2 · Painel de controle (2 telas) ───────────────────── */}
        <div style={{ textAlign: "center", margin: "clamp(48px,7vw,72px) auto clamp(22px,3vw,32px)" }}>
          <h3 style={{ fontSize: "clamp(18px,2.6vw,22px)", fontWeight: 800, letterSpacing: "-0.01em", color: "var(--sec-text)" }}>
            Seu painel de controle
          </h3>
          <p className="lead" style={{ maxWidth: 560, margin: "8px auto 0" }}>
            Acompanhe vendas, ingressos e o que entra no caixa em tempo real — sem planilha, sem ligar pra ninguém.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "clamp(18px,3vw,28px)" }}>
          {telas.map((t) => (
            <div key={t.src} className="card" style={{ flex: "1 1 380px", maxWidth: 520, overflow: "hidden", boxShadow: "0 20px 46px rgba(14,22,38,.16)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", background: "#eef2f7", borderBottom: "1px solid var(--sec-border)" }}>
                {dots.map((c) => (
                  <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, display: "inline-block" }} />
                ))}
                <span style={{ marginLeft: 10, fontSize: 12, color: "#6c7788", background: "#fff", border: "1px solid var(--sec-border)", borderRadius: 6, padding: "3px 12px", flex: 1, maxWidth: 220, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                  painel.fivepass.com.br
                </span>
              </div>
              <img src={t.src} alt={t.alt} width={t.w} height={t.h} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "clamp(40px,6vw,56px)" }}>
          <a className="cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Quero esse controle no meu evento
          </a>
        </div>
      </div>
    </section>
  )
}
