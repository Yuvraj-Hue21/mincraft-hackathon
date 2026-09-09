import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Countdown } from "./Countdown";

const links = [
  { to: "/dashboard", label: "Dashboard", end: true },
  { to: "/dashboard/problems", label: "Problems" },
  { to: "/dashboard/announcements", label: "Announcements" },
  { to: "/dashboard/team", label: "Team" },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--color-void)] flex flex-col md:flex-row">
      <aside className="md:w-60 border-b md:border-b-0 md:border-r border-[var(--color-stone)] flex md:flex-col">
        <div className="hidden md:block p-6 border-b border-[var(--color-stone)]">
          <span className="font-display text-[10px] text-[var(--color-parchment)]">
            HACK<span className="text-[var(--color-torch)]">_</span>WORLD
          </span>
        </div>
        <nav className="flex md:flex-col flex-1 overflow-x-auto md:overflow-visible">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `relative px-6 py-4 text-sm whitespace-nowrap border-b-2 md:border-b-0 md:border-l-2 transition-colors ${
                  isActive
                    ? "border-transparent text-[var(--color-torch)] bg-[var(--color-torch)]/5"
                    : "border-transparent text-[var(--color-stone-light)] hover:text-[var(--color-parchment)]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="dash-nav"
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--color-torch)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  {l.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:block mt-auto p-6 border-t border-[var(--color-stone)]">
          <button
            onClick={() => navigate("/")}
            className="text-xs text-[var(--color-stone-light)] hover:text-[var(--color-parchment)] transition-colors"
          >
            ← Exit to world
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-6 md:px-10 h-16 border-b border-[var(--color-stone)]">
          <span className="font-display text-[10px] text-[var(--color-stone-light)]">HACKATHON</span>
          <Countdown />
        </header>
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}