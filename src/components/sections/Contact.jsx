import { useState, useEffect, useRef, useCallback } from "react";
import { SOCIAL_LINKS } from "../../data";

// ── Icons ──────────────────────────────────────────────────────────────
const IconGithub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const IconLinkedin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);
const IconMail = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const IconCopy = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);
const IconCheck = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="m20 6-11 11-5-5" />
  </svg>
);
const IconTerminal = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const ICON_MAP = {
  github: <IconGithub />,
  linkedin: <IconLinkedin />,
  instagram: <IconInstagram />,
};

function getIcon(label) {
  return ICON_MAP[label.toLowerCase()] || <IconTerminal />;
}

// ── Terminal lines untuk Contact ───────────────────────────────────────
const TERMINAL_LINES = [
  { text: "whoami", color: "#aaa", delay: 0 },
  { text: "farid_kurniawan", color: "#facc15", delay: 600, isOutput: true },
  { text: "cat status.json", color: "#aaa", delay: 1100 },
  {
    text: '{ open_to_work: true, response_time: "< 24h" }',
    color: "#4ade80",
    delay: 1700,
    isOutput: true,
  },
  { text: "send --message", color: "#aaa", delay: 3800 },
];

// ── Per-char typewriter hook ───────────────────────────────────────────
function useTerminalTypewriter(lines, active, speed = 38) {
  const [rows, setRows] = useState([]);
  const timerRefs = useRef([]);

  useEffect(() => {
    if (!active) return;
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];

    lines.forEach((line, lineIndex) => {
      const startT = setTimeout(() => {
        setRows((prev) => [...prev, { ...line, displayed: "", done: false }]);

        let charIndex = 0;
        function typeNext() {
          charIndex++;
          const jitter = Math.random() * 18 - 9;
          setRows((prev) => {
            const next = [...prev];
            const target = next[lineIndex];
            if (!target) return prev;
            next[lineIndex] = {
              ...target,
              displayed: line.text.slice(0, charIndex),
              done: charIndex >= line.text.length,
            };
            return next;
          });
          if (charIndex < line.text.length) {
            const t = setTimeout(typeNext, speed + jitter);
            timerRefs.current.push(t);
          }
        }
        typeNext();
      }, line.delay);

      timerRefs.current.push(startT);
    });

    return () => timerRefs.current.forEach(clearTimeout);
  }, [active]); // eslint-disable-line

  return rows;
}

// ── Terminal Component ─────────────────────────────────────────────────
function ContactTerminal({ active }) {
  const rows = useTerminalTypewriter(TERMINAL_LINES, active);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [rows]);

  const lastActiveIdx = rows.findLastIndex((r) => !r.done);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "#0a0a0a", border: "1px solid #1a1a1a" }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: "#0d0d0d", borderBottom: "1px solid #111" }}
      >
        {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
          <div
            key={c}
            style={{ width: 8, height: 8, borderRadius: "50%", background: c }}
          />
        ))}
        <span className="font-mono text-[10px] ml-2" style={{ color: "#333" }}>
          bash — farid@portfolio
        </span>
        <div className="ml-auto flex items-center gap-1">
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />
          <span className="font-mono text-[9px]" style={{ color: "#333" }}>
            connected
          </span>
        </div>
      </div>

      <div ref={bodyRef} className="p-5" style={{ minHeight: 160 }}>
        <div className="font-mono text-[11px] leading-6">
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex items-center gap-2"
              style={{
                opacity: 1,
                transform: "translateY(0)",
                animation: "slideUp 0.25s ease both",
              }}
            >
              <span style={{ color: "#facc15" }}>
                {row.isOutput ? ">" : "$"}
              </span>
              <span style={{ color: row.color }}>
                {row.displayed}
                {i === lastActiveIdx && !row.done && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 7,
                      height: 13,
                      background: "#facc15",
                      marginLeft: 2,
                      verticalAlign: "middle",
                      animation: "blink 1s step-end infinite",
                    }}
                  />
                )}
              </span>
            </div>
          ))}

          {rows.length === TERMINAL_LINES.length &&
            rows.every((r) => r.done) && (
              <div className="flex items-center gap-2">
                <span style={{ color: "#facc15" }}>$</span>
                <span style={{ color: "#555" }}>
                  _
                  <span
                    style={{
                      display: "inline-block",
                      width: 7,
                      height: 13,
                      background: "#facc15",
                      marginLeft: 2,
                      verticalAlign: "middle",
                      animation: "blink 1s step-end infinite",
                    }}
                  />
                </span>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

// ── Social Card ────────────────────────────────────────────────────────
// FIX 1: Tambah opening tag <a yang hilang
// FIX 2: Hilangkan template literal di style border
function SocialCard({ label, href, animDelay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{
        background: hovered ? "#111" : "#0a0a0a",
        border: hovered ? "1px solid #facc1544" : "1px solid #1a1a1a",
        textDecoration: "none",
        transition: "all 0.2s ease",
        animation: "slideUp 0.5s ease both",
        animationDelay: animDelay,
      }}
    >
      <span
        style={{
          color: hovered ? "#facc15" : "#444",
          transition: "color 0.2s",
          display: "flex",
          alignItems: "center",
        }}
      >
        {getIcon(label)}
      </span>
      <span
        className="font-mono text-[11px] tracking-widest uppercase"
        style={{
          color: hovered ? "#fff" : "#444",
          transition: "color 0.2s",
          letterSpacing: "0.12em",
        }}
      >
        {label}
      </span>
      <span
        className="ml-auto font-mono text-[10px]"
        style={{
          color: hovered ? "#facc15" : "transparent",
          transition: "color 0.15s",
        }}
      >
        ↗
      </span>
    </a>
  );
}

// ── useInView hook ─────────────────────────────────────────────────────
function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, ...options },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []); // eslint-disable-line
  return inView;
}

// ── fadeUp helper ──────────────────────────────────────────────────────
const fadeUp = (active, delay = "0s") => ({
  opacity: active ? 1 : 0,
  transform: active ? "translateY(0)" : "translateY(16px)",
  transition: `opacity 0.55s ease ${delay}, transform 0.55s ease ${delay}`,
});

// ── Main Component ─────────────────────────────────────────────────────
export default function Contact() {
  const EMAIL = "farid.kurniawan0412@email.com";
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleMove = (e) => {
      const rect = section.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#080808", padding: "120px 0" }}
    >
      {/* Mouse glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, #facc1509 0%, transparent 70%)",
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          transition: "left 0.6s ease, top 0.6s ease",
        }}
      />

      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#facc1504 1px, transparent 1px), linear-gradient(90deg, #facc1504 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #facc1522, transparent)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-20">
        {/* Section label */}
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#a78bfa",
            marginBottom: 10,
            ...fadeUp(inView, "0s"),
          }}
        >
          <span style={{ color: "#444" }}>~/portfolio/ </span>04 — Contact
        </p>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* LEFT */}
          <div>
            <h2
              className="font-black leading-none mb-3"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
                letterSpacing: "-0.02em",
                ...fadeUp(inView, "0.08s"),
              }}
            >
              <span style={{ color: "#fff" }}>Got an</span>
              <br />
              <span
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1.5px #facc15",
                  display: "block",
                }}
              >
                idea?
              </span>
            </h2>

            <p
              className="font-mono text-xs leading-relaxed mb-10"
              style={{
                color: "#555",
                maxWidth: 340,
                ...fadeUp(inView, "0.16s"),
              }}
            >
              Open for freelance, contract & full-time.
              <br />I read every message personally.
            </p>

            {/* Email block */}
            <div
              className="rounded-2xl overflow-hidden mb-4"
              style={{
                border: "1px solid #1a1a1a",
                background: "#0d0d0d",
                ...fadeUp(inView, "0.24s"),
              }}
            >
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{
                  borderBottom: "1px solid #111",
                  background: "#0a0a0a",
                }}
              >
                {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: c,
                    }}
                  />
                ))}
                <span
                  className="font-mono text-[10px] ml-2"
                  style={{ color: "#333" }}
                >
                  new-message.sh
                </span>
              </div>

              <div className="p-5">
                <div
                  className="flex items-center gap-2 mb-1"
                  style={{ color: "#333" }}
                >
                  <IconMail />
                  <span
                    className="font-mono text-[9px] tracking-widest uppercase"
                    style={{ color: "#333" }}
                  >
                    direct line
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3 gap-3">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="font-mono font-bold"
                    style={{
                      color: "#facc15",
                      fontSize: "clamp(0.75rem, 2vw, 1rem)",
                      textDecoration: "none",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {EMAIL}
                  </a>

                  {/* FIX 3: template literal di border → ternary string biasa */}
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 font-mono text-[10px] px-3 py-1.5 rounded-lg shrink-0 transition-all duration-150"
                    style={{
                      background: copied ? "#facc1520" : "#111",
                      border: copied ? "1px solid #facc1566" : "1px solid #222",
                      color: copied ? "#facc15" : "#555",
                      cursor: "pointer",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {copied ? <IconCheck /> : <IconCopy />}
                    {copied ? "copied!" : "copy"}
                  </button>
                </div>

                <div
                  className="flex items-center gap-2 mt-4 pt-4"
                  style={{ borderTop: "1px solid #111" }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#22c55e",
                      boxShadow: "0 0 8px #22c55e88",
                      animation: "pulse 2s ease infinite",
                    }}
                  />
                  <span
                    className="font-mono text-[9px]"
                    style={{ color: "#444", letterSpacing: "0.1em" }}
                  >
                    ONLINE · responds within 24h
                  </span>
                </div>
              </div>
            </div>

            {/* FIX 4: Tambah opening tag <a yang hilang di CTA */}
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-black text-sm tracking-tight"
              style={{
                fontFamily: "'Syne', sans-serif",
                background: "#facc15",
                color: "#000",
                textDecoration: "none",
                letterSpacing: "-0.01em",
                animation: inView ? "glowPulse 3s ease infinite" : "none",
                transition: "all 0.2s",
                ...fadeUp(inView, "0.32s"),
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fde047";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 40px #facc1533";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#facc15";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <IconMail />
              send a message →
            </a>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-6" style={fadeUp(inView, "0.12s")}>
            <ContactTerminal active={inView} />

            <div>
              <p
                className="font-mono text-[9px] tracking-widest uppercase mb-3 px-1"
                style={{ color: "#333", letterSpacing: "0.2em" }}
              >
                // find me elsewhere
              </p>
              <div className="flex flex-col gap-2">
                {SOCIAL_LINKS.map(({ label, href }, i) => (
                  <SocialCard
                    key={label}
                    label={label}
                    href={href}
                    animDelay={`${i * 60}ms`}
                  />
                ))}
              </div>
            </div>

            <div
              className="flex items-start gap-3 px-4 py-3 rounded-xl"
              style={{ background: "#0a0a0a", border: "1px solid #111" }}
            >
              <span style={{ color: "#facc15", fontSize: 16, lineHeight: 1 }}>
                !
              </span>
              <p
                className="font-mono text-[10px] leading-relaxed"
                style={{ color: "#444" }}
              >
                Serius soal project? Kirim brief singkat — tech stack, scope,
                timeline. Akan lebih mudah untuk langsung ngobrol.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
