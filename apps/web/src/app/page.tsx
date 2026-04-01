import {
  demoMailboxMetrics,
  enterpriseCapabilities,
  performanceTargets
} from "@mailio/shared";

const panels = [
  {
    title: "Tenant Operations",
    description: "Role-aware admin tools, shared mailbox governance, and audit-ready actions."
  },
  {
    title: "Mailbox Throughput",
    description: "Cursor pagination, precomputed threads, and streaming attachments for heavy workloads."
  },
  {
    title: "Security Posture",
    description: "Provider-safe auth, encrypted secret storage, secure session handling, and audit logging."
  }
] as const;

export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 20,
          marginBottom: 20
        }}
      >
        <div
          style={{
            background: "var(--panel)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: 24
          }}
        >
          <p style={{ color: "var(--accent)", marginTop: 0 }}>Mailio</p>
          <h1 style={{ marginTop: 0, fontSize: 40 }}>Enterprise mail built for scale.</h1>
          <p style={{ color: "var(--muted)", maxWidth: 760, lineHeight: 1.5 }}>
            Mailio is designed for dense enterprise workflows, large shared mailbox access,
            and million-scale email datasets without pushing provider APIs onto the browser.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
            {performanceTargets.map((metric) => (
              <div
                key={metric.label}
                style={{
                  background: "var(--panel-2)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  minWidth: 190
                }}
              >
                <div style={{ color: "var(--muted)", fontSize: 13 }}>{metric.label}</div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{metric.target}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            background: "var(--panel)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: 24
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: 20 }}>Mailbox snapshot</h2>
          {demoMailboxMetrics.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid var(--border)"
              }}
            >
              <span style={{ color: "var(--muted)" }}>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 20
        }}
      >
        {panels.map((panel) => (
          <article
            key={panel.title}
            style={{
              background: "var(--panel)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: 20
            }}
          >
            <h2 style={{ marginTop: 0 }}>{panel.title}</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.5 }}>{panel.description}</p>
          </article>
        ))}
      </section>

      <section
        style={{
          marginTop: 20,
          background: "var(--panel)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: 20
        }}
      >
        <h2 style={{ marginTop: 0 }}>Enterprise capabilities</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 12
          }}
        >
          {enterpriseCapabilities.map((feature) => (
            <div
              key={feature}
              style={{
                padding: 14,
                borderRadius: 12,
                background: "var(--panel-2)",
                border: "1px solid var(--border)"
              }}
            >
              {feature}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
