'use client';

import { useState } from 'react';
import { AGENTS, ROLE_COLORS, type AgentRole } from '@/lib/data/agents';
import type { CompoAgent } from '@/lib/types';
import Modal from '@/components/ui/Modal';

interface Props {
  initialName?: string;
  initialAgents?: CompoAgent[];
  onSave: (name: string, agents: CompoAgent[]) => void;
}

const ROLE_ORDER: AgentRole[] = ['Duelist', 'Controller', 'Initiator', 'Sentinel'];

export default function CompoEditor({ initialName = '', initialAgents = [], onSave }: Props) {
  const [name, setName]       = useState(initialName);
  const [agents, setAgents]   = useState<CompoAgent[]>(initialAgents);
  const [alertOpen, setAlertOpen] = useState<string | null>(null);

  const selectedNames = new Set(agents.map(a => a.agentName));

  function toggleAgent(agentName: string, agentRole: string, agentIcon: string) {
    if (selectedNames.has(agentName)) {
      setAgents(prev => prev.filter(a => a.agentName !== agentName));
    } else {
      if (agents.length >= 5) { setAlertOpen('max'); return; }
      setAgents(prev => [...prev, { agentName, agentRole, agentIcon }]);
    }
  }

  function moveUp(i: number) {
    if (i === 0) return;
    setAgents(prev => { const a = [...prev]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; return a; });
  }

  function moveDown(i: number) {
    if (i === agents.length - 1) return;
    setAgents(prev => { const a = [...prev]; [a[i], a[i + 1]] = [a[i + 1], a[i]]; return a; });
  }

  function handleSave() {
    if (!name.trim()) { setAlertOpen('name'); return; }
    if (agents.length === 0) { setAlertOpen('empty'); return; }
    onSave(name, agents);
  }

  return (
    <div>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Comp name…"
          style={{ flex: 1, minWidth: '180px', background: '#111318', border: '1px solid #1e2128', borderRadius: '6px', padding: '9px 14px', color: '#e2e4ea', fontFamily: 'var(--font-dm-mono)', fontSize: '13px', outline: 'none' }}
        />
        <button onClick={handleSave} style={{ padding: '9px 24px', background: '#e8ff47', border: '1px solid #e8ff47', borderRadius: '6px', color: '#0a0b0e', fontFamily: 'var(--font-dm-mono)', fontSize: '12px', letterSpacing: '1px', fontWeight: 'bold', cursor: 'pointer' }}>
          Save
        </button>
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>

        {/* Slots panel */}
        <div style={{ width: '220px', flexShrink: 0, background: '#111318', border: '1px solid #1e2128', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#5a5f72', marginBottom: '14px' }}>
            Composition ({agents.length}/5)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Array.from({ length: 5 }).map((_, i) => {
              const agent = agents[i];
              const rc = agent ? (ROLE_COLORS[agent.agentRole as AgentRole] ?? '#5a5f72') : '#2a2d38';
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: agent ? '#0a0b0e' : 'transparent', border: `1px solid ${rc}`, borderRadius: '8px', padding: '8px 10px', minHeight: '46px' }}>
                  {agent ? (
                    <>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', background: rc, flexShrink: 0 }}>
                        <img src={agent.agentIcon} alt={agent.agentName} width={28} height={28} style={{ display: 'block', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: '#e2e4ea', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{agent.agentName}</div>
                        <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '8px', color: rc, letterSpacing: '1px', textTransform: 'uppercase' }}>{agent.agentRole}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <button onClick={() => moveUp(i)} disabled={i === 0} style={{ background: 'transparent', border: 'none', color: i === 0 ? '#2a2d38' : '#5a5f72', cursor: i === 0 ? 'default' : 'pointer', fontSize: '10px', lineHeight: 1, padding: '1px 2px' }}>▲</button>
                        <button onClick={() => moveDown(i)} disabled={i === agents.length - 1} style={{ background: 'transparent', border: 'none', color: i === agents.length - 1 ? '#2a2d38' : '#5a5f72', cursor: i === agents.length - 1 ? 'default' : 'pointer', fontSize: '10px', lineHeight: 1, padding: '1px 2px' }}>▼</button>
                      </div>
                      <button onClick={() => toggleAgent(agent.agentName, agent.agentRole, agent.agentIcon)} style={{ background: 'transparent', border: 'none', color: '#5a5f72', cursor: 'pointer', fontSize: '12px', padding: '0 2px', flexShrink: 0 }}>✕</button>
                    </>
                  ) : (
                    <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: '#2a2d38', letterSpacing: '1px' }}>
                      Slot {i + 1}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Agent picker */}
        <div style={{ flex: 1, background: '#111318', border: '1px solid #1e2128', borderRadius: '10px', padding: '16px', overflowY: 'auto', maxHeight: '520px' }}>
          <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#5a5f72', marginBottom: '14px' }}>
            Agents
          </div>
          {ROLE_ORDER.map(role => (
            <div key={role} style={{ marginBottom: '16px' }}>
              <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '8px', letterSpacing: '2px', color: ROLE_COLORS[role], textTransform: 'uppercase', marginBottom: '8px' }}>
                {role}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {AGENTS.filter(a => a.role === role).map(agent => {
                  const active = selectedNames.has(agent.name);
                  const rc = ROLE_COLORS[role];
                  return (
                    <button
                      key={agent.name}
                      onClick={() => toggleAgent(agent.name, agent.role, agent.icon)}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 12px 7px 8px', background: active ? rc + '18' : 'transparent', border: `1px solid ${active ? rc : '#2a2d38'}`, borderRadius: '8px', cursor: 'pointer', transition: 'all 0.12s', opacity: (!active && agents.length >= 5) ? 0.35 : 1 }}
                    >
                      <div style={{ width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden', background: rc, flexShrink: 0 }}>
                        <img src={agent.icon} alt={agent.name} width={30} height={30} style={{ display: 'block', objectFit: 'cover' }} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: active ? '#e2e4ea' : '#8a90a2', fontWeight: active ? 'bold' : 'normal', whiteSpace: 'nowrap' }}>
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

      <Modal
        isOpen={alertOpen === 'name'}
        title="Missing name"
        message="Give your comp a name before saving."
        confirmLabel="OK"
        onConfirm={() => setAlertOpen(null)}
      />
      <Modal
        isOpen={alertOpen === 'empty'}
        title="No agent"
        message="Select at least one agent to create a comp."
        confirmLabel="OK"
        onConfirm={() => setAlertOpen(null)}
      />
      <Modal
        isOpen={alertOpen === 'max'}
        title="Comp full"
        message="You already have 5 agents. Remove one to add another."
        confirmLabel="OK"
        onConfirm={() => setAlertOpen(null)}
      />
    </div>
  );
}
