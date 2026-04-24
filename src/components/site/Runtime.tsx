import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambledText } from "@/components/kinetic/ScrambledText";

gsap.registerPlugin(ScrollTrigger);

const FLOW = [
  { icon: "mic", label: "LIVE VOICE" },
  { icon: "psychology", label: "INTERPRETATION" },
  { icon: "fingerprint", label: "IDENTITY" },
  { icon: "output", label: "OUTPUT" },
  { icon: "settings_suggest", label: "ADAPTATION" },
];

const STAGES = [
  { id: "01", icon: "record_voice_over", title: "Turn detection", desc: "Reads the rhythm of conversation. Knows when to speak, when to wait." },
  { id: "02", icon: "security", title: "Safety layer", desc: "Aligns behavior in real time without interrupting the experience." },
  { id: "03", icon: "database", title: "Memory retrieval", desc: "Surfaces what matters from past sessions, instantly, in context." },
  { id: "04", icon: "badge", title: "Identity layer", desc: "Holds the companion's personality stable across every session." },
  { id: "05", icon: "stream", title: "Voice & avatar stream", desc: "Syncs audio, expression, and motion into one seamless output." },
];

export function Runtime() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".pipe-label", { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
      gsap.fromTo(".flow-pill", { x: -25, opacity: 0 }, {
        x: 0, opacity: 1, stagger: 0.1, duration: 0.45, ease: "power2.out",
        scrollTrigger: { trigger: ".flow-container", start: "top 85%", once: true },
      });
      gsap.fromTo(".stage-cell", { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.08, duration: 0.45, ease: "power3.out",
        scrollTrigger: { trigger: ".stages-grid", start: "top 85%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="runtime" style={{ background: "var(--primary)", padding: "96px 0", borderBottom: "1px solid var(--ink)" }}>
      <div className="container-x">
        {/* Header label */}
        <div className="pipe-label" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40, paddingBottom: 20, borderBottom: "2px solid var(--ink)", position: "relative", opacity: 0 }}>
          <span className="section-label" style={{ marginBottom: 0, color: "var(--primary)", background: "var(--ink)", borderColor: "var(--ink)" }}>
            <span className="material-symbols-outlined">account_tree</span>
            RUNTIME ARCHITECTURE
          </span>
          <div style={{ position: "absolute", right: 0, bottom: -2, width: 48, height: 4, background: "var(--ink)" }} />
        </div>

        <h2 className="h-section" style={{ color: "var(--ink)", marginBottom: 56 }}>
          <ScrambledText as="span" text="How it works under the hood." />
        </h2>

        <div
          className="flow-container"
          style={{
            display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24,
            justifyContent: "center", padding: 40, background: "#fff",
            border: "2px solid var(--ink)", marginBottom: 40, position: "relative", overflow: "hidden",
          }}
        >
          {FLOW.map((item, i) => (
            <div key={i} className="flow-item" style={{ display: "flex", alignItems: "center", gap: 24, position: "relative", zIndex: 1 }}>
              <span
                className="flow-pill"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "12px 24px", border: "1px solid var(--ink)",
                  background: "var(--primary)", fontFamily: "var(--font-body)",
                  fontSize: 16, fontWeight: 600, color: "var(--ink)", opacity: 0,
                  transition: "all 0.2s ease",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: "var(--ink)" }}>{item.icon}</span>
                {item.label}
              </span>
              {i < FLOW.length - 1 && (
                <span className="flow-arrow material-symbols-outlined" style={{ fontSize: 24, color: "var(--ink)" }}>arrow_forward</span>
              )}
            </div>
          ))}
        </div>

        {/* Stages Grid */}
        <div
          className="stages-grid grid grid-cols-2 lg:grid-cols-5 gap-px"
          style={{
            border: "2px solid var(--ink)", overflow: "hidden", background: "var(--ink)",
          }}
        >
          {STAGES.map((stage, i) => {
            const isHovered = hoveredId === stage.id;
            const isLast = i === STAGES.length - 1;
            return (
              <div
                key={stage.id}
                className={`stage-cell flex flex-col ${isLast ? 'col-span-2 lg:col-span-1 items-center text-center lg:items-start lg:text-left' : 'items-start text-left'}`}
                onMouseEnter={() => setHoveredId(stage.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setHoveredId(hoveredId === stage.id ? null : stage.id)}
                style={{
                  padding: 32,
                  background: isHovered ? "var(--ink)" : "#fff",
                  cursor: "pointer", transition: "background 0.2s ease", opacity: 0,
                }}
              >
                <div style={{
                  display: "flex", justifyContent: isLast ? "center" : "space-between", gap: isLast ? 16 : 0, alignItems: "center", width: "100%",
                  fontFamily: "var(--font-body)", fontSize: 11,
                  color: isHovered ? "var(--primary)" : "rgba(13,13,13,0.5)",
                  marginBottom: 20, transition: "color 0.2s ease", fontWeight: 600, letterSpacing: "0.05em",
                }}>
                  {stage.id}
                  <span className="material-symbols-outlined" style={{ fontSize: 15, opacity: isHovered ? 1 : 0.4, transition: "opacity 0.2s ease" }}>
                    {stage.icon}
                  </span>
                </div>
                <h4 style={{
                  fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 800,
                  color: isHovered ? "var(--primary)" : "var(--ink)",
                  transition: "color 0.2s ease", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 12,
                }}>
                  {stage.title}
                </h4>
                <p style={{
                  fontFamily: "var(--font-body)", fontSize: 13,
                  color: isHovered ? "rgba(255,231,1,0.8)" : "var(--ink-soft)",
                  lineHeight: 1.5, margin: 0, fontWeight: 300, transition: "color 0.2s ease",
                }}>
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
