import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Creadify — Data-Driven Marketing That Delivers Measurable Growth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0A355B 0%, #082744 60%, #051A2E 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#0A355B",
              border: "2px solid rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "#46D3F3",
            }}
          >
            C
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, display: "flex" }}>Creadify</div>
        </div>

        <div
          style={{
            marginTop: 48,
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 920,
            display: "flex",
          }}
        >
          Data-driven marketing that delivers measurable growth
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "rgba(241,245,249,0.75)",
            maxWidth: 780,
            display: "flex",
          }}
        >
          Performance Marketing · SEO · Websites · Branding · Automation
        </div>
      </div>
    ),
    { ...size }
  );
}
