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
          background: "#fdf6e9",
          color: "#083020",
          padding: "72px 80px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#083020",
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
              fontSize: 48,
              lineHeight: 1.15,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              maxWidth: 980,
            }}
          >
            A testing system your team can own, built to ship faster with fewer flakes.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 36,
            color: "#083020",
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          <span>Lead SDET</span>
          <span>10 years in test automation</span>
          <span>Playwright focus</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
