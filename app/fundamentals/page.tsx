import type { Metadata } from "next";

export const metadata: Metadata = { title: "Fundamentals — Coaching Hub" };

const accent = "#e8ff47";

const NAV_LINKS = [
  { id: "communication", label: "Communication" },
  { id: "pmar", label: "PMAR" },
  { id: "trading", label: "Trading" },
  { id: "spacing", label: "Spacing" },
  { id: "numerical", label: "Numerical" },
  { id: "keywords", label: "Keywords" },
  { id: "philosophy", label: "Philosophy" },
  { id: "leading", label: "Leading" },
  { id: "tempo", label: "Tempo" },
  { id: "roles", label: "Roles" },
  { id: "plays", label: "Types of Plays" },
  { id: "mapcontrol", label: "Map Control" },
  { id: "economy", label: "Economy" },
  { id: "retakes", label: "Retakes" },
  { id: "bunker", label: "Bunker & HP" },
];

const META_KEYWORDS = [
  { word: "BUNKER", def: "Retreat on the bombsite, avoid controlling neutral zones (usually leave mid)." },
  { word: "CONTACT", def: "SHIFT to a pre-determined checkpoint. Release stuff (smoke/flash etc.) and go to the BP." },
  { word: "ANTI-FLASH", def: "After taking a main, call 'I'm anti-flash' to dodge enemy flash on a retaking situation." },
  { word: "PARANO(IA)", def: "Enemies can be everywhere." },
  { word: "PLAY ANTI", def: "Break enemy abilities coming out — coordinated on post plant / taking a main." },
  { word: "FLOOD", def: "Fast Retake." },
  { word: "BURGER", def: "UP & Down / Double line." },
];

const TEAM_KEYWORDS = [
  { word: "ADVANTAGE", def: "Freeze & play safer — we have Man Advantage." },
  { word: "JOKER", def: "You have a timing and can win the round alone. Teammates freeze. You ask them to commit if necessary." },
  { word: "BODYGUARD", def: "Cover plant / Defuse." },
  { word: "TRANSFER / FIFA", def: "Take back space post-plant or retake. Force enemy to use abilities higher on the map without necessarily keeping the space." },
  { word: "INVENTORY", def: "Call what enemies have and what utility we have. Use before retakes or during post-plants." },
  { word: "BANANA", def: "Show presence in one area, cut sound, walk to another area." },
  { word: "CHICKEN", def: "Utility breaker." },
];

const ROLES = [
  {
    name: "LURK",
    color: "#ff9f43",
    desc: "Leverages space secured by the team. Creates timings (flank), cuts off rotations. Prevents enemy vision and forces dangerous angles. Slows the enemy during retakes and executes.",
  },
  {
    name: "SMOKE",
    color: "#4ecdc4",
    desc: "Support role. Always favors utility kit over a good weapon. Plays bunker smokes or one-way smokes to maintain area advantage.",
  },
  {
    name: "ANCHOR / FIX",
    color: "#a29bfe",
    desc: "Can solo delay a fast execute on CT side. Helps rotation on T side. Responsible for controlling an area on both sides.",
  },
  {
    name: "CATALYST / INITIATOR",
    color: "#e8ff47",
    desc: "Partner / secondary role. Complements other roles. Plays a crucial role in team dynamics — enables easier area control and takeover from the Dive/Entry with abilities.",
  },
  {
    name: "OPERATOR",
    color: "#5a5f72",
    desc: "Exploits various angles and heights (TP/JUMP etc.). Has utility to extract at any time (Damage/Movement).",
  },
  {
    name: "DIVE / ENTRY",
    color: "#ff4757",
    desc: "Uses utilities to open key areas (Dive). Pushes the boundaries of secured space (Entry). Can play deep retake positions. Must always adapt to which zone is clear.",
  },
];

const PLAY_TYPES = [
  { name: "CONTROL", side: "Both", desc: "Set abilities to control an area of the map." },
  { name: "CONTACT", side: "Both", desc: "Cutting noise & playing guns-out while reacting on contact." },
  { name: "REACTIVE", side: "Both", desc: "A reactive play on contact of a piece of utility or teammate." },
  { name: "AGGRO", side: "Both", desc: "Aggressive set play relying on pre-defined micro. Used to gain map control, create chaos, or for a duelist to get an entry." },
  { name: "ULTIMATES", side: "Both", desc: "Using ultimates to make a variety of plays. Falls into all previous categories — most of the time a win condition." },
  { name: "EXECUTES", side: "Attack", desc: "Using pre-defined set pieces of utility to execute into a site." },
  { name: "FAKE", side: "Both", desc: "Trick enemies into a wrong reaction. Use conditioning (macro/micro routine), tempo, ults, and metagameplay to sell it." },
  { name: "RETAKE", side: "Both", desc: "Using a set of key actions to retake a bombsite or part of a map." },
];

function SectionTitle({ id, label, tag }: { id: string; label: string; tag: string }) {
  return (
    <div
      id={id}
      style={{
        paddingTop: "64px",
        paddingBottom: "32px",
        borderBottom: "1px solid #1e2128",
        scrollMarginTop: "72px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "10px",
          color: accent,
          letterSpacing: "4px",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}
      >
        {tag}
      </div>
      <h2
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 800,
          letterSpacing: "-1.5px",
          color: "#e2e4ea",
          lineHeight: 1,
        }}
      >
        {label}
      </h2>
    </div>
  );
}

function Card({ children, accentColor = "#1e2128" }: { children: React.ReactNode; accentColor?: string }) {
  return (
    <div
      style={{
        background: "#111318",
        border: "1px solid #1e2128",
        borderRadius: "8px",
        padding: "24px 28px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "3px",
          height: "100%",
          background: accentColor,
        }}
      />
      {children}
    </div>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-syne)",
        fontSize: "15px",
        fontWeight: 800,
        color: "#e2e4ea",
        letterSpacing: "-0.3px",
        marginBottom: "12px",
      }}
    >
      {children}
    </div>
  );
}

function Label({ children, color = accent }: { children: React.ReactNode; color?: string }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-dm-mono)",
        fontSize: "9px",
        color,
        letterSpacing: "3px",
        textTransform: "uppercase",
        marginBottom: "6px",
      }}
    >
      {children}
    </div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "14px",
        color: "#9da3b4",
        lineHeight: 1.75,
      }}
    >
      {children}
    </p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            fontSize: "14px",
            color: "#9da3b4",
            lineHeight: 1.75,
            paddingLeft: "16px",
            position: "relative",
            marginBottom: "4px",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              color: accent,
            }}
          >
            —
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Grid({ children, cols = 2 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: "16px",
        marginTop: "24px",
      }}
    >
      {children}
    </div>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(232,255,71,0.04)",
        border: "1px solid rgba(232,255,71,0.15)",
        borderLeft: "3px solid #e8ff47",
        borderRadius: "0 6px 6px 0",
        padding: "16px 20px",
        fontFamily: "var(--font-dm-mono)",
        fontSize: "12px",
        color: "#e8ff47",
        lineHeight: 1.75,
        fontStyle: "italic",
        marginTop: "20px",
      }}
    >
      {children}
    </div>
  );
}

export default function FundamentalsPage() {
  return (
    <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 60px 100px" }}>

      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          padding: "60px 0 40px",
          borderBottom: "1px solid #1e2128",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(100px, 16vw, 240px)",
            color: "transparent",
            WebkitTextStroke: "1px #1e2128",
            position: "absolute",
            right: "-20px",
            top: "-10px",
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          FUND
        </div>
        <div
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "11px",
            color: accent,
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "12px",
            position: "relative",
          }}
        >
          // Game Knowledge
        </div>
        <h1
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 800,
            letterSpacing: "-2px",
            lineHeight: 1,
            color: "#e2e4ea",
            position: "relative",
          }}
        >
          GAME <span style={{ color: accent }}>FUNDAMENTALS</span>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "13px",
            color: "#5a5f72",
            marginTop: "16px",
            position: "relative",
          }}
        >
          {NAV_LINKS.length} sections — by Eden1
        </p>
      </div>

      {/* ── Quick Nav ───────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          padding: "24px 0",
          borderBottom: "1px solid #1e2128",
        }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#5a5f72",
              textDecoration: "none",
              padding: "6px 14px",
              border: "1px solid #1e2128",
              borderRadius: "20px",
              background: "#111318",
              transition: "color 0.2s, border-color 0.2s",
            }}
            className="nav-pill"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          1. COMMUNICATION
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionTitle id="communication" label="Communication" tag="// Team Knowledge — 01" />

      <Grid cols={2}>
        <Card accentColor={accent}>
          <Label>Basic comms</Label>
          <CardTitle>Utility Callout</CardTitle>
          <Body>Always call the utility + its position. Acknowledgement is always required ("Yes" / "Ok").</Body>
        </Card>
        <Card accentColor={accent}>
          <Label>Basic comms</Label>
          <CardTitle>Agent Position</CardTitle>
          <Body>Mandatory to call the agent when defaulting. On Attack, identify the sentinel site. On Defense, identify the extremity.</Body>
        </Card>
        <Card accentColor="#e8ff47">
          <Label>Flash protocol</Label>
          <CardTitle>Call Flash</CardTitle>
          <BulletList items={[
            'Player 1: "I flash [position]"',
            'Player 2: "Yes / Ok / Go"',
            'Player 1: "Flashing!"',
          ]} />
        </Card>
        <Card accentColor="#e8ff47">
          <Label>Retake protocol</Label>
          <CardTitle>Call Retakes</CardTitle>
          <BulletList items={[
            "Inventory of abilities",
            '"3 2 1 GO"',
            "Abilities + Position",
          ]} />
        </Card>
      </Grid>

      <div style={{ marginTop: "24px" }}>
        <Card accentColor="#a29bfe">
          <Label>Passive vs Active</Label>
          <CardTitle>Passive &amp; Active Communication</CardTitle>
          <Grid cols={2}>
            <div>
              <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", color: "#a29bfe", letterSpacing: "2px", marginBottom: "8px" }}>PASSIVE COM</div>
              <Body>Providing general information about what's happening around the map. Creates a mental picture of opponents' positioning, tendencies and playstyle. Example: "They are contesting long" / "They insta-contest shower".</Body>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", color: "#4ecdc4", letterSpacing: "2px", marginBottom: "8px" }}>ACTIVE COM</div>
              <Body>Delegate one or more actions. Most of the time reactions to passive comms, but also pre-round reads. Reactions can be micro or macro. Example: "They are contesting long → put deep smoke & break Skye dog."</Body>
            </div>
          </Grid>
        </Card>
      </div>

      <div style={{ marginTop: "24px" }}>
        <Card accentColor="#ff4757">
          <Label>Protocols</Label>
          <CardTitle>Communication Rules</CardTitle>
          <BulletList items={[
            "Communication must be clear, brief and assertive",
            "Use intonation & volume when calling to showcase importance",
            "Don't tilt call — your attitude has a great influence on others",
            "Don't make weird distracting noises",
            "Be specific but brief — call agent, utility and location",
            'Don\'t ask or request — be assertive. Say "Let\'s take long control", not "Can we take long control?"',
            "No one cares about last round — stop talking about previous rounds during pre-round",
          ]} />
        </Card>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          2. PMAR
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionTitle id="pmar" label="PMAR" tag="// Team Knowledge — 02" />

      <Quote>
        I RATHER HAVE A TEAM DOING THE WRONG CALL TOGETHER, THAN THE BEST CALL SEPARATELY. TRUSTING YOUR TEAMMATES AND DOING ANY ACTION AS A BLOCK IS ONE OF, IF NOT THE MOST, IMPORTANT THINGS IN VALORANT.
      </Quote>

      <Grid cols={2}>
        <Card accentColor={accent}>
          <Label>Pre Round — 30 seconds</Label>
          <CardTitle>Pre Round Protocol</CardTitle>
          <BulletList items={[
            "Shotcall: 5–8 seconds",
            "IGL Plan: 10 seconds",
            "Adjust: 10 seconds",
          ]} />
          <div style={{ marginTop: "16px" }}>
            <Body>Review: Economy, Ultimates, Routines shown, Weaknesses & Strengths, Tempo, Type of Play, Micro adjustments.</Body>
          </div>
        </Card>
        <Card accentColor="#a29bfe">
          <Label>Mid Round</Label>
          <CardTitle>Waves</CardTitle>
          <Body>Rounds are divided into Waves — phases where we apply pressure/take space. Separated by Freeze & Map Control. The final wave is called a "Tsunami" (retake/execute). Every player must be able to mid-round — teams that rely solely on the IGL are easier to read.</Body>
        </Card>
        <Card accentColor="#ff9f43">
          <Label>After Plant</Label>
          <CardTitle>After Plant Protocols</CardTitle>
          <BulletList items={[
            "Identify how they retake: Soft / Fast / Anchor / Bunker",
            "Call what you are holding",
            "Have someone in charge of breaking utility",
            "Call abilities to deny the defuse",
          ]} />
        </Card>
        <Card accentColor="#ff4757">
          <Label>Retake</Label>
          <CardTitle>Retake + Flood</CardTitle>
          <BulletList items={[
            "Retake in waves if opponents have lots of utility",
            "Communicate ability usage and timing",
            "FLOOD: Fast retake — call when you have numbers. Called ~2 seconds after enemy taps the bomb.",
            "Can happen even before they tap (while still executing)",
          ]} />
        </Card>
      </Grid>

      {/* ══════════════════════════════════════════════════════════════════════
          3. TRADING
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionTitle id="trading" label="Trading" tag="// Team Knowledge — 03" />

      <Grid cols={2}>
        <Card accentColor={accent}>
          <Label>Active Trading</Label>
          <CardTitle>Types of Swings</CardTitle>
          <BulletList items={[
            "Wide Swing: First player opens angle wide, making it harder for opponent to adjust and easier for teammate to refrag",
            "Jump Swing: Great in close corners or vs OPs. Strong on low buys — harder to 1-tap with Sheriff",
            "Block Swing: Go as a block, play for fast trades and mayhem. Common in fast executes",
            'Bait Swing: Jump peek to bait OP shot, second player swings to kill. Always call ("3 2 1")',
          ]} />
        </Card>
        <Card accentColor="#a29bfe">
          <Label>Reactive Trading</Label>
          <CardTitle>Types of Reactive Plays</CardTitle>
          <BulletList items={[
            'Crossfires: Line of sight of two+ players converges on enemy from different angles',
            'On Contact: "Peek on me" — reactively peek when teammate has first contact',
            "Bait Setup: Set teammate in an angle that likely won't be checked",
            "Burger (Up/Down): Two players in line on same angle, front one crouched (if last agent is not a flasher)",
            "Go Contact when you identify a more passive side of the map",
          ]} />
        </Card>
      </Grid>

      {/* ══════════════════════════════════════════════════════════════════════
          4. SPACING & CONTACTING
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionTitle id="spacing" label="Spacing & Contacting" tag="// Team Knowledge — 04" />

      <Grid cols={2}>
        <Card accentColor={accent}>
          <Label>Spacing</Label>
          <CardTitle>Distance Between Teammates</CardTitle>
          <Body>Good spacing allows better trades and faster reactions. Stand your ground and hold until spacing is corrected. Some scenarios where a player has a timing justify ignoring spacing, but this is the exception.</Body>
        </Card>
        <Card accentColor="#ff9f43">
          <Label>Contacting</Label>
          <CardTitle>Guns-Out Play Style</CardTitle>
          <Body>Cutting noise and playing guns-out while exploding on contact. Can catch opponents off guard, especially those relying on reactive utility. Contact plays rely on good spacing, trading, positioning and angle clearance. A team that always plays contact is exploitable — so is one that never does. Find the right balance.</Body>
        </Card>
      </Grid>

      {/* ══════════════════════════════════════════════════════════════════════
          5. NUMERICAL SITUATIONS
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionTitle id="numerical" label="Numerical Situations" tag="// Team Knowledge — 05" />

      <Grid cols={2}>
        <Card accentColor={accent}>
          <Label>Man Advantage</Label>
          <CardTitle>Numerical Advantage</CardTitle>
          <Body>Bigger advantage = safer play. But advantage ≠ free round. Bad positioning, no map control, or enemy win-condition ults can still lose you the round.</Body>
          <div style={{ marginTop: "16px" }}>
            <BulletList items={[
              "In 3v1 / 2v1: limit ability use — FOCUS ON AIM",
              "After a big fight, keep space + clear gaps",
              "T side: freeze to punish and force mistakes",
              "CT side (deep kill): give up space & hold chokepoint together",
              "CT side: give space and try to go bunker if no scary ults",
            ]} />
          </div>
        </Card>
        <Card accentColor="#ff4757">
          <Label>Man Disadvantage</Label>
          <CardTitle>Numerical Disadvantage</CardTitle>
          <Body>Bigger disadvantage = bigger risks allowed. Check ults, utility, agents alive and positioning before a risky play.</Body>
          <div style={{ marginTop: "16px" }}>
            <BulletList items={[
              "CT 3v5 / 2v4: if no smoker alive & not ready to flood — SAVE",
              "CT side: stack on a site to fast retake when you have the read",
              "CT side: if forced to play, retake a high zone on the map",
              "T side: play contact most of the time",
              "Even in 4v5 / 3v4 you can still win without hero plays",
            ]} />
          </div>
        </Card>
      </Grid>

      {/* ══════════════════════════════════════════════════════════════════════
          6. KEYWORDS
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionTitle id="keywords" label="Keywords" tag="// Team Knowledge — 06" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginTop: "24px" }}>
        <div>
          <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "#e8ff47", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "16px" }}>// Meta Keywords</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {META_KEYWORDS.map((kw) => (
              <div key={kw.word} style={{ background: "#111318", border: "1px solid #1e2128", borderRadius: "6px", padding: "14px 18px", display: "flex", gap: "16px" }}>
                <div style={{ fontFamily: "var(--font-bebas)", fontSize: "14px", color: "#e8ff47", letterSpacing: "2px", minWidth: "120px", paddingTop: "1px" }}>{kw.word}</div>
                <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", color: "#9da3b4", lineHeight: 1.6 }}>{kw.def}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: accent, letterSpacing: "4px", textTransform: "uppercase", marginBottom: "16px" }}>// Team Keywords</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {TEAM_KEYWORDS.map((kw) => (
              <div key={kw.word} style={{ background: "#111318", border: "1px solid #1e2128", borderRadius: "6px", padding: "14px 18px", display: "flex", gap: "16px" }}>
                <div style={{ fontFamily: "var(--font-bebas)", fontSize: "14px", color: accent, letterSpacing: "2px", minWidth: "140px", paddingTop: "1px" }}>{kw.word}</div>
                <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", color: "#9da3b4", lineHeight: 1.6 }}>{kw.def}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          7. TEAM PHILOSOPHY
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionTitle id="philosophy" label="Team Philosophy" tag="// Team Knowledge — 07" />

      <Grid cols={2}>
        <Card accentColor="#e8ff47">
          <Label>What is the Perfect Team?</Label>
          <CardTitle>There Is No Perfect Team</CardTitle>
          <Body>All practices have goals. Practice is good if we achieve those goals, regardless of the result. A results-oriented team on every type of practice will struggle to improve.</Body>
          <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {["FUNDAMENTALS", "IDENTITY", "META STRATEGY", "PLAYBOOK DEPTH"].map((v) => (
              <div key={v} style={{ background: "#16181f", border: "1px solid #1e2128", borderRadius: "4px", padding: "10px 14px", fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "#e8ff47", letterSpacing: "2px" }}>{v}</div>
            ))}
          </div>
        </Card>
        <Card accentColor="#a29bfe">
          <Label>Pyramid of Success</Label>
          <CardTitle>Performance Hierarchy</CardTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
            {[
              { label: "PERFORMANCE", color: "#e8ff47" },
              { label: "PROTOCOLS & STRATEGY", color: "#4ecdc4" },
              { label: "IDENTITY", color: "#a29bfe" },
              { label: "FUNDAMENTALS", color: "#ff9f43" },
              { label: "FIREPOWER", color: "#ff4757" },
            ].map((level, i) => (
              <div
                key={level.label}
                style={{
                  background: "#16181f",
                  border: `1px solid ${level.color}33`,
                  borderLeft: `3px solid ${level.color}`,
                  borderRadius: "0 4px 4px 0",
                  padding: "8px 14px",
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "10px",
                  color: level.color,
                  letterSpacing: "2px",
                  marginLeft: `${i * 12}px`,
                }}
              >
                {level.label}
              </div>
            ))}
          </div>
        </Card>
      </Grid>

      {/* ══════════════════════════════════════════════════════════════════════
          8. LEADING & IGL
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionTitle id="leading" label="Leading & IGL" tag="// IGL & Playstyle — 08" />

      <Card accentColor="#e8ff47">
        <Label>IGL Principles</Label>
        <CardTitle>Leading</CardTitle>
        <Body>Leading needs to be part of every player's skill set. Players who rely on the IGL to micro them enter auto-pilot mode — a huge handicap.</Body>
        <div style={{ marginTop: "16px" }}>
          <BulletList items={[
            "Have a read? Call it pre-round",
            "Micro-manage your area of the map",
            "Be aware of opponents' playstyle, tempo and routine — adapt",
            "Anchor/Fix must manage their bombsite on retake or fight",
            "Refresh communication every ~15 seconds",
            "Dead? Job isn't finished — manage 2vX situations",
            "In chaotic situations: don't ask if we CAN do something, say let's DO it",
            "THE MOST IMPORTANT THING FOR AN IGL IS ADAPTATION",
          ]} />
        </div>
      </Card>

      <div style={{ marginTop: "16px" }}>
        <Card accentColor="#5a5f72">
          <Label>Protocol of Leading</Label>
          <CardTitle>Analyse → Decide → Adapt</CardTitle>
          <Body>Protocols help with decision making but can also make us easy to read. Sometimes throwing the playbook out is what wins the round.</Body>
          <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={{ background: "#16181f", border: "1px solid #1e2128", borderRadius: "6px", padding: "16px" }}>
              <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "#ff4757", letterSpacing: "2px", marginBottom: "8px" }}>SLOW OPPONENT</div>
              <Body>Punish the weak part of the default. Play high on the map.</Body>
            </div>
            <div style={{ background: "#16181f", border: "1px solid #1e2128", borderRadius: "6px", padding: "16px" }}>
              <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "#4ecdc4", letterSpacing: "2px", marginBottom: "8px" }}>FAST OPPONENT</div>
              <Body>Play bunker, anti-execute setups. Contest or retake map control.</Body>
            </div>
          </div>
        </Card>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          9. TEMPO
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionTitle id="tempo" label="Tempo" tag="// IGL & Playstyle — 09" />

      <Grid cols={3}>
        {[
          { speed: "SLOW", color: "#4ecdc4", pros: ["Low risk playstyle", "Easier to take information", "Easier to control the game", "Easier to master"], cons: ["Harder for the opponent to read", "Hard to deal with when opponent has no answers"] },
          { speed: "MEDIUM", color: "#e8ff47", pros: ["Mixed tempo", "Shifts from defaults to fast executes", "More reliable on good mid-round calls"], cons: ["Harder to master", "Hard to be in control of the game"] },
          { speed: "FAST", color: "#ff4757", pros: ["High risk / High reward", "Harder for opponent to read", "Nobody can stop W-press"], cons: ["Relies a lot on individualism", "Easy to read and adapt", "Selling fakes only vs teams that over-rotate early"] },
        ].map((t) => (
          <Card key={t.speed} accentColor={t.color}>
            <div style={{ fontFamily: "var(--font-bebas)", fontSize: "22px", color: t.color, letterSpacing: "3px", marginBottom: "16px" }}>{t.speed} TEMPO</div>
            <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "9px", color: "#5a5f72", letterSpacing: "2px", marginBottom: "8px" }}>PROS</div>
            <BulletList items={t.pros} />
            <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "9px", color: "#5a5f72", letterSpacing: "2px", marginTop: "12px", marginBottom: "8px" }}>CONS</div>
            <BulletList items={t.cons} />
          </Card>
        ))}
      </Grid>

      <Grid cols={2}>
        <Card accentColor="#ff9f43">
          <Label>Starting Fast & Stop</Label>
          <CardTitle>Fast Start Approach</CardTitle>
          <Body>Starting fast pressures opponents to a breaking point. If you start strong and win early rounds, it's almost guaranteed to win the half. However, if fast tempo fails, it's hard to switch to slow.</Body>
          <div style={{ marginTop: "12px" }}>
            <BulletList items={[
              "Rounds 2–3: FAST",
              "Rounds 4–5: Control",
              "Playing against weird comps — oblige to start slow",
            ]} />
          </div>
        </Card>
        <Card accentColor="#a29bfe">
          <Label>Starting Slow & Explode</Label>
          <CardTitle>Slow Start Approach</CardTitle>
          <Body>Starting slowly shows key routines. Makes opponents think every round looks the same. When they're about to adapt, you do something completely different.</Body>
          <div style={{ marginTop: "12px" }}>
            <BulletList items={[
              "First 5 rounds: Fnatic Control",
              "Round 6: Go fast B take",
            ]} />
          </div>
        </Card>
        <Card accentColor="#ff4757">
          <Label>vs Fast Tempo</Label>
          <CardTitle>Playing Against Fast Playstyle</CardTitle>
          <BulletList items={[
            "Use utility for stall instead of control",
            "Duelists play towards main controls, not aggro peeks",
            "Play retake if you can't stop an early fast execute",
            "Delay info utility at round start (cooldown utility)",
            "Give up mid, focus on bunker site",
          ]} />
        </Card>
        <Card accentColor={accent}>
          <Label>vs Slow Tempo</Label>
          <CardTitle>Playing Against Slow Playstyle</CardTitle>
          <BulletList items={[
            "Slow tempo = more space — play higher on the map",
            "Prioritize the first kill — get eco AWP on defense ASAP",
            "Break passive info (turrets, alarm bots, tripwires...)",
            "Deep control of a key area with great positions",
            "Track rotations: lose one key area → retake another",
          ]} />
        </Card>
      </Grid>

      <div style={{ marginTop: "16px" }}>
        <Card accentColor="#5a5f72">
          <Label>Conditioning</Label>
          <CardTitle>Defaulting & Conditioning</CardTitle>
          <Body>Conditioning is using different aspects of the game to make a round look similar to the previous one. Show routine that will condition opponents to adapt — then do something completely different.</Body>
          <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
            {["TEMPO", "MICRO", "MACRO", "AGGRO"].map((v) => (
              <div key={v} style={{ background: "#16181f", border: "1px solid #1e2128", borderRadius: "4px", padding: "10px", textAlign: "center", fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "#5a5f72", letterSpacing: "2px" }}>{v}</div>
            ))}
          </div>
        </Card>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          10. ROLES
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionTitle id="roles" label="Roles" tag="// Game Knowledge — 10" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "24px" }}>
        {ROLES.map((role) => (
          <Card key={role.name} accentColor={role.color}>
            <div style={{ fontFamily: "var(--font-bebas)", fontSize: "18px", color: role.color, letterSpacing: "2px", marginBottom: "10px" }}>{role.name}</div>
            <Body>{role.desc}</Body>
          </Card>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          11. TYPES OF PLAYS
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionTitle id="plays" label="Types of Plays" tag="// Game Knowledge — 11" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginTop: "24px" }}>
        {PLAY_TYPES.map((play, i) => {
          const colors = ["#4ecdc4", "#ff9f43", "#a29bfe", "#e8ff47", "#ff4757", "#4ecdc4", "#5a5f72", "#ff9f43"];
          const c = colors[i % colors.length];
          return (
            <Card key={play.name} accentColor={c}>
              <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "9px", color: "#5a5f72", letterSpacing: "2px", marginBottom: "6px" }}>{play.side}</div>
              <div style={{ fontFamily: "var(--font-bebas)", fontSize: "16px", color: c, letterSpacing: "2px", marginBottom: "10px" }}>{play.name}</div>
              <Body>{play.desc}</Body>
            </Card>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          12. MAP CONTROL
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionTitle id="mapcontrol" label="Map Control" tag="// Game Knowledge — 12" />

      <Grid cols={2}>
        <Card accentColor={accent}>
          <Label>Map Control</Label>
          <CardTitle>Control Principles</CardTitle>
          <Body>Understand how opponents are playing before deciding what to control. Example: Double Dive comp on Lotus attack will struggle against a double initiator comp taking A Main. Analyze, then come up with a gameplan. There are solutions to all playstyles.</Body>
        </Card>
        <Card accentColor="#ff9f43">
          <Label>Defense Setup</Label>
          <CardTitle>Strong Side & Weak Side</CardTitle>
          <Body>On defense: 2 hard anchors, 2 soft anchors, 1 rotation player (creates overload). Results in a strong side (3+ players) and a weak side (2 or fewer).</Body>
          <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={{ background: "#16181f", border: "1px solid #1e2128", borderRadius: "6px", padding: "14px" }}>
              <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "9px", color: "#4ecdc4", letterSpacing: "2px", marginBottom: "8px" }}>STRONG SIDE</div>
              <BulletList items={["Don't show it's your strong side", "Fight for site", "Strong setups together"]} />
            </div>
            <div style={{ background: "#16181f", border: "1px solid #1e2128", borderRadius: "6px", padding: "14px" }}>
              <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "9px", color: "#ff4757", letterSpacing: "2px", marginBottom: "8px" }}>WEAK SIDE</div>
              <BulletList items={["Good delay utility", "Play retake if no delay utility", "Get early info when strong side is pressured", "Forbidden death"]} />
            </div>
          </div>
        </Card>
      </Grid>

      <div style={{ marginTop: "16px" }}>
        <Card accentColor="#a29bfe">
          <Label>Executing Site</Label>
          <CardTitle>Executing Site + Adaptations</CardTitle>
          <Grid cols={2}>
            <div>
              <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "#a29bfe", letterSpacing: "2px", marginBottom: "8px" }}>ON SENTINEL SITE</div>
              <Body>2-phase execute. There is always a weak place — duellist dives in to take space. Identify the setup, identify the weakness, then idea + solution.</Body>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "#4ecdc4", letterSpacing: "2px", marginBottom: "8px" }}>NOT ON SENTINEL SITE</div>
              <Body>Focus on trade capacity & ability usage. Duelist must always adapt and know which zone is clear.</Body>
            </div>
          </Grid>
        </Card>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          13. ECONOMY
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionTitle id="economy" label="Economy" tag="// Game Knowledge — 13" />

      <Grid cols={2}>
        <Card accentColor="#e8ff47">
          <Label>Money System</Label>
          <CardTitle>Basic Economy</CardTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
            {[
              { label: "Win Round", value: "$3000" },
              { label: "Kill", value: "$200" },
              { label: "Plant Spike", value: "$300" },
              { label: "Defuse Spike", value: "$300" },
              { label: "Loss #1", value: "$1900" },
              { label: "Loss #2", value: "$2400" },
              { label: "Loss #3", value: "$2900" },
            ].map((e) => (
              <div key={e.label} style={{ display: "flex", justifyContent: "space-between", background: "#16181f", borderRadius: "4px", padding: "8px 12px" }}>
                <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", color: "#9da3b4" }}>{e.label}</span>
                <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", color: "#e8ff47", fontWeight: "bold" }}>{e.value}</span>
              </div>
            ))}
          </div>
          <BulletList items={[
            "Half buy / eco: keep 1300–1600 credits",
            "Buy half shield until you have 3500 credits left after purchase",
            "Support always favors utility kit over a good weapon",
          ]} />
        </Card>
        <Card accentColor="#a29bfe">
          <Label>Ultimate Economy</Label>
          <CardTitle>Ultimate Types & Protocols</CardTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
            {[
              { type: "SITUATIONAL", color: "#ff9f43", example: "Cypher ult", desc: "Strong in certain situations. Create those situations." },
              { type: "FORCEFUL", color: "#ff4757", example: "Breach ult", desc: "Extremely strong, forcefully takes space. Focus on farming these." },
              { type: "PASSIVE", color: "#a29bfe", example: "Sova ult", desc: "Most powerful with a specific plan. Middle ground between situational & forceful." },
            ].map((u) => (
              <div key={u.type} style={{ background: "#16181f", border: `1px solid ${u.color}33`, borderLeft: `3px solid ${u.color}`, borderRadius: "0 4px 4px 0", padding: "10px 14px" }}>
                <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "9px", color: u.color, letterSpacing: "2px", marginBottom: "4px" }}>{u.type} — ex: {u.example}</div>
                <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "11px", color: "#9da3b4" }}>{u.desc}</div>
              </div>
            ))}
          </div>
          <BulletList items={[
            "Orb denial: deny orbs vs ecos, deny when enemies are close",
            "Farming: farm on eco, as conditioning, let impactful ult agents get kills",
            "Ultimates come back — rounds don't. Stop saving ults for the 'perfect' moment",
          ]} />
        </Card>
      </Grid>

      <div style={{ marginTop: "16px" }}>
        <Card accentColor="#5a5f72">
          <Label>Anti-Eco Play</Label>
          <CardTitle>How to Play Anti-Ecos</CardTitle>
          <Grid cols={3}>
            <div>
              <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "#5a5f72", letterSpacing: "2px", marginBottom: "8px" }}>GENERAL</div>
              <BulletList items={["Play long range", "Abuse jump peeks for info", "Use abilities, don't give mains for free in CT side"]} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "#ff4757", letterSpacing: "2px", marginBottom: "8px" }}>ATTACK</div>
              <BulletList items={["95% of the time do NOT play Contact", "Don't take neutral zones (Short on Ascent/Haven) without ability"]} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: accent, letterSpacing: "2px", marginBottom: "8px" }}>DEFENSE</div>
              <BulletList items={["Favor retreating into bunker setups", "Avoid hero moves", "Don't hesitate to use ults in critical situations"]} />
            </div>
          </Grid>
          <div style={{ marginTop: "16px" }}>
            <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "#e8ff47", letterSpacing: "2px", marginBottom: "8px" }}>SETUP</div>
            <BulletList items={[
              "Play 4-1 or 3-1-1",
              "Extremity players allow rotation + control when stacked",
              "Use key ability for the site: reveal, knife (large area coverage)",
              "Don't leave too much info and space to the enemy — shoulder peek & jump peek",
            ]} />
          </div>
        </Card>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          14. RETAKES & ROTATIONS
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionTitle id="retakes" label="Retakes & Rotations" tag="// Game Knowledge — 14" />

      <Card accentColor={accent}>
        <Label>Retakes & Rotations</Label>
        <CardTitle>Retake Order & Principles</CardTitle>
        <Grid cols={2}>
          <div>
            <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "#ff4757", letterSpacing: "2px", marginBottom: "8px" }}>KEY RULE</div>
            <Body>After taking a main (e.g. A main), if you want to finish B — ALWAYS go back in SLOW.</Body>
            <div style={{ marginTop: "12px" }}>
              <Body>The smoker NEVER commits first — they are the key element of the retake.</Body>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: accent, letterSpacing: "2px", marginBottom: "8px" }}>RETAKE ORDER</div>
            <BulletList items={[
              "Repositioning after taking a main",
              "Smoker holds back and sets up the retake",
              "Call inventory before going in",
              "Coordinate timing and abilities before the push",
            ]} />
          </div>
        </Grid>
      </Card>

      {/* ══════════════════════════════════════════════════════════════════════
          15. BUNKER & LOW HP
      ══════════════════════════════════════════════════════════════════════ */}
      <SectionTitle id="bunker" label="Bunker & Low HP" tag="// Game Knowledge — 15" />

      <Grid cols={2}>
        <Card accentColor="#5a5f72">
          <Label>Playing Bunker</Label>
          <CardTitle>Late-Round Positioning</CardTitle>
          <Body>When it's late on the timer, you should have info on where the enemy will finish and play bunker on reactions. This wins time for rotations and allows the team to flood.</Body>
          <div style={{ marginTop: "16px" }}>
            <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", color: "#4ecdc4", letterSpacing: "2px", marginBottom: "8px" }}>TWO OPTIONS</div>
            <BulletList items={[
              "You have the read → play deep site, use utility before they plant",
              "You don't have the read → keep one extremity control, but FORBIDDEN DEATH",
            ]} />
          </div>
        </Card>
        <Card accentColor="#ff4757">
          <Label>Low HP / Full HP</Label>
          <CardTitle>HP Management</CardTitle>
          <BulletList items={[
            "Lowest HP player plays the first lines (first angle on post plant = suicide zone)",
            "Exception: 5v3/4v2 — low HP player doesn't go first, especially with support utility",
            "Low HP player ALWAYS baits for full HP players and plays the first swing",
            "On eco: if low HP player collected a better weapon, they must give it to the other player",
          ]} />
        </Card>
      </Grid>

      <style>{`
        .nav-pill:hover {
          color: #4ecdc4 !important;
          border-color: #4ecdc4 !important;
        }
      `}</style>

    </main>
  );
}
