"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { vodReviews } from "@/lib/data/vod-reviews";
import type { VodReview } from "@/lib/types";
import { verifyTeamCode } from "@/app/actions/verify-team-code";

const mapColors: Record<string, string> = {
  Bind: "#ff4757",
  Haven: "#4ecdc4",
  Split: "#ff9f43",
  Abyss: "#a29bfe",
  Breeze: "#e8ff47",
  Corrode: "#5a5f72",
  Ascent: "#ff6b6b",
};

const teams = [
  {
    name: "EVERLASTING",
    accent: "#4ecdc4",
    reviews: vodReviews.filter((v) => !v.tournament && !v.team),
  },
  {
    name: "RCS",
    accent: "#e8ff47",
    reviews: vodReviews.filter((v) => v.tournament === "RCS"),
  },
  {
    name: "ROZ",
    accent: "#a29bfe",
    reviews: vodReviews.filter((v) => v.team === "ROZ"),
  },
];

function VodCard({ vod }: { vod: VodReview }) {
  const accent = mapColors[vod.map] ?? "#5a5f72";
  const totalRounds = vod.phases.reduce((acc, p) => acc + p.rounds.length, 0);
  return (
    <Link href={`/vod-reviews/${vod.slug}`} style={{ textDecoration: "none" }}>
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
        className="card-hover"
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
        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "11px",
              letterSpacing: "3px",
              color: accent,
              marginBottom: "6px",
            }}
          >
            {vod.map}
            {vod.tournament && (
              <span
                style={{
                  marginLeft: "8px",
                  background: "rgba(232,255,71,0.1)",
                  color: "#e8ff47",
                  border: "1px solid rgba(232,255,71,0.25)",
                  padding: "2px 8px",
                  borderRadius: "2px",
                  fontSize: "10px",
                }}
              >
                {vod.tournament}
              </span>
            )}
          </div>
          <div
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "24px",
              fontWeight: 800,
              color: "#e2e4ea",
              letterSpacing: "-0.5px",
            }}
          >
            DEBRIEF
          </div>
        </div>

        {vod.date && (
          <div
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "11px",
              color: "#5a5f72",
              letterSpacing: "1px",
              marginBottom: "16px",
            }}
          >
            {vod.date}
          </div>
        )}

        <div style={{ display: "flex", gap: "16px" }}>
          {vod.phases.map((phase) => (
            <div
              key={phase.side}
              style={{
                fontSize: "10px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                padding: "3px 10px",
                borderRadius: "20px",
                background: "#16181f",
                border: "1px solid #1e2128",
                color: phase.side === "attack" ? "#ff6b6b" : "#4ecdc4",
              }}
            >
              {phase.label}
            </div>
          ))}
        </div>

        <div
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "11px",
            color: "#5a5f72",
            marginTop: "16px",
          }}
        >
          {totalRounds} rounds analysed
        </div>
      </div>
    </Link>
  );
}

function TeamSection({
  team,
}: {
  team: { name: string; accent: string; reviews: VodReview[] };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);


  function handleHeaderClick() {
    if (unlocked) {
      setIsOpen((prev) => !prev);
    } else {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const ok = await verifyTeamCode(team.name, codeInput);
    setLoading(false);
    if (ok) {
      setUnlocked(true);
      setError(false);
      setCodeInput("");
    } else {
      setError(true);
      setShake(true);
      setCodeInput("");
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <section style={{ borderBottom: "1px solid #1e2128" }}>
      {/* Header row */}
      <button
        onClick={handleHeaderClick}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "32px 0",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          textAlign: "left",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            width: "4px",
            height: "44px",
            background: team.accent,
            borderRadius: "2px",
            flexShrink: 0,
            transition: "opacity 0.2s",
            opacity: isOpen ? 1 : 0.4,
          }}
        />

        {/* Labels */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "10px",
              color: team.accent,
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "4px",
              opacity: 0.7,
            }}
          >
            // Team
          </div>
          <div
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "32px",
              fontWeight: 800,
              letterSpacing: "-1px",
              color: isOpen ? "#e2e4ea" : "#5a5f72",
              transition: "color 0.2s",
            }}
          >
            {team.name}
          </div>
        </div>

        {/* Count */}
        <div
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "11px",
            color: "#5a5f72",
            marginRight: "16px",
          }}
        >
          {team.reviews.length} debrief{team.reviews.length !== 1 ? "s" : ""}
        </div>

        {/* Icon */}
        <div
          style={{
            width: "36px",
            height: "36px",
            border: "1px solid #1e2128",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: unlocked ? team.accent : "#5a5f72",
            fontSize: "14px",
            transition: "transform 0.25s, border-color 0.2s",
            transform: isOpen && unlocked ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          {unlocked ? "▾" : "🔒"}
        </div>
      </button>

      {/* Expanded content */}
      {isOpen && (
        <div style={{ paddingBottom: "40px" }}>
          {!unlocked ? (
            /* Code input */
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "48px 0",
                gap: "20px",
                animation: shake ? "shake 0.4s ease" : undefined,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "10px",
                  letterSpacing: "4px",
                  color: team.accent,
                  textTransform: "uppercase",
                }}
              >
                // Enter access code
              </div>
              <div style={{ display: "flex", gap: "12px", width: "100%", maxWidth: "380px" }}>
                <input
                  ref={inputRef}
                  type="password"
                  value={codeInput}
                  onChange={(e) => {
                    setCodeInput(e.target.value);
                    setError(false);
                  }}
                  placeholder="••••••••"
                  autoComplete="off"
                  style={{
                    flex: 1,
                    background: "#111318",
                    border: `1px solid ${error ? "#ff4757" : "#1e2128"}`,
                    borderRadius: "6px",
                    padding: "12px 16px",
                    fontFamily: "var(--font-dm-mono)",
                    fontSize: "14px",
                    color: "#e2e4ea",
                    letterSpacing: "4px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: team.accent,
                    border: "none",
                    borderRadius: "6px",
                    padding: "12px 20px",
                    fontFamily: "var(--font-dm-mono)",
                    fontSize: "11px",
                    letterSpacing: "2px",
                    color: "#0a0b0e",
                    fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                    textTransform: "uppercase",
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  {loading ? "..." : "Unlock"}
                </button>
              </div>
              {error && (
                <div
                  style={{
                    fontFamily: "var(--font-dm-mono)",
                    fontSize: "11px",
                    color: "#ff4757",
                    letterSpacing: "1px",
                  }}
                >
                  Wrong code. Try again.
                </div>
              )}
            </form>
          ) : team.reviews.length === 0 ? (
            /* Empty team */
            <div
              style={{
                border: "1px dashed #1e2128",
                borderRadius: "8px",
                padding: "48px 32px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "12px",
                  color: "#5a5f72",
                  letterSpacing: "2px",
                }}
              >
                // No debriefs yet
              </div>
            </div>
          ) : (
            /* Reviews grid */
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                gap: "16px",
              }}
            >
              {team.reviews.map((vod) => (
                <VodCard key={vod.slug} vod={vod} />
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
      `}</style>
    </section>
  );
}

export default function VodReviewsPage() {
  return (
    <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 60px 80px" }}>
      {/* Page header */}
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
            fontSize: "clamp(120px, 18vw, 260px)",
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
          VOD
        </div>
        <div
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "11px",
            color: "#4ecdc4",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "12px",
            position: "relative",
          }}
        >
          // Match Analysis
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
          VOD <span style={{ color: "#4ecdc4" }}>REVIEWS</span>
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
          {vodReviews.length} debriefs — {teams.length} teams
        </p>
      </div>

      {/* Team sections */}
      <div style={{ paddingTop: "8px" }}>
        {teams.map((team) => (
          <TeamSection key={team.name} team={team} />
        ))}
      </div>
    </main>
  );
}
