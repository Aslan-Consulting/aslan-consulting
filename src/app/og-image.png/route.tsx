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
          background: "#f7f6f2",
          color: "#18181b",
          padding: "72px 80px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 55% at 50% -10%, rgba(34,197,94,0.16), transparent 58%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#15803d",
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Testing Explained
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 36,
              fontSize: 58,
              lineHeight: 1.12,
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            Software testing, explained simply.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 36,
            color: "#16a34a",
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
