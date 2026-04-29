import { useState, useEffect } from "react";

const TERMINAL_LINES = [
  { text: "$ initializing portfolio...", delay: 0, color: "#ffffff88" },
  { text: "$ loading modules", delay: 600, color: "#ffffff88" },
  { text: "  ✓ node_modules/react", delay: 1000, color: "#4ade80" },
  { text: "  ✓ node_modules/tailwindcss", delay: 1300, color: "#4ade80" },
  { text: "  ✓ node_modules/vite", delay: 1600, color: "#4ade80" },
  { text: "$ compiling assets...", delay: 2000, color: "#ffffff88" },
  { text: "  ✓ bundle size: 42.3kb (gzip)", delay: 2500, color: "#4ade80" },
  { text: "$ establishing connection", delay: 3000, color: "#ffffff88" },
  { text: "  ✓ server running on :5173", delay: 3400, color: "#4ade80" },
  { text: "$ ready.", delay: 3900, color: "#facc15" },
];

function TypingText({ text, color, onDone }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const speed = 28;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span style={{ color, fontFamily: "'DM Mono', monospace" }}>
      {displayed}
      {displayed.length < text.length && (
        <span className="animate-pulse" style={{ color: "#facc15" }}>
          ▋
        </span>
      )}
    </span>
  );
}

export default function Preloader({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  // Queue lines by delay
  useEffect(() => {
    const timers = TERMINAL_LINES.map((line, i) =>
      setTimeout(() => {
        setCurrentIndex(i);
        setVisibleLines((prev) => [...prev, { ...line, id: i }]);
      }, line.delay),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Progress bar
  useEffect(() => {
    const total = TERMINAL_LINES[TERMINAL_LINES.length - 1].delay + 800;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / total) * 100, 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Trigger exit after last line done
  useEffect(() => {
    const lastDelay = TERMINAL_LINES[TERMINAL_LINES.length - 1].delay;
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onComplete?.(), 700);
    }, lastDelay + 1200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-center items-center"
      style={{
        backgroundColor: "#080808",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.03)" : "scale(1)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* Scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
        }}
      />

      {/* Terminal window */}
      <div
        className="relative w-full max-w-xl mx-4 rounded-xl overflow-hidden"
        style={{
          border: "1px solid #ffffff18",
          boxShadow: "0 0 80px #facc1511, 0 0 0 1px #ffffff08",
          backgroundColor: "#0d0d0d",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{
            borderBottom: "1px solid #ffffff0f",
            backgroundColor: "#111",
          }}
        >
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#ff5f57" }}
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#febc2e" }}
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#28c840" }}
          />
          <span
            className="ml-3 text-xs tracking-widest"
            style={{ color: "#ffffff33", fontFamily: "'DM Mono', monospace" }}
          >
            bash — portfolio
          </span>
        </div>

        {/* Terminal body */}
        <div className="px-5 py-5 min-h-64 flex flex-col gap-1.5">
          {visibleLines.map((line, i) => (
            <div key={line.id} className="text-sm leading-relaxed">
              {i === visibleLines.length - 1 ? (
                <TypingText text={line.text} color={line.color} />
              ) : (
                <span
                  style={{
                    color: line.color,
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {line.text}
                </span>
              )}
            </div>
          ))}

          {/* Blinking cursor after last line */}
          {visibleLines.length === TERMINAL_LINES.length && (
            <div
              className="text-sm mt-1"
              style={{ fontFamily: "'DM Mono', monospace", color: "#ffffff55" }}
            >
              ${" "}
              <span className="animate-pulse" style={{ color: "#facc15" }}>
                ▋
              </span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div style={{ borderTop: "1px solid #ffffff0a" }}>
          <div
            className="h-0.5 transition-all"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(to right, #4ade80, #facc15)",
              boxShadow: "0 0 8px #facc1577",
              transitionDuration: "80ms",
            }}
          />
        </div>

        {/* Bottom status */}
        <div
          className="flex justify-between px-4 py-2"
          style={{ backgroundColor: "#111" }}
        >
          <span className="text-xs font-mono" style={{ color: "#ffffff33" }}>
            ● main
          </span>
          <span className="text-xs font-mono" style={{ color: "#ffffff33" }}>
            {Math.floor(progress)}%
          </span>
        </div>
      </div>

      {/* Name watermark */}
      <p
        className="absolute bottom-8 text-xs tracking-widest uppercase"
        style={{ color: "#ffffff18", fontFamily: "'DM Mono', monospace" }}
      >
        Farid Kurniawan · portfolio
      </p>
    </div>
  );
}
