import React from "react";
import { StratCard as StratCardType } from "@/lib/types";

const colorMap: Record<string, { accent: string; labelStyle: React.CSSProperties }> = {
  teal: {
    accent: "#4ecdc4",
    labelStyle: {
      background: "rgba(78,205,196,0.1)",
      color: "#4ecdc4",
      border: "1px solid rgba(78,205,196,0.25)",
    },
  },
  red: {
    accent: "#ff4757",
    labelStyle: {
      background: "rgba(255,71,87,0.1)",
      color: "#ff4757",
      border: "1px solid rgba(255,71,87,0.25)",
    },
  },
  yellow: {
    accent: "#e8ff47",
    labelStyle: {
      background: "rgba(232,255,71,0.1)",
      color: "#e8ff47",
      border: "1px solid rgba(232,255,71,0.25)",
    },
  },
  orange: {
    accent: "#ff9f43",
    labelStyle: {
      background: "rgba(255,159,67,0.1)",
      color: "#ff9f43",
      border: "1px solid rgba(255,159,67,0.25)",
    },
  },
  purple: {
    accent: "#a29bfe",
    labelStyle: {
      background: "rgba(162,155,254,0.1)",
      color: "#a29bfe",
      border: "1px solid rgba(162,155,254,0.25)",
    },
  },
};

interface StratCardProps {
  card: StratCardType;
  style?: React.CSSProperties;
}

export function StratCard({ card, style }: StratCardProps) {
  const { accent, labelStyle } = colorMap[card.color] ?? colorMap.teal;

  return (
    <div
      style={{
        background: "#111318",
        border: "1px solid #1e2128",
        borderRadius: "8px",
        padding: "22px 26px",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.2s, transform 0.2s",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "3px",
          height: "100%",
          background: accent,
          borderRadius: "0 8px 8px 0",
        }}
      />

      <div
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "11px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          marginBottom: "10px",
          display: "inline-block",
          padding: "3px 10px",
          borderRadius: "2px",
          ...labelStyle,
        }}
      >
        {card.label}
      </div>

      <div
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "15px",
          fontWeight: 700,
          marginBottom: "8px",
          color: "#e2e4ea",
          letterSpacing: "-0.2px",
        }}
      >
        {card.heading}
      </div>

      <p
        style={{
          color: "#e2e4ea",
          opacity: 0.85,
          fontSize: "14px",
          lineHeight: 1.7,
        }}
      >
        {card.text}
      </p>

      {card.agents && card.agents.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>
          {card.agents.map((agent) => (
            <span
              key={agent}
              style={{
                fontSize: "10px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                padding: "3px 10px",
                borderRadius: "20px",
                background: "#16181f",
                border: "1px solid #1e2128",
                color: "#5a5f72",
              }}
            >
              {agent}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
