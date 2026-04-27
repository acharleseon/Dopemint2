import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambledText } from "@/components/kinetic/ScrambledText";
import runtimeDiagram from "@/assets/runtime-diagram.png";

gsap.registerPlugin(ScrollTrigger);

const FLOW = [
  { icon: "mic", label: "LIVE VOICE" },
  { icon: "psychology", label: "INTERPRETATION" },
  { icon: "fingerprint", label: "IDENTITY" },
  { icon: "output", label: "OUTPUT" },
  { icon: "settings_suggest", label: "ADAPTATION" },
];

function FlowArrow() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        height: 36,
        overflow: "visible",
      }}
    >
      {/* Vertical guide line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
          width: 2,
          background: "#0d0d0d",
          opacity: 0.25,
        }}
      />
      {/* Three staggered flowing dots */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rt-flow-dot"
          style={{ animationDelay: `${i * 0.28}s` }}
        />
      ))}
      {/* Arrowhead */}
      <span
        className="material-symbols-outlined"
        style={{
          position: "absolute",
          bottom: 0,
          fontSize: 18,
          color: "#0d0d0d",
          lineHeight: 1,
        }}
      >
        arrow_downward
      </span>
    </div>
  );
}

export function Runtime() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowTlRef = useRef<gsap.core.Timeline | null>(null);
  const glowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── Entrance animations ──
      gsap.fromTo(
        ".pipe-label",
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5,
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      const pillEntrance = gsap.fromTo(
        ".flow-pill",
        { x: -25, opacity: 0 },
        {
          x: 0, opacity: 1, stagger: 0.12, duration: 0.45, ease: "power2.out",
          scrollTrigger: { trigger: ".rt-layout", start: "top 85%", once: true },
        }
      );

      gsap.fromTo(
        ".rt-diagram",
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1, scale: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".rt-layout", start: "top 80%", once: true },
        }
      );

      // ── Sequential glow loop — starts after entrance completes ──
      // Each pill: 0.25s ramp up → 0.5s hold → 0.25s fade → next pill
      const GLOW_RAMP = 0.3;
      const GLOW_HOLD = 0.5;
      const GLOW_FADE = 0.3;
      const GLOW_ON  = "0 0 20px 6px rgba(255,255,255,0.55)";
      const GLOW_OFF = "0 0 0px 0px rgba(255,255,255,0)";

      glowTimerRef.current = setTimeout(() => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.15 });

        pillRefs.current.forEach((el) => {
          if (!el) return;
          tl.to(el, {
            boxShadow: GLOW_ON,
            duration: GLOW_RAMP,
            ease: "power1.out",
          })
            .to(el, {
              boxShadow: GLOW_OFF,
              duration: GLOW_FADE,
              ease: "power1.in",
            }, `+=${GLOW_HOLD}`);
        });

        glowTlRef.current = tl;
      }, 1600); // let entrance animation finish first

    }, sectionRef);

    return () => {
      ctx.revert();
      if (glowTimerRef.current) clearTimeout(glowTimerRef.current);
      glowTlRef.current?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="runtime"
      style={{ background: "var(--primary)", padding: "40px 0", borderBottom: "1px solid var(--ink)" }}
    >
      <div className="container-x">
        {/* Header */}
        <div
          className="pipe-label"
          style={{
            display: "flex", alignItems: "center", gap: 12,
            marginBottom: 20, paddingBottom: 14,
            borderBottom: "2px solid var(--ink)",
            position: "relative", opacity: 0,
          }}
        >
          <span className="section-label" style={{ marginBottom: 0, color: "var(--primary)", background: "var(--ink)", borderColor: "var(--ink)" }}>
            <span className="material-symbols-outlined">account_tree</span>
            RUNTIME ARCHITECTURE
          </span>
          <div style={{ position: "absolute", right: 0, bottom: -2, width: 48, height: 4, background: "var(--ink)" }} />
        </div>

        <h2 className="h-section" style={{ color: "var(--ink)", marginBottom: 28, fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
          <ScrambledText as="span" text="How it works under the hood." />
        </h2>

        {/* Two-column layout */}
        <div
          className="rt-layout"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}
        >
          {/* LEFT — Vertical flow pipeline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {FLOW.map((item, i) => (
              <div key={i}>
                <div
                  className="flow-pill"
                  ref={(el) => { pillRefs.current[i] = el; }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
                    padding: "13px 24px",
                    border: "2px solid #0d0d0d",
                    borderRadius: 6,
                    background: "#ffffff",
                    fontFamily: "var(--font-body)",
                    fontSize: 15, fontWeight: 700,
                    color: "#0d0d0d",
                    letterSpacing: "0.05em",
                    opacity: 0,
                    // CSS transition handles the smooth glow on/off between GSAP steps
                    transition: "box-shadow 0.15s ease, border-color 0.15s ease, background 0.15s ease",
                    willChange: "box-shadow, border-color, background",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{item.icon}</span>
                  {item.label}
                </div>
                {i < FLOW.length - 1 && <FlowArrow />}
              </div>
            ))}
          </div>

          {/* RIGHT — Diagram image */}
          <div
            className="rt-diagram"
            style={{ opacity: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <img
              src={runtimeDiagram}
              alt="AI Runtime Architecture Diagram"
              style={{ width: "100%", maxHeight: "70vh", height: "auto", objectFit: "contain", display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
