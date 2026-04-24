import { useEffect, useRef } from "react";

/** Reveal-on-scroll: adds `.in` to elements with `.reveal` when in view. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
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

/** Scrambled text: cycles random chars before locking in when in view. */
export function useScramble<T extends HTMLElement>(text: string) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = "!<>-_\\/[]{}—=+*^?#__ABCDEF0123456789";
    let raf = 0;
    let started = false;

    const run = () => {
      const final = text;
      const length = final.length;
      const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
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
