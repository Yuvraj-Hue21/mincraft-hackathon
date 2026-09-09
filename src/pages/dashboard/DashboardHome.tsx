import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { LockedChest } from "../../components/dashboard/LockedChest";
import { ProblemCard } from "../../components/dashboard/ProblemCard";
import { useProblemsState } from "../../hooks/useProblemsState";
import { participantsService, teamsService } from "../../lib/services/participantsService";
import type { Participant } from "../../data/participants";
import type { Team } from "../../data/teams";

export default function DashboardHome() {
  const { problems, released, loading, toggleRelease } = useProblemsState();
  const [me, setMe] = useState<Participant | null>(null);
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    participantsService.me().then(setMe);
    teamsService.myTeam().then(setTeam);
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-[var(--color-parchment)]">
        Welcome back{me ? `, ${me.name.split(" ")[0]}` : ""}
      </h1>
      {team && me && (
        <p className="mt-2 text-sm text-[var(--color-stone-light)]">
          Team: <span className="text-[var(--color-parchment)]">{team.name}</span> · ID:{" "}
          <span className="text-[var(--color-parchment)]">{me.id}</span>
        </p>
      )}

      <hr className="my-8 border-[var(--color-stone)]" />

      {!loading && (
        <>
          <LockedChest released={released} />
          {released && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {problems.map((p, i) => (
                <ProblemCard key={p.id} problem={p} index={i} />
              ))}
            </div>
          )}

          {/* Frontend demonstration only — real release control lives on
              the admin side. This just proves the locked/unlocked UI works
              end-to-end against the shared service layer. */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => toggleRelease(!released)}
              className="font-display text-[9px] uppercase px-4 py-2 border border-dashed border-[var(--color-stone-light)] text-[var(--color-stone-light)] hover:text-[var(--color-parchment)] hover:border-[var(--color-parchment)]"
            >
              [ Demo: {released ? "Re-lock" : "Release"} Problems ]
            </button>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
