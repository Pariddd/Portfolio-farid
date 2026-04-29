import { useState, useEffect } from "react";

const ROLES = ["Fullstack Developer", "Cyber Security"];
const DESC =
  "I architect backend infrastructure, design APIs, and build fullstack applications with obsessive attention to performance, reliability, and developer experience.";

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

// key={startAnimation} di luar memastikan remount saat animasi boleh mulai
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
    // visibility:hidden — elemen tetap ada (layout tidak shift) tapi teks TIDAK terlihat sama sekali
    // Berbeda dengan opacity:0 yang masih bisa "flash" saat browser repaint
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

// Terminal lines untuk sisi kanan hero
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
  { text: "$ download --cv", color: "#ffffff88", delay: 5300 }, // Perintah unduh
  {
    text: "> resume_farid.pdf [Download]",
    color: "#facc15",
    delay: 5800,
    isDownload: true, // Flag khusus untuk mendeteksi link
  },
  { text: "$ _", color: "#ffffff44", delay: 6500 },
];

function HeroTerminal({ startAnimation }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [show, setShow] = useState(false);

  // State untuk Parallax Mouse
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;

    // Sensitivitas rotasi (makin kecil angka, makin miring)
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 }); // Kembali ke posisi semula
  };

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
        transition: "opacity 0.6s ease, transform 0.2s ease-out", // Transisi rotasi mouse
        perspective: "1000px", // Penting untuk efek 3D
        animation: "floating 6s ease-in-out infinite", // Efek melayang naik-turun
        transform: `
          translateY(${show ? "0px" : "24px"}) 
          scale(${show ? 1 : 0.97}) 
          rotateX(${rotate.x}deg) 
          rotateY(${rotate.y}deg)
        `,
      }}
    >
      {/* Terminal window */}
      <div
        style={{
          border: "1px solid #ffffff15",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "rgba(13, 13, 13, 0.9)", // Sedikit transparan
          backdropFilter: "blur(12px)", // Efek Glassmorphism
          boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(250, 204, 21, ${0.05 + Math.abs(rotate.x / 100)}) /* Glow dinamis */
          `,
        }}
      >
        {/* ... (Isi Title Bar sama seperti kodemu) ... */}

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

        {/* ... (Isi Bottom Bar sama seperti kodemu) ... */}
      </div>

      {/* Shadow di bawah terminal agar efek melayang lebih terasa */}
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

      {/* Floating badges (Skill tags) */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["TypeScript", "Golang", "Docker", "Linux", "AWS"].map((tech, i) => (
          <span
            key={tech}
            className="hover:scale-110 transition-transform cursor-default"
            style={{
              fontSize: 11,
              fontFamily: "'DM Mono', monospace",
              color: "#facc15", // Ubah ke kuning agar pop-up
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

function TerminalLine({ text, color, isLast, isDownload }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const speed = 25;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(iv);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(iv);
  }, [text]);

  const renderContent = () => {
    if (isDownload && done) {
      const parts = text.split("[Download]");
      return (
        <>
          {parts[0]}
          <a
            href="/cv-farid.pdf" // Ganti dengan path file CV-mu
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

      {/* EFEK KEDIP: Muncul hanya jika baris ini belum selesai diketik, 
          atau jika ini adalah baris paling akhir (simbol $) */}
      {(!done || (isLast && text.includes("$ _"))) && (
        <span className="cursor-blink" />
      )}
    </div>
  );
}

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

      {/* Two-column layout */}
      <div
        className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1.5fr_1fr]"
        style={{
          gap: "40px",
          alignItems: "center",
          maxWidth: "1300px",
        }}
      >
        {/* ── Kolom Kiri ── */}
        <div>
          {/* Greeting */}
          <p
            className="font-mono text-sm tracking-widest mb-1"
            style={{ color: "#ffffff44", ...fadeUp(phase.greeting) }}
          >
            ↳ halo, saya
          </p>

          {/* Name */}
          <h1
            className="font-black leading-none mb-4"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 5.5rem)",
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

          {/* Role cycling */}
          <div
            className="font-mono text-sm tracking-widest uppercase mb-8 flex items-center gap-2"
            style={{ color: "#facc15", ...fadeUp(phase.role) }}
          >
            <span style={{ color: "#ffffff44" }}>↳</span>
            <RoleCycler />
          </div>

          {/* Typewriter desc */}
          <TypewriterDesc
            key={`desc-${startAnimation}`}
            text={DESC}
            startDelay={1300}
            speed={22}
            show={phase.desc}
          />

          {/* Buttons */}
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
                e.currentTarget.style.backgroundColor = "#fbbf24"; // Sedikit lebih terang
                e.currentTarget.style.boxShadow = "0 0 20px #facc1566"; // Glow kuning
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "#facc15";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              View Projects →
            </button>
            <a
              href="/cv-farid.pdf" // Pastikan path file benar
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
        </div>

        {/* ── Kolom Kanan — Terminal ── */}
        {/* hidden lg:block = terminal hanya muncul di layar ≥1024px */}
        {/* Ganti ke "hidden xl:block" jika mau muncul hanya di layar ≥1280px */}
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
