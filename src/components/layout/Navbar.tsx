import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const links = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Timeline", href: "/#timeline" },
  { label: "Rules", href: "/#rules" },
  { label: "Prizes", href: "/#prizes" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.replace("/#", ""));
    const onScroll = () => {
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--color-void)]/85 backdrop-blur-lg border-b border-[var(--color-stone)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="font-display text-xs md:text-sm text-[var(--color-parchment)] hover:text-[var(--color-torch)] transition-colors">
            HACK<span className="text-[var(--color-torch)]">_</span>WORLD
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const isActive = active === l.href.replace("/#", "");
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`relative px-3 py-2 text-sm transition-colors ${
                      isActive ? "text-[var(--color-parchment)]" : "text-[var(--color-stone-light)] hover:text-[var(--color-parchment)]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-2 -bottom-0 h-0.5 bg-[var(--color-torch)]"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="hidden sm:inline-block font-display text-[10px] uppercase px-5 py-3 border border-[var(--color-torch)] text-[var(--color-torch)] hover:bg-[var(--color-torch)] hover:text-[var(--color-ink)] transition-colors"
            >
              Login
            </button>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            >
              <span className={`block w-6 h-0.5 bg-[var(--color-parchment)] transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block w-6 h-0.5 bg-[var(--color-parchment)] transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-[var(--color-parchment)] transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[var(--color-void)] flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.06 }}
                className="font-display text-sm text-[var(--color-parchment)] hover:text-[var(--color-torch)] transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => {
                setOpen(false);
                navigate("/login");
              }}
              className="font-display text-xs uppercase px-6 py-4 border border-[var(--color-torch)] text-[var(--color-torch)] mt-4"
            >
              Login
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}