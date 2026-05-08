import React from "react";
import { Side } from "@/lib/types";

interface GeneralBlockProps {
  side: Side;
  title: string;
  notes: string[];
}

export function GeneralBlock({ side, title, notes }: GeneralBlockProps) {
  const accentColor = side === "attack" ? "#ff6b6b" : "#4ecdc4";

  return (
    <div
      style={{
        background: "#111318",
        border: "1px solid #1e2128",
        borderRadius: "8px",
        padding: "28px 32px",
        marginBottom: "32px",
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
          background: accentColor,
        }}
      />
      <div
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: accentColor,
          marginBottom: "16px",
        }}
      >
        {title}
      </div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
        {notes.map((note, i) => (
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
            <span style={{ color: accentColor, fontSize: "12px", flexShrink: 0, marginTop: "1px" }}>
              →
            </span>
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}
