import { AdminLayout } from "../../components/admin/AdminLayout";
import { DataTable, type Column } from "../../components/admin/DataTable";
import { mockTeams, type Team } from "../../data/teams";

export default function AdminTeams() {
  const columns: Column<Team>[] = [
    { key: "name", label: "Team", render: (t) => <span className="text-white">{t.name}</span> },
    { key: "members", label: "Members", render: (t) => t.members.join(", ") },
    { key: "count", label: "Size", render: (t) => t.members.length },
    {
      key: "status",
      label: "Status",
      render: (t) => (
        <span
          className={`text-xs px-2 py-1 rounded ${
            t.status === "active" ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"
          }`}
        >
          {t.status.toUpperCase()}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold text-white mb-8">Teams</h1>
      <DataTable columns={columns} rows={mockTeams} />
    </AdminLayout>
  );
}
