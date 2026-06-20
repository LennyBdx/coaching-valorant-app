'use client';

import { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Arrow, Line, Circle as KCircle, Text as KText, Group, Image as KImage } from 'react-konva';
import type Konva from 'konva';
import { AGENTS, ROLE_COLORS, SLOT_LABELS, type AgentRole } from '@/lib/data/agents';
import type { AbilityInfo } from '@/lib/data/agents';
import type { StratShape } from '@/lib/types';
import Modal from '@/components/ui/Modal';

type Tool = 'arrow' | 'path' | 'circle' | 'text' | 'agent' | 'wall';

const CANVAS = 680;

const TOOLS: { id: Tool; icon: string; label: string }[] = [
  { id: 'arrow',  icon: '→', label: 'Arrow'  },
  { id: 'path',   icon: '✏', label: 'Path'   },
  { id: 'circle', icon: '◯', label: 'Area'   },
  { id: 'text',   icon: 'T', label: 'Text'   },
  { id: 'wall',   icon: '▬', label: 'Wall'   },
  { id: 'agent',  icon: '⬟', label: 'Agent'  },
];

const COLORS = ['#e8ff47', '#ff4757', '#4ecdc4', '#ff9f43', '#a29bfe', '#ffffff'];

const label: React.CSSProperties = {
  fontFamily: 'var(--font-dm-mono)',
  fontSize: '9px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: '#5a5f72',
};

const btnBase: React.CSSProperties = {
  padding: '7px 14px',
  background: 'transparent',
  border: '1px solid #1e2128',
  borderRadius: '6px',
  color: '#5a5f72',
  fontFamily: 'var(--font-dm-mono)',
  fontSize: '11px',
  letterSpacing: '1px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
};

const STRAT_TAGS = ['rush', 'default', 'fake', 'save', 'retake', 'split', 'pistols'] as const;

interface Props {
  mapImageUrl: string;
  initialName?: string;
  initialSide?: 'attack' | 'defense';
  initialShapes?: StratShape[];
  initialTags?: string[];
  onSave: (name: string, side: 'attack' | 'defense', shapes: StratShape[], tags: string[]) => void;
}

export default function MapEditor({ mapImageUrl, onSave, initialName = '', initialSide = 'attack', initialShapes = [], initialTags = [] }: Props) {
  const [tool, setTool]           = useState<Tool>('arrow');
  const [color, setColor]         = useState('#e8ff47');
  const [shapes, setShapes]       = useState<StratShape[]>(initialShapes);
  const [preview, setPreview]     = useState<StratShape | null>(null);
  const [selAgent, setSelAgent]   = useState<typeof AGENTS[0] | null>(null);
  const [selAbility, setSelAbility] = useState<AbilityInfo | null>(null);
  const [side, setSide]           = useState<'attack' | 'defense'>(initialSide);
  const [stratName, setStratName] = useState(initialName);
  const [tags, setTags]           = useState<string[]>(initialTags);
  const [textPos, setTextPos]     = useState<{ x: number; y: number; sx: number; sy: number } | null>(null);
  const [textVal, setTextVal]     = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  const stageRef    = useRef<Konva.Stage>(null);
  const textInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textPos) requestAnimationFrame(() => textInputRef.current?.focus());
  }, [textPos]);

  useEffect(() => {
    if (!selAgent) return;
    loadImg(selAgent.icon);
    selAgent.abilities.forEach(a => loadImg(a.icon));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selAgent]);
  const drawing   = useRef(false);
  const origin    = useRef<number[]>([]);
  const pathPts   = useRef<number[]>([]);
  const imgCache  = useRef<Record<string, HTMLImageElement>>({});
  const [, bump]  = useState(0);

  const getPos = () => stageRef.current?.getPointerPosition() ?? null;

  function loadImg(url: string) {
    if (imgCache.current[url]) return;
    const img = new window.Image();
    img.src = url;
    img.onload = () => { imgCache.current[url] = img; bump(n => n + 1); };
  }

  function pickTool(t: Tool) {
    setTool(t);
    if (t !== 'agent') { setSelAgent(null); setSelAbility(null); }
  }

  function handleDown(e: Konva.KonvaEventObject<MouseEvent>) {
    const p = getPos(); if (!p) return;
    if (tool === 'text') {
      setTextPos({ x: p.x, y: p.y, sx: e.evt.clientX, sy: e.evt.clientY });
      setTextVal('');
      return;
    }
    if (tool === 'agent' && selAgent) {
      if (selAbility) {
        loadImg(selAbility.icon);
        setShapes(prev => [...prev, { id: uid(), type: 'ability', x: p.x, y: p.y, agentName: selAgent.name, agentRole: selAgent.role, abilityName: selAbility.name, abilitySlot: selAbility.slot, abilityIcon: selAbility.icon }]);
      } else {
        loadImg(selAgent.icon);
        setShapes(prev => [...prev, { id: uid(), type: 'agent', x: p.x, y: p.y, agentName: selAgent.name, agentRole: selAgent.role, agentIcon: selAgent.icon }]);
      }
      return;
    }
    drawing.current = true;
    origin.current  = [p.x, p.y];
    pathPts.current = [p.x, p.y];
  }

  function handleMove() {
    if (!drawing.current) return;
    const p = getPos(); if (!p) return;
    if (tool === 'arrow') {
      setPreview({ id: '_', type: 'arrow', points: [origin.current[0], origin.current[1], p.x, p.y], color });
    } else if (tool === 'wall') {
      setPreview({ id: '_', type: 'wall', points: [origin.current[0], origin.current[1], p.x, p.y], color });
    } else if (tool === 'path') {
      pathPts.current = [...pathPts.current, p.x, p.y];
      setPreview({ id: '_', type: 'path', points: [...pathPts.current], color });
    } else if (tool === 'circle') {
      const r = Math.hypot(p.x - origin.current[0], p.y - origin.current[1]);
      setPreview({ id: '_', type: 'circle', x: origin.current[0], y: origin.current[1], radius: Math.max(r, 4), color });
    }
  }

  function handleUp() {
    if (!drawing.current) return;
    drawing.current = false;
    if (preview) { setShapes(prev => [...prev, { ...preview, id: uid() }]); setPreview(null); }
    pathPts.current = [];
  }

  function confirmText() {
    if (textPos && textVal.trim())
      setShapes(prev => [...prev, { id: uid(), type: 'text', x: textPos.x, y: textPos.y, text: textVal, color }]);
    setTextPos(null); setTextVal('');
  }

  function moveShape(id: string, x: number, y: number) {
    setShapes(prev => prev.map(s => {
      if (s.id !== id) return s;
      if (s.type === 'agent' || s.type === 'ability' || s.type === 'text') return { ...s, x, y };
      return s;
    }));
  }

  function handleSave() {
    if (!stratName.trim()) { setAlertOpen(true); return; }
    onSave(stratName, side, shapes, tags);
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
        return (
          <KText key={s.id} x={s.x} y={s.y} text={s.text} fill={s.color} fontSize={15} fontStyle="bold"
            shadowColor="#000" shadowBlur={6} shadowOpacity={1}
            draggable
            onMouseDown={e => { e.cancelBubble = true; }}
            onMouseEnter={e => { const st = e.target.getStage(); if (st) st.container().style.cursor = 'grab'; }}
            onMouseLeave={e => { const st = e.target.getStage(); if (st) st.container().style.cursor = ''; }}
            onDragStart={e => { const st = e.target.getStage(); if (st) st.container().style.cursor = 'grabbing'; }}
            onDragEnd={e => { const st = e.target.getStage(); if (st) st.container().style.cursor = 'grab'; moveShape(s.id, e.target.x(), e.target.y()); }}
          />
        );
      case 'ability': {
        const img = imgCache.current[s.abilityIcon];
        const rc  = ROLE_COLORS[s.agentRole as AgentRole] ?? '#5a5f72';
        return (
          <Group key={s.id} x={s.x} y={s.y} draggable
            onMouseDown={e => { e.cancelBubble = true; }}
            onMouseEnter={e => { const st = e.target.getStage(); if (st) st.container().style.cursor = 'grab'; }}
            onMouseLeave={e => { const st = e.target.getStage(); if (st) st.container().style.cursor = ''; }}
            onDragStart={e => { const st = e.target.getStage(); if (st) st.container().style.cursor = 'grabbing'; }}
            onDragEnd={e => { const st = e.target.getStage(); if (st) st.container().style.cursor = 'grab'; moveShape(s.id, e.target.x(), e.target.y()); }}
          >
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
          <Group
            key={s.id}
            x={s.x} y={s.y}
            draggable
            onMouseDown={e => { e.cancelBubble = true; }}
            onMouseEnter={e => { const st = e.target.getStage(); if (st) st.container().style.cursor = 'grab'; }}
            onMouseLeave={e => { const st = e.target.getStage(); if (st) st.container().style.cursor = ''; }}
            onDragStart={e => { const st = e.target.getStage(); if (st) st.container().style.cursor = 'grabbing'; }}
            onDragEnd={e => {
              const st = e.target.getStage(); if (st) st.container().style.cursor = 'grab';
              moveShape(s.id, e.target.x(), e.target.y());
            }}
          >
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

  const allShapes = preview ? [...shapes, preview] : shapes;
  const cursor = tool === 'text' ? 'text' : tool === 'agent' ? (selAgent ? 'crosshair' : 'not-allowed') : 'crosshair';

  return (
    <div>
      {/* ── Top bar ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
        <input
          value={stratName}
          onChange={e => setStratName(e.target.value)}
          placeholder="Strat name…"
          style={{ flex: 1, minWidth: '180px', background: '#111318', border: '1px solid #1e2128', borderRadius: '6px', padding: '9px 14px', color: '#e2e4ea', fontFamily: 'var(--font-dm-mono)', fontSize: '13px', outline: 'none' }}
        />
        <div style={{ display: 'flex', gap: '4px' }}>
          {(['attack', 'defense'] as const).map(s => (
            <button key={s} onClick={() => setSide(s)}
              style={{ padding: '9px 16px', background: side === s ? (s === 'attack' ? '#ff475720' : '#4ecdc420') : 'transparent', border: `1px solid ${side === s ? (s === 'attack' ? '#ff4757' : '#4ecdc4') : '#1e2128'}`, borderRadius: '6px', color: side === s ? (s === 'attack' ? '#ff4757' : '#4ecdc4') : '#5a5f72', fontFamily: 'var(--font-dm-mono)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 'bold' }}>
              {s === 'attack' ? 'ATK' : 'DEF'}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <button onClick={() => setShapes(p => p.slice(0, -1))} style={btnBase}>Undo</button>
          <button onClick={() => setShapes([])} style={btnBase}>Clear</button>
          <button onClick={handleSave} style={{ ...btnBase, background: '#e8ff47', color: '#0a0b0e', borderColor: '#e8ff47', fontWeight: 'bold' }}>
            Save
          </button>
        </div>
      </div>

      {/* ── Tags ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
        <span style={label}>Tags</span>
        {STRAT_TAGS.map(tag => {
          const active = tags.includes(tag);
          return (
            <button key={tag}
              onClick={() => setTags(prev => active ? prev.filter(t => t !== tag) : [...prev, tag])}
              style={{ padding: '3px 10px', background: active ? '#e8ff4720' : 'transparent', border: `1px solid ${active ? '#e8ff47' : '#2a2d38'}`, borderRadius: '20px', color: active ? '#e8ff47' : '#5a5f72', fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.12s' }}>
              {tag}
            </button>
          );
        })}
      </div>

      {/* ── Editor ── */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>

        {/* Canvas */}
        <div style={{ position: 'relative', width: CANVAS, height: CANVAS, backgroundImage: `url(${mapImageUrl})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundColor: '#060810', borderRadius: '10px', overflow: 'hidden', cursor, flexShrink: 0, border: '1px solid #1e2128' }}>
          <Stage width={CANVAS} height={CANVAS} ref={stageRef} pixelRatio={window.devicePixelRatio} onMouseDown={handleDown} onMouseMove={handleMove} onMouseUp={handleUp}>
            <Layer>{allShapes.map(renderShape)}</Layer>
          </Stage>
          {textPos && (
            <input
              ref={textInputRef}
              value={textVal}
              onChange={e => setTextVal(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === 'Escape') confirmText(); }}
              onBlur={confirmText}
              style={{ position: 'fixed', left: textPos.sx + 4, top: textPos.sy - 12, minWidth: '120px', background: 'rgba(6,8,16,0.92)', border: 'none', borderBottom: `2px solid ${color}`, color, fontFamily: 'DM Mono, monospace', fontSize: '14px', fontWeight: 'bold', outline: 'none', padding: '3px 8px', zIndex: 9999, borderRadius: '2px' }}
            />
          )}
        </div>

        {/* ── Right panel ── */}
        <div style={{ width: '210px', height: CANVAS, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#111318', border: '1px solid #1e2128', borderRadius: '10px', overflow: 'hidden' }}>

          {/* Tools */}
          <div style={{ padding: '16px 14px 12px' }}>
            <div style={label}>Tools</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', marginTop: '10px' }}>
              {TOOLS.map(t => (
                <button key={t.id} onClick={() => pickTool(t.id)} title={t.label}
                  style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 'bold', background: tool === t.id ? '#1e2128' : 'transparent', border: `1px solid ${tool === t.id ? '#e8ff47' : '#2a2d38'}`, borderRadius: '6px', color: tool === t.id ? '#e8ff47' : '#5a5f72', cursor: 'pointer', transition: 'all 0.15s' }}>
                  {t.icon}
                </button>
              ))}
            </div>
            {tool !== 'agent' && (
              <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: '#5a5f72', marginTop: '8px', opacity: 0.7 }}>
                {tool === 'arrow' && 'Click and drag'}
                {tool === 'path'  && 'Draw freely'}
                {tool === 'circle'&& 'Click and drag (radius)'}
                {tool === 'text'  && 'Click → type → Enter'}
                {tool === 'wall'  && 'Click and drag (wall line)'}
              </div>
            )}
          </div>

          {/* Colors */}
          <div style={{ padding: '0 14px 14px' }}>
            <div style={label}>Color</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '5px', marginTop: '10px' }}>
              {COLORS.map(c => (
                <button key={c} onClick={() => setColor(c)}
                  style={{ height: '22px', background: c, border: `2px solid ${color === c ? '#e2e4ea' : 'transparent'}`, borderRadius: '4px', cursor: 'pointer', transition: 'border 0.1s' }}
                />
              ))}
            </div>
          </div>

          <div style={{ height: '1px', background: '#1e2128', margin: '0 14px' }} />

          {/* Ability picker — visible when an agent is selected */}
          {selAgent && (
            <>
              <div style={{ padding: '10px 12px 10px', borderBottom: '1px solid #1e2128' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', overflow: 'hidden', background: ROLE_COLORS[selAgent.role], flexShrink: 0 }}>
                    <img src={selAgent.icon} alt={selAgent.name} width={20} height={20} style={{ display: 'block', objectFit: 'cover' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: ROLE_COLORS[selAgent.role], letterSpacing: '1px' }}>
                    {selAgent.name.toUpperCase()}
                  </span>
                  <button onClick={() => { setSelAbility(null); setSelAgent(null); setTool('arrow'); }}
                    style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#5a5f72', cursor: 'pointer', fontSize: '12px', padding: '0 2px' }}>✕</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                  {selAgent.abilities.map(ability => {
                    const active = selAbility?.slot === ability.slot;
                    const rc = ROLE_COLORS[selAgent.role];
                    return (
                      <button key={ability.slot}
                        onClick={() => setSelAbility(active ? null : ability)}
                        title={`${SLOT_LABELS[ability.slot]} — ${ability.name}`}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '6px 2px 4px', background: active ? '#1e2128' : 'transparent', border: `1px solid ${active ? rc : '#2a2d38'}`, borderRadius: '6px', cursor: 'pointer', transition: 'all 0.12s' }}
                      >
                        <div style={{ position: 'relative', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ position: 'absolute', fontSize: 9, fontWeight: 'bold', color: active ? rc : '#5a5f72' }}>{SLOT_LABELS[ability.slot]}</span>
                          <img src={ability.icon} alt={ability.name} width={20} height={20}
                            style={{ position: 'relative', zIndex: 1, display: 'block', objectFit: 'contain', opacity: active ? 1 : 0.6 }}
                            onLoad={(e) => { (e.target as HTMLImageElement).style.visibility = 'visible'; }}
                            onError={(e) => { (e.target as HTMLImageElement).style.visibility = 'hidden'; }}
                          />
                        </div>
                        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '8px', color: active ? rc : '#5a5f72', fontWeight: 'bold' }}>
                          {SLOT_LABELS[ability.slot]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Agents */}
          <div className="agents-scroll" style={{ flex: 1, overflowY: 'auto', padding: '12px 10px 10px' }}>
            <div style={{ ...label, paddingLeft: '4px', marginBottom: '10px' }}>Agents</div>
            {(['Duelist', 'Controller', 'Initiator', 'Sentinel'] as AgentRole[]).map(role => (
              <div key={role} style={{ marginBottom: '10px' }}>
                <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '8px', letterSpacing: '2px', color: ROLE_COLORS[role], textTransform: 'uppercase', marginBottom: '6px', paddingLeft: '2px' }}>
                  {role}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px' }}>
                  {AGENTS.filter(a => a.role === role).map(agent => {
                    const active = selAgent?.name === agent.name;
                    return (
                      <button key={agent.name}
                        onClick={() => { pickTool('agent'); setSelAgent(agent); }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', padding: '8px 4px 6px', background: active ? '#1e2128' : 'transparent', border: `1px solid ${active ? ROLE_COLORS[role] : 'transparent'}`, borderRadius: '6px', cursor: 'pointer', transition: 'all 0.15s' }}
                      >
                        <div style={{ width: '34px', height: '34px', borderRadius: '50%', overflow: 'hidden', background: ROLE_COLORS[role], border: active ? `2px solid ${ROLE_COLORS[role]}` : '2px solid transparent', flexShrink: 0, boxShadow: active ? `0 0 8px ${ROLE_COLORS[role]}60` : 'none' }}>
                          <img src={agent.icon} alt={agent.name} width={34} height={34} style={{ display: 'block', objectFit: 'cover' }} />
                        </div>
                        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', color: active ? '#e2e4ea' : '#8a90a2', textAlign: 'center', lineHeight: 1.2 }}>
                          {agent.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Hint ── */}
      {tool === 'agent' && selAgent && (
        <div style={{ marginTop: '10px', fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: ROLE_COLORS[selAgent.role as AgentRole], display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⬟</span>
          {selAbility
            ? <span>Click on the map to place <strong>{selAbility.name}</strong> ({SLOT_LABELS[selAbility.slot]}) — drag to reposition</span>
            : <span>Click on the map to place <strong>{selAgent.name}</strong> — or select an ability above</span>
          }
        </div>
      )}

      <Modal
        isOpen={alertOpen}
        title="Missing name"
        message="Give your strat a name before saving."
        confirmLabel="OK"
        onConfirm={() => setAlertOpen(false)}
      />
    </div>
  );
}

function uid() { return crypto.randomUUID(); }
