import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          color: "#fafafa",
          padding: "72px 80px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 55% at 50% -10%, rgba(6,182,212,0.16), transparent 58%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#22d3ee",
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Aslan Consulting LLC
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 36,
              fontSize: 64,
              lineHeight: 1.12,
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            <div>Centralize the test platform.</div>
            <div style={{ color: "#a1a1aa" }}>Distribute the engineers.</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 36,
            color: "#22d3ee",
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          <span>&lt;2% flakiness</span>
          <span>3× delivery velocity</span>
          <span>40% fewer merge conflicts</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
