import { notFound } from "next/navigation";
import { getVodReview, vodReviews } from "@/lib/data/vod-reviews";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GeneralBlock } from "@/components/vod/GeneralBlock";
import { RoundCard } from "@/components/vod/RoundCard";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return vodReviews.map((v) => ({ slug: v.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const vod = getVodReview(params.slug);
  if (!vod) return {};
  return { title: `${vod.map} Debrief${vod.date ? ` — ${vod.date}` : ""} — Coaching Hub` };
}

export default function VodReviewPage({ params }: Props) {
  const vod = getVodReview(params.slug);
  if (!vod) notFound();

  const meta = [
    { label: "Map", value: vod.map },
    ...(vod.date ? [{ label: "Date", value: vod.date }] : []),
    ...(vod.tournament ? [{ label: "Tournament", value: vod.tournament }] : []),
    {
      label: "Phases",
      value: vod.phases.map((p) => p.label).join(" · "),
    },
  ];

  return (
    <>
      <PageHeader
        tag={vod.tag}
        mapName={vod.map}
        subtitle="DEBRIEF"
        meta={meta}
        accentColor="#e8ff47"
      />

      <div
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 60px 80px" }}
      >
        {vod.phases.map((phase) => (
          <section key={phase.side + phase.label}>
            {/* General notes */}
            <SectionHeader
              badgeType={phase.side}
              badgeLabel={phase.label}
              title="General Notes"
            />
            <GeneralBlock
              side={phase.side}
              title={`// General Guidelines — ${phase.label}`}
              notes={phase.generalNotes}
            />

            {/* Rounds */}
            <div
              style={{ display: "flex", alignItems: "center", gap: "20px", padding: "8px 0 24px" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "13px",
                  letterSpacing: "3px",
                  padding: "6px 16px",
                  borderRadius: "2px",
                  textTransform: "uppercase",
                  background: phase.side === "attack" ? "#ff4757" : "#4ecdc4",
                  color: "#0a0b0e",
                }}
              >
                {phase.label}
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
                Rounds {phase.roundRange}
              </div>
              <div style={{ flex: 1, height: "1px", background: "#1e2128" }} />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "16px",
                marginBottom: "0",
              }}
            >
              {phase.rounds.map((round, i) => (
                <RoundCard
                  key={round.number}
                  round={round}
                  style={{ animationDelay: `${i * 0.05}s` }}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer
        style={{
          borderTop: "1px solid #1e2128",
          padding: "24px 60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#5a5f72",
          fontSize: "11px",
          letterSpacing: "1px",
        }}
      >
        <span style={{ color: "#e8ff47" }}>{vod.map}</span>
        <span>— Full Debrief · by Eden1</span>
      </footer>
    </>
  );
}
