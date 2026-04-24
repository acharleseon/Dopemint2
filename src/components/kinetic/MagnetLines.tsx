import { useEffect, useRef } from "react";

interface Props {
  rows?: number;
  cols?: number;
  className?: string;
}

/** 6x6 grid of small lines that rotate to point toward the cursor. */
export function MagnetLines({ rows = 6, cols = 6, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lines = el.querySelectorAll<HTMLSpanElement>(".ml-line");

    const handler = (e: MouseEvent) => {
      lines.forEach((ln) => {
        const r = ln.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
        ln.style.transform = `rotate(${angle}deg)`;
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: "8px",
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span
          key={i}
          className="ml-line"
          style={{
            display: "block",
            width: "28px",
            height: "2px",
            background: "var(--ink)",
            transition: "transform 0.4s cubic-bezier(.2,.8,.2,1)",
            transformOrigin: "center",
            justifySelf: "center",
            alignSelf: "center",
          }}
        />
      ))}
    </div>
  );
}
