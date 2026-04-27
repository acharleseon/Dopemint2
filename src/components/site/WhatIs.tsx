import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambledText } from "@/components/kinetic/ScrambledText";

gsap.registerPlugin(ScrollTrigger);

const USE_CASES = [
  { title: "Mental Wellbeing", icon: "favorite", desc: "Dopamint delivers an emotional companion that remembers who you are, tracks patterns over time, and shows up consistently." },
  { title: "Creator Economy", icon: "stars", desc: "Dopamint turns audience scale into personalised relationships that sustains every conversation, and keeps monetisation running continuously." },
  { title: "EdTech", icon: "school", desc: "Dopamint gives every learner a persistent AI tutor, one that retains progress, and adapts to gaps." },
  { title: "Service Front", icon: "support_agent", desc: "Dopamint carries full customer history across every session, no repeated context, no cold handoffs, no lost continuity." },
];

const OUTPUT_TYPES = [
  { label: "Text", icon: "text_fields", desc: "Generate text responses" },
  { label: "Image", icon: "image", desc: "Generate images of characters" },
  { label: "Audio", icon: "graphic_eq", desc: "Generate realistic voices" },
  { label: "Video", icon: "videocam", desc: "Generate video scenes" },
];

export function WhatIs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".wid-header", { y: 25, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
      gsap.fromTo(".wid-card", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power3.out",
        scrollTrigger: { trigger: ".wid-grid", start: "top 80%", once: true },
      });
      gsap.fromTo(".wid-output", { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: "power2.out",
        scrollTrigger: { trigger: ".wid-outputs", start: "top 85%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="what" style={{ background: "var(--background)", padding: "96px 0", borderBottom: "1px solid var(--ink)" }}>
      <div className="container-x">
        <div className="wid-header grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start" style={{ opacity: 0, marginBottom: 56 }}>
          <div>
            <span className="section-label mb-6">
              <span className="material-symbols-outlined">help_center</span>
              WHAT IS DOPAMINT
            </span>
            <h2 className="h-section mt-6" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <ScrambledText as="span" text="One API." />
              <ScrambledText as="span" text="Infinite identities." />
            </h2>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
              {["API", "No-code", "Chat Now"].map((b) => (
                <a href="#testnet" key={b} style={{
                  padding: "5px 14px", background: "var(--primary)", border: "1px solid var(--ink)",
                  fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, color: "var(--ink)",
                  textTransform: "uppercase", letterSpacing: "0.08em", textDecoration: "none",
                  transition: "transform 0.15s ease", display: "inline-block"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  {b}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center lg:mt-[72px]" style={{ maxWidth: 640 }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.2rem", color: "var(--ink)", lineHeight: 1.6, fontWeight: 500, marginBottom: 20 }}>
              Smart AI is everywhere. AI that stays is not.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--ink-soft)", lineHeight: 1.75, fontWeight: 300, marginBottom: 20 }}>
              Every team building a companion product is engineering memory, identity, and session continuity from scratch before writing a single line of product logic.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.4rem", color: "var(--ink)", lineHeight: 1.4, fontWeight: 800 }}>
              Dopamint is that layer, already built. Memory, voice, persistent identity wired into your product at runtime. One integration.
            </p>
          </div>
        </div>

        {/* Use Case Cards */}
        <div className="wid-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginBottom: 64 }}>
          {USE_CASES.map((uc, i) => (
            <div key={i} className="wid-card card-yellow-hover" style={{
              opacity: 0, padding: 40, background: "var(--primary)",
              border: "1px solid var(--ink)", display: "flex", flexDirection: "column", gap: 20,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 36, height: 36, flexShrink: 0,
                  background: "var(--ink)", border: "1px solid var(--ink)",
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: "var(--primary)" }}>{uc.icon}</span>
                </div>
                <span style={{
                  fontFamily: "var(--font-heading)", fontSize: "1.1rem",
                  fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em", lineHeight: 1,
                }}>
                  {uc.title}
                </span>
              </div>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: 14,
                color: "var(--ink-soft)", lineHeight: 1.7, margin: 0, fontWeight: 300,
              }}>
                {uc.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Output Types */}
        <div className="wid-outputs" style={{ border: "2px solid var(--ink)", overflow: "hidden" }}>
          <div className="wid-outputs-grid grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "var(--ink)" }}>
            {OUTPUT_TYPES.map((out, i) => (
              <div key={i} className="wid-output card-output-hover" style={{
                opacity: 0, padding: 32,
                display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10, background: "#fff",
              }}>
                <span className="material-symbols-outlined output-icon" style={{ fontSize: 22, color: "var(--ink)" }}>{out.icon}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                  {out.label}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--ink-soft)", fontWeight: 300, lineHeight: 1.5 }}>
                  {out.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
