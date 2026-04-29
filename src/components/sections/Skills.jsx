import { useState } from "react";

const SKILLS = [
  { name: "Go", icon: "🐹", cat: "backend" },
  { name: "Node.js", icon: "⬡", cat: "backend" },
  { name: "TypeScript", icon: "TS", cat: "backend" },
  { name: "Python", icon: "🐍", cat: "backend" },
  { name: "REST API", icon: "⚡", cat: "backend" },
  { name: "React", icon: "⚛", cat: "frontend" },
  { name: "Next.js", icon: "▲", cat: "frontend" },
  { name: "Tailwind", icon: "🌊", cat: "frontend" },
  { name: "HTML/CSS", icon: "#", cat: "frontend" },
  { name: "Docker", icon: "🐳", cat: "devops" },
  { name: "Kubernetes", icon: "⎈", cat: "devops" },
  { name: "Linux", icon: "🐧", cat: "devops" },
  { name: "AWS", icon: "☁", cat: "devops" },
  { name: "CI/CD", icon: "∞", cat: "devops" },
  { name: "PostgreSQL", icon: "🐘", cat: "database" },
  { name: "Redis", icon: "◈", cat: "database" },
  { name: "MongoDB", icon: "🍃", cat: "database" },
  { name: "Git", icon: "⑂", cat: "tools" },
  { name: "Postman", icon: "✉", cat: "tools" },
  { name: "Figma", icon: "✦", cat: "tools" },
];

const CATEGORIES = [
  "all",
  "backend",
  "frontend",
  "devops",
  "database",
  "tools",
];

export default function Skills() {
  const [active, setActive] = useState("all");
  const [animKey, setAnimKey] = useState(0);

  const filtered =
    active === "all" ? SKILLS : SKILLS.filter((s) => s.cat === active);

  const handleCategoryChange = (cat) => {
    setActive(cat);
    setAnimKey((k) => k + 1);
  };

  return (
    <section
      id="skills"
      className="px-8 md:px-20 py-24"
      style={{
        backgroundColor: "#0d0d0d",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Syne:wght@800&display=swap');

        .skill-card {
          background: #111;
          border: 0.5px solid #1e1e1e;
          padding: 18px 14px 16px;
          border-radius: 3px;
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
          opacity: 0;
          animation: skillFadeUp 0.35s ease forwards;
        }
        .skill-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1.5px;
          background: #facc15;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }
        .skill-card:hover::before { transform: scaleX(1); }
        .skill-card:hover {
          border-color: #2a2a2a;
          background: #161616;
          transform: translateY(-3px);
        }
        @keyframes skillFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cursorBlink {
          50% { opacity: 0; }
        }
        .cursor-blink {
          display: inline-block;
          width: 7px;
          height: 13px;
          background: #facc15;
          animation: cursorBlink 1s step-end infinite;
          opacity: 0.8;
          vertical-align: middle;
        }
        .cat-btn {
          background: transparent;
          border: 0.5px solid #2a2a2a;
          color: #444;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          padding: 5px 14px;
          cursor: pointer;
          letter-spacing: 0.1em;
          transition: all 0.15s;
          border-radius: 2px;
        }
        .cat-btn:hover {
          border-color: #facc15;
          color: #facc15;
          background: rgba(250,204,21,0.06);
        }
        .cat-btn.cat-active {
          border-color: #facc15;
          color: #facc15;
          background: rgba(250,204,21,0.06);
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Label */}
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#facc15",
            marginBottom: 10,
          }}
        >
          <span style={{ color: "#444" }}>~/portfolio/ </span>02 — Skills
        </p>

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            margin: "0 0 8px",
          }}
        >
          The stack I<br />
          <span style={{ color: "#facc15" }}>actually use.</span>
        </h2>

        <p
          style={{
            fontSize: 11,
            color: "#333",
            marginBottom: 36,
            letterSpacing: "0.05em",
          }}
        >
          $ ls -la ./skills --filter=production-grade
        </p>

        {/* Prompt line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 20,
            fontSize: 11,
          }}
        >
          <span style={{ color: "#facc15" }}>$</span>
          <span style={{ color: "#444" }}>cat skills.json | jq '.[].name'</span>
          <span className="cursor-blink" />
        </div>

        {/* Category filters */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 32,
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-btn${active === cat ? " cat-active" : ""}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          key={animKey}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: 10,
          }}
        >
          {filtered.map((skill, i) => (
            <div
              key={skill.name}
              className="skill-card"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span
                style={{
                  fontSize: 24,
                  marginBottom: 10,
                  display: "block",
                  lineHeight: 1,
                }}
              >
                {skill.icon}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#aaa",
                  letterSpacing: "0.05em",
                  display: "block",
                }}
              >
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
