import { useState, useMemo } from "react";
import { PROJECTS } from "../../data";
import ProjectCard from "../ui/ProjectCard";

const CATEGORIES = [
  "all",
  ...[...new Set(PROJECTS.map((p) => p.year))].sort(
    (a, b) => Number(b) - Number(a),
  ),
];
const INITIAL_VISIBLE = 6;

// List view row component
function ProjectListRow({ project, index, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project)}
      className="flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer"
      style={{
        background: hovered ? "#111" : "transparent",
        border: `1px solid ${hovered ? "#facc1533" : "#1a1a1a"}`,
        transition: "all 0.2s ease",
        animation: `fadeSlideIn 0.3s ease both`,
        animationDelay: `${index * 40}ms`,
      }}
    >
      {/* Index */}
      <span
        className="font-mono text-[10px] w-6 shrink-0"
        style={{ color: "#333" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Year */}
      <span
        className="font-mono text-[10px] px-2 py-0.5 rounded-full shrink-0"
        style={{
          color: "#facc15",
          border: "1px solid #facc1533",
          background: "#facc1510",
          minWidth: 40,
          textAlign: "center",
        }}
      >
        {project.year}
      </span>

      {/* Title */}
      <span
        className="font-black text-sm shrink-0"
        style={{
          fontFamily: "'Syne', sans-serif",
          color: hovered ? "#facc15" : "#fff",
          transition: "color 0.2s",
          minWidth: 140,
        }}
      >
        {project.title}
      </span>

      {/* Tags — hide on small screens */}
      <div className="hidden md:flex flex-wrap gap-1 flex-1">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[9px] px-2 py-0.5 rounded"
            style={{
              background: "#1a1a1a",
              color: "#666",
              border: "1px solid #222",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Status */}
      <div className="flex items-center gap-1.5 shrink-0 ml-auto">
        <div
          className="rounded-full"
          style={{
            width: 5,
            height: 5,
            background: project.status === "live" ? "#22c55e" : "#444",
          }}
        />
        <span
          className="font-mono text-[9px] hidden sm:block"
          style={{ color: "#444", letterSpacing: "0.1em" }}
        >
          {project.status === "live" ? "production" : "archived"}
        </span>
      </div>

      {/* Arrow */}
      <span
        className="font-mono text-xs shrink-0"
        style={{
          color: hovered ? "#facc15" : "#333",
          transition: "color 0.2s",
        }}
      >
        →
      </span>
    </div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.year === activeCategory); // string === string ✅
  }, [activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const remaining = filtered.length - visibleCount;

  // Reset visible count when filter changes
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(INITIAL_VISIBLE);
  };

  return (
    <>
      <section id="projects" className="px-8 md:px-20 py-24 max-w-6xl mx-auto">
        {/* Section label */}
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#60a5fa",
            marginBottom: 10,
          }}
        >
          <span style={{ color: "#444" }}>~/portfolio/ </span>03 — Projects
        </p>

        <h2
          className="font-black text-4xl md:text-5xl mb-10 leading-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Things I've built.
          <br />
          <span style={{ color: "#60a5fa" }}>built.</span>
        </h2>

        {/* ── Controls Bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 flex-wrap">
            <span
              className="font-mono text-[10px] mr-2 hidden sm:block"
              style={{ color: "#444" }}
            >
              $ filter
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className="font-mono text-[10px] px-3 py-1.5 rounded-lg transition-all duration-150"
                style={{
                  background:
                    activeCategory === cat ? "#facc15" : "transparent",
                  color: activeCategory === cat ? "#000" : "#666",
                  border: `1px solid ${
                    activeCategory === cat ? "#facc15" : "#222"
                  }`,
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div
            className="flex items-center gap-1 p-1 rounded-lg"
            style={{ background: "#111", border: "1px solid #1a1a1a" }}
          >
            {/* Grid toggle */}
            <button
              onClick={() => setViewMode("grid")}
              title="Grid view"
              className="flex items-center gap-1.5 font-mono text-[10px] px-3 py-1.5 rounded-md transition-all duration-150"
              style={{
                background: viewMode === "grid" ? "#1a1a1a" : "transparent",
                color: viewMode === "grid" ? "#facc15" : "#444",
                border: "none",
                cursor: "pointer",
              }}
            >
              {/* Grid icon */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="currentColor"
              >
                <rect x="0" y="0" width="5" height="5" rx="1" />
                <rect x="7" y="0" width="5" height="5" rx="1" />
                <rect x="0" y="7" width="5" height="5" rx="1" />
                <rect x="7" y="7" width="5" height="5" rx="1" />
              </svg>
              <span className="hidden sm:inline">grid</span>
            </button>

            {/* List toggle */}
            <button
              onClick={() => setViewMode("list")}
              title="List view"
              className="flex items-center gap-1.5 font-mono text-[10px] px-3 py-1.5 rounded-md transition-all duration-150"
              style={{
                background: viewMode === "list" ? "#1a1a1a" : "transparent",
                color: viewMode === "list" ? "#facc15" : "#444",
                border: "none",
                cursor: "pointer",
              }}
            >
              {/* List icon */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="0" y1="2" x2="12" y2="2" />
                <line x1="0" y1="6" x2="12" y2="6" />
                <line x1="0" y1="10" x2="12" y2="10" />
              </svg>
              <span className="hidden sm:inline">list</span>
            </button>
          </div>
        </div>

        {/* ── Terminal hint for list mode ── */}
        {viewMode === "list" && (
          <div
            className="font-mono text-[10px] mb-4 px-1"
            style={{ color: "#333" }}
          >
            $ ls -la ./projects --year={activeCategory}{" "}
            <span style={{ color: "#444" }}>({filtered.length} results)</span>
          </div>
        )}

        {/* ── Project count indicator ── */}
        {viewMode === "grid" && (
          <div
            className="font-mono text-[10px] mb-4 px-1"
            style={{ color: "#333" }}
          >
            <span style={{ color: "#444" }}>
              showing {visible.length}/{filtered.length} projects
            </span>
          </div>
        )}

        {/* ── Grid View ── */}
        {viewMode === "grid" && (
          <div className="grid md:grid-cols-2 gap-3">
            {visible.map((project, i) => (
              <ProjectCard
                key={`${project.title}-${i}`}
                project={project}
                index={i}
                onOpen={setSelected}
              />
            ))}
          </div>
        )}

        {/* ── List View ── */}
        {viewMode === "list" && (
          <div className="flex flex-col gap-1">
            {/* Column headers */}
            <div
              className="flex items-center gap-4 px-4 py-2 mb-1"
              style={{ borderBottom: "1px solid #1a1a1a" }}
            >
              <span
                className="font-mono text-[9px] w-6 shrink-0"
                style={{ color: "#333" }}
              >
                #
              </span>
              <span
                className="font-mono text-[9px] shrink-0"
                style={{ color: "#333", minWidth: 40 }}
              >
                year
              </span>
              <span
                className="font-mono text-[9px] shrink-0"
                style={{ color: "#333", minWidth: 140 }}
              >
                project
              </span>
              <span
                className="font-mono text-[9px] flex-1 hidden md:block"
                style={{ color: "#333" }}
              >
                stack
              </span>
              <span
                className="font-mono text-[9px] shrink-0"
                style={{ color: "#333" }}
              >
                status
              </span>
            </div>

            {visible.map((project, i) => (
              <ProjectListRow
                key={`${project.title}-${i}`}
                project={project}
                index={i}
                onOpen={setSelected}
              />
            ))}
          </div>
        )}

        {/* ── Load More Button ── */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleCount((c) => c + 4)}
              className="font-mono text-xs px-6 py-3 rounded-xl transition-all duration-200 group"
              style={{
                background: "transparent",
                border: "1px solid #222",
                color: "#555",
                cursor: "pointer",
                letterSpacing: "0.05em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#facc1555";
                e.currentTarget.style.color = "#facc15";
                e.currentTarget.style.background = "#facc1508";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#222";
                e.currentTarget.style.color = "#555";
                e.currentTarget.style.background = "transparent";
              }}
            >
              $ load --more-projects{" "}
              <span style={{ color: "#facc1588" }}>
                (+{remaining} remaining)
              </span>
            </button>
          </div>
        )}

        {/* ── All loaded indicator ── */}
        {!hasMore && filtered.length > INITIAL_VISIBLE && (
          <div className="flex justify-center mt-8">
            <span
              className="font-mono text-[10px]"
              style={{ color: "#333", letterSpacing: "0.1em" }}
            >
              // all {filtered.length} projects loaded
            </span>
          </div>
        )}

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-20 font-mono"
            style={{ color: "#333" }}
          >
            <span className="text-2xl mb-3">∅</span>
            <span className="text-xs">
              $ find ./projects --category={activeCategory} → 0 results
            </span>
          </div>
        )}
      </section>

      {/* ── Modal Overlay ── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div
            className="w-full max-w-2xl overflow-hidden"
            style={{
              background: "#0f0f0f",
              border: "1px solid #facc1533",
              borderRadius: 20,
              animation: "modalIn 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {/* Terminal title bar */}
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ background: "#111", borderBottom: "1px solid #1a1a1a" }}
            >
              <div className="flex gap-2">
                {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
                  <div
                    key={c}
                    className="rounded-full"
                    style={{ width: 10, height: 10, background: c }}
                  />
                ))}
              </div>
              <span className="font-mono text-[11px]" style={{ color: "#555" }}>
                {selected.title.toLowerCase().replace(/\s/g, "-")} — preview
              </span>
              <button
                onClick={() => setSelected(null)}
                className="font-mono text-lg leading-none transition-colors duration-150"
                style={{
                  background: "none",
                  border: "none",
                  color: "#555",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#facc15")}
                onMouseLeave={(e) => (e.target.style.color = "#555")}
              >
                ✕
              </button>
            </div>

            {/* Screenshot area */}
            <div
              className="relative w-full flex items-center justify-center"
              style={{ height: 220, background: "#141414", overflow: "hidden" }}
            >
              {selected.image ? (
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.9 }}
                />
              ) : (
                <div
                  className="flex flex-col items-center gap-3"
                  style={{ color: "#333" }}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    style={{ opacity: 0.35 }}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                  <span
                    className="font-mono text-[11px]"
                    style={{ color: "#333" }}
                  >
                    [ screenshot / demo preview ]
                  </span>
                </div>
              )}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
                }}
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-1">
                <span
                  className="font-mono text-xs"
                  style={{ color: "#facc15" }}
                >
                  // {selected.year}
                </span>
              </div>
              <h3
                className="font-black text-2xl mb-3"
                style={{ fontFamily: "'Syne', sans-serif", color: "#fff" }}
              >
                {selected.title}
              </h3>
              <p
                className="text-xs leading-relaxed mb-5"
                style={{
                  color: "#666",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {selected.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-1 rounded"
                    style={{
                      background: "#facc1510",
                      border: "1px solid #facc1533",
                      color: "#facc15",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {selected.liveUrl && (
                  <a
                    href={selected.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] font-bold px-4 py-2 rounded-lg transition-all duration-150"
                    style={{
                      background: "#facc15",
                      color: "#000",
                      textDecoration: "none",
                      border: "1px solid #facc15",
                    }}
                  >
                    $ view live →
                  </a>
                )}
                {selected.repoUrl && (
                  <a
                    href={selected.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] px-4 py-2 rounded-lg transition-all duration-150"
                    style={{
                      background: "transparent",
                      color: "#888",
                      textDecoration: "none",
                      border: "1px solid #222",
                    }}
                  >
                    {"{ source code }"}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
