// Ported from the design prototype (ob1 v2/ob1-sections.jsx), motion = 6.
// Rendered with client:only — it's purely decorative and needs the DOM.
// Theme comes from the <html data-theme> attribute (watched, so the header
// toggle retints the rain live) instead of the prototype's tweaks state.
import { useEffect, useRef, useState } from "react";

const MOTION = 6;
const RAIN_GLYPHS = "01";
const RAIN_EXTRAS = "{}[]<>+=;:#%/\\|i";

function rainGlyph() {
  // mostly binary, on brand; occasional syntax debris
  return Math.random() < 0.7
    ? RAIN_GLYPHS[Math.floor(Math.random() * RAIN_GLYPHS.length)]
    : RAIN_EXTRAS[Math.floor(Math.random() * RAIN_EXTRAS.length)];
}

export default function DigitalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const read = () =>
      setTheme(el.getAttribute("data-theme") === "dark" ? "dark" : "light");
    read();
    const obs = new MutationObserver(read);
    obs.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    setOn(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!on) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const FONT = 15;
    let cols: { y: number; mult: number; glyph: string }[] = [];
    let raf: number | null = null;
    let lastY = window.scrollY;
    let vel = 0;

    const palette =
      theme === "dark"
        ? { fade: "rgba(15, 15, 15, 0.09)", head: "rgba(245, 245, 245, 0.9)", glow: "#6270D9" }
        : { fade: "rgba(245, 245, 245, 0.11)", head: "rgba(98, 112, 217, 0.8)", glow: "#A8B2F0" };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const n = Math.ceil(canvas.width / FONT);
      cols = Array.from({ length: n }, () => ({
        y: Math.random() * canvas.height,
        mult: 0.6 + Math.random() * 0.9,
        glyph: rainGlyph(),
      }));
      ctx.font = FONT + "px 'JetBrains Mono', monospace";
    };

    const tick = () => {
      const sy = window.scrollY;
      vel += (sy - lastY - vel) * 0.12; // smoothed scroll velocity
      lastY = sy;

      const idle = 0.25 + MOTION * 0.06;
      const boost = Math.max(-38, Math.min(38, vel)) * 0.22;
      const speed = idle + boost;

      ctx.shadowBlur = 0;
      ctx.fillStyle = palette.fade;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = palette.head;
      ctx.shadowColor = palette.glow;
      ctx.shadowBlur = 9;
      for (let i = 0; i < cols.length; i++) {
        const c = cols[i];
        if (Math.random() < 0.08) c.glyph = rainGlyph();
        ctx.fillText(c.glyph, i * FONT, c.y);
        c.y += speed * c.mult * 2.2;
        if (c.y > canvas.height + 60) c.y = -20 - Math.random() * 200;
        if (c.y < -260) c.y = canvas.height + 20 + Math.random() * 100;
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("resize", resize);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [on, theme]);

  if (!on) return null;
  return <canvas className="rain-canvas" ref={canvasRef} aria-hidden="true" />;
}
