// ─── VOD Review ───────────────────────────────────────────────────────────────

export type TagType = "nice" | "warn" | "info";
export type Side = "attack" | "defense";

export interface RoundEntry {
  number: number;
  side: Side;
  tag: { type: TagType; label: string };
  text: string;
}

export interface Phase {
  side: Side;
  label: string;
  generalNotes: string[];
  roundRange: string;
  rounds: RoundEntry[];
}

export interface VodReview {
  slug: string;
  map: string;
  date?: string;
  tournament?: string;
  tag: string;
  phases: Phase[];
}

// ─── Anti-Strat ───────────────────────────────────────────────────────────────

export type BadgeType = "defense" | "attack" | "pistol" | "bonus" | "eco" | "general";
export type AccentColor = "teal" | "red" | "orange" | "purple" | "yellow";
export type CardColor = "teal" | "red" | "yellow" | "orange" | "purple";

export interface StratCard {
  color: CardColor;
  label: string;
  heading: string;
  text: string;
  agents?: string[];
}

export interface CardSection {
  kind: "cards";
  badgeType: BadgeType;
  title: string;
  cards: StratCard[];
}

export interface BlockSection {
  kind: "block";
  badgeType: BadgeType;
  title: string;
  blocks: {
    accent: AccentColor;
    blockTitle: string;
    items: string[];
    agents?: string[];
  }[];
}

export type AntiStratSection = CardSection | BlockSection;

export interface AntiStrat {
  slug: string;
  map: string;
  opponent?: string;
  tag: string;
  sections: AntiStratSection[];
}

// ─── Map Strategies (Valoplant) ───────────────────────────────────────────────

export interface ArrowShape {
  id: string; type: 'arrow';
  points: number[]; // [x1,y1, x2,y2]
  color: string;
}

export interface PathShape {
  id: string; type: 'path';
  points: number[];
  color: string;
}

export interface CircleShape {
  id: string; type: 'circle';
  x: number; y: number; radius: number;
  color: string;
}

export interface TextShape {
  id: string; type: 'text';
  x: number; y: number; text: string;
  color: string;
}

export interface AgentShape {
  id: string; type: 'agent';
  x: number; y: number;
  agentName: string;
  agentRole: string;
  agentIcon: string;
}

export interface AbilityShape {
  id: string; type: 'ability';
  x: number; y: number;
  agentName: string;
  agentRole: string;
  abilityName: string;
  abilitySlot: string;
  abilityIcon: string;
}

export type StratShape = ArrowShape | PathShape | CircleShape | TextShape | AgentShape | AbilityShape;

export interface MapStrategy {
  id: string;
  mapSlug: string;
  mapName: string;
  name: string;
  side: 'attack' | 'defense';
  shapes: StratShape[];
  tags: string[];
  createdAt: string;
}

// ─── Match Notes ──────────────────────────────────────────────────────────────

export interface MatchNote {
  id: string;
  mapSlug: string;
  mapName: string;
  date: string;       // YYYY-MM-DD
  opponent: string;
  atkScore: number;
  defScore: number;
  oppScore: number;
  notes: string;
  createdAt: string;
}

// ─── Map Compositions ─────────────────────────────────────────────────────────

export interface CompoAgent {
  agentName: string;
  agentRole: string;
  agentIcon: string;
}

export interface MapCompo {
  id: string;
  mapSlug: string;
  mapName: string;
  name: string;
  agents: CompoAgent[];
  createdAt: string;
}
