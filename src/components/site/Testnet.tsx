import { useState } from "react";
import { ScrambledText } from "@/components/kinetic/ScrambledText";
import { DotGrid } from "@/components/kinetic/DotGrid";

export function Testnet() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section id="testnet" className="relative overflow-hidden py-16 lg:py-24" style={{ borderBottom: "1px solid var(--ink)", background: "var(--ink)" }}>
      <div className="absolute inset-0 opacity-90"><DotGrid /></div>
      <div className="container-x relative text-center on-dark" style={{ color: "#fff" }}>
        <div className="reveal inline-flex flex-col items-center">
          <span className="section-label mb-4">TESTNET</span>
          <ScrambledText as="h2" className="h-section mt-4" text="Testnet opening soon." style={{ color: "#fff" }} />
          <p className="mt-6 max-w-xl" style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, lineHeight: 1.65 }}>
            Be among the first to build on Dopamint. Early builders get priority access, ecosystem visibility, and $DOPE rewards.
          </p>

          {!done ? (
            <>
              <label
                htmlFor="waitlist-email"
                className="mt-8"
                style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)", fontWeight: 600 }}
              >
                Enter your email to join the waitlist
              </label>
              <form
                onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
                className="mt-3 flex flex-col sm:flex-row items-stretch w-full max-w-xl gap-0"
                style={{ border: "1px solid var(--primary)" }}
              >
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent px-5 py-4 outline-none"
                  style={{ color: "#fff", fontSize: 14, letterSpacing: "0.04em" }}
                />
                <button type="submit" className="btn btn-yellow flex items-center justify-center gap-2" style={{ borderLeft: "1px solid var(--primary)" }}>
                  Join the Waitlist <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                </button>
              </form>
            </>
          ) : (
            <div
              className="mt-8 flex flex-col items-center gap-4"
              style={{ background: "var(--primary)", padding: "32px 48px", border: "1px solid var(--ink)", animation: "fadeUp 0.4s ease both" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 36, color: "var(--ink)" }}>check_circle</span>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.2rem", color: "var(--ink)", letterSpacing: "-0.02em" }}>
                You're on the list!
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(13,13,13,0.7)", lineHeight: 1.5 }}>
                We'll reach out to <strong>{email}</strong> when access opens.
              </p>
            </div>
          )}

          <span className="section-label mt-8">Powered by $DOPE</span>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
