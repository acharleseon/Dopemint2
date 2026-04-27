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

          {/* Two tight lines grouped together */}
          <div style={{ marginBottom: "28px" }}>
            <ScrambledText
              as="p"
              text="Hiring a whole team to build companion infra?"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "rgba(13,13,13,0.85)",
                margin: 0,
                lineHeight: 1.25,
              }}
            />
            <ScrambledText
              as="p"
              text="who are you kidding."
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "rgba(13,13,13,0.85)",
                margin: 0,
                lineHeight: 1.25,
              }}
            />
          </div>

          {/* Big punchline heading */}
          <ScrambledText
            as="h2"
            className="h-section"
            text="we're one integration."
            style={{ margin: 0, marginBottom: "36px" }}
          />

          {/* CTA */}
          <a href="#testnet" className="btn btn-primary inline-flex items-center gap-2">
            Get API
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
          </a>

        </div>
      </div>
    </section>
  );
}
