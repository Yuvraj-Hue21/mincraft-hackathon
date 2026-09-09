import type { Team } from "../../data/teams";

export function TeamCard({ team }: { team: Team }) {
  return (
    <div className="max-w-md">
      <div className="border border-[var(--color-stone)] bg-[var(--color-obsidian)]/60 p-6">
        <p className="font-display text-[10px] text-[var(--color-torch)] mb-2">YOUR TEAM</p>
        <h2 className="font-display text-lg text-[var(--color-parchment)]">{team.name}</h2>
        <p className="mt-2 text-xs text-[var(--color-stone-light)] uppercase font-display">{team.status}</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {team.members.map((m) => (
            <div
              key={m}
              className="flex items-center gap-2 border border-[var(--color-stone)] bg-[var(--color-void)] px-3 py-2"
            >
              <span>👤</span>
              <span className="text-sm text-[var(--color-parchment)] truncate">{m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
