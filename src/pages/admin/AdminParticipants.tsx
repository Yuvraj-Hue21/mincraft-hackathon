import { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { DataTable, type Column } from "../../components/admin/DataTable";
import { mockParticipants, type Participant } from "../../data/participants";
import { toast } from "../../components/effects/toastEvents";

export default function AdminParticipants() {
  const [query, setQuery] = useState("");
  const filtered = mockParticipants.filter(
    (p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.id.toLowerCase().includes(query.toLowerCase())
  );

  const columns: Column<Participant>[] = [
    { key: "id", label: "ID", render: (p) => <span className="text-white">{p.id}</span> },
    { key: "name", label: "Name", render: (p) => p.name },
    { key: "team", label: "Team", render: (p) => p.team },
    {
      key: "status",
      label: "Status",
      render: (p) => (
        <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded">
          <span className={`w-1.5 h-1.5 rounded-full ${p.status === "active" ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
          <span className={p.status === "active" ? "text-emerald-400" : "text-red-400"}>{p.status.toUpperCase()}</span>
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (p) => (
        <div className="flex gap-3 text-xs">
          <button
            onClick={() => toast(`Viewing ${p.name}`, { type: "info", icon: "👤" })}
            className="text-[#5b8def] hover:underline"
          >
            View
          </button>
          <button
            onClick={() => toast(`${p.name} updated`, { type: "success", icon: "✏️" })}
            className="text-[#8f909a] hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => toast(p.status === "active" ? `${p.name} disabled` : `${p.name} enabled`, { type: "info", icon: "🛡️" })}
            className={p.status === "active" ? "text-red-400 hover:underline" : "text-emerald-400 hover:underline"}
          >
            {p.status === "active" ? "Disable" : "Enable"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold text-white mb-8">Participants</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full max-w-sm mb-6 bg-[#15161a] border border-[#26272c] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#5b8def] rounded-md"
      />
      <DataTable columns={columns} rows={filtered} />
    </AdminLayout>
  );
}
