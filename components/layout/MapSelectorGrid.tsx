import Link from 'next/link';
import Image from 'next/image';
import { MAPS } from '@/lib/data/maps';

interface Props {
  basePath: string;
  ctaText: string;
}

export function MapSelectorGrid({ basePath, ctaText }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px', paddingTop: '48px' }}>
      {MAPS.map((map) => (
        <Link key={map.slug} href={`${basePath}/${map.slug}`} style={{ textDecoration: 'none' }}>
          <div
            style={{ background: 'var(--val-surface)', border: '1px solid var(--val-border2)', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
            className="card-hover"
          >
            <div style={{ position: 'relative', height: '140px' }}>
              <Image src={map.displayIcon} alt={map.name} fill style={{ objectFit: 'cover', opacity: 0.6 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, var(--val-surface) 100%)' }} />
            </div>
            <div style={{ padding: '14px 20px 20px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: map.color }} />
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '11px', letterSpacing: '3px', color: map.color, marginBottom: '4px' }}>
                {map.name.toUpperCase()}
              </div>
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: '17px', fontWeight: 800, color: 'var(--val-text)' }}>
                {ctaText}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
