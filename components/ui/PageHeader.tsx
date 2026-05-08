import React from "react";

interface PageHeaderProps {
  tag: string;
  mapName: string;
  subtitle: string;
  meta: { label: string; value: string }[];
  accentColor?: string;
}

export function PageHeader({
  tag,
  mapName,
  subtitle,
  meta,
  accentColor = "#e8ff47",
}: PageHeaderProps) {
  return (
    <header
      style={{
        position: "relative",
        padding: "60px 60px 40px",
        borderBottom: "1px solid #1e2128",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(140px, 22vw, 340px)",
          color: "transparent",
          WebkitTextStroke: "1px #1e2128",
          position: "absolute",
          right: "-20px",
          top: "-30px",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {mapName}
      </div>

      <div
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "11px",
          color: accentColor,
          letterSpacing: "4px",
          textTransform: "uppercase",
          marginBottom: "12px",
          position: "relative",
        }}
      >
        {tag}
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
        {mapName}
        <br />
        <span style={{ color: accentColor }}>{subtitle}</span>
      </h1>

      <div
        style={{
          display: "flex",
          gap: "32px",
          marginTop: "24px",
          flexWrap: "wrap",
          position: "relative",
        }}
      >
        {meta.map(({ label, value }) => (
          <div
            key={label}
            style={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <span
              style={{
                fontSize: "10px",
                color: "#5a5f72",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#e2e4ea",
                fontWeight: 500,
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </header>
  );
}
