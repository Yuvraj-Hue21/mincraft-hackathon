import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { TeamCard } from "../../components/dashboard/TeamCard";
import { teamsService } from "../../lib/services/participantsService";
import type { Team } from "../../data/teams";

export default function DashboardTeam() {
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    teamsService.myTeam().then(setTeam);
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-[var(--color-parchment)]">Team</h1>
      <hr className="my-8 border-[var(--color-stone)]" />
      {team && <TeamCard team={team} />}
    </DashboardLayout>
  );
}
