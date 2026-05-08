import Link from "next/link";
import { antiStrats } from "@/lib/data/anti-strats";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Anti Strats — Coaching Hub" };

const mapColors: Record<string, string> = {
  Bind: "#ff4757",
  Haven: "#4ecdc4",
  Split: "#ff9f43",
  Abyss: "#a29bfe",
  Breeze: "#e8ff47",
  Corrode: "#5a5f72",
};

export default function AntiStratsPage() {
  return (
    <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 60px 80px" }}>
      {/* Header */}
      <div
        style={{
          position: "relative",
          padding: "60px 0 40px",
          borderBottom: "1px solid #1e2128",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(100px, 16vw, 240px)",
            color: "transparent",
            WebkitTextStroke: "1px #1e2128",
            position: "absolute",
            right: "-20px",
            top: "-20px",
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          STRAT
        </div>
        <div
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "11px",
            color: "#ff4757",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "12px",
            position: "relative",
          }}
        >
          // Enemy Analysis
        </div>
        <h1
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 800,
            letterSpacing: "-2px",
            lineHeight: 1,
            color: "#e2e4ea",
            position: "relative",
          }}
        >
          ANTI <span style={{ color: "#ff4757" }}>STRATS</span>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "13px",
            color: "#5a5f72",
            marginTop: "16px",
            position: "relative",
          }}
        >
          {antiStrats.length} opponents analysed
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: "16px",
          paddingTop: "48px",
        }}
      >
        {antiStrats.map((strat) => {
          const accent = mapColors[strat.map] ?? "#5a5f72";
          return (
            <Link
              key={strat.slug}
              href={`/anti-strats/${strat.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  background: "#111318",
                  border: "1px solid #1e2128",
                  borderRadius: "8px",
                  padding: "28px 32px",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "3px",
                    height: "100%",
                    background: accent,
                  }}
                />

                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "11px",
                    letterSpacing: "3px",
                    color: accent,
                    marginBottom: "6px",
                  }}
                >
                  {strat.map}
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "#e2e4ea",
                    letterSpacing: "-0.5px",
                    marginBottom: "8px",
                  }}
                >
                  ANTI STRAT
                </div>

                {strat.opponent && (
                  <div
                    style={{
                      fontFamily: "var(--font-dm-mono)",
                      fontSize: "13px",
                      color: "#e2e4ea",
                      opacity: 0.6,
                      marginBottom: "16px",
                    }}
                  >
                    vs {strat.opponent}
                  </div>
                )}

                <div
                  style={{
                    fontFamily: "var(--font-dm-mono)",
                    fontSize: "11px",
                    color: "#5a5f72",
                  }}
                >
                  {strat.sections.length} sections
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
