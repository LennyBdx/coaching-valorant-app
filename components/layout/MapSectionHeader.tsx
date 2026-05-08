import Link from 'next/link';
import type { ValorantMap } from '@/lib/data/maps';

interface Props {
  mapInfo: ValorantMap;
  backHref: string;
  title: string;
  createHref: string;
  createLabel: string;
  onCreateClick?: () => void;
}

export function MapSectionHeader({ mapInfo, backHref, title, createHref, createLabel, onCreateClick }: Props) {
  return (
    <div style={{ padding: '48px 0 40px', borderBottom: '1px solid var(--val-border2)' }}>
      <Link href={backHref} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--val-muted)', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none' }}>
        ← Toutes les maps
      </Link>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: mapInfo.color, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '8px' }}>
            // {mapInfo.name}
          </div>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1, color: 'var(--val-text)', margin: 0 }}>
            {title}
          </h1>
        </div>
        {onCreateClick ? (
          <button
            onClick={onCreateClick}
            style={{ background: mapInfo.color, border: 'none', borderRadius: '6px', padding: '12px 24px', fontFamily: 'var(--font-dm-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: '#0a0b0e', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {createLabel}
          </button>
        ) : (
          <Link href={createHref} style={{ textDecoration: 'none' }}>
            <button style={{ background: mapInfo.color, border: 'none', borderRadius: '6px', padding: '12px 24px', fontFamily: 'var(--font-dm-mono)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: '#0a0b0e', fontWeight: 'bold', cursor: 'pointer' }}>
              {createLabel}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
