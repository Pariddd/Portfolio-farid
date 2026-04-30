import { useState, useEffect } from "react";

const ROLES = ["Fullstack Developer", "Cyber Security"];
const DESC =
  "I architect backend infrastructure, design APIs, and build fullstack applications with obsessive attention to performance, reliability, and developer experience.";

// ── Social Icons ───────────────────────────────────────────────────────
const IconGithub = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const IconLinkedin = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const IconInstagram = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    href: "https://github.com/Pariddd",
    label: "GitHub",
    icon: <IconGithub />,
  },
  {
    href: "https://linkedin.com/in/farid-kurniawan-b7b4923a5/",
    label: "LinkedIn",
    icon: <IconLinkedin />,
  },
  {
    href: "https://instagram.com/paridxd",
    label: "Instagram",
    icon: <IconInstagram />,
  },
];

// ── Social Icons Row (inline di bawah CTA buttons) ─────────────────────
function SocialIconsRow({ show }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        marginTop: 24,
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.45s ease 0.15s, transform 0.45s ease 0.15s",
      }}
    >
      {SOCIAL_LINKS.map(({ href, label, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          title={label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 38,
            height: 38,
            borderRadius: 6,
            border: "1px solid #ffffff22",
            color: "#ffffff55",
            backgroundColor: "transparent",
            transition:
              "color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#facc15";
            e.currentTarget.style.borderColor = "#facc1566";
            e.currentTarget.style.backgroundColor = "#facc1510";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#ffffff55";
            e.currentTarget.style.borderColor = "#ffffff22";
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {icon}
        </a>
      ))}

      {/* Divider + label */}
      <div
        style={{
          width: 1,
          height: 20,
          backgroundColor: "#ffffff22",
          margin: "0 8px",
        }}
      />
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: "#ffffff33",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        find me
      </span>
    </div>
  );
}

// ── Typewriter hook ────────────────────────────────────────────────────
function useTypewriter(text, startDelay = 1300, speed = 22) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(iv);
          setTimeout(() => setDone(true), 800);
        }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [text, startDelay, speed]);

  return { displayed, done };
}

function TypewriterDesc({ text, speed, startDelay, show }) {
  const { displayed, done } = useTypewriter(text, startDelay, speed);

  return (
    <p
      className="font-mono max-w-xl leading-relaxed mb-10"
      style={{
        fontSize: "14px",
        color: "#ffffff66",
        minHeight: "4rem",
        opacity: show ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      {displayed}
      {!done && (
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "1em",
            background: "#facc15",
            verticalAlign: "middle",
            marginLeft: "2px",
            animation: "blink 0.8s step-end infinite",
          }}
        />
      )}
    </p>
  );
}

// ── Role Cycler ────────────────────────────────────────────────────────
function RoleCycler() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("visible");

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase("exit");
      setTimeout(() => {
        setIdx((i) => (i + 1) % ROLES.length);
        setPhase("enter");
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setPhase("visible")),
        );
      }, 350);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const style = {
    display: "inline-block",
    transform:
      phase === "exit"
        ? "translateY(-100%)"
        : phase === "enter"
          ? "translateY(100%)"
          : "translateY(0)",
    opacity: phase === "visible" ? 1 : 0,
    transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease",
  };

  return (
    <div
      style={{
        overflow: "hidden",
        height: "20px",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <span style={style}>{ROLES[idx]}</span>
    </div>
  );
}

// ── Glitch Name ────────────────────────────────────────────────────────
function GlitchName({ children, variant, delay, infinite = false }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const baseStyle =
    variant === "solid"
      ? { color: "#fff" }
      : { color: "transparent", WebkitTextStroke: "2px #facc15" };

  if (!mounted) {
    return (
      <span style={{ display: "block", visibility: "hidden", ...baseStyle }}>
        {children}
      </span>
    );
  }

  const animName = variant === "solid" ? "glitchSolid" : "glitchOutline";
  const animStyle = infinite
    ? `${animName} 0.55s steps(1) forwards, glitchOutlineLoop 4s steps(1) 0.6s infinite`
    : `${animName} 0.55s steps(1) forwards`;

  return (
    <span style={{ display: "block", ...baseStyle, animation: animStyle }}>
      {children}
    </span>
  );
}

// ── Terminal Lines Data ────────────────────────────────────────────────
const TERMINAL_LINES = [
  { text: "$ whoami", color: "#ffffff88", delay: 400 },
  { text: "> farid_kurniawan", color: "#facc15", delay: 900 },
  { text: "$ cat stack.json", color: "#ffffff88", delay: 1500 },
  { text: '> ["Go", "Node.js", "Docker"]', color: "#4ade80", delay: 2000 },
  { text: '> ["PostgreSQL", "Redis", "K8s"]', color: "#4ade80", delay: 2400 },
  { text: "$ status --education", color: "#ffffff88", delay: 3000 },
  {
    text: "> 6th semester CS student | Focus on Backend & Security",
    color: "#facc15",
    delay: 3500,
  },
  { text: "$ status", color: "#ffffff88", delay: 4200 },
  { text: "> open_to_work: true", color: "#4ade80", delay: 4700 },
  { text: "$ download --cv", color: "#ffffff88", delay: 5300 },
  {
    text: "> resume_farid.pdf [Download]",
    color: "#facc15",
    delay: 5800,
    isDownload: true,
  },
  { text: "$ _", color: "#ffffff44", delay: 6500 },
];

// ── Terminal Line Component ────────────────────────────────────────────
function TerminalLine({ text, color, isLast, isDownload }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(iv);
        setDone(true);
      }
    }, 25);
    return () => clearInterval(iv);
  }, [text]);

  const renderContent = () => {
    if (isDownload && done) {
      const parts = text.split("[Download]");
      return (
        <>
          {parts[0]}
          {/* FIX 2: opening tag <a yang hilang di renderContent */}
          <a
            href="/cv-farid.pdf"
            download
            className="px-2 py-0.5 ml-1 rounded bg-yellow-400 text-black text-xs font-bold hover:bg-white transition-colors duration-200 cursor-pointer"
          >
            GET_FILE
          </a>
        </>
      );
    }
    return displayed;
  };

  return (
    <div style={{ marginBottom: 6, fontSize: 13, lineHeight: 1.7 }}>
      <span style={{ color, fontFamily: "'DM Mono', monospace" }}>
        {renderContent()}
      </span>
      {(!done || (isLast && text.includes("$ _"))) && (
        <span className="cursor-blink" />
      )}
    </div>
  );
}

// ── Hero Terminal ──────────────────────────────────────────────────────
function HeroTerminal({ startAnimation }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [show, setShow] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const rotateX = (y - card.height / 2) / 20;
    const rotateY = (card.width / 2 - x) / 20;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  useEffect(() => {
    if (!startAnimation) return;
    const fadeTimer = setTimeout(() => setShow(true), 300);
    const timers = TERMINAL_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, { ...line, id: i }]);
      }, line.delay + 300),
    );
    return () => {
      clearTimeout(fadeTimer);
      timers.forEach(clearTimeout);
    };
  }, [startAnimation]);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: show ? 1 : 0,
        transition: "opacity 0.6s ease, transform 0.2s ease-out",
        perspective: "1000px",
        animation: "floating 6s ease-in-out infinite",
        transform: `translateY(${show ? "0px" : "24px"}) scale(${show ? 1 : 0.97}) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
    >
      <div
        style={{
          border: "1px solid #ffffff15",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "rgba(13, 13, 13, 0.9)",
          backdropFilter: "blur(12px)",
          boxShadow: `0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px rgba(250,204,21,${0.05 + Math.abs(rotate.x / 100)})`,
        }}
      >
        <div style={{ padding: "20px 24px", minHeight: "280px" }}>
          {visibleLines.map((line, i) => (
            <TerminalLine
              key={line.id}
              text={line.text}
              color={line.color}
              isDownload={line.isDownload}
              isLast={i === visibleLines.length - 1}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          width: "80%",
          height: "20px",
          background: "rgba(0,0,0,0.4)",
          filter: "blur(20px)",
          margin: "0 auto",
          marginTop: "10px",
          borderRadius: "50%",
          animation: "shadowPulse 6s ease-in-out infinite",
        }}
      />

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["TypeScript", "Golang", "Docker", "Linux", "AWS"].map((tech, i) => (
          <span
            key={tech}
            className="hover:scale-110 transition-transform cursor-default"
            style={{
              fontSize: 11,
              fontFamily: "'DM Mono', monospace",
              color: "#facc15",
              border: "1px solid #facc1533",
              borderRadius: 4,
              padding: "3px 10px",
              backgroundColor: "#facc1505",
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(8px)",
              transition: `all 0.4s ease ${0.8 + i * 0.08}s`,
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Main Hero Component ────────────────────────────────────────────────
export default function Hero({ scrollTo, startAnimation }) {
  const [phase, setPhase] = useState({
    greeting: false,
    role: false,
    desc: false,
    buttons: false,
  });

  useEffect(() => {
    if (!startAnimation) return;
    const timers = [
      setTimeout(() => setPhase((p) => ({ ...p, greeting: true })), 100),
      setTimeout(() => setPhase((p) => ({ ...p, role: true })), 1050),
      setTimeout(() => setPhase((p) => ({ ...p, desc: true })), 1300),
      setTimeout(() => setPhase((p) => ({ ...p, buttons: true })), 1600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [startAnimation]);

  const fadeUp = (active) => ({
    opacity: active ? 1 : 0,
    transform: active ? "translateY(0)" : "translateY(8px)",
    transition: "opacity 0.45s ease, transform 0.45s ease",
  });

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 pt-24 pb-16 overflow-hidden"
    >
      {/* BG grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Blobs */}
      <div
        className="absolute top-1/4 right-10 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "#facc15" }}
      />
      <div
        className="absolute bottom-1/4 right-1/3 w-60 h-60 rounded-full opacity-10 blur-3xl"
        style={{ background: "#4ade80" }}
      />
      <div
        className="absolute top-1/2 left-10 w-40 h-40 rounded-full opacity-10 blur-3xl"
        style={{ background: "#f472b6" }}
      />

      <div
        className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1.5fr_1fr]"
        style={{ gap: "40px", alignItems: "center", maxWidth: "1300px" }}
      >
        {/* ── Kolom Kiri ── */}
        <div>
          <p
            className="font-mono text-sm tracking-widest mb-1"
            style={{ color: "#ffffff44", ...fadeUp(phase.greeting) }}
          >
            ↳ halo, saya
          </p>

          <h1
            className="font-black leading-none mb-4"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1.4rem, 8vw, 5.5rem)",
              overflow: "visible",
              lineHeight: 1,
              visibility: startAnimation ? "visible" : "hidden",
            }}
          >
            {startAnimation && (
              <>
                <GlitchName variant="solid" delay={400}>
                  farid
                </GlitchName>
                <GlitchName variant="outline" delay={680} infinite>
                  Kurniawan
                </GlitchName>
              </>
            )}
          </h1>

          <div
            className="font-mono text-sm tracking-widest uppercase mb-8 flex items-center gap-2"
            style={{ color: "#facc15", ...fadeUp(phase.role) }}
          >
            <span style={{ color: "#ffffff44" }}>↳</span>
            <RoleCycler />
          </div>

          <TypewriterDesc
            key={`desc-${startAnimation}`}
            text={DESC}
            startDelay={1300}
            speed={22}
            show={phase.desc}
          />

          <div className="flex gap-4 flex-wrap" style={fadeUp(phase.buttons)}>
            <button
              onClick={() => scrollTo("projects")}
              className="px-8 py-3 font-mono text-sm font-bold tracking-widest uppercase transition-all duration-200"
              style={{
                backgroundColor: "#facc15",
                color: "#000",
                borderRadius: "4px",
                cursor: "pointer",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.backgroundColor = "#fbbf24";
                e.currentTarget.style.boxShadow = "0 0 20px #facc1566";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "#facc15";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              View Projects →
            </button>

            {/* FIX 3: opening tag <a yang hilang di Download CV */}
            <a
              href="/cv-farid.pdf"
              download
              className="px-8 py-3 font-mono text-sm font-bold tracking-widest uppercase border transition-all duration-200 flex items-center gap-2 group"
              style={{
                borderColor: "#ffffff33",
                color: "#ffffff88",
                borderRadius: "4px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#facc15";
                e.currentTarget.style.color = "#facc15";
                e.currentTarget.style.boxShadow = "0 0 15px #facc1533";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#ffffff33";
                e.currentTarget.style.color = "#ffffff88";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>

            <button
              onClick={() => scrollTo("contact")}
              className="px-8 py-3 font-mono text-sm font-bold tracking-widest uppercase border transition-all duration-200"
              style={{
                borderColor: "#ffffff33",
                color: "#ffffff88",
                borderRadius: "4px",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#facc15";
                e.currentTarget.style.color = "#facc15";
                e.currentTarget.style.boxShadow = "0 0 15px #facc1533";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#ffffff33";
                e.currentTarget.style.color = "#ffffff88";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Contact Me
            </button>
          </div>

          <SocialIconsRow show={phase.buttons} />
        </div>

        {/* ── Kolom Kanan ── */}
        <div className="hidden lg:block">
          <HeroTerminal startAnimation={startAnimation} />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span
          className="font-mono text-xs tracking-widest"
          style={{ color: "#ffffff33" }}
        >
          SCROLL
        </span>
        <div
          className="w-px h-8"
          style={{
            background: "linear-gradient(to bottom, #ffffff33, transparent)",
          }}
        />
      </div>
    </section>
  );
}
