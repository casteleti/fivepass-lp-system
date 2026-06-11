export function Footer() {
  return (
    <footer
      style={{
        padding: "48px 24px",
        background: "var(--bg-darker)",
        borderTop: "1px solid var(--border)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ fontWeight: 800, fontSize: "20px", color: "var(--text-primary)", marginBottom: "16px" }}>
          Five<span style={{ color: "var(--accent)" }}>pass</span>
        </div>
        <p style={{ color: "var(--text-tertiary)", fontSize: "13px", marginBottom: "24px" }}>
          A plataforma enterprise de bilheteria para quem leva eventos a sério.
        </p>
        <p style={{ color: "var(--text-tertiary)", fontSize: "12px" }}>
          © {new Date().getFullYear()} Fivepass. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
