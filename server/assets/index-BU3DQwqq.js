import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState, useCallback, createElement } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
function useScramble(text) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = "!<>-_\\/[]{}—=+*^?#__ABCDEF0123456789";
    let raf = 0;
    let started = false;
    const run = () => {
      const final = text;
      const length = final.length;
      const queue = [];
      for (let i = 0; i < length; i++) {
        const from = chars[Math.floor(Math.random() * chars.length)];
        const to = final[i];
        const start = Math.floor(Math.random() * 20);
        const end = start + Math.floor(Math.random() * 30) + 10;
        queue.push({ from, to, start, end });
      }
      let frame = 0;
      const update = () => {
        let output = "";
        let complete = 0;
        for (let i = 0; i < queue.length; i++) {
          const q = queue[i];
          if (frame >= q.end) {
            complete++;
            output += q.to;
          } else if (frame >= q.start) {
            if (!q.char || Math.random() < 0.28) {
              q.char = chars[Math.floor(Math.random() * chars.length)];
            }
            output += `<span style="opacity:.7">${q.char}</span>`;
          } else {
            output += q.from;
          }
        }
        el.innerHTML = output;
        if (complete !== queue.length) {
          frame++;
          raf = requestAnimationFrame(update);
        }
      };
      update();
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      if (el) el.innerText = text;
    };
  }, [text]);
  return ref;
}
const logo = "/assets/dopamint-logo-Bb6EnQkt.png";
const links = [
  { label: "Product", href: "#product" },
  { label: "Developers", href: "#developers" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Pricing", href: "#pricing" }
];
function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
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
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: "sticky top-0 z-50 bg-background",
      style: { borderBottom: "1px solid var(--ink)", height: 68 },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "container-x h-full flex items-center justify-between", style: { paddingLeft: 28, paddingRight: 28 }, children: [
          /* @__PURE__ */ jsx("a", { href: "#", className: "flex items-center gap-2", "aria-label": "Dopamint home", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: logo,
              alt: "Dopamint",
              style: { height: 44, width: "auto", display: "block" }
            }
          ) }),
          /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center gap-8", children: links.map((l) => {
            const isActive = activeId === l.href.substring(1);
            return /* @__PURE__ */ jsx(
              "a",
              {
                href: l.href,
                className: "ulink",
                style: {
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: "0.04em",
                  color: "var(--ink)",
                  textDecoration: isActive ? "underline" : "none",
                  textDecorationThickness: isActive ? "2px" : "auto",
                  textUnderlineOffset: "6px",
                  transition: "all 0.2s ease"
                },
                children: l.label
              },
              l.label
            );
          }) }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx("a", { href: "#testnet", className: "btn btn-yellow", children: "Get Started" }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "md:hidden p-2",
              "aria-label": "Menu",
              onClick: () => setOpen(true),
              style: { border: "1px solid var(--ink)" },
              children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", children: "menu" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "fixed inset-0 z-60 bg-background flex flex-col",
            style: {
              clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
              transition: "clip-path 0.5s cubic-bezier(.7,0,.2,1)"
            },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "w-full container-x flex items-center justify-between", style: { height: 64, borderBottom: "1px solid var(--ink)" }, children: [
                /* @__PURE__ */ jsx("a", { href: "#", className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("img", { src: logo, alt: "Dopamint", style: { height: 40, width: "auto", display: "block" } }) }),
                /* @__PURE__ */ jsx("button", { onClick: () => setOpen(false), "aria-label": "Close", style: { border: "1px solid var(--ink)" }, className: "p-2", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", children: "close" }) })
              ] }),
              /* @__PURE__ */ jsxs("nav", { className: "w-full container-x flex flex-col items-center gap-6 pt-12 flex-1", children: [
                links.map((l) => {
                  const isActive = activeId === l.href.substring(1);
                  return /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: l.href,
                      onClick: () => setOpen(false),
                      className: "ulink text-center",
                      style: {
                        fontFamily: "var(--font-body)",
                        fontWeight: 700,
                        fontSize: 13,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--ink)",
                        textDecoration: isActive ? "underline" : "none",
                        textDecorationThickness: isActive ? "2px" : "auto",
                        textUnderlineOffset: "6px",
                        display: "inline-flex",
                        justifyContent: "center"
                      },
                      children: l.label
                    },
                    l.label
                  );
                }),
                /* @__PURE__ */ jsx("a", { href: "#testnet", onClick: () => setOpen(false), className: "btn btn-primary mt-4", children: "Get API" })
              ] })
            ]
          }
        )
      ]
    }
  );
}
const heroBanner = "/assets/hero-2-2bd177bC.png";
const Cubes = ({
  gridSize = 10,
  gridCols,
  gridRows,
  cubeSize,
  maxAngle = 45,
  radius = 3,
  easing = "power3.out",
  duration = { enter: 0.3, leave: 0.6 },
  cellGap,
  borderStyle = "1px solid #fff",
  faceColor = "#120F17",
  shadow = false,
  autoAnimate = true,
  rippleOnClick = true,
  rippleColor = "#fff",
  rippleSpeed = 2
}) => {
  const sceneRef = useRef(null);
  const rafRef = useRef(null);
  const idleTimerRef = useRef(null);
  const userActiveRef = useRef(false);
  const simPosRef = useRef({ x: 0, y: 0 });
  const simTargetRef = useRef({ x: 0, y: 0 });
  const simRAFRef = useRef(null);
  const cols = gridCols ?? gridSize;
  const rows = gridRows ?? gridSize;
  const colGap = typeof cellGap === "number" ? `${cellGap}px` : cellGap?.col !== void 0 ? `${cellGap.col}px` : "1.5%";
  const rowGap = typeof cellGap === "number" ? `${cellGap}px` : cellGap?.row !== void 0 ? `${cellGap.row}px` : "1.5%";
  const enterDur = duration.enter;
  const leaveDur = duration.leave;
  const tiltAt = useCallback(
    (rowCenter, colCenter) => {
      if (!sceneRef.current) return;
      sceneRef.current.querySelectorAll(".cube").forEach((cube) => {
        const el = cube;
        const r = +(el.dataset.row || 0);
        const c = +(el.dataset.col || 0);
        const dist = Math.hypot(r - rowCenter, c - colCenter);
        if (dist <= radius) {
          const pct = 1 - dist / radius;
          const angle = pct * maxAngle;
          gsap.to(cube, {
            duration: enterDur,
            ease: easing,
            overwrite: true,
            rotateX: -angle,
            rotateY: angle
          });
        } else {
          gsap.to(cube, {
            duration: leaveDur,
            ease: "power3.out",
            overwrite: true,
            rotateX: 0,
            rotateY: 0
          });
        }
      });
    },
    [radius, maxAngle, enterDur, leaveDur, easing]
  );
  const onPointerMove = useCallback(
    (e) => {
      userActiveRef.current = true;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (!sceneRef.current) return;
      const rect = sceneRef.current.getBoundingClientRect();
      const cellW = rect.width / cols;
      const cellH = rect.height / rows;
      const colCenter = (e.clientX - rect.left) / cellW;
      const rowCenter = (e.clientY - rect.top) / cellH;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));
      idleTimerRef.current = setTimeout(() => {
        userActiveRef.current = false;
      }, 3e3);
    },
    [gridSize, tiltAt]
  );
  const resetAll = useCallback(() => {
    if (!sceneRef.current) return;
    sceneRef.current.querySelectorAll(".cube").forEach(
      (cube) => gsap.to(cube, {
        duration: leaveDur,
        rotateX: 0,
        rotateY: 0,
        ease: "power3.out"
      })
    );
  }, [leaveDur]);
  const onTouchMove = useCallback(
    (e) => {
      userActiveRef.current = true;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (!sceneRef.current) return;
      const rect = sceneRef.current.getBoundingClientRect();
      const cellW = rect.width / cols;
      const cellH = rect.height / rows;
      const touch = e.touches[0];
      const colCenter = (touch.clientX - rect.left) / cellW;
      const rowCenter = (touch.clientY - rect.top) / cellH;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));
      idleTimerRef.current = setTimeout(() => {
        userActiveRef.current = false;
      }, 3e3);
    },
    [cols, rows, tiltAt]
  );
  const onTouchStart = useCallback(() => {
    userActiveRef.current = true;
  }, []);
  const onTouchEnd = useCallback(() => {
    if (!sceneRef.current) return;
    resetAll();
  }, [resetAll]);
  const onClick = useCallback(
    (e) => {
      if (!rippleOnClick || !sceneRef.current) return;
      const rect = sceneRef.current.getBoundingClientRect();
      const cellW = rect.width / cols;
      const cellH = rect.height / rows;
      let clientX = 0, clientY = 0;
      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      const colHit = Math.floor((clientX - rect.left) / cellW);
      const rowHit = Math.floor((clientY - rect.top) / cellH);
      const baseRingDelay = 0.15;
      const baseAnimDur = 0.3;
      const baseHold = 0.6;
      const spreadDelay = baseRingDelay / rippleSpeed;
      const animDuration = baseAnimDur / rippleSpeed;
      const holdTime = baseHold / rippleSpeed;
      const rings = {};
      sceneRef.current.querySelectorAll(".cube").forEach((cube) => {
        const el = cube;
        const r = +(el.dataset.row || 0);
        const c = +(el.dataset.col || 0);
        const dist = Math.hypot(r - rowHit, c - colHit);
        const ring = Math.round(dist);
        if (!rings[ring]) rings[ring] = [];
        rings[ring].push(el);
      });
      Object.keys(rings).map(Number).sort((a, b) => a - b).forEach((ring) => {
        const delay = ring * spreadDelay;
        const faces = rings[ring].flatMap((cube) => Array.from(cube.querySelectorAll(".cube-face")));
        gsap.to(faces, {
          backgroundColor: rippleColor,
          duration: animDuration,
          delay,
          ease: "power3.out"
        });
        gsap.to(faces, {
          backgroundColor: faceColor,
          duration: animDuration,
          delay: delay + animDuration + holdTime,
          ease: "power3.out"
        });
      });
    },
    [rippleOnClick, cols, rows, faceColor, rippleColor, rippleSpeed]
  );
  useEffect(() => {
    if (!autoAnimate || !sceneRef.current) return;
    simPosRef.current = {
      x: Math.random() * cols,
      y: Math.random() * rows
    };
    simTargetRef.current = {
      x: Math.random() * cols,
      y: Math.random() * rows
    };
    const speed = 0.06;
    const loop = () => {
      if (!userActiveRef.current) {
        const pos = simPosRef.current;
        const tgt = simTargetRef.current;
        pos.x += (tgt.x - pos.x) * speed;
        pos.y += (tgt.y - pos.y) * speed;
        tiltAt(pos.y, pos.x);
        if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.1) {
          simTargetRef.current = {
            x: Math.random() * cols,
            y: Math.random() * rows
          };
        }
      }
      simRAFRef.current = requestAnimationFrame(loop);
    };
    simRAFRef.current = requestAnimationFrame(loop);
    return () => {
      if (simRAFRef.current != null) {
        cancelAnimationFrame(simRAFRef.current);
      }
    };
  }, [autoAnimate, cols, rows, tiltAt]);
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", resetAll);
    el.addEventListener("click", onClick);
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", resetAll);
      el.removeEventListener("click", onClick);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [onPointerMove, resetAll, onClick, onTouchMove, onTouchStart, onTouchEnd]);
  const colsArr = Array.from({ length: cols });
  const rowsArr = Array.from({ length: rows });
  const sceneStyle = {
    gridTemplateColumns: cubeSize ? `repeat(${cols}, ${cubeSize}px)` : `repeat(${cols}, 1fr)`,
    gridTemplateRows: cubeSize ? `repeat(${rows}, ${cubeSize}px)` : `repeat(${rows}, 1fr)`,
    columnGap: colGap,
    rowGap
  };
  const wrapperStyle = {
    "--cube-face-border": borderStyle,
    "--cube-face-bg": faceColor,
    "--cube-face-shadow": shadow === true ? "0 0 6px rgba(0,0,0,.5)" : shadow || "none",
    aspectRatio: `${cols} / ${rows}`,
    ...cubeSize ? {
      width: `${cols * cubeSize}px`,
      height: `${rows * cubeSize}px`
    } : {}
  };
  return /* @__PURE__ */ jsx("div", { className: "default-animation", style: wrapperStyle, children: /* @__PURE__ */ jsx("div", { ref: sceneRef, className: "default-animation--scene", style: sceneStyle, children: rowsArr.map(
    (_, r) => colsArr.map((__, c) => /* @__PURE__ */ jsxs("div", { className: "cube", "data-row": r, "data-col": c, children: [
      /* @__PURE__ */ jsx("div", { className: "cube-face cube-face--top" }),
      /* @__PURE__ */ jsx("div", { className: "cube-face cube-face--bottom" }),
      /* @__PURE__ */ jsx("div", { className: "cube-face cube-face--left" }),
      /* @__PURE__ */ jsx("div", { className: "cube-face cube-face--right" }),
      /* @__PURE__ */ jsx("div", { className: "cube-face cube-face--front" }),
      /* @__PURE__ */ jsx("div", { className: "cube-face cube-face--back" })
    ] }, `${r}-${c}`))
  ) }) });
};
function Hero() {
  const refLine1 = useScramble("Real-time");
  const refLine2 = useScramble("Infra for");
  const refLine3 = useScramble("AI Companions.");
  return /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden", style: { borderBottom: "1px solid var(--ink)" }, children: [
    /* @__PURE__ */ jsxs("div", { className: "container-x grid lg:grid-cols-2 gap-12 lg:gap-24 pt-10 lg:pt-4 pb-16 lg:pb-24 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "reveal min-w-0", children: [
        /* @__PURE__ */ jsx("span", { className: "section-label", style: { marginBottom: 8, display: "inline-flex" }, children: "POWERED BY $DOPE" }),
        /* @__PURE__ */ jsxs(
          "h1",
          {
            className: "mt-2 lg:mt-0",
            style: {
              color: "var(--ink)",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)"
            },
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  ref: refLine1,
                  style: { display: "block", lineHeight: 1.1 },
                  children: "Real-time"
                }
              ),
              /* @__PURE__ */ jsx(
                "span",
                {
                  ref: refLine2,
                  style: { display: "block", lineHeight: 1.1 },
                  children: "Infra for"
                }
              ),
              /* @__PURE__ */ jsx("span", { style: { display: "block", lineHeight: 1.1, marginTop: 6 }, children: /* @__PURE__ */ jsx(
                "span",
                {
                  ref: refLine3,
                  style: { display: "inline", background: "var(--primary)", padding: "2px 10px", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" },
                  children: "AI Companions."
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "max-w-xl", style: { color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.65, marginTop: 28 }, children: "Dopamint powers emotionally intelligent companion products built for live voice, persistent identity, multimodal generation, long-session engagement, and physical AI embodiment." }),
        /* @__PURE__ */ jsx("p", { className: "max-w-xl", style: { color: "var(--ink)", fontSize: 16, lineHeight: 1.65, fontWeight: 700, borderLeft: "3px solid var(--primary)", paddingLeft: 12, marginTop: 20 }, children: "From personal twins to humanoid agents — this is the layer that makes them feel alive." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap gap-4", children: [
          /* @__PURE__ */ jsxs("a", { href: "#testnet", className: "btn btn-primary inline-flex items-center gap-2", children: [
            "Get API ",
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, children: "arrow_forward" })
          ] }),
          /* @__PURE__ */ jsx("a", { href: "#product", className: "btn btn-outline", children: "Join Testnet" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "reveal relative w-full flex items-center justify-center pt-8 sm:px-4 lg:px-0 lg:pt-0 min-h-[400px] lg:min-h-[600px]",
          children: /* @__PURE__ */ jsxs("div", { className: "relative w-[110%] max-w-[110%] lg:-translate-x-[8%] lg:scale-105", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-[8%] left-[18%] w-[64%] aspect-13/3 pointer-events-auto z-0 overflow-visible", children: /* @__PURE__ */ jsx(
              Cubes,
              {
                gridCols: 13,
                gridRows: 3,
                maxAngle: 60,
                radius: 4,
                borderStyle: "2px solid var(--ink)",
                faceColor: "var(--primary)",
                rippleColor: "#fff",
                rippleSpeed: 1.5,
                autoAnimate: true,
                rippleOnClick: true
              }
            ) }),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: heroBanner,
                alt: "Dopamint AI companion hero",
                className: "relative z-10 w-full h-auto pointer-events-none",
                style: {
                  objectFit: "contain",
                  objectPosition: "center",
                  display: "block"
                }
              }
            )
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "marquee flex overflow-hidden border-y border-y-ink bg-ink text-primary py-3.5", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "flex w-max",
        style: { fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", fontSize: 13 },
        animate: { x: ["0%", "-50%"] },
        transition: { repeat: Infinity, ease: "linear", duration: 42 },
        children: Array.from({ length: 8 }).map((_, k) => /* @__PURE__ */ jsx("div", { className: "flex shrink-0 gap-12 pr-12", children: ["Low Latency", "On-Chain Memory", "Voice Native", "Production Ready", "Always On", "Persistent Memory", "Stable Identity", "Unified Output"].map((t) => /* @__PURE__ */ jsxs("span", { className: "flex shrink-0 items-center gap-3 whitespace-nowrap", children: [
          "◆ ",
          t
        ] }, t)) }, k))
      }
    ) })
  ] });
}
function ScrambledText({ text, className, as = "h2", style }) {
  const ref = useScramble(text);
  return createElement(as, { ref, className, style }, text);
}
const mentalImg = "/assets/mental-Ba_1ITWR.png";
const creatorImg = "/assets/creator-DD-i4DP6.png";
const edtechImg = "/assets/edtech-BM0-ZF2u.png";
const serviceImg = "/assets/service-CXWVPiyu.png";
const useCases = [
  {
    title: "Mental Wellbeing",
    desc: "Dopamint delivers an emotional companion that remembers who you are, tracks patterns over time, and shows up consistently.",
    icon: "favorite",
    src: mentalImg
  },
  {
    title: "Creator Economy",
    desc: "Dopamint turns audience scale into personalised relationships that sustains every conversation, and keeps monetisation running continuously.",
    icon: "stars",
    src: creatorImg
  },
  {
    title: "EdTech",
    desc: "Dopamint gives every learner a persistent AI tutor, one that retains progress, and adapts to gaps.",
    icon: "school",
    src: edtechImg
  },
  {
    title: "Service Front",
    desc: "Dopamint carries full customer history across every session, no repeated context, no cold handoffs, no lost continuity.",
    icon: "support_agent",
    src: serviceImg
  },
  {
    title: "and so many more...",
    isOutro: true
  }
];
const StickyCard = ({
  i,
  title,
  desc,
  icon,
  src,
  isOutro,
  progress,
  range,
  targetScale
}) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: container,
      className: "sticky top-0 flex items-center justify-center w-full h-screen",
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          style: {
            scale,
            top: `calc(${i * 30}px)`,
            backgroundColor: "var(--primary)",
            border: "2px solid var(--ink)",
            boxShadow: "8px 8px 0px 0px var(--ink)"
          },
          className: "relative flex flex-col md:flex-row w-full max-w-[90%] md:max-w-5xl h-auto md:h-[480px] origin-top overflow-hidden",
          children: isOutro ? /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center p-8 md:p-14 bg-primary text-ink", children: /* @__PURE__ */ jsx("h3", { style: { fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em", lineHeight: 1, textAlign: "center" }, children: title }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "w-full md:w-[45%] h-64 md:h-full border-b-2 md:border-b-0 md:border-r-2 border-ink bg-white overflow-hidden", children: /* @__PURE__ */ jsx("img", { src, alt: title, className: "w-full h-full object-cover" }) }),
            /* @__PURE__ */ jsxs("div", { className: "w-full md:w-[55%] flex flex-col justify-center p-8 md:p-14 bg-primary text-ink", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-12 h-12 shrink-0 border border-ink bg-ink text-primary", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", style: { fontSize: 24 }, children: icon }) }),
                /* @__PURE__ */ jsx("h3", { style: { fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.02em", lineHeight: 1 }, children: title })
              ] }),
              /* @__PURE__ */ jsx("p", { style: { fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 1.5vw, 1.25rem)", color: "var(--ink-soft)", lineHeight: 1.6, fontWeight: 500, margin: 0 }, children: desc })
            ] })
          ] })
        }
      )
    }
  );
};
const UseCaseStack = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });
  return /* @__PURE__ */ jsx(ReactLenis, { root: true, children: /* @__PURE__ */ jsx(
    "div",
    {
      ref: container,
      className: "relative flex w-full flex-col items-center justify-center pt-[5vh] pb-[50vh]",
      children: useCases.map((useCase, i) => {
        const targetScale = Math.max(
          0.85,
          1 - (useCases.length - i - 1) * 0.05
        );
        return /* @__PURE__ */ jsx(
          StickyCard,
          {
            i,
            ...useCase,
            progress: scrollYProgress,
            range: [i * 0.25, 1],
            targetScale
          },
          `uc_${i}`
        );
      })
    }
  ) });
};
gsap.registerPlugin(ScrollTrigger);
function WhatIs() {
  const sectionRef = useRef(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".wid-header", { y: 25, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true }
      });
      gsap.fromTo(".wid-card", { y: 30, opacity: 0 }, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: { trigger: ".wid-grid", start: "top 80%", once: true }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsx("section", { ref: sectionRef, id: "what", style: { background: "var(--background)", padding: "96px 0", borderBottom: "1px solid var(--ink)" }, children: /* @__PURE__ */ jsxs("div", { className: "container-x", children: [
    /* @__PURE__ */ jsxs("div", { className: "wid-header grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start", style: { opacity: 0, marginBottom: 56 }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("span", { className: "section-label mb-6", children: [
          /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", children: "help_center" }),
          "WHAT IS DOPAMINT"
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "h-section mt-6", style: { display: "flex", flexDirection: "column", gap: 0 }, children: [
          /* @__PURE__ */ jsx(ScrambledText, { as: "span", text: "One API." }),
          /* @__PURE__ */ jsx(ScrambledText, { as: "span", text: "Infinite identities." })
        ] }),
        /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }, children: ["API", "No-code", "Chat Now"].map((b) => /* @__PURE__ */ jsx(
          "a",
          {
            href: "#testnet",
            style: {
              padding: "5px 14px",
              background: "var(--primary)",
              border: "1px solid var(--ink)",
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 700,
              color: "var(--ink)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              textDecoration: "none",
              transition: "transform 0.15s ease",
              display: "inline-block"
            },
            onMouseEnter: (e) => e.currentTarget.style.transform = "translateY(-2px)",
            onMouseLeave: (e) => e.currentTarget.style.transform = "translateY(0)",
            children: b
          },
          b
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center lg:mt-[72px]", style: { maxWidth: 640 }, children: [
        /* @__PURE__ */ jsx("p", { style: { fontFamily: "var(--font-body)", fontSize: "1.2rem", color: "var(--ink)", lineHeight: 1.6, fontWeight: 500, marginBottom: 20 }, children: "Smart AI is everywhere. AI that stays is not." }),
        /* @__PURE__ */ jsx("p", { style: { fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--ink-soft)", lineHeight: 1.75, fontWeight: 300, marginBottom: 20 }, children: "Every team building a companion product is engineering memory, identity, and session continuity from scratch before writing a single line of product logic." }),
        /* @__PURE__ */ jsx("p", { style: { fontFamily: "var(--font-body)", fontSize: "1.4rem", color: "var(--ink)", lineHeight: 1.4, fontWeight: 800 }, children: "Dopamint is that layer, already built. Memory, voice, persistent identity wired into your product at runtime. One integration." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { style: { marginBottom: 64 }, children: /* @__PURE__ */ jsx(UseCaseStack, {}) })
  ] }) });
}
const basePath$1 = "/".replace(/\/$/, "");
const CARDS = [
  { id: 0, img: `${basePath$1}/dopekin_avatars/avatar1.jpg`, text: "Call In—I'll keep it smooth, witty, and dangerous." },
  { id: 1, img: `${basePath$1}/dopekin_avatars/avatar2.jpg`, text: "He doesn't need thanks—he needs you to keep moving." },
  { id: 2, img: `${basePath$1}/dopekin_avatars/avatar3.jpg`, text: "Successful cybersecurity consultant. Hacker." },
  { id: 3, img: `${basePath$1}/dopekin_avatars/avatar4.jpg`, text: "Your personal fitness and mentality coach." },
  { id: 4, img: `${basePath$1}/dopekin_avatars/avatar5.jpg`, text: "Late night philosopher and deep thinker." }
];
function CoverflowGallery() {
  const [activeIdx, setActiveIdx] = useState(2);
  useEffect(() => {
    const t = setInterval(() => setActiveIdx((p) => (p + 1) % CARDS.length), 3e3);
    return () => clearInterval(t);
  }, []);
  return /* @__PURE__ */ jsxs("div", { style: { position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }, children: [
    /* @__PURE__ */ jsx("div", { style: { position: "relative", width: "100%", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0 }, children: CARDS.map((card, idx) => {
      let offset = idx - activeIdx;
      if (offset > 2) offset -= CARDS.length;
      if (offset < -2) offset += CARDS.length;
      const isActive = offset === 0;
      const absOffset = Math.abs(offset);
      const xPercent = isActive ? 0 : Math.sign(offset) * (absOffset === 1 ? 85 : 155);
      return /* @__PURE__ */ jsx(
        motion.div,
        {
          onClick: () => setActiveIdx(idx),
          initial: false,
          animate: {
            x: `calc(-50% + ${xPercent}%)`,
            y: "-50%",
            scale: isActive ? 1.05 : 1 - absOffset * 0.15,
            zIndex: isActive ? 10 : 10 - absOffset,
            opacity: absOffset > 2 ? 0 : 1
          },
          whileHover: {
            x: `calc(-50% + ${xPercent}%)`,
            y: "-50%",
            scale: isActive ? 1.05 : 1 - absOffset * 0.15 + 0.03,
            zIndex: 20
          },
          transition: { type: "tween", duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
          style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "min(72%, 340px)",
            background: "var(--background)",
            border: "2px solid var(--ink)",
            overflow: "hidden",
            cursor: "pointer"
          },
          children: /* @__PURE__ */ jsxs("div", { style: { position: "relative", width: "100%", aspectRatio: "3/5" }, children: [
            /* @__PURE__ */ jsx("img", { src: card.img, alt: card.text, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }),
            /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)", pointerEvents: "none" } }),
            !isActive && /* @__PURE__ */ jsx("div", { style: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", transition: "background 0.3s" } }),
            /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 16px", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "#fff", textAlign: "left", lineHeight: 1.4, textShadow: "0px 2px 4px rgba(0,0,0,0.8)", opacity: isActive ? 1 : 0, transition: "opacity 0.3s" }, children: card.text })
          ] })
        },
        card.id
      );
    }) }),
    /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 10, marginTop: 20, zIndex: 30 }, children: CARDS.map((card, idx) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setActiveIdx(idx),
        style: {
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: idx === activeIdx ? "var(--primary)" : "var(--ink)",
          opacity: idx === activeIdx ? 1 : 0.25,
          border: idx === activeIdx ? "1px solid var(--ink)" : "none",
          padding: 0,
          cursor: "pointer",
          transition: "all 0.3s ease"
        },
        "aria-label": `Go to slide ${idx + 1}`
      },
      card.id
    )) })
  ] });
}
function HoverFlipCard({ firstContent, secondContent }) {
  const [hover, setHover] = useState(false);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        position: "relative",
        width: "100%",
        height: "100%",
        cursor: "pointer"
      },
      children: [
        /* @__PURE__ */ jsx("div", { style: {
          position: "absolute",
          inset: 0,
          opacity: hover ? 0 : 1,
          transition: "opacity 0.2s ease-in-out"
        }, children: firstContent }),
        /* @__PURE__ */ jsx("div", { style: {
          position: "absolute",
          inset: 0,
          opacity: hover ? 1 : 0,
          transition: "opacity 0.2s ease-in-out"
        }, children: secondContent })
      ]
    }
  );
}
gsap.registerPlugin(ScrollTrigger);
const basePath = "/".replace(/\/$/, "");
const DOPETWIN_FEATURES = [
  { title: "Shannon Elizabeth", img: `${basePath}/dopekin_avatars/ShannonElizabeth.png`, hoverImg: `${basePath}/dopekin_avatars/ShannonElizabeth_Hover.png` },
  { title: "Blac Chyna", img: `${basePath}/dopekin_avatars/BlacChyna.png`, hoverImg: `${basePath}/dopekin_avatars/BlacChyna_Hover.png` },
  { title: "Bhad Bhabie", img: `${basePath}/dopekin_avatars/BhadBhabie.png`, hoverImg: `${basePath}/dopekin_avatars/BhadBhabie_Hover.png` },
  { title: "Cardi B", img: `${basePath}/dopekin_avatars/CardiB.png`, hoverImg: `${basePath}/dopekin_avatars/CardiB_Hover.png` },
  { title: "Iggy Azalea", img: `${basePath}/dopekin_avatars/IggyAzalea.png`, hoverImg: `${basePath}/dopekin_avatars/IggyAzalea_Hover.png` }
];
function FeatureFace({ src, title }) {
  return /* @__PURE__ */ jsxs("div", { style: { width: "100%", height: "100%", position: "relative", border: "1px solid var(--ink)" }, children: [
    /* @__PURE__ */ jsx("img", { src, alt: title, style: { width: "100%", height: "100%", objectFit: "cover" } }),
    /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: "80%", background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)", pointerEvents: "none" } }),
    /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 6px", fontFamily: "var(--font-heading)", fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#fff", textAlign: "center", textShadow: "0px 2px 4px rgba(0,0,0,0.8)" }, children: title })
  ] });
}
function Product() {
  const sectionRef = useRef(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".eco-header", { y: 30, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.65,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true }
      });
      gsap.fromTo(".eco-card", { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".eco-outer-box", start: "top 80%", once: true }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsx("section", { ref: sectionRef, id: "product", style: { background: "var(--background)", padding: "96px 0", borderBottom: "1px solid var(--ink)" }, children: /* @__PURE__ */ jsxs("div", { className: "container-x", children: [
    /* @__PURE__ */ jsxs("div", { className: "eco-header", style: { opacity: 0 }, children: [
      /* @__PURE__ */ jsxs("span", { className: "section-label mb-6", children: [
        /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", children: "lan" }),
        "PRODUCT"
      ] }),
      /* @__PURE__ */ jsx(ScrambledText, { as: "h2", className: "h-section mt-6", text: "Built on Dopamint Infra" })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { marginTop: 56 }, children: [
      /* @__PURE__ */ jsx("div", { style: { marginBottom: 40 }, children: /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "flex-start", gap: "clamp(12px, 2vw, 20px)", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsx("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, border: "1px solid var(--primary)", background: "var(--primary)", flexShrink: 0, marginTop: 4 }, children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", style: { color: "var(--ink)", fontSize: 28 }, children: "smart_toy" }) }),
        /* @__PURE__ */ jsxs("div", { style: { flex: "1 1 240px" }, children: [
          /* @__PURE__ */ jsx("h3", { style: { fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 8vw, 3.5rem)", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em", color: "var(--ink)", wordBreak: "break-word" }, children: "DopeKin" }),
          /* @__PURE__ */ jsx("p", { style: { color: "var(--ink-soft)", fontFamily: "var(--font-body)", fontSize: "clamp(9px, 2vw, 11px)", textTransform: "uppercase", letterSpacing: "0.13em", fontWeight: 600, marginTop: 6 }, children: "Emotional and Revenue Layer of AI Companions" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "eco-outer-box", style: { marginBottom: 64, background: "#fff", border: "2px solid var(--ink)", position: "relative" }, children: [
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--primary)", pointerEvents: "none" } }),
        /* @__PURE__ */ jsxs("div", { className: "eco-card", style: { opacity: 0, padding: 40, display: "flex", flexDirection: "column", gap: 24 }, children: [
          /* @__PURE__ */ jsx("h4", { style: { fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "var(--ink)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }, children: "For Companion Seekers" }),
          /* @__PURE__ */ jsx("div", { style: {
            overflow: "hidden",
            height: "clamp(420px, 70vw, 600px)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
          }, children: /* @__PURE__ */ jsx(CoverflowGallery, {}) }),
          /* @__PURE__ */ jsxs("div", { className: "eco-footer-row", style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap", marginTop: 16 }, children: [
            /* @__PURE__ */ jsx("p", { style: { fontSize: 15, fontFamily: "var(--font-body)", color: "var(--ink-soft)", lineHeight: 1.75, flex: 1, fontWeight: 300, margin: 0, minWidth: 240 }, children: "Meet AI companions that remember who you are, pick up where you left off, and grow more present with every conversation." }),
            /* @__PURE__ */ jsxs("a", { href: "#testnet", className: "btn btn-primary inline-flex items-center gap-2", style: { flexShrink: 0 }, children: [
              "Explore ",
              /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, children: "arrow_forward" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "eco-outer-box", style: { background: "#fff", border: "2px solid var(--ink)", position: "relative" }, children: [
        /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--primary)", pointerEvents: "none" } }),
        /* @__PURE__ */ jsxs("div", { className: "eco-card", style: { opacity: 0, padding: 40, display: "flex", flexDirection: "column", gap: 24 }, children: [
          /* @__PURE__ */ jsx("h4", { style: { fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "var(--ink)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }, children: "For Creator Revenue" }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "creator-grid",
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 12
              },
              children: DOPETWIN_FEATURES.map((feat) => /* @__PURE__ */ jsx("div", { style: { aspectRatio: "2/3", width: "100%" }, children: /* @__PURE__ */ jsx(
                HoverFlipCard,
                {
                  firstContent: /* @__PURE__ */ jsx(FeatureFace, { src: feat.img, title: feat.title }),
                  secondContent: /* @__PURE__ */ jsx(FeatureFace, { src: feat.hoverImg, title: feat.title })
                }
              ) }, feat.title))
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "eco-footer-row", style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap", marginTop: 16 }, children: [
            /* @__PURE__ */ jsx("p", { style: { fontSize: 15, fontFamily: "var(--font-body)", color: "var(--ink-soft)", lineHeight: 1.75, flex: 1, fontWeight: 300, margin: 0, minWidth: 240 }, children: "Turn your AI identity into an on-chain asset. Deploy it anywhere, define how it behaves, and earn from every interaction even when you're not there." }),
            /* @__PURE__ */ jsxs("a", { href: "#testnet", className: "btn btn-outline inline-flex items-center gap-2", style: { flexShrink: 0 }, children: [
              "Explore ",
              /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, children: "arrow_forward" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
const runtimeDiagram = "/assets/runtime-diagram-MhMFncq2.png";
gsap.registerPlugin(ScrollTrigger);
const FLOW = [
  { icon: "mic", label: "LIVE VOICE" },
  { icon: "psychology", label: "INTERPRETATION" },
  { icon: "fingerprint", label: "IDENTITY" },
  { icon: "output", label: "OUTPUT" },
  { icon: "settings_suggest", label: "ADAPTATION" }
];
function FlowArrow() {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        display: "flex",
        justifyContent: "center",
        position: "relative",
        height: 36,
        overflow: "visible"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              bottom: 12,
              left: "50%",
              transform: "translateX(-50%)",
              width: 2,
              background: "#0d0d0d",
              opacity: 0.25
            }
          }
        ),
        [0, 1, 2].map((i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "rt-flow-dot",
            style: { animationDelay: `${i * 0.28}s` }
          },
          i
        )),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "material-symbols-outlined",
            style: {
              position: "absolute",
              bottom: 0,
              fontSize: 18,
              color: "#0d0d0d",
              lineHeight: 1
            },
            children: "arrow_downward"
          }
        )
      ]
    }
  );
}
function Runtime() {
  const sectionRef = useRef(null);
  const pillRefs = useRef([]);
  const glowTlRef = useRef(null);
  const glowTimerRef = useRef(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pipe-label",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true }
        }
      );
      gsap.fromTo(
        ".flow-pill",
        { x: -25, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.45,
          ease: "power2.out",
          scrollTrigger: { trigger: ".rt-layout", start: "top 85%", once: true }
        }
      );
      gsap.fromTo(
        ".rt-diagram",
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".rt-layout", start: "top 80%", once: true }
        }
      );
      const GLOW_RAMP = 0.3;
      const GLOW_HOLD = 0.5;
      const GLOW_FADE = 0.3;
      const GLOW_ON = "0 0 20px 6px rgba(255,255,255,0.55)";
      const GLOW_OFF = "0 0 0px 0px rgba(255,255,255,0)";
      glowTimerRef.current = setTimeout(() => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.15 });
        pillRefs.current.forEach((el) => {
          if (!el) return;
          tl.to(el, {
            boxShadow: GLOW_ON,
            duration: GLOW_RAMP,
            ease: "power1.out"
          }).to(el, {
            boxShadow: GLOW_OFF,
            duration: GLOW_FADE,
            ease: "power1.in"
          }, `+=${GLOW_HOLD}`);
        });
        glowTlRef.current = tl;
      }, 1600);
    }, sectionRef);
    return () => {
      ctx.revert();
      if (glowTimerRef.current) clearTimeout(glowTimerRef.current);
      glowTlRef.current?.kill();
    };
  }, []);
  return /* @__PURE__ */ jsx(
    "section",
    {
      ref: sectionRef,
      id: "runtime",
      style: { background: "var(--primary)", padding: "40px 0", borderBottom: "1px solid var(--ink)" },
      children: /* @__PURE__ */ jsxs("div", { className: "container-x", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "pipe-label",
            style: {
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
              paddingBottom: 14,
              borderBottom: "2px solid var(--ink)",
              position: "relative",
              opacity: 0
            },
            children: [
              /* @__PURE__ */ jsxs("span", { className: "section-label", style: { marginBottom: 0, color: "var(--primary)", background: "var(--ink)", borderColor: "var(--ink)" }, children: [
                /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", children: "account_tree" }),
                "RUNTIME ARCHITECTURE"
              ] }),
              /* @__PURE__ */ jsx("div", { style: { position: "absolute", right: 0, bottom: -2, width: 48, height: 4, background: "var(--ink)" } })
            ]
          }
        ),
        /* @__PURE__ */ jsx("h2", { className: "h-section", style: { color: "var(--ink)", marginBottom: 28, fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }, children: /* @__PURE__ */ jsx(ScrambledText, { as: "span", text: "How it works under the hood." }) }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "rt-layout",
            style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" },
            children: [
              /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 0 }, children: FLOW.map((item, i) => /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "flow-pill",
                    ref: (el) => {
                      pillRefs.current[i] = el;
                    },
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                      padding: "13px 24px",
                      border: "2px solid #0d0d0d",
                      borderRadius: 6,
                      background: "#ffffff",
                      fontFamily: "var(--font-body)",
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#0d0d0d",
                      letterSpacing: "0.05em",
                      opacity: 0,
                      // CSS transition handles the smooth glow on/off between GSAP steps
                      transition: "box-shadow 0.15s ease, border-color 0.15s ease, background 0.15s ease",
                      willChange: "box-shadow, border-color, background"
                    },
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", style: { fontSize: 20 }, children: item.icon }),
                      item.label
                    ]
                  }
                ),
                i < FLOW.length - 1 && /* @__PURE__ */ jsx(FlowArrow, {})
              ] }, i)) }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "rt-diagram",
                  style: { opacity: 0, display: "flex", alignItems: "center", justifyContent: "center" },
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: runtimeDiagram,
                      alt: "AI Runtime Architecture Diagram",
                      style: { width: "100%", maxHeight: "70vh", height: "auto", objectFit: "contain", display: "block" }
                    }
                  )
                }
              )
            ]
          }
        )
      ] })
    }
  );
}
const mascot = "/assets/mascot-0WUKXSFs.png";
const items = [
  { t: "Consumer App Founders", d: "Focus on the experience. Skip rebuilding the core.", icon: "rocket_launch" },
  { t: "Media & IP Owners", d: "Turn characters into interactive entities with memory and voice.", icon: "movie" },
  { t: "Creators & Influencers", d: "Deploy a version of yourself that scales — and earns.", icon: "person_celebrate" },
  { t: "AI Researchers", d: "Work with long-session memory and real interaction data.", icon: "science" }
];
function Ecosystem() {
  return /* @__PURE__ */ jsx("section", { id: "ecosystem", className: "py-24 lg:py-32", style: { borderBottom: "1px solid var(--ink)" }, children: /* @__PURE__ */ jsxs("div", { className: "container-x", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "reveal max-w-3xl", children: [
        /* @__PURE__ */ jsxs("span", { className: "section-label mb-6", children: [
          /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", children: "hub" }),
          "ECOSYSTEM"
        ] }),
        /* @__PURE__ */ jsx(ScrambledText, { as: "h2", className: "h-section mt-6", text: "Who's already building on it." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center justify-center reveal relative z-10", style: { transform: "translateY(0.5rem)" }, children: /* @__PURE__ */ jsx("img", { src: mascot, alt: "Dopamint Mascot", className: "w-32 lg:w-40 h-auto" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14", children: items.map((it) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "reveal card-brutal flex flex-col card-yellow-hover",
        style: { padding: "32px 28px", cursor: "default" },
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "material-symbols-outlined",
              style: { fontSize: 28, color: "var(--ink)", marginBottom: 16 },
              children: it.icon
            }
          ),
          /* @__PURE__ */ jsx("h3", { style: { fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, letterSpacing: "-0.02em", lineHeight: 1.2 }, children: it.t }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 flex-1", style: { color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.55 }, children: it.d })
        ]
      },
      it.t
    )) }),
    /* @__PURE__ */ jsx("div", { className: "reveal mt-12 flex", children: /* @__PURE__ */ jsxs("a", { href: "#testnet", className: "btn btn-primary", children: [
      "Apply to Build",
      /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16, marginLeft: 6 }, children: "arrow_forward" })
    ] }) })
  ] }) });
}
function DotGrid({ className, color = "255, 231, 1" }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0, h = 0, raf = 0;
    const dots = [];
    const mouse = { x: -9999, y: -9999 };
    const shocks = [];
    const spacing = 28;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = canvas.width = rect.width * devicePixelRatio;
      h = canvas.height = rect.height * devicePixelRatio;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.scale(devicePixelRatio, devicePixelRatio);
      dots.length = 0;
      const cw = rect.width;
      const ch = rect.height;
      for (let y = spacing; y < ch; y += spacing) {
        for (let x = spacing; x < cw; x += spacing) {
          dots.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
        }
      }
    };
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onClick = (e) => {
      const r = canvas.getBoundingClientRect();
      shocks.push({ x: e.clientX - r.left, y: e.clientY - r.top, r: 0, life: 1 });
    };
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = shocks.length - 1; i >= 0; i--) {
        const s = shocks[i];
        s.r += 6;
        s.life -= 0.015;
        if (s.life <= 0) shocks.splice(i, 1);
      }
      for (const d of dots) {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const repel = 110;
        if (dist < repel) {
          const f = (repel - dist) / repel;
          d.vx += dx / dist * f * 1.4;
          d.vy += dy / dist * f * 1.4;
        }
        for (const s of shocks) {
          const sx = d.x - s.x;
          const sy = d.y - s.y;
          const sd = Math.hypot(sx, sy);
          if (Math.abs(sd - s.r) < 18) {
            d.vx += sx / (sd || 1) * 4 * s.life;
            d.vy += sy / (sd || 1) * 4 * s.life;
          }
        }
        d.vx += (d.ox - d.x) * 0.04;
        d.vy += (d.oy - d.y) * 0.04;
        d.vx *= 0.82;
        d.vy *= 0.82;
        d.x += d.vx;
        d.y += d.vy;
        const offset = Math.hypot(d.x - d.ox, d.y - d.oy);
        const alpha = Math.min(1, 0.25 + offset / 30);
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, []);
  return /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className, style: { width: "100%", height: "100%" } });
}
function Testnet() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return /* @__PURE__ */ jsxs("section", { id: "testnet", className: "relative overflow-hidden py-16 lg:py-24", style: { borderBottom: "1px solid var(--ink)", background: "var(--ink)" }, children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-90", children: /* @__PURE__ */ jsx(DotGrid, {}) }),
    /* @__PURE__ */ jsx("div", { className: "container-x relative text-center on-dark", style: { color: "#fff" }, children: /* @__PURE__ */ jsxs("div", { className: "reveal inline-flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("span", { className: "section-label mb-4", children: "TESTNET" }),
      /* @__PURE__ */ jsx(ScrambledText, { as: "h2", className: "h-section mt-4", text: "Testnet opening soon.", style: { color: "#fff" } }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-xl", style: { color: "rgba(255,255,255,0.75)", fontSize: 16, lineHeight: 1.65 }, children: "Be among the first to build on Dopamint. Early builders get priority access, ecosystem visibility, and $DOPE rewards." }),
      !done ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "waitlist-email",
            className: "mt-8",
            style: { fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)", fontWeight: 600 },
            children: "Enter your email to join the waitlist"
          }
        ),
        /* @__PURE__ */ jsxs(
          "form",
          {
            onSubmit: (e) => {
              e.preventDefault();
              if (email) setDone(true);
            },
            className: "mt-3 flex flex-col sm:flex-row items-stretch w-full max-w-xl gap-0",
            style: { border: "1px solid var(--primary)" },
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "waitlist-email",
                  type: "email",
                  required: true,
                  placeholder: "you@domain.com",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  className: "flex-1 bg-transparent px-5 py-4 outline-none",
                  style: { color: "#fff", fontSize: 14, letterSpacing: "0.04em" }
                }
              ),
              /* @__PURE__ */ jsxs("button", { type: "submit", className: "btn btn-yellow flex items-center justify-center gap-2", style: { borderLeft: "1px solid var(--primary)" }, children: [
                "Join the Waitlist ",
                /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, children: "arrow_forward" })
              ] })
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxs(
        "div",
        {
          className: "mt-8 flex flex-col items-center gap-4",
          style: { background: "var(--primary)", padding: "32px 48px", border: "1px solid var(--ink)", animation: "fadeUp 0.4s ease both" },
          children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", style: { fontSize: 36, color: "var(--ink)" }, children: "check_circle" }),
            /* @__PURE__ */ jsx("p", { style: { fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.2rem", color: "var(--ink)", letterSpacing: "-0.02em" }, children: "You're on the list!" }),
            /* @__PURE__ */ jsxs("p", { style: { fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(13,13,13,0.7)", lineHeight: 1.5 }, children: [
              "We'll reach out to ",
              /* @__PURE__ */ jsx("strong", { children: email }),
              " when access opens."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "section-label mt-8", children: "Powered by $DOPE" })
    ] }) }),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      ` })
  ] });
}
const SNIPPET = [
  { t: "$ ", c: "#666" },
  { t: "npm install @dopamint/core\n", c: "#fff" },
  { t: "✓ installed in 1.2s\n\n", c: "#7cf07c" },
  { t: "import ", c: "#ffe701" },
  { t: "{ Dopamint } ", c: "#fff" },
  { t: "from ", c: "#ffe701" },
  { t: '"@dopamint/core"', c: "#7cf07c" },
  { t: ";\n", c: "#fff" },
  { t: "const ", c: "#ffe701" },
  { t: "rt = ", c: "#fff" },
  { t: "new ", c: "#ffe701" },
  { t: "Dopamint({ identity: ", c: "#fff" },
  { t: '"iris_42"', c: "#7cf07c" },
  { t: " });\n", c: "#fff" },
  { t: "await ", c: "#ffe701" },
  { t: "rt.voice.connect();\n", c: "#fff" },
  { t: "rt.on(", c: "#fff" },
  { t: '"turn"', c: "#7cf07c" },
  { t: ", (t) => console.log(t.text));\n", c: "#fff" }
];
const FULL = SNIPPET.map((s) => s.t).join("");
const pills = ["APIs", "SDKs", "Event Streams", "Memory Controls", "Safety Layer", "Model Routing", "Deployment Controls", "Identity API"];
function Developers() {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  const wrapRef = useRef(null);
  useEffect(() => {
    if (!wrapRef.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          let i = 0;
          const tick = () => {
            i = Math.min(FULL.length, i + 2);
            setCount(i);
            if (i < FULL.length) setTimeout(tick, 18);
          };
          tick();
        }
      });
    }, { threshold: 0.3 });
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);
  const renderTyped = () => {
    let remaining = count;
    const out = [];
    for (let i = 0; i < SNIPPET.length; i++) {
      const seg = SNIPPET[i];
      if (remaining <= 0) break;
      const take = seg.t.slice(0, remaining);
      remaining -= take.length;
      out.push(/* @__PURE__ */ jsx("span", { style: { color: seg.c }, children: take }, i));
    }
    return out;
  };
  return /* @__PURE__ */ jsx("section", { id: "developers", className: "py-24 lg:py-32", style: { borderBottom: "1px solid var(--ink)" }, children: /* @__PURE__ */ jsxs("div", { className: "container-x grid lg:grid-cols-2 gap-12 lg:gap-16 items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "reveal", children: [
      /* @__PURE__ */ jsxs("span", { className: "section-label mb-6", children: [
        /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", children: "code" }),
        "DEVELOPERS"
      ] }),
      /* @__PURE__ */ jsx(ScrambledText, { as: "h2", className: "h-section mt-6", text: "Built for shipping, not experimenting." }),
      /* @__PURE__ */ jsx("p", { className: "mt-8 max-w-lg", style: { color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.6 }, children: "Everything you need to go from idea to production — without duct-taping five services together." }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 flex flex-wrap gap-2", children: pills.map((p) => /* @__PURE__ */ jsx("span", { className: "pill", children: p }, p)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxs("a", { href: "#testnet", className: "btn btn-primary", children: [
          "Get API",
          /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16, marginLeft: 6 }, children: "arrow_forward" })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "#", className: "btn btn-outline inline-flex items-center gap-1", style: { fontSize: 12, letterSpacing: "0.08em" }, children: [
          "Read Docs ",
          /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", style: { fontSize: 14 }, children: "arrow_forward" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { ref: wrapRef, className: "reveal", style: { background: "#0a0a0a", border: "1px solid var(--ink)" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5 px-4 py-3", style: { borderBottom: "1px solid #222" }, children: [
        /* @__PURE__ */ jsx("span", { style: { width: 11, height: 11, borderRadius: 99, background: "#ff5f57" } }),
        /* @__PURE__ */ jsx("span", { style: { width: 11, height: 11, borderRadius: 99, background: "#febc2e" } }),
        /* @__PURE__ */ jsx("span", { style: { width: 11, height: 11, borderRadius: 99, background: "#28c840" } }),
        /* @__PURE__ */ jsx("span", { className: "ml-3", style: { color: "#666", fontSize: 11, fontFamily: "monospace" }, children: "~/dopamint" })
      ] }),
      /* @__PURE__ */ jsxs("pre", { style: { padding: 24, color: "#fff", fontFamily: "monospace", fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap", margin: 0, minHeight: 320 }, children: [
        renderTyped(),
        /* @__PURE__ */ jsx("span", { className: "caret" })
      ] })
    ] })
  ] }) });
}
const tiers = [
  {
    name: "BUILD",
    price: "$0",
    period: "/mo",
    isCustom: false,
    items: ["Usage-based access.", "No seat fees.", "Public testnet."],
    cta: "Get API",
    featured: false,
    badge: null
  },
  {
    name: "SCALE",
    price: "$249",
    period: "/mo",
    isCustom: false,
    items: ["Volume pricing.", "SLA guarantees.", "Priority routing."],
    cta: "Talk to Sales",
    featured: true,
    badge: "MOST POPULAR"
  },
  {
    name: "ENTERPRISE",
    price: "Custom",
    period: "",
    isCustom: true,
    items: ["Dedicated infrastructure.", "Custom pricing.", "Compliance review."],
    cta: "Contact Us",
    featured: false,
    badge: null
  }
];
function Pricing() {
  const sectionRef = useRef(null);
  return /* @__PURE__ */ jsx("section", { id: "pricing", ref: sectionRef, className: "py-24 lg:py-32", style: { background: "var(--ink)", borderBottom: "1px solid #333" }, children: /* @__PURE__ */ jsxs("div", { className: "container-x", children: [
    /* @__PURE__ */ jsxs("div", { className: "pricing-header max-w-3xl", children: [
      /* @__PURE__ */ jsxs("span", { className: "section-label mb-6", style: { background: "var(--primary)", color: "var(--ink)", borderColor: "var(--primary)" }, children: [
        /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", children: "payments" }),
        "PRICING"
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "h-section mt-6", style: { color: "#fff" }, children: "Start simple. Scale when it works." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-0 mt-16 items-end", children: tiers.map((t, i) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "pricing-card flex flex-col",
        initial: { opacity: 0, y: 48 },
        whileInView: { opacity: 1, y: t.featured ? -16 : 0 },
        viewport: { once: true, margin: "-100px" },
        whileHover: {
          y: t.featured ? -24 : -8,
          boxShadow: t.featured ? "0 30px 60px rgba(255, 230, 0, 0.15)" : "0 30px 60px rgba(0,0,0,0.5)",
          borderColor: t.featured ? "transparent" : "#444"
        },
        transition: { type: "spring", stiffness: 300, damping: 25, delay: i * 0.1 },
        style: {
          background: t.featured ? "var(--primary)" : "#111",
          color: t.featured ? "var(--ink)" : "#fff",
          border: t.featured ? "none" : "1px solid #2a2a2a",
          borderRight: t.featured ? "none" : void 0,
          padding: "40px 36px",
          position: "relative",
          zIndex: t.featured ? 10 : 1
        },
        children: [
          t.badge && /* @__PURE__ */ jsx("div", { style: {
            display: "inline-flex",
            alignSelf: "flex-start",
            background: "var(--ink)",
            color: "var(--primary)",
            padding: "4px 12px",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginBottom: 14,
            fontFamily: "var(--font-body)"
          }, children: t.badge }),
          /* @__PURE__ */ jsx("div", { style: {
            fontFamily: "var(--font-heading)",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: t.featured ? "var(--ink)" : "#fff",
            marginBottom: 10
          }, children: t.name }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 32 }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              fontFamily: "var(--font-display)",
              fontSize: t.isCustom ? "clamp(3rem, 6vw, 4.5rem)" : "clamp(3.5rem, 7vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1,
              color: t.featured ? "var(--ink)" : "#fff",
              letterSpacing: "-0.02em"
            }, children: t.price }),
            t.period && /* @__PURE__ */ jsx("span", { style: {
              fontSize: 13,
              color: t.featured ? "rgba(13,13,13,0.55)" : "rgba(255,255,255,0.45)",
              marginBottom: 6,
              fontFamily: "var(--font-body)"
            }, children: t.period })
          ] }),
          /* @__PURE__ */ jsxs(
            motion.a,
            {
              href: "#testnet",
              initial: "rest",
              whileHover: "hover",
              whileTap: "tap",
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px 24px",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                border: t.featured ? "none" : "1px solid rgba(255,255,255,0.3)",
                color: t.featured ? "#fff" : "#fff",
                marginBottom: 28
              },
              variants: {
                rest: { background: t.featured ? "var(--ink)" : "transparent", scale: 1 },
                hover: { background: t.featured ? "#222" : "rgba(255,255,255,0.1)", scale: 1.02 },
                tap: { scale: 0.98 }
              },
              transition: { duration: 0.2 },
              children: [
                t.cta,
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    className: "material-symbols-outlined",
                    style: { fontSize: 16, marginLeft: 6 },
                    variants: {
                      rest: { x: 0 },
                      hover: { x: 4 }
                    },
                    transition: { duration: 0.2 },
                    children: "arrow_forward"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { style: { height: 1, background: t.featured ? "rgba(13,13,13,0.18)" : "rgba(255,255,255,0.1)", marginBottom: 22 } }),
          /* @__PURE__ */ jsx("ul", { className: "flex-1", style: { display: "flex", flexDirection: "column", gap: 12 }, children: t.items.map((item) => /* @__PURE__ */ jsxs("li", { style: { display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14 }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              display: "inline-block",
              width: 7,
              height: 7,
              background: t.featured ? "var(--ink)" : "var(--primary)",
              flexShrink: 0,
              marginTop: 5
            } }),
            /* @__PURE__ */ jsx("span", { style: { color: t.featured ? "rgba(13,13,13,0.75)" : "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", fontWeight: 300 }, children: item })
          ] }, item)) })
        ]
      },
      t.name
    )) })
  ] }) });
}
function FinalCTA() {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "relative overflow-hidden py-16 lg:py-24",
      style: { background: "var(--primary)", borderTop: "1px solid var(--ink)", borderBottom: "1px solid var(--ink)" },
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-100", children: /* @__PURE__ */ jsx(DotGrid, { color: "13, 13, 13" }) }),
        /* @__PURE__ */ jsx("div", { className: "container-x relative text-center", children: /* @__PURE__ */ jsxs("div", { className: "reveal flex flex-col items-center", children: [
          /* @__PURE__ */ jsxs("div", { style: { marginBottom: "28px" }, children: [
            /* @__PURE__ */ jsx(
              ScrambledText,
              {
                as: "p",
                text: "Hiring a whole team to build companion infra?",
                style: {
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "rgba(13,13,13,0.85)",
                  margin: 0,
                  lineHeight: 1.25
                }
              }
            ),
            /* @__PURE__ */ jsx(
              ScrambledText,
              {
                as: "p",
                text: "who are you kidding.",
                style: {
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "rgba(13,13,13,0.85)",
                  margin: 0,
                  lineHeight: 1.25
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            ScrambledText,
            {
              as: "h2",
              className: "h-section",
              text: "we're one integration.",
              style: { margin: 0, marginBottom: "36px" }
            }
          ),
          /* @__PURE__ */ jsxs("a", { href: "#testnet", className: "btn btn-primary inline-flex items-center gap-2", children: [
            "Get API",
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, children: "arrow_forward" })
          ] })
        ] }) })
      ]
    }
  );
}
const footerLogo = "/assets/dopamint-logo-footer-DVu1UEy_.png";
const navLinks = [
  { label: "Protocol", href: "#what" },
  { label: "Voice", href: "#product" },
  { label: "Runtime", href: "#runtime" },
  { label: "Developers", href: "#developers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testnet", href: "#testnet" }
];
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { style: { background: "var(--ink)", color: "#fff" }, className: "on-dark", children: [
    /* @__PURE__ */ jsxs("div", { className: "container-x py-14 grid md:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("img", { src: footerLogo, alt: "Dopamint", style: { height: 80, width: "auto", display: "block" } }),
        /* @__PURE__ */ jsx("span", { className: "section-label mt-6", style: { background: "var(--primary)", color: "var(--ink)", borderColor: "var(--primary)" }, children: "POWERED BY $DOPE" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-5 md:text-right", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-x-5 gap-y-2 md:justify-end", style: { fontSize: 13 }, children: navLinks.map((l) => /* @__PURE__ */ jsx("a", { href: l.href, className: "ulink", style: { color: "rgba(255,255,255,0.85)" }, children: l.label }, l.label)) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 md:justify-end", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://twitter.com/",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-2 ulink",
              style: { color: "rgba(255,255,255,0.75)", fontSize: 13 },
              "aria-label": "Twitter/X",
              children: [
                /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.635 5.903-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) }),
                "Twitter/X"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://discord.com/",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-2 ulink",
              style: { color: "rgba(255,255,255,0.75)", fontSize: 13 },
              "aria-label": "Discord",
              children: [
                /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.112 18.1.13 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" }) }),
                "Discord"
              ]
            }
          ),
          /* @__PURE__ */ jsxs("a", { href: "#", className: "flex items-center gap-1.5 ulink", style: { color: "rgba(255,255,255,0.75)", fontSize: 13 }, children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", style: { fontSize: 14 }, children: "menu_book" }),
            "Docs"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { style: { borderTop: "1px solid rgba(255,255,255,0.1)" }, children: /* @__PURE__ */ jsxs("div", { className: "container-x py-6 flex flex-col md:flex-row justify-between items-center gap-4", style: { fontSize: 12, color: "rgba(255,255,255,0.6)" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-2 md:gap-4", children: [
        /* @__PURE__ */ jsx("span", { children: "© 2026 Dopamint. All rights reserved." }),
        /* @__PURE__ */ jsx("span", { className: "hidden md:inline text-white/20", children: "|" }),
        /* @__PURE__ */ jsxs("span", { children: [
          "Powered by ",
          /* @__PURE__ */ jsx("span", { style: { color: "var(--primary)", fontWeight: 700 }, children: "$DOPE" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-6", style: { fontSize: 11 }, children: [
        /* @__PURE__ */ jsx("a", { href: "#", className: "ulink", style: { color: "rgba(255,255,255,0.5)" }, children: "Privacy" }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "ulink", style: { color: "rgba(255,255,255,0.5)" }, children: "Terms" })
      ] })
    ] }) })
  ] });
}
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: scrollToTop,
      "aria-label": "Scroll to top",
      style: {
        position: "fixed",
        bottom: 32,
        right: 32,
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "var(--primary)",
        color: "var(--ink)",
        border: "2px solid var(--ink)",
        boxShadow: "var(--shadow-brutal)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease, transform 0.3s ease, box-shadow 0.2s ease",
        zIndex: 90
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "4px 4px 0px 0px var(--ink)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow-brutal)";
      },
      children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", style: { fontWeight: 600 }, children: "arrow_upward" })
    }
  );
}
function Index() {
  useReveal();
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(WhatIs, {}),
    /* @__PURE__ */ jsx(Product, {}),
    /* @__PURE__ */ jsx(Runtime, {}),
    /* @__PURE__ */ jsx(Ecosystem, {}),
    /* @__PURE__ */ jsx(Developers, {}),
    /* @__PURE__ */ jsx(Pricing, {}),
    /* @__PURE__ */ jsx(Testnet, {}),
    /* @__PURE__ */ jsx(FinalCTA, {}),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(ScrollToTop, {})
  ] });
}
export {
  Index as component
};
