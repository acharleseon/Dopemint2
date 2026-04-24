import { ScrambledText } from "@/components/kinetic/ScrambledText";

const items = [
  { t: "Consumer App Founders", d: "Focus on the experience. Skip rebuilding the core.", icon: "rocket_launch" },
  { t: "Media & IP Owners", d: "Turn characters into interactive entities with memory and voice.", icon: "movie" },
  { t: "Creators & Influencers", d: "Deploy a version of yourself that scales — and earns.", icon: "person_celebrate" },
  { t: "AI Researchers", d: "Work with long-session memory and real interaction data.", icon: "science" },
];

export function Ecosystem() {
  return (
    <section id="ecosystem" className="py-24 lg:py-32" style={{ borderBottom: "1px solid var(--ink)" }}>
      <div className="container-x">
        <div className="reveal max-w-3xl">
          <span className="section-label mb-6">
            <span className="material-symbols-outlined">hub</span>
            ECOSYSTEM
          </span>
          <ScrambledText as="h2" className="h-section mt-6" text="Who's already building on it." />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {items.map((it) => (
            <div
              key={it.t}
              className="reveal card-brutal flex flex-col card-yellow-hover"
              style={{ padding: "32px 28px", cursor: "default" }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 28, color: "var(--ink)", marginBottom: 16 }}
              >
                {it.icon}
              </span>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                {it.t}
              </h3>
              <p className="mt-3 flex-1" style={{ color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.55 }}>
                {it.d}
              </p>
            </div>
          ))}
        </div>

        <div className="reveal mt-12 flex">
          <a href="#testnet" className="btn btn-primary">
            Apply to Build
            <span className="material-symbols-outlined" style={{ fontSize: 16, marginLeft: 6 }}>arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
