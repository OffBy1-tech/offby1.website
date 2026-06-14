// Ported from the design prototype (ob1 v2/ob1-sections.jsx) with the saved
// tweak defaults baked in: gag = "medium", motion = 6.
import { useEffect, useMemo, useState } from "react";

const MOTION = 6;

interface Props {
  onLanding?: boolean;
  current?: string;
}

const navItems = (onLanding: boolean) => [
  { label: "home", href: onLanding ? "#home" : "/" },
  { label: "blog", href: "/blog" },
  { label: "projects", href: onLanding ? "#projects" : "/#projects" },
  { label: "products", href: onLanding ? "#products" : "/#products" },
  { label: "about", href: onLanding ? "#about" : "/#about" },
  { label: "contact", href: onLanding ? "#contact" : "/#contact" },
];

export default function SiteHeader({ onLanding = true, current }: Props) {
  const items = useMemo(() => navItems(onLanding), [onLanding]);
  const [sweep, setSweep] = useState(-1);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setTheme(
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light",
    );
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("ob1-theme", next);
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 700px)").matches;
    if (reduced || mobile) return;
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    const STEP = 400;
    const run = () => {
      for (let i = 0; i <= items.length; i++) {
        // <= is the whole point
        timeouts.push(setTimeout(() => setSweep(i), i * STEP));
      }
      timeouts.push(setTimeout(() => setSweep(-1), items.length * STEP + 1250));
    };
    const first = setTimeout(run, 1800);
    const every = Math.max(7, 26 - MOTION * 2) * 1000;
    const interval = setInterval(run, every);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
      setSweep(-1);
    };
  }, [items]);

  const ghostOn = sweep === items.length;

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="lockup" href={onLanding ? "#home" : "/"}>
          <img src="/assets/ob1-mark.png" alt="Off By 1 mark" />
          <span>Off By 1</span>
        </a>
        <div className="header-right">
          <nav className={"nav" + (menuOpen ? " open" : "")} aria-label="Main">
            {items.map((item, i) => (
              <a
                key={item.label}
                className={
                  "nav-item" +
                  (sweep === i ? " swept" : "") +
                  (current === item.label ? " current" : "")
                }
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                <span className="idx">[{i}]</span>
                <span>{item.label}</span>
              </a>
            ))}
            <span
              className={"nav-ghost" + (ghostOn ? " on" : "")}
              aria-hidden="true"
            >
              <span className="idx">[{items.length}]</span>
              <span className="undef">undefined</span>
            </span>
            <span
              className={"nav-counter" + (sweep >= 0 ? " on" : "")}
              aria-hidden="true"
            >
              {sweep >= 0 && sweep < items.length && <span>i = {sweep}</span>}
              {sweep === items.length && <span className="oob">i = {items.length} // off by one</span>}
            </span>
          </nav>
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={
              "Switch to " + (theme === "light" ? "dark" : "light") + " theme"
            }
            title={'theme = "' + (theme === "light" ? "dark" : "light") + '"'}
          >
            ◐
          </button>
          <button
            className="menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "×" : "≡"}
          </button>
        </div>
      </div>
    </header>
  );
}
