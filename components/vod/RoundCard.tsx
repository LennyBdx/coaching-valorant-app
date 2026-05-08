import React from "react";
import { RoundEntry } from "@/lib/types";

const tagStyles = {
  nice: {
    background: "rgba(46,204,113,0.15)",
    color: "#2ecc71",
    border: "1px solid rgba(46,204,113,0.3)",
  },
  warn: {
    background: "rgba(232,255,71,0.1)",
    color: "#e8ff47",
    border: "1px solid rgba(232,255,71,0.25)",
  },
  info: {
    background: "rgba(78,205,196,0.1)",
    color: "#4ecdc4",
    border: "1px solid rgba(78,205,196,0.25)",
  },
};

interface RoundCardProps {
  round: RoundEntry;
  style?: React.CSSProperties;
}

export function RoundCard({ round, style }: RoundCardProps) {
  const isPositive = round.tag.type === "nice";
  const tag = tagStyles[round.tag.type];

  return (
    <div
      style={{
        background: "#111318",
        border: "1px solid #1e2128",
        borderRadius: "8px",
        padding: "20px 24px",
        position: "relative",
        transition: "border-color 0.2s, transform 0.2s",
        ...style,
      }}
      className="round-card-hover"
    >
      {/* Right accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "3px",
          height: "100%",
          background: isPositive ? "#2ecc71" : "#e8ff47",
          borderRadius: "0 8px 8px 0",
        }}
      />

      <div
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "36px",
          lineHeight: 1,
          color: "#5a5f72",
          marginBottom: "8px",
          letterSpacing: "1px",
        }}
      >
        {String(round.number).padStart(2, "0")}
        <span
          style={{
            fontSize: "13px",
            fontFamily: "var(--font-dm-mono)",
            letterSpacing: "2px",
            color: "#5a5f72",
            verticalAlign: "middle",
            marginLeft: "6px",
          }}
        >
          // {round.side === "attack" ? "T-Side" : "CT-Side"}
        </span>
      </div>

      <div
        style={{
          display: "inline-block",
          fontSize: "9px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          padding: "3px 8px",
          borderRadius: "2px",
          marginBottom: "10px",
          fontWeight: 500,
          ...tag,
        }}
      >
        {round.tag.label}
      </div>

      <p
        style={{
          color: "#e2e4ea",
          opacity: 0.85,
          fontSize: "14px",
          lineHeight: 1.7,
        }}
      >
        {round.text}
      </p>
    </div>
  );
}
