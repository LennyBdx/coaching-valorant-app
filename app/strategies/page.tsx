import { TeamGate } from '@/components/ui/TeamGate';
import { MapSelectorGrid } from '@/components/layout/MapSelectorGrid';

export default function StrategiesPage() {
  return (
    <TeamGate pageTitle="STRATEGIES" pageTag="// Strat Book" accentColor="#A29BFE">
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px 80px' }}>
        <div style={{ padding: '60px 0 48px', borderBottom: '1px solid var(--val-border2)' }}>
          <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: '#A29BFE', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px' }}>
            // Strat Book
          </div>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1, color: 'var(--val-text)' }}>
            STRATEGIES
          </h1>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '13px', color: 'var(--val-muted)', marginTop: '16px', lineHeight: 1.7 }}>
            Draw and manage your strats map by map. Pick a map to start.
          </p>
        </div>
        <MapSelectorGrid basePath="/strategies" ctaText="View strats →" />
      </main>
    </TeamGate>
  );
}
