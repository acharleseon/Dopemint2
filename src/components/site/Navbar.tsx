import { useEffect, useState } from "react";
import logo from "@/assets/dopamint-logo.png";

const links = [
  { label: "Protocol", href: "#what" },
  { label: "Voice", href: "#product" },
  { label: "Runtime", href: "#runtime" },
  { label: "Developers", href: "#developers" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    const ids = links.map((l) => l.href.substring(1));
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="sticky top-0 z-50 bg-background"
      style={{ borderBottom: "1px solid var(--ink)", height: 68 }}
    >
      <div className="container-x h-full flex items-center justify-between" style={{ paddingLeft: 28, paddingRight: 28 }}>
        <a href="#" className="flex items-center gap-2" aria-label="Dopamint home">
          <img
            src={logo}
            alt="Dopamint"
            style={{ height: 62, width: "auto", display: "block" }}
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const isActive = activeId === l.href.substring(1);
            return (
              <a
                key={l.label}
                href={l.href}
                className="ulink"
                style={{ 
                  fontSize: 13, 
                  fontWeight: isActive ? 700 : 500, 
                  letterSpacing: "0.04em",
                  color: "var(--ink)",
                  textDecoration: isActive ? "underline" : "none",
                  textDecorationThickness: isActive ? "2px" : "auto",
                  textUnderlineOffset: "6px",
                  transition: "all 0.2s ease"
                }}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <a href="#testnet" className="btn btn-yellow">Get Started</a>
        </div>

        <button
          className="md:hidden p-2"
          aria-label="Menu"
          onClick={() => setOpen(true)}
          style={{ border: "1px solid var(--ink)" }}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-60 bg-background flex flex-col"
        style={{
          clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          transition: "clip-path 0.5s cubic-bezier(.7,0,.2,1)",
        }}
      >
        <div className="container-x flex items-center justify-between" style={{ height: 64, borderBottom: "1px solid var(--ink)" }}>
          <a href="#" className="flex items-center gap-2">
            <img src={logo} alt="Dopamint" style={{ height: 54, width: "auto", display: "block" }} />
          </a>
          <button onClick={() => setOpen(false)} aria-label="Close" style={{ border: "1px solid var(--ink)" }} className="p-2">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="container-x flex flex-col gap-6 pt-12 flex-1">
          {links.map((l) => {
            const isActive = activeId === l.href.substring(1);
            return (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="h-display"
                style={{ 
                  fontSize: "clamp(2.5rem, 10vw, 5rem)",
                  color: "var(--ink)",
                  textDecoration: isActive ? "underline" : "none",
                  textDecorationThickness: isActive ? "4px" : "auto",
                  textUnderlineOffset: "8px",
                }}
              >
                {l.label}
              </a>
            );
          })}
          <a href="#testnet" onClick={() => setOpen(false)} className="btn btn-primary mt-4 self-start">
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
}
