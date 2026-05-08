import React from "react";
import { AccentColor } from "@/lib/types";

const accentColors: Record<AccentColor, string> = {
  teal: "#4ecdc4",
  red: "#ff4757",
  orange: "#ff9f43",
  purple: "#a29bfe",
  yellow: "#e8ff47",
};

interface StratBlockProps {
  accent: AccentColor;
  blockTitle: string;
  items: string[];
  agents?: string[];
}

export function StratBlock({ accent, blockTitle, items, agents }: StratBlockProps) {
  const color = accentColors[accent];

  return (
    <div
      style={{
        background: "#111318",
        border: "1px solid #1e2128",
        borderRadius: "8px",
        padding: "28px 32px",
        marginBottom: "16px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "3px",
          height: "100%",
          background: color,
        }}
      />
      <div
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "4px",
          textTransform: "uppercase",
          color,
          marginBottom: "16px",
        }}
      >
        {blockTitle}
      </div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              gap: "14px",
              alignItems: "flex-start",
              color: "#e2e4ea",
              opacity: 0.85,
              fontSize: "14px",
              lineHeight: 1.7,
            }}
          >
            <span style={{ color, fontSize: "12px", flexShrink: 0, marginTop: "1px" }}>→</span>
            {item}
          </li>
        ))}
      </ul>
      {agents && agents.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
          {agents.map((agent) => (
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
