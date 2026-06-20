'use client';

import { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Arrow, Line, Circle as KCircle, Text as KText, Group, Image as KImage } from 'react-konva';
import type Konva from 'konva';
import { ROLE_COLORS, SLOT_LABELS, type AgentRole } from '@/lib/data/agents';
import type { StratShape } from '@/lib/types';
import Modal from '@/components/ui/Modal';

const CANVAS = 680;

interface Props {
  mapImageUrl: string;
  shapes: StratShape[];
  showExport?: boolean;
}

export default function MapViewer({ mapImageUrl, shapes, showExport }: Props) {
  const stageRef    = useRef<Konva.Stage>(null);
  const imgCache    = useRef<Record<string, HTMLImageElement>>({});
  const [, bump]    = useState(0);
  const [exportErr, setExportErr] = useState(false);

  function loadImg(url: string) {
    if (!url || imgCache.current[url]) return;
    const img = new window.Image();
    img.src = url;
    img.onload = () => { imgCache.current[url] = img; bump(n => n + 1); };
  }

  useEffect(() => {
    shapes.forEach(s => {
      if (s.type === 'agent') loadImg(s.agentIcon);
      if (s.type === 'ability') loadImg(s.abilityIcon);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shapes]);

  async function handleExport() {
    if (!stageRef.current) return;
    const PR = 2;
    const S  = CANVAS * PR;
    const off = document.createElement('canvas');
    off.width  = S;
    off.height = S;
    const ctx  = off.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#060810';
    ctx.fillRect(0, 0, S, S);

    // Try to draw map background
    try {
      await new Promise<void>((resolve) => {
        const bg = new window.Image();
        bg.onload = () => { try { ctx.drawImage(bg, 0, 0, S, S); } catch { /* tainted */ } resolve(); };
        bg.onerror = () => resolve();
        bg.src = mapImageUrl;
      });
    } catch { /* ignore */ }

    // Try to draw Konva shapes on top
    try {
      const shapesUrl = stageRef.current.toDataURL({ pixelRatio: PR });
      await new Promise<void>((resolve) => {
        const img = new window.Image();
        img.onload = () => { ctx.drawImage(img, 0, 0, S, S); resolve(); };
        img.onerror = () => resolve();
        img.src = shapesUrl;
      });
    } catch { /* tainted canvas */ }

    try {
      const finalUrl = off.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = finalUrl;
      a.download = 'strat.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      setExportErr(true);
    }
  }

  function renderShape(s: StratShape) {
    switch (s.type) {
      case 'arrow':
        return <Arrow key={s.id} points={s.points} stroke={s.color} fill={s.color} strokeWidth={3} pointerLength={14} pointerWidth={10} lineCap="round" />;
      case 'wall': {
        const [wx1, wy1, wx2, wy2] = s.points;
        return (
          <Group key={s.id}>
            <Line points={[wx1, wy1, wx2, wy2]} stroke={s.color} strokeWidth={14} opacity={0.18} lineCap="butt" />
            <Line points={[wx1, wy1, wx2, wy2]} stroke={s.color} strokeWidth={3} opacity={0.95} lineCap="butt" dash={[10, 5]} />
          </Group>
        );
      }
      case 'path':
        return <Line key={s.id} points={s.points} stroke={s.color} strokeWidth={3} tension={0.4} lineCap="round" lineJoin="round" />;
      case 'circle':
        return <KCircle key={s.id} x={s.x} y={s.y} radius={s.radius} fill={s.color + '28'} stroke={s.color} strokeWidth={2} />;
      case 'text':
        return <KText key={s.id} x={s.x} y={s.y} text={s.text} fill={s.color} fontSize={15} fontStyle="bold" shadowColor="#000" shadowBlur={6} shadowOpacity={1} />;
      case 'ability': {
        const img = imgCache.current[s.abilityIcon];
        const rc  = ROLE_COLORS[s.agentRole as AgentRole] ?? '#5a5f72';
        return (
          <Group key={s.id} x={s.x} y={s.y}>
            <KCircle radius={16} fill={rc + '40'} stroke={rc} strokeWidth={2} />
            {img
              ? <KImage image={img} x={-12} y={-12} width={24} height={24} />
              : <KText x={-16} y={-6} width={32} text={SLOT_LABELS[s.abilitySlot] ?? '?'} fontSize={10} fontStyle="bold" fill="#fff" align="center" />
            }
            <KText x={9} y={-16} text={SLOT_LABELS[s.abilitySlot] ?? ''} fontSize={8} fontStyle="bold" fill={rc} />
          </Group>
        );
      }
      case 'agent': {
        const img = imgCache.current[s.agentIcon];
        const rc  = ROLE_COLORS[s.agentRole as AgentRole] ?? '#5a5f72';
        return (
          <Group key={s.id} x={s.x} y={s.y}>
            <KCircle radius={15} fill={rc} stroke="#0a0b0e" strokeWidth={2} />
            {img
              ? <KImage image={img} x={-12} y={-12} width={24} height={24} />
              : <KText x={-15} y={-6} width={30} text={s.agentName.slice(0, 3).toUpperCase()} fontSize={9} fontStyle="bold" fill="#0a0b0e" align="center" />
            }
          </Group>
        );
      }
    }
  }

  return (
    <div>
      <div style={{ position: 'relative', width: CANVAS, height: CANVAS, backgroundImage: `url(${mapImageUrl})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundColor: '#060810', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--val-border2)' }}>
        <Stage ref={stageRef} width={CANVAS} height={CANVAS}>
          <Layer>{shapes.map(renderShape)}</Layer>
        </Stage>
      </div>

      {showExport && (
        <div style={{ marginTop: '12px' }}>
          <button onClick={handleExport}
            style={{ padding: '8px 20px', background: 'transparent', border: '1px solid var(--val-border2)', borderRadius: '6px', color: 'var(--val-muted)', fontFamily: 'var(--font-dm-mono)', fontSize: '11px', letterSpacing: '1px', cursor: 'pointer' }}>
            ↓ Export PNG
          </button>
        </div>
      )}

      <Modal
        isOpen={exportErr}
        title="Export failed"
        message="The browser blocked the export (cross-origin images). Use Win+Shift+S to capture the screen."
        confirmLabel="OK"
        onConfirm={() => setExportErr(false)}
      />
    </div>
  );
}
