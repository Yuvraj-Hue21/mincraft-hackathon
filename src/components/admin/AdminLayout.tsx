import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/participants", label: "Participants" },
  { to: "/admin/teams", label: "Teams" },
  { to: "/admin/problems", label: "Problems" },
  { to: "/admin/announcements", label: "Announcements" },
  { to: "/admin/settings", label: "Settings" },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0d0e11] flex flex-col md:flex-row text-[#e6e6e9]">
      <aside className="md:w-56 border-b md:border-b-0 md:border-r border-[#26272c] flex md:flex-col">
        <div className="hidden md:block p-6 border-b border-[#26272c]">
          <span className="text-xs font-semibold tracking-wide text-[#8f909a]">ADMIN</span>
        </div>
        <nav className="flex md:flex-col flex-1 overflow-x-auto md:overflow-visible">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `relative px-6 py-3.5 text-sm whitespace-nowrap border-b-2 md:border-b-0 md:border-l-2 transition-colors ${
                  isActive
                    ? "border-transparent text-white bg-[#5b8def]/10"
                    : "border-transparent text-[#8f909a] hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="admin-nav"
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#5b8def]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  {l.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:block mt-auto p-6 border-t border-[#26272c]">
          <button onClick={() => navigate("/")} className="text-xs text-[#8f909a] hover:text-white transition-colors">
            ← Exit admin
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          {children}
        </motion.div>
      </main>
    </div>
  );
}