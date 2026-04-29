import { useState, useEffect, useCallback } from "react";

// ── Uptime counter ─────────────────────────────────────────────────────
// START_MS di luar komponen → konstan, tidak re-create tiap render
const START_MS = new Date("2022-01-01T00:00:00").getTime();

function calcUptime() {
  const diff = Date.now() - START_MS;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

function Uptime() {
  // useState initializer pakai fungsi → lazy init, tidak panggil Date.now saat render
  const [uptime, setUptime] = useState(() => calcUptime());

  useEffect(() => {
    // calcUptime adalah fungsi module-level stabil, aman tanpa deps
    const t = setInterval(() => setUptime(calcUptime()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <span
      className="font-mono text-[10px] tabular-nums"
      style={{ color: "#facc1566" }}
    >
      {uptime}
    </span>
  );
}

// ── Scroll to top ──────────────────────────────────────────────────────
function ScrollTop() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 font-mono text-[10px] px-3 py-1.5 rounded-lg"
      style={{
        background: hovered
          ? "#facc1515"
          : scrolled
            ? "#facc1508"
            : "transparent",
        border: `1px solid ${
          hovered ? "#facc1544" : scrolled ? "#facc1533" : "#222"
        }`,
        color: hovered ? "#facc15" : scrolled ? "#facc1599" : "#555",
        cursor: "pointer",
        // ✅ Selalu opacity 1, tidak pernah invisible
        opacity: 1,
        letterSpacing: "0.08em",
        transition: "all 0.2s ease",
        // Glow aktif setelah scroll
        boxShadow: scrolled ? "0 0 12px #facc1511" : "none",
      }}
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
      cd ~/top
    </button>
  );
}

// ── Status dot ─────────────────────────────────────────────────────────
function StatusDot() {
  return (
    <div className="flex items-center gap-2">
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#22c55e",
          boxShadow: "0 0 8px #22c55e99",
          animation: "footerPulse 2.5s ease infinite",
        }}
      />
      <span
        className="font-mono text-[9px] tracking-widest"
        style={{ color: "#333", letterSpacing: "0.15em" }}
      >
        OPEN TO WORK
      </span>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer
      style={{
        background: "#080808",
        borderTop: "1px solid #facc1512",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top scan line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #facc1522 30%, #facc1544 50%, #facc1522 70%, transparent 100%)",
        }}
      />

      {/* Main footer row */}
      <div
        className="flex flex-row items-center justify-between gap-3 px-8 md:px-20 py-5"
        style={{ borderBottom: "1px solid #0f0f0f" }}
      >
        {/* Left — branding + status */}
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="font-black text-sm shrink-0"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            &lt;Farid/&gt;
          </span>
          <span
            className="font-mono text-[10px] shrink-0"
            style={{ color: "#1f1f1f" }}
          >
            ·
          </span>
          <StatusDot />
        </div>

        {/* Center — uptime (hidden on mobile) */}
        <div
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{ background: "#0d0d0d", border: "1px solid #111" }}
        >
          <span
            className="font-mono text-[9px]"
            style={{ color: "#333", letterSpacing: "0.1em" }}
          >
            UPTIME
          </span>
          <span style={{ color: "#1a1a1a" }}>·</span>
          <Uptime />
        </div>

        {/* Right — scroll to top */}
        <div className="shrink-0">
          <ScrollTop />
        </div>
      </div>
    </footer>
  );
}
