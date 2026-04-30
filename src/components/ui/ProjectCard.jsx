import { useState } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const statusConfig = {
  live: { color: "#22c55e", label: "production" },
  "in-progress": { color: "#f59e0b", label: "in progress" },
  archived: { color: "#555", label: "archived" },
};

export default function ProjectCard({ project, index, onOpen }) {
  const [ref, visible] = useScrollReveal();
  const [hovered, setHovered] = useState(false);

  const { color: statusColor, label: statusLabel } =
    statusConfig[project.status] ?? statusConfig.archived;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project)}
      className="relative overflow-hidden rounded-2xl cursor-pointer group"
      style={{
        backgroundColor: "#111",
        transform: visible
          ? hovered
            ? "translateY(-4px)"
            : "translateY(0)"
          : "translateY(40px)",
        opacity: visible ? 1 : 0,
        transition: "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: visible ? "0ms" : `${index * 80}ms`,
        border: `1px solid ${hovered ? "#facc1555" : "#1f1f1f"}`,
      }}
    >
      {/* Yellow glow top-left on hover */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #facc1508 0%, transparent 55%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s",
        }}
      />

      <div className="p-6 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <span
            className="font-mono text-xs px-3 py-1 rounded-full"
            style={{
              color: "#facc15",
              border: "1px solid #facc1533",
              backgroundColor: "#facc1510",
              letterSpacing: "0.08em",
            }}
          >
            {project.year}
          </span>

          {/* Expand hint */}
          <div
            className="flex items-center gap-2 font-mono text-[10px]"
            style={{
              color: hovered ? "#facc15" : "#333",
              transition: "color 0.2s",
            }}
          >
            <span>preview</span>
            <div
              className="flex items-center justify-center rounded-md"
              style={{
                width: 22,
                height: 22,
                border: `1px solid ${hovered ? "#facc1555" : "#1f1f1f"}`,
                background: hovered ? "#facc1511" : "transparent",
                transition: "all 0.2s",
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
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-black text-2xl mb-2 tracking-tight"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: hovered ? "#facc15" : "#fff",
            transition: "color 0.25s",
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-xs leading-relaxed mb-4"
          style={{
            color: "#666",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {project.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2 py-1 rounded"
              style={{
                backgroundColor: "#1a1a1a",
                color: "#888",
                border: "1px solid #222",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer status */}
        <div
          className="flex items-center gap-2 pt-4"
          style={{ borderTop: "1px solid #1a1a1a" }}
        >
          <div
            className="rounded-full"
            style={{
              width: 6,
              height: 6,
              backgroundColor: statusColor,
            }}
          />
          <span
            className="font-mono text-[10px]"
            style={{ color: "#444", letterSpacing: "0.1em" }}
          >
            {statusLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
