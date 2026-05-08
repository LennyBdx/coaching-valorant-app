"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/vod-reviews",  label: "VOD Reviews" },
  { href: "/anti-strats",  label: "Anti Strats" },
  { href: "/fundamentals", label: "Fundamentals" },
  { href: "/strategies",   label: "Strategies" },
  { href: "/comp",         label: "Compos" },
  { href: "/match-notes",  label: "Match Notes" },
  { href: "/planning",     label: "Planning" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 48px",
      height: "58px",
      background: "rgba(15,25,35,0.97)",
      borderBottom: "1px solid #1E2A38",
      position: "sticky",
      top: 0,
      zIndex: 100,
      backdropFilter: "blur(12px)",
    }}>
      {/* Red top accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #FF4655 0%, #FF465580 40%, transparent 100%)" }} />

      {/* Logo */}
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ position: "relative", padding: "4px 0" }}>
          {/* Corner brackets */}
          <span style={{ position: "absolute", top: 0, left: -6, width: 6, height: 6, borderTop: "1.5px solid #FF4655", borderLeft: "1.5px solid #FF4655" }} />
          <span style={{ position: "absolute", bottom: 0, right: -6, width: 6, height: 6, borderBottom: "1.5px solid #FF4655", borderRight: "1.5px solid #FF4655" }} />
          <span style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "22px",
            letterSpacing: "5px",
            color: "#ECE8E1",
            display: "block",
          }}>
            EDEN1
          </span>
        </div>
        <span style={{ width: "1px", height: "18px", background: "#2B3340" }} />
        <span style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "9px",
          letterSpacing: "3px",
          color: "#FF4655",
          textTransform: "uppercase",
        }}>
          COACHING
        </span>
      </Link>

      {/* Nav links */}
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        {links.map(({ href, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href} style={{ textDecoration: "none", position: "relative", padding: "6px 14px" }}>
              {active && (
                <span style={{
                  position: "absolute",
                  bottom: 0, left: "50%",
                  transform: "translateX(-50%)",
                  width: "calc(100% - 20px)",
                  height: "2px",
                  background: "#FF4655",
                  borderRadius: "1px",
                }} />
              )}
              <span style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: active ? "#ECE8E1" : "#7A8899",
                transition: "color 0.15s",
                display: "block",
              }}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
