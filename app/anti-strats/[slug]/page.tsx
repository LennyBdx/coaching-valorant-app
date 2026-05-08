import { notFound } from "next/navigation";
import { getAntiStrat, antiStrats } from "@/lib/data/anti-strats";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StratCard } from "@/components/anti-strat/StratCard";
import { StratBlock } from "@/components/anti-strat/StratBlock";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return antiStrats.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const strat = getAntiStrat(params.slug);
  if (!strat) return {};
  return {
    title: `${strat.map} Anti Strat${strat.opponent ? ` vs ${strat.opponent}` : ""} — Coaching Hub`,
  };
}

const badgeLabels: Record<string, string> = {
  defense: "Defense",
  attack: "Attack",
  pistol: "Pistol",
  bonus: "Bonus",
  eco: "Anti Eco",
  general: "General",
};

export default function AntiStratPage({ params }: Props) {
  const strat = getAntiStrat(params.slug);
  if (!strat) notFound();

  const meta = [
    { label: "Map", value: strat.map },
    ...(strat.opponent ? [{ label: "Opponent", value: strat.opponent }] : []),
    { label: "Type", value: "Anti Strat" },
  ];

  return (
    <>
      <PageHeader
        tag={strat.tag}
        mapName={strat.map}
        subtitle="ANTI STRAT"
        meta={meta}
        accentColor="#ff4757"
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 60px 80px" }}>
        {strat.sections.map((section, idx) => (
          <section key={idx}>
            <SectionHeader
              badgeType={section.badgeType}
              badgeLabel={badgeLabels[section.badgeType] ?? section.badgeType}
              title={section.title}
            />

            {section.kind === "cards" ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                  gap: "16px",
                  marginBottom: "0",
                }}
              >
                {section.cards.map((card, i) => (
                  <StratCard
                    key={i}
                    card={card}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  />
                ))}
              </div>
            ) : (
              <div>
                {section.blocks.map((block, i) => (
                  <StratBlock
                    key={i}
                    accent={block.accent}
                    blockTitle={block.blockTitle}
                    items={block.items}
                    agents={block.agents}
                  />
                ))}
              </div>
            )}
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
        <span style={{ color: "#ff4757" }}>{strat.map}</span>
        <span>
          — Anti Strat{strat.opponent ? ` vs ${strat.opponent}` : ""} · by Eden1
        </span>
      </footer>
    </>
  );
}
