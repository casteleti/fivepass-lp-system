import { whatsappUrl } from "@/lib/whatsapp"

export function Footer() {
  return (
    <footer style={{ padding: "56px 24px", background: "var(--bg-darker)", borderTop: "1px solid var(--border)", textAlign: "center" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fivepass-site-01.png"
          alt="Fivepass"
          width={150}
          height={33}
          style={{ height: "28px", width: "auto", margin: "0 auto 16px" }}
        />
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "20px" }}>
          Mais eventos. Menos taxas.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent)", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
        >
          Quero testar o sistema →
        </a>
        <p style={{ color: "var(--text-tertiary)", fontSize: "12px", marginTop: "28px" }}>
          © 2026 Fivepass · Plataforma de ticketing white-label
        </p>
      </div>
    </footer>
  )
}
