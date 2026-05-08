import { TeamGate } from '@/components/ui/TeamGate';
import { MapSelectorGrid } from '@/components/layout/MapSelectorGrid';

export default function CompPage() {
  return (
    <TeamGate pageTitle="COMPOS" pageTag="// Compositions" accentColor="#E8FF47">
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 60px 80px' }}>
        <div style={{ padding: '60px 0 48px', borderBottom: '1px solid var(--val-border2)' }}>
          <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--val-yellow)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px' }}>
            // Compositions
          </div>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1, color: 'var(--val-text)' }}>
            COMPOS
          </h1>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '13px', color: 'var(--val-muted)', marginTop: '16px', lineHeight: 1.7 }}>
            Create and manage your team compos map by map.
          </p>
        </div>
        <MapSelectorGrid basePath="/comp" ctaText="View compos →" />
      </main>
    </TeamGate>
  );
}
