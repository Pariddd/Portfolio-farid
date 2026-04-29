import { useState, useEffect, useRef } from "react";
import { NAV_LINKS } from "../../data";

export default function Navbar({ scrollTo }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredLink, setHoveredLink] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const islandRef = useRef(null);

  useEffect(() => {
    const observers = [];
    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.toLowerCase());
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(link.toLowerCase());
        },
        { threshold: 0.4 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (islandRef.current && !islandRef.current.contains(e.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNav = (link) => {
    scrollTo(link.toLowerCase());
    setExpanded(false);
    setMenuOpen(false);
  };

  const isExpanded = expanded || !scrolled;

  return (
    <>
      {/* DYNAMIC ISLAND — desktop only */}
      <div className="hidden md:flex fixed top-4 left-0 right-0 z-50 justify-center pointer-events-none">
        <div
          ref={islandRef}
          className="pointer-events-auto relative flex items-center overflow-visible transition-all"
          style={{
            backgroundColor: "#0d0d0dee",
            backdropFilter: "blur(24px)",
            border: "1px solid #ffffff18",
            borderRadius: "9999px",
            boxShadow: isExpanded
              ? "0 0 0 1px #facc1533, 0 8px 40px #00000088"
              : "0 4px 24px #00000066",
            height: isExpanded ? "48px" : "36px",
            padding: isExpanded ? "0 20px" : "0 16px",
            gap: isExpanded ? "28px" : "0px",
            transition: "all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
            cursor: scrolled && !isExpanded ? "pointer" : "default",
          }}
          onClick={() => {
            if (scrolled && !isExpanded) setExpanded(true);
          }}
        >
          <span
            className="font-black tracking-tight whitespace-nowrap transition-all duration-300 cursor-pointer"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: isExpanded ? "15px" : "13px",
              color: "#fff",
            }}
            onClick={(e) => {
              e.stopPropagation();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setExpanded(false);
            }}
          >
            <span style={{ color: "#facc15" }}>{"<"}</span>Farid
            <span style={{ color: "#facc15" }}>{"/>"}</span>
          </span>

          <div
            className="h-4 transition-all duration-300"
            style={{
              backgroundColor: "#ffffff22",
              opacity: isExpanded ? 1 : 0,
              width: isExpanded ? "1px" : "0px",
            }}
          />

          <div
            className="flex items-center transition-all duration-300"
            style={{
              gap: isExpanded ? "24px" : "0px",
              opacity: isExpanded ? 1 : 0,
              maxWidth: isExpanded ? "400px" : "0px",
              overflow: "hidden",
            }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.toLowerCase();
              const isHovered = hoveredLink === link;
              return (
                <button
                  key={link}
                  onClick={() => handleNav(link)}
                  onMouseEnter={() => setHoveredLink(link)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative font-mono text-xs tracking-widest uppercase whitespace-nowrap transition-all duration-200"
                  style={{
                    color: isActive
                      ? "#facc15"
                      : isHovered
                        ? "#ffffffcc"
                        : "#ffffff66",
                  }}
                >
                  {link}
                  <span
                    className="absolute left-0 h-px transition-all duration-300"
                    style={{
                      bottom: "0px",
                      width: isActive ? "100%" : isHovered ? "50%" : "0%",
                      backgroundColor: "#facc15",
                      opacity: isActive ? 1 : isHovered ? 0.5 : 0,
                    }}
                  />
                </button>
              );
            })}
          </div>

          {scrolled && !isExpanded && activeSection && (
            <div className="flex items-center gap-1.5 ml-1">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: "#facc15",
                  boxShadow: "0 0 6px #facc15",
                }}
              />
              <span
                className="font-mono tracking-widest uppercase"
                style={{ color: "#facc15", fontSize: "10px" }}
              >
                {activeSection}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE NAVBAR — full pill, centered, max-width capped */}
      <div className="md:hidden fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div
          className="pointer-events-auto flex justify-between items-center w-full px-5 py-3"
          style={{
            backgroundColor: "#0d0d0dee",
            backdropFilter: "blur(20px)",
            border: "1px solid #ffffff18",
            borderRadius: "9999px",
            boxShadow: "0 4px 24px #00000066",
            maxWidth: "380px",
          }}
        >
          {/* Logo */}
          <span
            className="font-black text-base tracking-tight cursor-pointer select-none"
            style={{ fontFamily: "'Syne', sans-serif" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span style={{ color: "#facc15" }}>{"<"}</span>Farid
            <span style={{ color: "#facc15" }}>{"/>"}</span>
          </span>

          {/* Active section badge */}
          {activeSection && (
            <span
              className="font-mono tracking-widest uppercase px-2 py-0.5 rounded-full"
              style={{
                color: "#facc15",
                backgroundColor: "#facc1514",
                border: "1px solid #facc1533",
                fontSize: "9px",
              }}
            >
              {activeSection}
            </span>
          )}

          {/* Hamburger → X */}
          <button
            className="flex flex-col justify-center items-end gap-1.5 w-8 h-8 shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div
              className="h-0.5 bg-white transition-all duration-300 origin-right"
              style={{
                width: "18px",
                transform: menuOpen ? "translateY(6px) rotate(-45deg)" : "none",
              }}
            />
            <div
              className="h-0.5 bg-white transition-all duration-200"
              style={{ width: "18px", opacity: menuOpen ? 0 : 1 }}
            />
            <div
              className="h-0.5 bg-white transition-all duration-300 origin-right"
              style={{
                width: menuOpen ? "18px" : "12px",
                transform: menuOpen ? "translateY(-6px) rotate(45deg)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className="md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300"
        style={{
          backgroundColor: "#080808f2",
          backdropFilter: "blur(24px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {NAV_LINKS.map((link, i) => {
          const isActive = activeSection === link.toLowerCase();
          return (
            <button
              key={link}
              onClick={() => handleNav(link)}
              className="relative font-black text-4xl tracking-tight transition-all duration-300"
              style={{
                fontFamily: "'Syne', sans-serif",
                color: isActive ? "#facc15" : "#fff",
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${i * 55}ms`,
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {isActive && (
                <span
                  className="absolute -left-7 top-1/2 -translate-y-1/2 font-mono text-base"
                  style={{ color: "#facc15" }}
                >
                  →
                </span>
              )}
              {link}
            </button>
          );
        })}
      </div>
    </>
  );
}
