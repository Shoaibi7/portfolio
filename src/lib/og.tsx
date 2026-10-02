import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };

/** Shared social-preview card used by the home page and each case study. */
export function renderOgImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#fafaf8",
          color: "#15171c",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#15171c",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            MS
          </div>
          <div style={{ fontSize: 28, fontWeight: 600 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, color: "#23408e", letterSpacing: 2, textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, marginTop: 18, maxWidth: 1000 }}>{title}</div>
          <div style={{ fontSize: 30, color: "#464b55", marginTop: 22, maxWidth: 980 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", height: 6, width: 160, background: "#23408e", borderRadius: 3 }} />
      </div>
    ),
    ogSize,
  );
}
