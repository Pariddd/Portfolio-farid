import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function SkillBar({ name, level, color, delay }) {
  const [ref, visible] = useScrollReveal();

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-1">
        <span
          className="font-mono text-sm font-bold tracking-widest uppercase"
          style={{ color: "#ffffff80" }}
        >
          {name}
        </span>
        <span className="font-mono text-sm" style={{ color }}>
          {level}%
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: "#ffffff1a" }}
      >
        <div
          className="h-full rounded-full transition-all ease-out"
          style={{
            width: visible ? `${level}%` : "0%",
            backgroundColor: color,
            transitionDuration: "1.2s",
            transitionDelay: `${delay}ms`,
            boxShadow: `0 0 12px ${color}88`,
          }}
        />
      </div>
    </div>
  );
}
