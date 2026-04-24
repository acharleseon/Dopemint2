import { MagnetLines } from "@/components/kinetic/MagnetLines";
import companionAi from "@/assets/companion-ai-1.jpg";
import companionUser from "@/assets/companion-user.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ borderBottom: "1px solid var(--ink)" }}>
      <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-24 pt-2 lg:pt-4 pb-16 lg:pb-24 items-center">
        {/* LEFT */}
        <div className="reveal min-w-0">
          <span className="section-label mb-3">
            POWERED BY $DOPE
          </span>

          <h1 className="mt-0" style={{ color: "var(--ink)", fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1 }}>
            <span style={{ display: "block", fontSize: "clamp(3rem, 5.5vw, 4.5rem)", lineHeight: 1.05 }}>
              Real-time
            </span>
            <span style={{ display: "block", fontSize: "clamp(3rem, 5.5vw, 4.5rem)", lineHeight: 1.05 }}>
              Infra for
            </span>
            <span style={{ display: "inline-block", fontSize: "clamp(3rem, 5.5vw, 4.5rem)", lineHeight: 1.05, background: "var(--primary)", padding: "2px 14px", marginTop: 4, maxWidth: "100%" }}>
              AI Companions.
            </span>
          </h1>

          <p className="mt-8 max-w-xl" style={{ color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.65 }}>
            Dopamint powers emotionally intelligent companion products built for live voice,
            persistent identity, multimodal generation, long-session engagement, and physical
            AI embodiment.
          </p>
          <p className="mt-3 max-w-xl" style={{ color: "var(--ink)", fontSize: 16, lineHeight: 1.65, fontWeight: 700, borderLeft: "3px solid var(--primary)", paddingLeft: 12 }}>
            From personal twins to humanoid agents — this is the layer that makes them feel alive.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#testnet" className="btn btn-primary inline-flex items-center gap-2">Start Building <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span></a>
            <a href="#product" className="btn btn-outline">Build with Core</a>
          </div>
        </div>

        {/* RIGHT — device scene (strictly contained in right column) */}
        <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px] overflow-visible">
          <div className="absolute inset-0 grid-bg" style={{ opacity: 0.55 }} />
          
          {/* Magnet Lines background element */}
          <div className="absolute z-0 hidden md:block" style={{ width: 220, opacity: 0.7, top: "8%", left: "16%" }}>
            <MagnetLines rows={6} cols={5} />
          </div>
          <div className="absolute z-0 block md:hidden" style={{ width: 140, opacity: 0.7, top: "5%", left: "10%" }}>
            <MagnetLines rows={4} cols={4} />
          </div>

          <div className="absolute inset-0" style={{ perspective: 1600, zIndex: 10 }}>
            {/* Laptop / code window — sits behind, slightly left */}
            <div
              className="float-a absolute"
              style={{
                width: "78%",
                maxWidth: 720,
                left: "2%",
                top: "22%",
                zIndex: 1,
                transformStyle: "preserve-3d",
                filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.22))",
              }}
            >
              <div style={{ background: "#1a1a1a", border: "1px solid var(--ink)", padding: 10 }}>
                <div className="flex gap-1.5 pb-2">
                  <span style={{ width: 10, height: 10, borderRadius: 99, background: "#ff5f57" }} />
                  <span style={{ width: 10, height: 10, borderRadius: 99, background: "#febc2e" }} />
                  <span style={{ width: 10, height: 10, borderRadius: 99, background: "#28c840" }} />
                </div>
                <div style={{ background: "#0a0a0a", padding: 22, fontFamily: "monospace", fontSize: 13.5, lineHeight: 1.75, color: "#e8e8e8", minHeight: 280 }}>
                  <div><span style={{ color: "#ffe701" }}>$</span> dopamint connect --identity iris_42</div>
                  <div style={{ color: "#7cf07c" }}>✓ session live · 38ms latency</div>
                  <div style={{ color: "#888" }}>// memory loaded: 247 turns</div>
                  <div><span style={{ color: "#ffe701" }}>rt</span>.on(<span style={{ color: "#7cf07c" }}>"turn"</span>, t {"=>"} {"{"}</div>
                  <div>&nbsp;&nbsp;console.log(t.text)</div>
                  <div>{"}"})</div>
                  <div className="caret" />
                </div>
              </div>
              <div style={{ height: 10, background: "#2a2a2a", margin: "0 -24px" }} />
            </div>

            {/* Phone — front, overlapping bottom-right of laptop */}
            <div
              className="float-b absolute"
              style={{
                width: 280,
                right: "2%",
                top: "6%",
                zIndex: 2,
                transformStyle: "preserve-3d",
                filter: "drop-shadow(0 28px 40px rgba(0,0,0,0.28))",
              }}
            >
              <div style={{ background: "#1a1a1a", border: "1px solid var(--ink)", borderRadius: 28, padding: 8 }}>
                <div style={{ background: "#0a0a0a", borderRadius: 22, padding: 10, minHeight: 380, color: "#fff", fontSize: 11, position: "relative", overflow: "hidden" }}>
                  {/* Main AI video tile */}
                  <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", height: 290 }}>
                    <img
                      src={companionAi}
                      alt="AI companion on a live video call"
                      width={400}
                      height={400}
                      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.02) saturate(0.95)" }}
                    />
                    {/* Soft grain overlay */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.55) 100%)" }} />

                    {/* Top bar — name + live */}
                    <div style={{ position: "absolute", top: 10, left: 10, right: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(10,10,10,0.55)", backdropFilter: "blur(6px)", padding: "4px 8px", borderRadius: 99 }}>
                        <span style={{ width: 6, height: 6, borderRadius: 99, background: "#ffe701", boxShadow: "0 0 8px #ffe701" }} />
                        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em" }}>IRIS · LIVE</span>
                      </div>
                      <div style={{ background: "rgba(10,10,10,0.55)", padding: "4px 8px", borderRadius: 99, fontSize: 9, color: "#ccc" }}>
                        02:14
                      </div>
                    </div>

                    {/* Self-view PIP */}
                    <div style={{ position: "absolute", bottom: 10, right: 10, width: 60, height: 78, borderRadius: 10, overflow: "hidden", border: "1.5px solid rgba(255,231,1,0.6)" }}>
                      <img
                        src={companionUser}
                        alt="User self view"
                        width={120}
                        height={156}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>

                    {/* Live caption */}
                    <div style={{ position: "absolute", bottom: 12, left: 12, right: 80, fontSize: 10, lineHeight: 1.35, color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}>
                      "I remember the interview — how did it actually go?"
                    </div>
                  </div>

                  {/* Call controls */}
                  <div className="mt-3 flex items-center justify-center gap-2.5">
                    {[
                      { i: "mic", on: true },
                      { i: "videocam", on: true },
                      { i: "graphic_eq", on: false },
                      { i: "call_end", on: false, danger: true },
                    ].map((c, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: 30, height: 30, borderRadius: 99,
                          background: c.danger ? "#e5484d" : c.on ? "#ffe701" : "#1a1a1a",
                          color: c.danger ? "#fff" : c.on ? "#0d0d0d" : "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          border: "1px solid #2a2a2a",
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{c.i}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee">
        <div className="marquee-track" style={{ fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", fontSize: 13 }}>
          {Array.from({ length: 8 }).map((_, k) => (
            <div key={k} className="flex gap-12 pr-12">
              {["Low Latency", "On-Chain Memory", "Voice Native", "Production Ready", "Always On"].map((t) => (
                <span key={t} className="flex items-center gap-3">◆ {t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
