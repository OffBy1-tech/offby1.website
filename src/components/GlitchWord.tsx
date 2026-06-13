// Ported from the design prototype (ob1 v2/ob1-sections.jsx).
// Initial cells are deterministic so the server-rendered markup matches
// hydration; the flicker interval randomizes glyphs immediately after mount.
import { useEffect, useMemo, useRef, useState } from "react";

const GLITCH_GLYPHS = "█▓▒░▚▞▖▗▘▝◼#%01{}<>/*+=~";

type Variant = "c1" | "c2" | "c3" | "c4";
type Cell = { mode: "real" | "corrupt"; glyph: string; v: Variant };

function randGlyph() {
  return GLITCH_GLYPHS[Math.floor(Math.random() * GLITCH_GLYPHS.length)];
}

function randVariant(): Variant {
  const r = Math.random();
  if (r < 0.55) return "c1";
  if (r < 0.75) return "c2";
  if (r < 0.9) return "c3";
  return "c4";
}

function shuffled(n: number) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function GlitchWord({ text }: { text: string }) {
  const chars = useMemo(() => text.split(""), [text]);
  const [cells, setCells] = useState<Cell[]>(() =>
    chars.map((c, i) => ({
      mode: c === " " ? "real" : "corrupt",
      glyph: GLITCH_GLYPHS[i % GLITCH_GLYPHS.length],
      v: "c1",
    })),
  );
  const timers = useRef<{
    list: ReturnType<typeof setTimeout>[];
    leave: ReturnType<typeof setTimeout> | null;
  }>({ list: [], leave: null });
  const reduced = useRef(false);

  const clearList = () => {
    timers.current.list.forEach(clearTimeout);
    timers.current.list = [];
  };

  const setMode = (i: number, mode: Cell["mode"]) => {
    setCells((prev) =>
      prev.map((cell, j) =>
        j === i ? { mode, glyph: randGlyph(), v: randVariant() } : cell,
      ),
    );
  };

  const resolve = () => {
    if (timers.current.leave) clearTimeout(timers.current.leave);
    clearList();
    shuffled(chars.length).forEach((idx, k) => {
      if (chars[idx] === " ") return;
      const delay = reduced.current ? 0 : k * 45 + Math.random() * 30;
      timers.current.list.push(setTimeout(() => setMode(idx, "real"), delay));
    });
  };

  const corrupt = () => {
    clearList();
    shuffled(chars.length).forEach((idx, k) => {
      if (chars[idx] === " ") return;
      const delay = reduced.current ? 0 : k * 110 + Math.random() * 60;
      timers.current.list.push(
        setTimeout(() => setMode(idx, "corrupt"), delay),
      );
    });
  };

  const onLeave = () => {
    if (timers.current.leave) clearTimeout(timers.current.leave);
    timers.current.leave = setTimeout(corrupt, 1400);
  };

  // flicker corrupted glyphs so the corruption feels alive
  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced.current) return;
    const id = setInterval(() => {
      setCells((prev) =>
        prev.some((c) => c.mode === "corrupt")
          ? prev.map((c) =>
              c.mode === "corrupt" && Math.random() < 0.4
                ? {
                    ...c,
                    glyph: randGlyph(),
                    v: Math.random() < 0.25 ? randVariant() : c.v,
                  }
                : c,
            )
          : prev,
      );
    }, 360);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    return () => {
      clearList();
      if (timers.current.leave) clearTimeout(timers.current.leave);
    };
  }, []);

  const allReal = cells.every((c) => c.mode === "real");

  return (
    <span
      className={"glitch" + (allReal ? " resolved" : "")}
      title="// hover to fix"
      onMouseEnter={resolve}
      onMouseLeave={onLeave}
      onClick={() => (allReal ? corrupt() : resolve())}
    >
      <span className="sr-only">{text}</span>
      <span className="glitch-layout" aria-hidden="true">
        {text}
      </span>
      <span className="glitch-overlay" aria-hidden="true">
        {cells.map((c, i) =>
          chars[i] === " " ? (
            <span key={i}> </span>
          ) : (
            <span
              key={i}
              className={"gch" + (c.mode === "corrupt" ? " " + c.v : "")}
            >
              {c.mode === "corrupt" ? c.glyph : chars[i]}
            </span>
          ),
        )}
      </span>
    </span>
  );
}
