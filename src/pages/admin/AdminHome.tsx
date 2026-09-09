import { AdminLayout } from "../../components/admin/AdminLayout";
import { StatCard } from "../../components/admin/StatCard";
import { ReleaseControl } from "../../components/admin/ReleaseControl";
import { useProblemsState } from "../../hooks/useProblemsState";
import { mockParticipants } from "../../data/participants";
import { mockTeams } from "../../data/teams";
import { mockAnnouncements } from "../../data/announcements";

export default function AdminHome() {
  const { problems, released, toggleRelease } = useProblemsState();

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold text-white">Overview</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <StatCard label="Participants" value={mockParticipants.length} />
        <StatCard label="Teams" value={mockTeams.length} />
        <StatCard label="Problems" value={problems.length} />
        <StatCard label="Announcements" value={mockAnnouncements.length} />
      </div>

      <div className="mt-8 flex items-center gap-3 text-sm text-[#8f909a]">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        World online
      </div>

      <div className="mt-8 max-w-sm">
        <ReleaseControl released={released} onToggle={toggleRelease} />
      </div>
    </AdminLayout>
  );
}
