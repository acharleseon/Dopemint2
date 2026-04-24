import { ScrambledText } from "@/components/kinetic/ScrambledText";
import { DotGrid } from "@/components/kinetic/DotGrid";

export function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-16 lg:py-24"
      style={{ background: "var(--primary)", borderTop: "1px solid var(--ink)", borderBottom: "1px solid var(--ink)" }}
    >
      <div className="absolute inset-0 opacity-100"><DotGrid color="13, 13, 13" /></div>
      <div className="container-x relative text-center">
        <div className="reveal flex flex-col items-center">
          <ScrambledText
            as="span"
            text="Build AI systems that"
            style={{ 
              display: "block",
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "16px",
              color: "rgba(13,13,13,0.8)"
            }}
          />
          <ScrambledText
            as="h2"
            className="h-display"
            text={`Persist, Adapt &\nFeel Alive.`}
            style={{ whiteSpace: "pre-line", lineHeight: 0.85 }}
          />
          <div className="mt-10 flex justify-center">
            <a href="#testnet" className="btn btn-primary">
              Start Building
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
