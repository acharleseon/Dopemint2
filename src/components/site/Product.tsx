import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambledText } from "@/components/kinetic/ScrambledText";
import CoverflowGallery from "./CoverflowGallery";
import HoverFlipCard from "./HoverFlipCard";

gsap.registerPlugin(ScrollTrigger);

const DOPETWIN_FEATURES = [
  { title: "Shannon Elizabeth", img: "/dopekin_avatars/ShannonElizabeth.png", hoverImg: "/dopekin_avatars/ShannonElizabeth_Hover.png" },
  { title: "Blac Chyna", img: "/dopekin_avatars/BlacChyna.png", hoverImg: "/dopekin_avatars/BlacChyna_Hover.png" },
  { title: "Bhad Bhabie", img: "/dopekin_avatars/BhadBhabie.png", hoverImg: "/dopekin_avatars/BhadBhabie_Hover.png" },
  { title: "Cardi B", img: "/dopekin_avatars/CardiB.png", hoverImg: "/dopekin_avatars/CardiB_Hover.png" },
  { title: "Iggy Azalea", img: "/dopekin_avatars/IggyAzalea.png", hoverImg: "/dopekin_avatars/IggyAzalea_Hover.png" },
];

function FeatureFace({ src, title }: { src: string; title: string }) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", border: "1px solid var(--ink)" }}>
      <img src={src} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80%", background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 6px", fontFamily: "var(--font-heading)", fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#fff", textAlign: "center", textShadow: "0px 2px 4px rgba(0,0,0,0.8)" }}>
        {title}
      </div>
    </div>
  );
}

export function Product() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".eco-header", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.65,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
      gsap.fromTo(".eco-card", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".eco-outer-box", start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="product" style={{ background: "var(--background)", padding: "96px 0", borderBottom: "1px solid var(--ink)" }}>
      <div className="container-x">
        <div className="eco-header" style={{ opacity: 0 }}>
          <span className="section-label mb-6">
            <span className="material-symbols-outlined">lan</span>
            PRODUCT
          </span>
          <ScrambledText as="h2" className="h-section mt-6" text="Built on Dopamint Infrastructure" />
        </div>

        <div style={{ marginTop: 56 }}>
          {/* Overall product header */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(12px, 2vw, 20px)", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, border: "1px solid var(--primary)", background: "var(--primary)", flexShrink: 0, marginTop: 4 }}>
                <span className="material-symbols-outlined" style={{ color: "var(--ink)", fontSize: 28 }}>smart_toy</span>
              </div>
              <div style={{ flex: "1 1 240px" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 8vw, 3.5rem)", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em", color: "var(--ink)", wordBreak: "break-word" }}>DopeKin</h3>
                <p style={{ color: "var(--ink-soft)", fontFamily: "var(--font-body)", fontSize: "clamp(9px, 2vw, 11px)", textTransform: "uppercase", letterSpacing: "0.13em", fontWeight: 600, marginTop: 6 }}>
                  Emotional and Revenue Layer of AI Companions
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: For Companion Seekers */}
          <div className="eco-outer-box" style={{ marginBottom: 64, background: "#fff", border: "2px solid var(--ink)", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--primary)", pointerEvents: "none" }} />
            <div className="eco-card" style={{ opacity: 0, padding: 40, display: "flex", flexDirection: "column", gap: 24 }}>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "var(--ink)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>
                For Companion Seekers
              </h4>
              <div style={{ overflow: "hidden", height: "clamp(280px, 48vw, 420px)" }}>
                <CoverflowGallery />
              </div>
              <div className="eco-footer-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap", marginTop: 16 }}>
                <p style={{ fontSize: 15, fontFamily: "var(--font-body)", color: "var(--ink-soft)", lineHeight: 1.75, flex: 1, fontWeight: 300, margin: 0, minWidth: 240 }}>
                  Meet AI companions that remember who you are, pick up where you left off, and grow more present with every conversation.
                </p>
                <a href="#testnet" className="btn btn-primary inline-flex items-center gap-2" style={{ flexShrink: 0 }}>
                  Explore <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                </a>
              </div>
            </div>
          </div>

          {/* Section 2: For Creator Revenue */}
          <div className="eco-outer-box" style={{ background: "#fff", border: "2px solid var(--ink)", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--primary)", pointerEvents: "none" }} />
            <div className="eco-card" style={{ opacity: 0, padding: 40, display: "flex", flexDirection: "column", gap: 24 }}>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "var(--ink)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>
                For Creator Revenue
              </h4>
              <div className="creator-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8 }}>
                {DOPETWIN_FEATURES.map((feat) => (
                  <div key={feat.title} style={{ aspectRatio: "3/4", width: "100%", maxWidth: 220, margin: "0 auto" }}>
                    <HoverFlipCard
                      firstContent={<FeatureFace src={feat.img} title={feat.title} />}
                      secondContent={<FeatureFace src={feat.hoverImg} title={feat.title} />}
                    />
                  </div>
                ))}
              </div>
              <div className="eco-footer-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap", marginTop: 16 }}>
                <p style={{ fontSize: 15, fontFamily: "var(--font-body)", color: "var(--ink-soft)", lineHeight: 1.75, flex: 1, fontWeight: 300, margin: 0, minWidth: 240 }}>
                  Turn your AI identity into an on-chain asset. Deploy it anywhere, define how it behaves, and earn from every interaction even when you're not there.
                </p>
                <a href="#testnet" className="btn btn-outline inline-flex items-center gap-2" style={{ flexShrink: 0 }}>
                  Explore <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
