export type AgentRole = 'Duelist' | 'Controller' | 'Initiator' | 'Sentinel';

export interface AbilityInfo {
  slot: 'Grenade' | 'Ability1' | 'Ability2' | 'Ultimate';
  name: string;
  icon: string;
}

export interface AgentInfo {
  name: string;
  role: AgentRole;
  icon: string;
  abilities: AbilityInfo[];
}

export const ROLE_COLORS: Record<AgentRole, string> = {
  Duelist:    '#ff6b6b',
  Controller: '#74b9ff',
  Initiator:  '#fdcb6e',
  Sentinel:   '#55efc4',
};

export const SLOT_LABELS: Record<string, string> = {
  Grenade:  'C',
  Ability1: 'Q',
  Ability2: 'E',
  Ultimate: 'X',
};

const ab = (slot: AbilityInfo['slot'], name: string, icon: string): AbilityInfo => ({ slot, name, icon });
const url = (uuid: string, slot: string) => `https://media.valorant-api.com/agents/${uuid}/abilities/${slot.toLowerCase()}/displayicon.png`;

export const AGENTS: AgentInfo[] = [
  // ── Duelists ──
  {
    name: 'Jett', role: 'Duelist',
    icon: 'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png',
    abilities: [
      ab('Grenade',  'Updraft',     url('add6443a-41bd-e414-f6ad-e58d267f4e95', 'Grenade')),
      ab('Ability1', 'Tailwind',    url('add6443a-41bd-e414-f6ad-e58d267f4e95', 'Ability1')),
      ab('Ability2', 'Cloudburst',  url('add6443a-41bd-e414-f6ad-e58d267f4e95', 'Ability2')),
      ab('Ultimate', 'Blade Storm', url('add6443a-41bd-e414-f6ad-e58d267f4e95', 'Ultimate')),
    ],
  },
  {
    name: 'Iso', role: 'Duelist',
    icon: 'https://media.valorant-api.com/agents/0e38b510-41a8-5780-5e8f-568b2a4f2d6c/displayicon.png',
    abilities: [
      ab('Grenade',  'Contingency',   url('0e38b510-41a8-5780-5e8f-568b2a4f2d6c', 'Grenade')),
      ab('Ability1', 'Undercut',      url('0e38b510-41a8-5780-5e8f-568b2a4f2d6c', 'Ability1')),
      ab('Ability2', 'Double Tap',    url('0e38b510-41a8-5780-5e8f-568b2a4f2d6c', 'Ability2')),
      ab('Ultimate', 'Kill Contract', url('0e38b510-41a8-5780-5e8f-568b2a4f2d6c', 'Ultimate')),
    ],
  },
  {
    name: 'Neon', role: 'Duelist',
    icon: 'https://media.valorant-api.com/agents/bb2a4828-46eb-8cd1-e765-15848195d751/displayicon.png',
    abilities: [
      ab('Grenade',  'Fast Lane',  url('bb2a4828-46eb-8cd1-e765-15848195d751', 'Grenade')),
      ab('Ability1', 'Relay Bolt', url('bb2a4828-46eb-8cd1-e765-15848195d751', 'Ability1')),
      ab('Ability2', 'High Gear',  url('bb2a4828-46eb-8cd1-e765-15848195d751', 'Ability2')),
      ab('Ultimate', 'Overdrive',  url('bb2a4828-46eb-8cd1-e765-15848195d751', 'Ultimate')),
    ],
  },
  {
    name: 'Phoenix', role: 'Duelist',
    icon: 'https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayicon.png',
    abilities: [
      ab('Grenade',  'Blaze',       url('eb93336a-449b-9c1b-0a54-a891f7921d69', 'Grenade')),
      ab('Ability1', 'Curveball',   url('eb93336a-449b-9c1b-0a54-a891f7921d69', 'Ability1')),
      ab('Ability2', 'Hot Hands',   url('eb93336a-449b-9c1b-0a54-a891f7921d69', 'Ability2')),
      ab('Ultimate', 'Run It Back', url('eb93336a-449b-9c1b-0a54-a891f7921d69', 'Ultimate')),
    ],
  },
  {
    name: 'Raze', role: 'Duelist',
    icon: 'https://media.valorant-api.com/agents/f94c3b30-42be-e959-889c-5aa313dba261/displayicon.png',
    abilities: [
      ab('Grenade',  'Boom Bot',     url('f94c3b30-42be-e959-889c-5aa313dba261', 'Grenade')),
      ab('Ability1', 'Blast Pack',   url('f94c3b30-42be-e959-889c-5aa313dba261', 'Ability1')),
      ab('Ability2', 'Paint Shells', url('f94c3b30-42be-e959-889c-5aa313dba261', 'Ability2')),
      ab('Ultimate', 'Showstopper',  url('f94c3b30-42be-e959-889c-5aa313dba261', 'Ultimate')),
    ],
  },
  {
    name: 'Reyna', role: 'Duelist',
    icon: 'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png',
    abilities: [
      ab('Grenade',  'Leer',    url('a3bfb853-43b2-7238-a4f1-ad90e9e46bcc', 'Grenade')),
      ab('Ability1', 'Devour',  url('a3bfb853-43b2-7238-a4f1-ad90e9e46bcc', 'Ability1')),
      ab('Ability2', 'Dismiss', url('a3bfb853-43b2-7238-a4f1-ad90e9e46bcc', 'Ability2')),
      ab('Ultimate', 'Empress', url('a3bfb853-43b2-7238-a4f1-ad90e9e46bcc', 'Ultimate')),
    ],
  },
  {
    name: 'Waylay', role: 'Duelist',
    icon: 'https://media.valorant-api.com/agents/df1cb487-4902-002e-5c17-d28e83e78588/displayicon.png',
    abilities: [
      ab('Grenade',  'Saturate',         url('df1cb487-4902-002e-5c17-d28e83e78588', 'Grenade')),
      ab('Ability1', 'Lightspeed',        url('df1cb487-4902-002e-5c17-d28e83e78588', 'Ability1')),
      ab('Ability2', 'Refract',           url('df1cb487-4902-002e-5c17-d28e83e78588', 'Ability2')),
      ab('Ultimate', 'Convergent Paths',  url('df1cb487-4902-002e-5c17-d28e83e78588', 'Ultimate')),
    ],
  },


  // ── Controllers ──
  {
    name: 'Astra', role: 'Controller',
    icon: 'https://media.valorant-api.com/agents/41fb69c1-4189-7b37-f117-bcaf1e96f1bf/displayicon.png',
    abilities: [
      ab('Grenade',  'Gravity Well',              url('41fb69c1-4189-7b37-f117-bcaf1e96f1bf', 'Grenade')),
      ab('Ability1', 'Nova Pulse',                url('41fb69c1-4189-7b37-f117-bcaf1e96f1bf', 'Ability1')),
      ab('Ability2', 'Nebula',                    url('41fb69c1-4189-7b37-f117-bcaf1e96f1bf', 'Ability2')),
      ab('Ultimate', 'Cosmic Divide',             url('41fb69c1-4189-7b37-f117-bcaf1e96f1bf', 'Ultimate')),
    ],
  },
  {
    name: 'Brimstone', role: 'Controller',
    icon: 'https://media.valorant-api.com/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417/displayicon.png',
    abilities: [
      ab('Grenade',  'Stim Beacon',    url('9f0d8ba9-4140-b941-57d3-a7ad57c6b417', 'Grenade')),
      ab('Ability1', 'Incendiary',     url('9f0d8ba9-4140-b941-57d3-a7ad57c6b417', 'Ability1')),
      ab('Ability2', 'Sky Smoke',      url('9f0d8ba9-4140-b941-57d3-a7ad57c6b417', 'Ability2')),
      ab('Ultimate', 'Orbital Strike', url('9f0d8ba9-4140-b941-57d3-a7ad57c6b417', 'Ultimate')),
    ],
  },
  {
    name: 'Clove', role: 'Controller',
    icon: 'https://media.valorant-api.com/agents/1dbf2edd-4729-0984-3115-daa5eed44993/displayicon.png',
    abilities: [
      ab('Grenade',  'Pick-me-up',  url('1dbf2edd-4729-0984-3115-daa5eed44993', 'Grenade')),
      ab('Ability1', 'Meddle',      url('1dbf2edd-4729-0984-3115-daa5eed44993', 'Ability1')),
      ab('Ability2', 'Ruse',        url('1dbf2edd-4729-0984-3115-daa5eed44993', 'Ability2')),
      ab('Ultimate', 'Not Dead Yet',url('1dbf2edd-4729-0984-3115-daa5eed44993', 'Ultimate')),
    ],
  },
  {
    name: 'Harbor', role: 'Controller',
    icon: 'https://media.valorant-api.com/agents/95b78ed7-4637-86d9-7e41-71ba8c293152/displayicon.png',
    abilities: [
      ab('Grenade',  'Storm Surge', url('95b78ed7-4637-86d9-7e41-71ba8c293152', 'Grenade')),
      ab('Ability1', 'High Tide',   url('95b78ed7-4637-86d9-7e41-71ba8c293152', 'Ability1')),
      ab('Ability2', 'Cove',        url('95b78ed7-4637-86d9-7e41-71ba8c293152', 'Ability2')),
      ab('Ultimate', 'Reckoning',   url('95b78ed7-4637-86d9-7e41-71ba8c293152', 'Ultimate')),
    ],
  },
  {
    name: 'Miks', role: 'Controller',
    icon: 'https://media.valorant-api.com/agents/7c8a4701-4de6-9355-b254-e09bc2a34b72/displayicon.png',
    abilities: [
      ab('Grenade',  'M-pulse',   url('7c8a4701-4de6-9355-b254-e09bc2a34b72', 'Grenade')),
      ab('Ability1', 'Harmonize', url('7c8a4701-4de6-9355-b254-e09bc2a34b72', 'Ability1')),
      ab('Ability2', 'Waveform',  url('7c8a4701-4de6-9355-b254-e09bc2a34b72', 'Ability2')),
      ab('Ultimate', 'Bassquake', url('7c8a4701-4de6-9355-b254-e09bc2a34b72', 'Ultimate')),
    ],
  },
  {
    name: 'Omen', role: 'Controller',
    icon: 'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png',
    abilities: [
      ab('Grenade',  'Shrouded Step',    url('8e253930-4c05-31dd-1b6c-968525494517', 'Grenade')),
      ab('Ability1', 'Paranoia',          url('8e253930-4c05-31dd-1b6c-968525494517', 'Ability1')),
      ab('Ability2', 'Dark Cover',        url('8e253930-4c05-31dd-1b6c-968525494517', 'Ability2')),
      ab('Ultimate', 'From the Shadows',  url('8e253930-4c05-31dd-1b6c-968525494517', 'Ultimate')),
    ],
  },
  {
    name: 'Viper', role: 'Controller',
    icon: 'https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/displayicon.png',
    abilities: [
      ab('Grenade',  'Snake Bite',   url('707eab51-4836-f488-046a-cda6bf494859', 'Grenade')),
      ab('Ability1', 'Poison Cloud', url('707eab51-4836-f488-046a-cda6bf494859', 'Ability1')),
      ab('Ability2', 'Toxic Screen', url('707eab51-4836-f488-046a-cda6bf494859', 'Ability2')),
      ab('Ultimate', "Viper's Pit",  url('707eab51-4836-f488-046a-cda6bf494859', 'Ultimate')),
    ],
  },

  // ── Initiators ──
  {
    name: 'Breach', role: 'Initiator',
    icon: 'https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/displayicon.png',
    abilities: [
      ab('Grenade',  'Aftershock',      url('5f8d3a7f-467b-97f3-062c-13acf203c006', 'Grenade')),
      ab('Ability1', 'Flashpoint',       url('5f8d3a7f-467b-97f3-062c-13acf203c006', 'Ability1')),
      ab('Ability2', 'Fault Line',       url('5f8d3a7f-467b-97f3-062c-13acf203c006', 'Ability2')),
      ab('Ultimate', 'Rolling Thunder',  url('5f8d3a7f-467b-97f3-062c-13acf203c006', 'Ultimate')),
    ],
  },
  {
    name: 'Fade', role: 'Initiator',
    icon: 'https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/displayicon.png',
    abilities: [
      ab('Grenade',  'Prowler',   url('dade69b4-4f5a-8528-247b-219e5a1facd6', 'Grenade')),
      ab('Ability1', 'Seize',     url('dade69b4-4f5a-8528-247b-219e5a1facd6', 'Ability1')),
      ab('Ability2', 'Haunt',     url('dade69b4-4f5a-8528-247b-219e5a1facd6', 'Ability2')),
      ab('Ultimate', 'Nightfall', url('dade69b4-4f5a-8528-247b-219e5a1facd6', 'Ultimate')),
    ],
  },
  {
    name: 'Gekko', role: 'Initiator',
    icon: 'https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/displayicon.png',
    abilities: [
      ab('Grenade',  'Mosh Pit', url('e370fa57-4757-3604-3648-499e1f642d3f', 'Grenade')),
      ab('Ability1', 'Wingman',  url('e370fa57-4757-3604-3648-499e1f642d3f', 'Ability1')),
      ab('Ability2', 'Dizzy',    url('e370fa57-4757-3604-3648-499e1f642d3f', 'Ability2')),
      ab('Ultimate', 'Thrash',   url('e370fa57-4757-3604-3648-499e1f642d3f', 'Ultimate')),
    ],
  },
  {
    name: 'KAY/O', role: 'Initiator',
    icon: 'https://media.valorant-api.com/agents/601dbbe7-43ce-be57-2a40-4abd24953621/displayicon.png',
    abilities: [
      ab('Grenade',  'FRAG/ment',  url('601dbbe7-43ce-be57-2a40-4abd24953621', 'Grenade')),
      ab('Ability1', 'FLASH/drive',url('601dbbe7-43ce-be57-2a40-4abd24953621', 'Ability1')),
      ab('Ability2', 'ZERO/point', url('601dbbe7-43ce-be57-2a40-4abd24953621', 'Ability2')),
      ab('Ultimate', 'NULL/cmd',   url('601dbbe7-43ce-be57-2a40-4abd24953621', 'Ultimate')),
    ],
  },
  {
    name: 'Skye', role: 'Initiator',
    icon: 'https://media.valorant-api.com/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/displayicon.png',
    abilities: [
      ab('Grenade',  'Regrowth',      url('6f2a04ca-43e0-be17-7f36-b3908627744d', 'Grenade')),
      ab('Ability1', 'Trailblazer',   url('6f2a04ca-43e0-be17-7f36-b3908627744d', 'Ability1')),
      ab('Ability2', 'Guiding Light', url('6f2a04ca-43e0-be17-7f36-b3908627744d', 'Ability2')),
      ab('Ultimate', 'Seekers',       url('6f2a04ca-43e0-be17-7f36-b3908627744d', 'Ultimate')),
    ],
  },
  {
    name: 'Sova', role: 'Initiator',
    icon: 'https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png',
    abilities: [
      ab('Grenade',  'Owl Drone',    url('320b2a48-4d9b-a075-30f1-1f93a9b638fa', 'Grenade')),
      ab('Ability1', 'Shock Bolt',   url('320b2a48-4d9b-a075-30f1-1f93a9b638fa', 'Ability1')),
      ab('Ability2', 'Recon Bolt',   url('320b2a48-4d9b-a075-30f1-1f93a9b638fa', 'Ability2')),
      ab('Ultimate', "Hunter's Fury",url('320b2a48-4d9b-a075-30f1-1f93a9b638fa', 'Ultimate')),
    ],
  },
  {
    name: 'Tejo', role: 'Initiator',
    icon: 'https://media.valorant-api.com/agents/b444168c-4e35-8076-db47-ef9bf368f384/displayicon.png',
    abilities: [
      ab('Grenade',  'Stealth Drone',   url('b444168c-4e35-8076-db47-ef9bf368f384', 'Grenade')),
      ab('Ability1', 'Special Delivery',url('b444168c-4e35-8076-db47-ef9bf368f384', 'Ability1')),
      ab('Ability2', 'Guided Salvo',    url('b444168c-4e35-8076-db47-ef9bf368f384', 'Ability2')),
      ab('Ultimate', 'Armageddon',      url('b444168c-4e35-8076-db47-ef9bf368f384', 'Ultimate')),
    ],
  },

  // ── Sentinels ──
  {
    name: 'Chamber', role: 'Sentinel',
    icon: 'https://media.valorant-api.com/agents/22697a3d-45bf-8dd7-4fec-84a9e28c69d7/displayicon.png',
    abilities: [
      ab('Grenade',  'Trademark',    url('22697a3d-45bf-8dd7-4fec-84a9e28c69d7', 'Grenade')),
      ab('Ability1', 'Headhunter',   url('22697a3d-45bf-8dd7-4fec-84a9e28c69d7', 'Ability1')),
      ab('Ability2', 'Rendezvous',   url('22697a3d-45bf-8dd7-4fec-84a9e28c69d7', 'Ability2')),
      ab('Ultimate', 'Tour De Force',url('22697a3d-45bf-8dd7-4fec-84a9e28c69d7', 'Ultimate')),
    ],
  },
  {
    name: 'Cypher', role: 'Sentinel',
    icon: 'https://media.valorant-api.com/agents/117ed9e3-49f3-6512-3ccf-0cada7e3823b/displayicon.png',
    abilities: [
      ab('Grenade',  'Trapwire',    url('117ed9e3-49f3-6512-3ccf-0cada7e3823b', 'Grenade')),
      ab('Ability1', 'Cyber Cage',  url('117ed9e3-49f3-6512-3ccf-0cada7e3823b', 'Ability1')),
      ab('Ability2', 'Spycam',      url('117ed9e3-49f3-6512-3ccf-0cada7e3823b', 'Ability2')),
      ab('Ultimate', 'Neural Theft',url('117ed9e3-49f3-6512-3ccf-0cada7e3823b', 'Ultimate')),
    ],
  },
  {
    name: 'Deadlock', role: 'Sentinel',
    icon: 'https://media.valorant-api.com/agents/cc8b64c8-4b25-4ff9-6e7f-37b4da43d235/displayicon.png',
    abilities: [
      ab('Grenade',  'Barrier Mesh', url('cc8b64c8-4b25-4ff9-6e7f-37b4da43d235', 'Grenade')),
      ab('Ability1', 'Sonic Sensor', url('cc8b64c8-4b25-4ff9-6e7f-37b4da43d235', 'Ability1')),
      ab('Ability2', 'GravNet',      url('cc8b64c8-4b25-4ff9-6e7f-37b4da43d235', 'Ability2')),
      ab('Ultimate', 'Annihilation', url('cc8b64c8-4b25-4ff9-6e7f-37b4da43d235', 'Ultimate')),
    ],
  },
  {
    name: 'Killjoy', role: 'Sentinel',
    icon: 'https://media.valorant-api.com/agents/1e58de9c-4950-5125-93e9-a0aee9f98746/displayicon.png',
    abilities: [
      ab('Grenade',  'Nanoswarm', url('1e58de9c-4950-5125-93e9-a0aee9f98746', 'Grenade')),
      ab('Ability1', 'Alarmbot',  url('1e58de9c-4950-5125-93e9-a0aee9f98746', 'Ability1')),
      ab('Ability2', 'Turret',    url('1e58de9c-4950-5125-93e9-a0aee9f98746', 'Ability2')),
      ab('Ultimate', 'Lockdown',  url('1e58de9c-4950-5125-93e9-a0aee9f98746', 'Ultimate')),
    ],
  },
  {
    name: 'Sage', role: 'Sentinel',
    icon: 'https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayicon.png',
    abilities: [
      ab('Grenade',  'Barrier Orb',  url('569fdd95-4d10-43ab-ca70-79becc718b46', 'Grenade')),
      ab('Ability1', 'Slow Orb',     url('569fdd95-4d10-43ab-ca70-79becc718b46', 'Ability1')),
      ab('Ability2', 'Healing Orb',  url('569fdd95-4d10-43ab-ca70-79becc718b46', 'Ability2')),
      ab('Ultimate', 'Resurrection', url('569fdd95-4d10-43ab-ca70-79becc718b46', 'Ultimate')),
    ],
  },
  {
    name: 'Veto', role: 'Sentinel',
    icon: 'https://media.valorant-api.com/agents/92eeef5d-43b5-1d4a-8d03-b3927a09034b/displayicon.png',
    abilities: [
      ab('Grenade',  'Crosscut',    url('92eeef5d-43b5-1d4a-8d03-b3927a09034b', 'Grenade')),
      ab('Ability1', 'Chokehold',   url('92eeef5d-43b5-1d4a-8d03-b3927a09034b', 'Ability1')),
      ab('Ability2', 'Interceptor', url('92eeef5d-43b5-1d4a-8d03-b3927a09034b', 'Ability2')),
      ab('Ultimate', 'Evolution',   url('92eeef5d-43b5-1d4a-8d03-b3927a09034b', 'Ultimate')),
    ],
  },
  {
    name: 'Vyse', role: 'Sentinel',
    icon: 'https://media.valorant-api.com/agents/efba5359-4016-a1e5-7626-b1ae76895940/displayicon.png',
    abilities: [
      ab('Grenade',  'Razorvine',   url('efba5359-4016-a1e5-7626-b1ae76895940', 'Grenade')),
      ab('Ability1', 'Shear',       url('efba5359-4016-a1e5-7626-b1ae76895940', 'Ability1')),
      ab('Ability2', 'Arc Rose',    url('efba5359-4016-a1e5-7626-b1ae76895940', 'Ability2')),
      ab('Ultimate', 'Steel Garden',url('efba5359-4016-a1e5-7626-b1ae76895940', 'Ultimate')),
    ],
  },
];
