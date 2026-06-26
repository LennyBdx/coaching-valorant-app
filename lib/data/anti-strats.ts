import { AntiStrat } from "@/lib/types";

export const antiStrats: AntiStrat[] = [
  // ── Bind vs Floppers ─────────────────────────────────────────────────────────
  {
    slug: "bind-floppers",
    map: "Bind",
    opponent: "Floppers",
    tag: "// Enemy Analysis",
    sections: [
      {
        kind: "cards",
        badgeType: "defense",
        title: "Their Defense Patterns",
        cards: [
          {
            color: "teal",
            label: "Default",
            heading: "Fade always B with Viper or Deadlock",
            text: "Their default: Fade always plays B alongside Viper (or Deadlock if no Viper). The other three tend to play towards A — it's a consistent pattern.",
            agents: ["Fade", "Viper", "Deadlock"],
          },
          {
            color: "teal",
            label: "A Site",
            heading: "They take Bath — push if no one's there",
            text: "On A they always take Bath first. If they see no activity, they like to push and take additional space — be aware of that early aggression.",
          },
          {
            color: "teal",
            label: "B Site",
            heading: "Fade long, one Ucka — B is weak",
            text: "On B, Fade always holds long and the second player covers Ucka or back site. They don't play that much together on B — it's their weakest site and we should abuse it.",
          },
          {
            color: "teal",
            label: "Trio Rotation",
            heading: "Fade on A = B is open",
            text: "They sometimes switch their trio towards B. If we don't spot Fade on B, or we see her on A, it means the opposite site is even more exposed — push it immediately.",
          },
          {
            color: "teal",
            label: "Shower",
            heading: "They never take Short",
            text: "They always take Bath, never Short. Brimstone may smoke B occasionally but he never stays — he always rotates to A. Short is a free space for us.",
            agents: ["Brimstone"],
          },
        ],
      },
      {
        kind: "block",
        badgeType: "pistol",
        title: "Their Defense Pistol",
        blocks: [
          {
            accent: "orange",
            blockTitle: "// Defense Pistol Setup",
            items: [
              "Two players on B, three towards A — they take Bath on A. B is very weak on pistol.",
              "On B, one player is always alone long and one is always alone Ucka. We can easily split B — just watch out for the teleport.",
            ],
          },
        ],
      },
      {
        kind: "block",
        badgeType: "bonus",
        title: "Their Defense Bonus",
        blocks: [
          {
            accent: "purple",
            blockTitle: "// Bonus Setup + Counter",
            items: [
              "On bonus: 3 on A (playing lamp) and 2 on B (playing back site). They don't cover Bath much on A.",
              "Going B on their bonus can be great — especially long. Alternatively, split A while avoiding lamp and push back site directly.",
            ],
          },
        ],
      },
      {
        kind: "block",
        badgeType: "eco",
        title: "Their Defense Eco",
        blocks: [
          {
            accent: "yellow",
            blockTitle: "// Anti Eco — Control Map First",
            items: [
              "On eco they like to stack or rush somewhere. Control the map for the first 30 seconds, wait for their push, and play the opposite side.",
            ],
          },
        ],
      },
      {
        kind: "cards",
        badgeType: "attack",
        title: "Their Attack Patterns",
        cards: [
          {
            color: "red",
            label: "First Gun Round",
            heading: "2 Ucka, 3 Long — Deadlock watches behind",
            text: "On the first gun round they like to split B: 2 Ucka and 3 long. Deadlock always watches their back for a flank. We can play 3 towards B and cut off A Bath if we see no activity there.",
            agents: ["Deadlock"],
          },
          {
            color: "red",
            label: "Map Control",
            heading: "They push 4-1 — don't be naive",
            text: "They don't love controlling the map — they prefer to push 4 into a site and 1 waiting. For example: 4 long, 1 Ucka waiting. On A: 4 short, 1 Bath waiting for a B push. Don't get caught out of position.",
          },
          {
            color: "red",
            label: "Space Control",
            heading: "Heavy 3-4 man control + lurk opposite",
            text: "They often take a space like long or Ucka with 3-4 players to create a rotation — while one player lurks the opposite side. Example: 3 on Ucka, 1 long B, 1 waiting short A to cut our rotation or take a timing.",
          },
        ],
      },
      {
        kind: "block",
        badgeType: "pistol",
        title: "Their Attack Pistol",
        blocks: [
          {
            accent: "orange",
            blockTitle: "// Attack Pistol — Two Options",
            items: [
              "Option 1: Default — one player fountain short B, two short A, one Bath waiting for a push or an A split with 2 Bath and 3 Short.",
              "Option 2: A split with 2 Bath and 3 Short — straightforward, no fakes.",
            ],
          },
        ],
      },
      {
        kind: "block",
        badgeType: "eco",
        title: "Their Attack Eco",
        blocks: [
          {
            accent: "yellow",
            blockTitle: "// Attack Eco — Full Rush",
            items: [
              "On eco they full rush five-man onto B or A — over-rotate as soon as you see utilities pointing towards one site. They won't fake.",
            ],
          },
        ],
      },
    ],
  },

  // ── Abyss vs Floppers ────────────────────────────────────────────────────────
  {
    slug: "abyss-floppers",
    map: "Abyss",
    opponent: "Floppers",
    tag: "// Enemy Analysis",
    sections: [
      {
        kind: "block",
        badgeType: "defense",
        title: "Their Defense Patterns",
        blocks: [
          {
            accent: "teal",
            blockTitle: "// Their Default Setup",
            items: [
              "Their default is straightforward — Jett is always top mid holding middle, Sova always holds A. Astra and Chamber sometimes switch between A and B depending on the situation, but most of the time Chamber plays B. When Chamber is on B, Yoru tends to play close to him.",
              "If we spot Astra on A, she's alone — fast pushing A is the right call.",
              "If Jett and Yoru see no activity mid, they like to push through and fight B main — be aware of this aggression.",
              "If Jett is not top mid, it means they're running a B push with Yoru and Sova: Sova watches window while Jett and Yoru push B main. On the opposite side, Chamber and Astra control A main. This means mid is free — take that space and try to sandwich the A players.",
              "They're not overly aggressive — they sometimes run specific setups like a B main push, a mid push, or both. On A main they rarely initiate; they prefer playing back site and retaking.",
              "On a B split, their first reaction is to push B main immediately — be ready for that aggression from whoever is holding B main.",
            ],
            agents: ["Jett", "Yoru", "Sova", "Chamber", "Astra"],
          },
        ],
      },
      {
        kind: "block",
        badgeType: "pistol",
        title: "Their Defense Pistol + Counter",
        blocks: [
          {
            accent: "orange",
            blockTitle: "// Pistol Setup + Counter Play",
            items: [
              "Jett top mid, Yoru B with a teleport for fast rotation, Chamber rotating with Yoru. On A: Sova and Astra.",
              "Counter: fake A with Yoru — place the teleport for B, buy a clone and one flash, and take A main while they have no drone. Use one real smoke on heaven, fake the clone, reveal back site, then teleport back.",
              "When we create that A activity, Yoru will teleport to B and Chamber will likely teleport to heaven. That leaves us with a free site.",
            ],
          },
        ],
      },
      {
        kind: "block",
        badgeType: "bonus",
        title: "Bonus Round",
        blocks: [
          {
            accent: "purple",
            blockTitle: "// Bonus Round — Full Rush B",
            items: [
              "On bonus they play: Jett top mid, Yoru B link, Chamber alone on site, Astra and Sova on A. B is very weak — simply full rush B and overwhelm it before they can react.",
            ],
          },
        ],
      },
      {
        kind: "block",
        badgeType: "eco",
        title: "Against Their Eco",
        blocks: [
          {
            accent: "yellow",
            blockTitle: "// Anti Eco Strategy",
            items: [
              "On eco they like to stack or heavy push A or B — control the map first and don't overcommit.",
              "If they heavy push A or B, immediately play fast on the opposite side. If you spot someone, assume it's a stack and apply pressure while finishing on the other site.",
            ],
          },
        ],
      },
      {
        kind: "cards",
        badgeType: "attack",
        title: "Their Attack Patterns",
        cards: [
          {
            color: "red",
            label: "Default",
            heading: "Chamber B, Astra A, trio mid",
            text: "Their default: Chamber B main, Astra holding A most of the time, and the other three taking mid control in the first 20 seconds before committing to a site — especially B.",
          },
          {
            color: "red",
            label: "No Lurking",
            heading: "Easy to flank",
            text: "They don't lurk much — we can flank them hard during rotations without much risk of someone catching us from behind.",
          },
          {
            color: "red",
            label: "Map Control First",
            heading: "Control then rush as 5",
            text: "They love controlling the map for the first 20 seconds and then rushing a site as a full team — usually B, sometimes A. They don't split, they commit together.",
          },
          {
            color: "red",
            label: "Commit to Kills",
            heading: "They finish where they get kills",
            text: "If they get a kill on B, they commit to B. They don't like to freeze and regroup — they push the site where they find the first kill.",
          },
          {
            color: "red",
            label: "Setup 1-3-1",
            heading: "Mid is weak",
            text: "They often run a 1 B, 3 mid, 1 A setup. When they don't, they commit to an extremity — which means mid is free. We can walk through mid uncontested in those situations.",
          },
        ],
      },
      {
        kind: "block",
        badgeType: "pistol",
        title: "Their Attack Pistols + Counters",
        blocks: [
          {
            accent: "orange",
            blockTitle: "// Pistol 1 — Fast B as 4",
            items: [
              "Fast B as 4 with Chamber lurking bottom mid. If we see Astra and Jett on B site, it's not a fake — commit to the retake. Catching Chamber first gives us a clean numbers advantage.",
            ],
          },
          {
            accent: "orange",
            blockTitle: "// Pistol 2 — Fake B, Rush A",
            items: [
              "Yoru and Sova show B with a dart, clone, arrow, and maybe a smoke. Then Yoru teleports back and they all rush A.",
              "Counter: don't over-rotate. Hold A with 2 — one jiggles A main, one baits close to main. Play 3 towards B with no one mid. Wait for them on A main and let them walk into the setup.",
            ],
          },
        ],
      },
      {
        kind: "block",
        badgeType: "bonus",
        title: "Their Attack Bonus",
        blocks: [
          {
            accent: "purple",
            blockTitle: "// Bonus — Hard Rush A",
            items: [
              "On bonus they like to hard rush A — be ready for a fast, aggressive push. If you see any utility activity towards A, rotate quickly.",
            ],
          },
        ],
      },
      {
        kind: "block",
        badgeType: "eco",
        title: "Their Eco Behaviour",
        blocks: [
          {
            accent: "yellow",
            blockTitle: "// Their Eco — Rush Somewhere",
            items: [
              "On eco they rush somewhere — mid, A, or B — and they play very packed. They won't fake, just wait for them and hold your position. No need to move up.",
            ],
          },
        ],
      },
    ],
  },

  // ── Bind vs Bitfix Puppies ───────────────────────────────────────────────────
  {
    slug: "bind-bitfix-puppies",
    map: "Bind",
    opponent: "Bitfix Puppies",
    tag: "// Enemy Analysis",
    sections: [
      {
        kind: "cards",
        badgeType: "attack",
        title: "Their Attack Patterns",
        cards: [
          {
            color: "yellow",
            label: "A Split",
            heading: "Only one holds Shower",
            text: "When they split A, only one player is in Shower. If we kill him, we have full Shower control for the retake — isolate and punish that player early.",
          },
          {
            color: "yellow",
            label: "Lurk Pattern",
            heading: "Always one lurking opposite",
            text: "When they push a space heavily (e.g. B long), one player is always lurking on the opposite side (Ucka). If we see a lot of pressure on B long, push Ucka. If they push Bath, Short is weak — push it.",
          },
          {
            color: "yellow",
            label: "Eco Rounds",
            heading: "Very passive on eco",
            text: "When they're on eco, they play extremely passive — don't expect aggression. Use it to take free space and set up a favourable execute without risking unnecessary fights.",
          },
          {
            color: "yellow",
            label: "Fast B",
            heading: "Heavy long + Viper lurking Ucka",
            text: "When they fast B, they almost always stack long. Viper lurks Ucka consistently — if we teleport, expect to fight her there before rotating. Take the fight, win it, then retake with numbers.",
          },
        ],
      },
      {
        kind: "block",
        badgeType: "pistol",
        title: "Pistol Round Setup",
        blocks: [
          {
            accent: "orange",
            blockTitle: "// Their Pistol Setup",
            items: [
              "Chamber holds B long, Brimstone plays Short B close to Ucka.",
              "Fade and Chamber take Short A with Yoru — they wall up and try to push Short from behind it.",
              "If we see nobody in Bath, push immediately to flank them — and stay alert when pushing through the wall, someone may be waiting on the other side.",
            ],
            agents: ["Chamber", "Brimstone", "Fade", "Yoru"],
          },
        ],
      },
      {
        kind: "block",
        badgeType: "general",
        title: "First Full Buy Round",
        blocks: [
          {
            accent: "yellow",
            blockTitle: "// Their Default — First Full Buy",
            items: [
              "Yoru is alone in Bath — exploit this immediately, he's isolated.",
              "They take Short B and Short A and then wait for us to make mistakes — they play very reactively on a full buy, not proactively.",
              "Don't give them time to settle — be proactive and force the round before they can punish our mistakes.",
            ],
          },
        ],
      },
      {
        kind: "cards",
        badgeType: "defense",
        title: "Their Defense Patterns",
        cards: [
          {
            color: "teal",
            label: "A Site",
            heading: "Always 3 in Bath — Short is weak",
            text: "On A they always stack 3 in Bath. The last player holds Heaven or back site, and sometimes joins them in Bath. Short is almost always weak — target it.",
          },
          {
            color: "teal",
            label: "B Site",
            heading: "Weakest site — abuse it now",
            text: "On B they don't play together much — it's their weakest site. We need to abuse it before they adapt. Don't wait for them to figure it out.",
          },
          {
            color: "teal",
            label: "Chamber Ult",
            heading: "Aggressive positioning with ult",
            text: "When Chamber has his ult, he plays very aggressively — expect him deep in Short A or deep in B long. Don't peek blindly into those positions when his ult is up.",
          },
          {
            color: "teal",
            label: "Fast A / Yoru TP",
            heading: "Yoru TPs but B long stays covered",
            text: "On a fast A, Yoru will teleport to react — but there's often someone else who doesn't rotate from B long. Don't assume B is free just because Yoru moved.",
          },
          {
            color: "teal",
            label: "A Setup",
            heading: "No Shower → they take Short",
            text: "If they don't take Shower, they take Short. They have a solid understanding of A on Bind.",
          },
          {
            color: "teal",
            label: "Yoru",
            heading: "Solo pick machine",
            text: "Yoru loves solo pick plays — he walks Short B, Short A, or B long alone looking for isolated kills. Track him separately from the main push and don't let him find easy picks.",
          },
        ],
      },
      {
        kind: "block",
        badgeType: "pistol",
        title: "Their Attack Pistol",
        blocks: [
          {
            accent: "orange",
            blockTitle: "// Their Attack Pistol Setup + Counter",
            items: [
              "B: Yoru and Chamber go double long. A: Brimstone plays Heaven for fast rotation, the rest take Bath.",
              "Counter: split A fast — one player fights Bath to create a sandwich (caught between Bath and site), while the other three push site, plant, and hold.",
              "Sai takes Bath with Yoru, but only once Mako and Lis are close to site — the sandwich only works when the push is already in progress. Timing is key.",
            ],
            agents: ["Chamber", "Yoru", "Brimstone"],
          },
        ],
      },
      {
        kind: "block",
        badgeType: "bonus",
        title: "Bonus Round & Buy Loss",
        blocks: [
          {
            accent: "purple",
            blockTitle: "// Bonus Round Tendencies",
            items: [
              "On bonus they like to push spaces aggressively — Short B or Short A. If we notice this push, immediately play the opposite side: it will be weak with at most 2 players.",
              "If we lose pistol: on the first full buy, control the map proactively — take Ucka, Bath, or Short and set up before they can run their default.",
              "Playing for map control after a pistol loss resets the tempo and stops them from snowballing their setup advantage.",
            ],
          },
        ],
      },
    ],
  },

  // ── Split vs 36 Thieves ──────────────────────────────────────────────────────
  {
    slug: "split-36-thieves",
    map: "Split",
    opponent: "36 Thieves",
    tag: "// Enemy Analysis",
    sections: [
      // ── DEFENSE ──────────────────────────────────────────────────────────────
      {
        kind: "block",
        badgeType: "pistol",
        title: "Their Defense Pistol",
        blocks: [
          {
            accent: "orange",
            blockTitle: "// Defense Pistol Setup",
            items: [
              "They push mid as 3, Omen pushes B main, and Viper holds A by CT.",
            ],
            agents: ["Omen", "Viper"],
          },
        ],
      },
      {
        kind: "block",
        badgeType: "eco",
        title: "Their Defense Eco",
        blocks: [
          {
            accent: "yellow",
            blockTitle: "// Anti-Eco Setup",
            items: [
              "Jett and Raze on A, Skye and Omen on B, Viper mid.",
            ],
            agents: ["Jett", "Raze", "Skye", "Omen", "Viper"],
          },
        ],
      },
      {
        kind: "block",
        badgeType: "bonus",
        title: "Their Defense Bonus",
        blocks: [
          {
            accent: "purple",
            blockTitle: "// Bonus Setup + Counter",
            items: [
              "Skye and Viper take B main, no one mid, and Omen/Jett/Raze hold A main.",
              "Counter: go fast B split. Mid is completely open and B main has only two players — overwhelm it before they can react.",
            ],
            agents: ["Skye", "Viper", "Omen", "Jett", "Raze"],
          },
        ],
      },
      {
        kind: "cards",
        badgeType: "defense",
        title: "Their Defense Patterns",
        cards: [
          {
            color: "teal",
            label: "Default",
            heading: "Omen B one-way, Viper mid, Jett heaven B, Skye heaven A, Raze site A",
            text: "Their default: Omen plays B main with a one-way, Viper controls mid, Jett holds heaven B, Skye holds heaven A, and Raze plays site A. Mid is almost always open — abuse it.",
            agents: ["Omen", "Viper", "Jett", "Skye", "Raze"],
          },
          {
            color: "teal",
            label: "Setup Switches",
            heading: "They switch every round — mid stays open",
            text: "They like to switch their setup frequently, playing 3 B or 3 towards A. No matter the configuration, mid tends to stay underprotected. Use mid control to make the right call once inside.",
          },
          {
            color: "teal",
            label: "Viper Ult",
            heading: "Viper ult mid = A is weak (max 2 defenders)",
            text: "When Viper uses her ult on mid, A drops to a maximum of 2 defenders. This is a clear signal to commit A fast.",
            agents: ["Viper"],
          },
          {
            color: "teal",
            label: "B Heavy",
            heading: "They stack B — mid and A stay weak",
            text: "They frequently play heavy on B, which consistently leaves mid and A thin. Don't be caught off guard if B feels stacked while the rest of the map is open.",
          },
          {
            color: "teal",
            label: "Off-Angles",
            heading: "They push behind when they take a space",
            text: "They like to take off-angles: if they hold B main, expect them to push further behind for a forward position.",
          },
          {
            color: "teal",
            label: "Reading Us",
            heading: "They play the opposite — hit the same site twice",
            text: "If we go A and get stomped, they'll shift strong to B next round assuming we won't come back. That leaves A weak — we can hit the same site twice in a row and catch them off guard.",
          },
          {
            color: "teal",
            label: "Mid Pressure",
            heading: "If we dominate mid, Raze and Jett come mid",
            text: "If we play strong towards mid consistently, they adapt and pull Raze and Jett there to contest it. Be ready to switch the plan when mid becomes contested.",
            agents: ["Raze", "Jett"],
          },
        ],
      },
      // ── ATTACK ───────────────────────────────────────────────────────────────
      {
        kind: "block",
        badgeType: "pistol",
        title: "Their Attack Pistol",
        blocks: [
          {
            accent: "orange",
            blockTitle: "// Attack Pistol — A Split",
            items: [
              "It's an A split: 4 players mid smoking mail, dog, and vent — Viper waits A main, then the team pushes through vent.",
              "Hold mid smoke angles and contest the split early — force them to burn utility before they can cross and set up.",
            ],
            agents: ["Viper"],
          },
        ],
      },
      {
        kind: "cards",
        badgeType: "attack",
        title: "Their Attack Patterns",
        cards: [
          {
            color: "red",
            label: "Default",
            heading: "Omen B main, Viper A main, trio mid",
            text: "Their default: Omen holds B main, Viper holds A main, and the trio (Raze, Jett, Skye) takes mid control. They work from the middle outward before committing to a site.",
            agents: ["Omen", "Viper", "Raze", "Jett", "Skye"],
          },
          {
            color: "red",
            label: "4-1 with Lurk",
            heading: "Viper always lurking — 4 push together",
            text: "They like to play 4-1 with Viper always lurking while the four others push together looking for a kill. The team commits once the lurk finds an opening.",
            agents: ["Viper"],
          },
          {
            color: "red",
            label: "Redirect",
            heading: "Fast A? They'll rotate CT through heaven to B",
            text: "They redirect a lot: if they fast A and fail to get on site, they rotate CT through heaven and swing B instead. Don't abandon B when they show A — the redirect is real.",
          },
          {
            color: "red",
            label: "Five-Man Rush",
            heading: "No solution = five-man rush without a lurk",
            text: "When they're stuck, they default to a five-man rush on B or A with no lurk. If the round is going nowhere for them, expect a straight, committed push.",
          },
          {
            color: "red",
            label: "Viper Wall",
            heading: "Viper walks through her wall on A for picks",
            text: "Viper likes to walk through her own wall on A to catch defenders off-guard — looking for a timing or a pick. If she finds one, the team immediately redirects onto her position.",
            agents: ["Viper"],
          },
        ],
      },
    ],
  },

  // ── Breeze vs Floppers ───────────────────────────────────────────────────────
  {
    slug: "breeze-floppers",
    map: "Breeze",
    opponent: "Floppers",
    tag: "// Enemy Analysis — Floppers",
    sections: [
      {
        kind: "cards",
        badgeType: "defense",
        title: "Their Defense Patterns",
        cards: [
          {
            color: "teal",
            label: "Default",
            heading: "Viper B, Sova elbow/nest, Jett & Yoru mid",
            text: "Their default: Viper always B, Sova close to elbow or nest watching for a B split, Jett and Yoru always mid, and one last player on A. Remember — Yoru can fast rotate towards B at any time.",
            agents: ["Viper", "Sova", "Jett", "Yoru"],
          },
          {
            color: "teal",
            label: "B Site",
            heading: "Weakest site — fast B works",
            text: "B is by far their weakest site. Sova plays too far towards nest to help Viper in time. Jett and Chamber can't rotate fast enough — only Yoru can, but if we go fast it's already too late for him.",
          },
          {
            color: "teal",
            label: "Yoru & Sova",
            heading: "They sometimes walk elbow together",
            text: "Yoru and Sova sometimes walk towards elbow to catch a B player off guard — be aware of this early aggression when crossing or peeking that area.",
          },
          {
            color: "teal",
            label: "Adaptation",
            heading: "If they adjust — split A",
            text: "If they notice B is too exposed, they'll shift to 2 site B, 1 nest, 2 A. Adapt quickly when that happens: split A and break their new setup before they settle in.",
          },
          {
            color: "teal",
            label: "Yoru Roam",
            heading: "Free electron — control map 1-3-1",
            text: "Yoru roams freely whenever he hears no activity — he'll walk through any space. A 1-3-1 map control setup counters this well. Stay careful on the extremities where he tends to show up.",
          },
          {
            color: "teal",
            label: "Chamber A",
            heading: "Always main with operator",
            text: "When Chamber plays A, he always holds main with the operator. To hit A we need a drone to check first. For an A split: arrow top mid first, then drone A before committing.",
            agents: ["Chamber"],
          },
        ],
      },
      {
        kind: "block",
        badgeType: "pistol",
        title: "Their Defense Pistol + Counter",
        blocks: [
          {
            accent: "orange",
            blockTitle: "// Defense Pistol + Counter",
            items: [
              "3 towards A, 2 on B: Chamber (or Omen depending on comp) A main, Yoru and Jett double-peeking doors, Sova and Viper on B.",
              "Counter: split B. Don't smoke nest — smoke close to elbow instead to block the mid angle during the cross. Focus on killing Viper and Sova quickly.",
            ],
            agents: ["Chamber", "Omen", "Yoru", "Jett", "Sova", "Viper"],
          },
        ],
      },
      {
        kind: "block",
        badgeType: "bonus",
        title: "Defense Bonus Counter",
        blocks: [
          {
            accent: "purple",
            blockTitle: "// Bonus — Fake B, Execute A",
            items: [
              "If we win the pistol, fake B to trigger Yoru's teleport, then immediately execute A — only one or two players at most will be there to defend.",
            ],
          },
        ],
      },
      {
        kind: "cards",
        badgeType: "attack",
        title: "Their Attack Patterns",
        cards: [
          {
            color: "red",
            label: "Default",
            heading: "Chamber B main, Viper A main, trio mid",
            text: "Their default: Chamber (or Omen) holding B main, Viper holding A main, and the other three taking mid control before committing to a site.",
            agents: ["Chamber", "Omen", "Viper"],
          },
          {
            color: "red",
            label: "Yoru Send",
            heading: "Yoru sent to a site — play opposite",
            text: "They like to send Yoru to one site and commit the team to the opposite. Don't over-rotate on full buy rounds — wait for a second read before fully committing.",
          },
          {
            color: "red",
            label: "Execute Style",
            heading: "4-1 — one always watches behind",
            text: "When they push a site it's almost always 4 into site and 1 watching behind for a flank. They never actually flank — that fifth player is just there to watch their backs, that's all.",
          },
          {
            color: "red",
            label: "Pacing",
            heading: "Map control → mid pressure → commit",
            text: "They love controlling the map first, then applying pressure mid, regrouping, and finishing on B or A main. When they commit to a site, they don't rebuild or freeze — they just go.",
          },
          {
            color: "red",
            label: "First Intention",
            heading: "No freeze — they always commit",
            text: "When they execute a site they commit fully — especially on Breeze where footsteps are loud. They don't freeze or rebuild mid-round. When you hear the rush, it's real.",
          },
          {
            color: "yellow",
            label: "Elbow Control",
            heading: "Take elbow — entry from windows",
            text: "When they control the map, we can take elbow and find an entry — there's almost always one player taking B elbow from windows. Catch them there before they fully set up.",
          },
        ],
      },
      {
        kind: "block",
        badgeType: "pistol",
        title: "Their Attack Pistol",
        blocks: [
          {
            accent: "orange",
            blockTitle: "// Attack Pistol — Two Options",
            items: [
              "Option 1: 4-1 on B. If we see Jett, it's not a fake — they're committing B. Always one player watching from window towards elbow during B pushes.",
              "Option 2: Fake B, rush A. If we don't see Jett on mid or B, they're likely going A. Don't over-rotate on the fake. Always one player watching mid during A pushes.",
            ],
          },
        ],
      },
      {
        kind: "block",
        badgeType: "bonus",
        title: "Their Attack Bonus",
        blocks: [
          {
            accent: "purple",
            blockTitle: "// Attack Bonus — Fast or Split",
            items: [
              "On bonus they like to split or go fast. We can flank them easily — they commit early and leave themselves exposed on the other side.",
            ],
          },
        ],
      },
      {
        kind: "block",
        badgeType: "eco",
        title: "Both Sides — Eco Behaviour",
        blocks: [
          {
            accent: "yellow",
            blockTitle: "// Anti Eco — Play the Opposite",
            items: [
              "On eco they like to stack somewhere. If we spot 2 or more players on one side, immediately go to the opposite — it will be weak or completely empty.",
            ],
          },
        ],
      },
    ],
  },
];

export function getAntiStrat(slug: string): AntiStrat | undefined {
  return antiStrats.find((a) => a.slug === slug);
}
