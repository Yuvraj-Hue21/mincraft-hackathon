import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MinecraftButton } from "../components/minecraft/MinecraftButton";
import { authService, type Role } from "../lib/services/authService";
import { useScramble } from "../animhooks/useScramble";
import { ImageBackdrop } from "../components/sections/sectionBg";
import min5 from "../assets/min5.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("participant");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const kickerRef = useScramble<HTMLParagraphElement>();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await authService.login(id, password, role);
    navigate(role === "admin" ? "/admin" : "/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-void)] px-6 py-16 overflow-hidden relative">
      <ImageBackdrop sources={[min5]} opacity={0.35} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Link to="/" className="font-display text-[10px] text-[var(--color-stone-light)] hover:text-[var(--color-parchment)] transition-colors">
          ← back to world
        </Link>

        <div className="mt-8 border border-[var(--color-stone)] bg-[var(--color-obsidian)]/90 backdrop-blur p-8">
          <p ref={kickerRef} className="font-display text-[10px] text-[var(--color-torch)] mb-6">ENTER THE HACKATHON</p>

          <div className="flex gap-2 mb-8">
            {(["participant", "admin"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2.5 text-xs font-display uppercase border transition-all duration-300 ${
                  role === r
                    ? "border-[var(--color-torch)] text-[var(--color-torch)] bg-[var(--color-torch)]/10"
                    : "border-[var(--color-stone)] text-[var(--color-stone-light)] hover:border-[var(--color-stone-light)]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="participant-id" className="block text-xs text-[var(--color-stone-light)] mb-2">
                {role === "admin" ? "Admin ID" : "Participant ID"}
              </label>
              <input
                id="participant-id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="HACK-042"
                className="w-full bg-[var(--color-void)] border border-[var(--color-stone)] px-4 py-3 text-sm text-[var(--color-parchment)] focus:outline-none focus:border-[var(--color-torch)] transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs text-[var(--color-stone-light)] mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[var(--color-void)] border border-[var(--color-stone)] px-4 py-3 text-sm text-[var(--color-parchment)] focus:outline-none focus:border-[var(--color-torch)] transition-colors"
                required
              />
            </div>
            <MinecraftButton type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Entering..." : "Enter World"}
            </MinecraftButton>
          </form>

          <p className="mt-6 text-[11px] text-[var(--color-stone-light)] text-center">
            Demo only — any ID/password combination signs you in as the selected role.
          </p>
        </div>
      </motion.div>
    </div>
  );
}