import Link from "next/link";
import { vodReviews } from "@/lib/data/vod-reviews";
import { antiStrats } from "@/lib/data/anti-strats";
import { MAPS } from "@/lib/data/maps";

const sections = [
  {
    href: "/vod-reviews",
    tag: "// Analyse",
    title: "VOD Reviews",
    desc: "Full round-by-round debriefs. Identify your mistakes, understand the patterns.",
    count: vodReviews.length,
    unit: "debriefs",
    color: "#4EDBCA",
  },
  {
    href: "/anti-strats",
    tag: "// Scouting",
    title: "Anti Strats",
    desc: "Analyse every opponent's setups and habits. Come in with a plan.",
    count: antiStrats.length,
    unit: "files",
    color: "#FF4655",
  },
  {
    href: "/strategies",
    tag: "// Strat Book",
    title: "Strategies",
    desc: "Draw and save your strats map by map. Arrows, zones, agents.",
    count: MAPS.length,
    unit: "maps",
    color: "#A29BFE",
  },
  {
    href: "/comp",
    tag: "// Compositions",
    title: "Compos",
    desc: "Create and visualise your compositions per map. 5 agents, roles, synergies.",
    count: MAPS.length,
    unit: "maps",
    color: "#E8FF47",
  },
  {
    href: "/fundamentals",
    tag: "// Game Knowledge",
    title: "Fundamentals",
    desc: "Communication, PMAR, Trading, Economy, Roles, Tempo and more.",
    count: 15,
    unit: "sections",
    color: "#FF9F43",
  },
  {
    href: "/match-notes",
    tag: "// Results",
    title: "Match Notes",
    desc: "Score, ATK/DEF rounds and notes per match. Track your trends map by map.",
    count: MAPS.length,
    unit: "maps",
    color: "#74B9FF",
  },
  {
    href: "/planning",
    tag: "// Availability",
    title: "Planning",
    desc: "Each player logs their weekly availability. See at a glance when the full team is online.",
    count: 7,
    unit: "days",
    color: "#FD79A8",
  },
];

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--val-bg)" }}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "0 48px", borderBottom: "1px solid #1E2A38" }}>

        {/* Background diagonal decoration */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "140%", height: "120%", background: "linear-gradient(135deg, transparent 45%, rgba(255,70,85,0.04) 45%, rgba(255,70,85,0.04) 55%, transparent 55%)", transform: "skewX(-15deg)" }} />
          <div style={{ position: "absolute", top: 0, right: "15%", width: "1px", height: "100%", background: "linear-gradient(180deg, transparent, #FF465530, transparent)" }} />
          <div style={{ position: "absolute", top: 0, right: "30%", width: "1px", height: "100%", background: "linear-gradient(180deg, transparent, #FF465515, transparent)" }} />
        </div>

        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "90px 0 80px", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "20px" }}>
            <span style={{ width: "20px", height: "2px", background: "#FF4655", marginTop: "7px", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "5px", color: "#FF4655", textTransform: "uppercase" }}>
              Coaching Hub — Eden1
            </span>
          </div>

          <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-4px", marginBottom: "32px" }}>
            <span style={{ display: "block", fontSize: "clamp(64px, 10vw, 130px)", color: "#ECE8E1" }}>EDEN1</span>
            <span style={{ display: "block", fontSize: "clamp(64px, 10vw, 130px)", color: "#FF4655", WebkitTextStroke: "2px #FF4655", WebkitTextFillColor: "transparent" }}>COACHING</span>
          </h1>

          <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "13px", color: "#7A8899", maxWidth: "480px", lineHeight: 1.8, marginBottom: "40px" }}>
            VOD reviews, anti-strats, strategies and compos — all the team&apos;s work in one place.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: "0", borderTop: "1px solid #1E2A38", paddingTop: "32px" }}>
            {[
              { n: vodReviews.length,  label: "VOD Reviews" },
              { n: antiStrats.length,  label: "Anti Strats" },
              { n: MAPS.length,        label: "Maps" },
              { n: 15,                 label: "Fundamentals" },
            ].map(({ n, label }, i) => (
              <div key={label} style={{ paddingRight: "40px", marginRight: "40px", borderRight: i < 3 ? "1px solid #1E2A38" : "none" }}>
                <div style={{ fontFamily: "var(--font-bebas)", fontSize: "52px", lineHeight: 1, color: "#FF4655", letterSpacing: "-1px" }}>{n}</div>
                <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "#7A8899", marginTop: "2px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sections grid ────────────────────────────────────────────── */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "60px 48px 80px" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "36px" }}>
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", color: "#FF4655" }}>Quick access</span>
          <span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #2B3340, transparent)" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "2px", background: "#1E2A38" }}>
          {sections.map((s) => (
            <Link key={s.href} href={s.href} style={{ textDecoration: "none" }}>
              <div
                className="card-hover"
                style={{
                  background: "var(--val-surface)",
                  padding: "32px 36px",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  height: "100%",
                  border: "1px solid transparent",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {/* Diagonal corner cut */}
                <div style={{ position: "absolute", top: 0, right: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 28px 28px 0", borderColor: `transparent var(--val-bg) transparent transparent` }} />

                {/* Left accent */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: `linear-gradient(180deg, ${s.color}, ${s.color}00)` }} />

                {/* Top accent line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 28, height: "1px", background: `linear-gradient(90deg, ${s.color}60, transparent)` }} />

                <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: s.color, opacity: 0.7 }}>
                  {s.tag}
                </div>

                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px" }}>
                  <h2 style={{ fontFamily: "var(--font-syne)", fontSize: "26px", fontWeight: 800, letterSpacing: "-0.5px", color: "#ECE8E1", lineHeight: 1 }}>
                    {s.title}
                  </h2>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--font-bebas)", fontSize: "36px", color: s.color, lineHeight: 1 }}>{s.count}</span>
                    <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "8px", color: "#7A8899", letterSpacing: "2px", display: "block", textTransform: "uppercase" }}>{s.unit}</span>
                  </div>
                </div>

                <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", color: "#7A8899", lineHeight: 1.7, marginTop: "4px", flex: 1 }}>
                  {s.desc}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px" }}>
                  <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: s.color }}>Go</span>
                  <span style={{ fontSize: "12px", color: s.color }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid #1E2A38", padding: "80px 48px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "48px" }}>
            <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", color: "#FF4655" }}>// About</span>
            <span style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #2B3340, transparent)" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>

            {/* Left — identity + results */}
            <div>
              <h2 style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 800, letterSpacing: "-3px", lineHeight: 0.9, color: "#ECE8E1", margin: "0 0 24px" }}>
                EDEN1
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", color: "#7A8899", lineHeight: 1.8 }}>
                  <span style={{ color: "#FF4655" }}>2 years</span> as an IGL player before moving into coaching.
                </div>
                <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", color: "#7A8899", lineHeight: 1.8 }}>
                  Valorant coach — <span style={{ color: "#ECE8E1" }}>Game Changers 2026 EMEA</span>.
                </div>
                <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", color: "#7A8899", lineHeight: 1.8 }}>
                  <span style={{ color: "#4EDBCA" }}>—</span> <span style={{ color: "#4EDBCA" }}>Top 8</span> GC 2026: EMEA Cash Cup March with <span style={{ color: "#ECE8E1" }}>Everlasting</span>.
                </div>
                <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", color: "#7A8899", lineHeight: 1.8 }}>
                  <span style={{ color: "#E8FF47" }}>—</span> Promos / relegation prep with <span style={{ color: "#ECE8E1" }}>Twisted Saints X</span>.
                </div>
                <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", color: "#7A8899", lineHeight: 1.8 }}>
                  <span style={{ color: "#74B9FF" }}>—</span> <span style={{ color: "#74B9FF" }}>Top 5–6</span> GC SEA Split 2 Main Event with <span style={{ color: "#ECE8E1" }}>ROZ</span>.
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href="https://www.vlr.gg/player/4604/eden1" target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--val-surface)", border: "1px solid #2B3340", borderRadius: "6px", padding: "10px 18px", fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "1px", color: "#ECE8E1", textDecoration: "none" }}>
                  <span style={{ color: "#FF4655", fontSize: "14px", fontWeight: "bold" }}>◈</span>
                  VLR.gg / eden1
                </a>
                <a href="https://x.com/Edenn_FPS" target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--val-surface)", border: "1px solid #2B3340", borderRadius: "6px", padding: "10px 18px", fontFamily: "var(--font-dm-mono)", fontSize: "11px", letterSpacing: "1px", color: "#ECE8E1", textDecoration: "none" }}>
                  <span style={{ fontSize: "13px", fontWeight: "bold" }}>𝕏</span>
                  @Edenn_FPS
                </a>
              </div>
            </div>

            {/* Right — coached teams */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                { period: "2024 – 2025", role: "IGL Player", detail: "2 years as in-game leader", color: "#4EDBCA" },
                { period: "2026", role: "Everlasting", detail: "Valorant Game Changers 2026 · EMEA", color: "#A29BFE" },
                { period: "2026", role: "Twisted Saints X", detail: "Promos / relegation prep · EMEA", color: "#E8FF47" },
                { period: "2026", role: "ROZ", detail: "Top 5–6 · GC SEA Split 2 Main Event · APAC", color: "#74B9FF" },
              ].map((item, i, arr) => (
                <div key={i} style={{ display: "flex", gap: "20px", paddingBottom: "28px", position: "relative" }}>
                  {i < arr.length - 1 && (
                    <div style={{ position: "absolute", left: "6px", top: "14px", width: "1px", height: "100%", background: "linear-gradient(180deg, #2B3340, transparent)" }} />
                  )}
                  <div style={{ width: "13px", height: "13px", borderRadius: "50%", background: item.color, flexShrink: 0, marginTop: "3px", boxShadow: `0 0 8px ${item.color}60` }} />
                  <div>
                    <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: item.color, marginBottom: "4px" }}>
                      {item.period}
                    </div>
                    <div style={{ fontFamily: "var(--font-syne)", fontSize: "16px", fontWeight: 800, color: "#ECE8E1", marginBottom: "4px" }}>
                      {item.role}
                    </div>
                    <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", color: "#7A8899", lineHeight: 1.6 }}>
                      {item.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid #1E2A38", padding: "20px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "12px", height: "1px", background: "#FF4655" }} />
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "#3D4A58" }}>Eden1 Coaching Hub</span>
        </div>
        <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "9px", letterSpacing: "2px", color: "#3D4A58" }}>by Eden1</span>
      </footer>
    </main>
  );
}
