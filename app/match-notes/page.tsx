import { TeamGate } from '@/components/ui/TeamGate';
import { MapSelectorGrid } from '@/components/layout/MapSelectorGrid';

export default function MatchNotesPage() {
  return (
    <TeamGate pageTitle="MATCH NOTES" pageTag="// Results" accentColor="#74B9FF">
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px 80px' }}>
        <div style={{ padding: '60px 0 48px', borderBottom: '1px solid var(--val-border2)' }}>
          <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: '#74B9FF', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px' }}>
            // Results
          </div>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1, color: 'var(--val-text)' }}>
            MATCH NOTES
          </h1>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '13px', color: 'var(--val-muted)', marginTop: '16px', lineHeight: 1.7 }}>
            Results, ATK/DEF scores and notes per map. Track your trends and identify maps to work on.
          </p>
        </div>
        <MapSelectorGrid basePath="/match-notes" ctaText="View results →" />
      </main>
    </TeamGate>
  );
}
