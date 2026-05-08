import React from "react";
import { BadgeType } from "@/lib/types";

const badgeStyles: Record<BadgeType, { bg: string; color: string }> = {
  defense: { bg: "#4ecdc4", color: "#0a0b0e" },
  attack: { bg: "#ff4757", color: "#0a0b0e" },
  pistol: { bg: "#ff9f43", color: "#0a0b0e" },
  bonus: { bg: "#a29bfe", color: "#0a0b0e" },
  eco: { bg: "#e8ff47", color: "#0a0b0e" },
  general: { bg: "#5a5f72", color: "#e2e4ea" },
};

interface SectionHeaderProps {
  badgeType: BadgeType;
  badgeLabel: string;
  title: string;
}

export function SectionHeader({
  badgeType,
  badgeLabel,
  title,
}: SectionHeaderProps) {
  const { bg, color } = badgeStyles[badgeType];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "48px 0 24px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "13px",
          letterSpacing: "3px",
          padding: "6px 16px",
          borderRadius: "2px",
          textTransform: "uppercase",
          background: bg,
          color,
        }}
      >
        {badgeLabel}
      </div>
      <div
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "28px",
          fontWeight: 800,
          letterSpacing: "-0.5px",
          color: "#e2e4ea",
        }}
      >
        {title}
      </div>
      <div style={{ flex: 1, height: "1px", background: "#1e2128" }} />
    </div>
  );
}
