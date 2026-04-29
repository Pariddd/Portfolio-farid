import { useState, useEffect, useRef } from "react";
import { STATS } from "../../data";
import ProfileCard from "../ui/ProfileCard";
import aboutImg from "../../assets/about.jpeg";

// ── Animated counter hook ─────────────────────────────────────────────────
function useCounter(target, duration = 1200, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const numeric = parseInt(target.replace(/\D/g, ""), 10);
    if (isNaN(numeric)) return;
    const suffix = target.replace(/[0-9]/g, "");
    let start = 0;
    const step = Math.ceil(numeric / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= numeric) {
        setValue(numeric + suffix);
        clearInterval(timer);
      } else setValue(start + suffix);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return value || "0";
}

// ── Stat card ─────────────────────────────────────────────────────────────
function StatCard({ stat, active, index }) {
  const count = useCounter(stat.num, 1000 + index * 100, active);
  return (
    <div
      style={{
        padding: "16px 20px",
        borderRadius: 10,
        border: "1px solid #ffffff0f",
        backgroundColor: "#ffffff05",
        transition:
          "border-color 0.25s ease, background 0.25s ease, transform 0.25s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#facc1530";
        e.currentTarget.style.backgroundColor = "#facc1508";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#ffffff0f";
        e.currentTarget.style.backgroundColor = "#ffffff05";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 900,
          fontSize: "1.75rem",
          color: "#facc15",
          marginBottom: 4,
        }}
      >
        {count}
      </div>
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#ffffff44",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setStatsActive(true), 600);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="px-8 md:px-20 py-24 max-w-6xl mx-auto"
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }

        .about-label   { opacity: 0; }
        .about-heading { opacity: 0; }
        .about-para1   { opacity: 0; }
        .about-para2   { opacity: 0; }
        .about-stats   { opacity: 0; }
        .about-photo   { opacity: 0; }

        .visible .about-label {
          animation: fadeUp 0.55s cubic-bezier(0.4,0,0.2,1) 0.05s forwards;
        }
        .visible .about-heading {
          animation: fadeLeft 0.6s cubic-bezier(0.4,0,0.2,1) 0.15s forwards;
        }
        .visible .about-para1 {
          animation: fadeUp 0.55s cubic-bezier(0.4,0,0.2,1) 0.28s forwards;
        }
        .visible .about-para2 {
          animation: fadeUp 0.55s cubic-bezier(0.4,0,0.2,1) 0.38s forwards;
        }
        .visible .about-stats {
          animation: fadeUp 0.55s cubic-bezier(0.4,0,0.2,1) 0.5s forwards;
        }
        .visible .about-photo {
          animation: scaleIn 0.65s cubic-bezier(0.4,0,0.2,1) 0.1s forwards;
        }
      `}</style>

      <div className={visible ? "visible" : ""}>
        {/* Label */}
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#4ade80",
            marginBottom: 10,
          }}
        >
          <span style={{ color: "#444" }}>~/portfolio/ </span>02 — About
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* ── ProfileCard ── */}
          <div className="about-photo flex justify-center items-center">
            <ProfileCard
              name="Farid Kurniawan"
              title="Cyber Security · Fullstack"
              handle="paridxd"
              status="Online"
              contactText="Contact Me"
              avatarUrl={aboutImg}
              miniAvatarUrl={aboutImg}
              showUserInfo
              enableTilt={true}
              enableMobileTilt={false}
              behindGlowEnabled={true}
              behindGlowColor="rgba(250, 204, 21, 0.35)"
              behindGlowSize="55%"
              innerGradient="none"
              onContactClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            />
          </div>

          {/* ── Teks + Stats ── */}
          <div>
            <h2
              className="about-heading font-black mb-6 leading-tight"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(1.8rem, 2.8vw, 2.8rem)",
              }}
            >
              Code is craft,
              <br />
              <span style={{ color: "#4ade80" }}>infrastructure</span> is art.
            </h2>

            <p
              className="about-para1 leading-relaxed mb-4"
              style={{ color: "#ffffff80" }}
            >
              I'm a backend-focused fullstack developer with a passion for
              distributed systems, clean API design, and making things work at
              scale. I care deeply about how software is structured — not just
              whether it runs.
            </p>
            <p
              className="about-para2 leading-relaxed mb-10"
              style={{ color: "#ffffff80" }}
            >
              Currently working with Node.js, Python, and PostgreSQL as my core
              stack. Strong opinions on observability, container orchestration,
              and developer tooling.
            </p>

            <div
              className="about-stats"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 12,
              }}
            >
              {STATS.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  stat={stat}
                  active={statsActive}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
