import { AdminLayout } from "../../components/admin/AdminLayout";
import { DataTable, type Column } from "../../components/admin/DataTable";
import { ReleaseControl } from "../../components/admin/ReleaseControl";
import { useProblemsState } from "../../hooks/useProblemsState";
import { toast } from "../../components/effects/toastEvents";
import type { Problem } from "../../data/problems";

export default function AdminProblems() {
  const { problems, released, toggleRelease } = useProblemsState();

  const columns: Column<Problem>[] = [
    { key: "title", label: "Problem", render: (p) => <span className="text-white">{p.title}</span> },
    { key: "category", label: "Category", render: (p) => p.category },
    {
      key: "status",
      label: "Status",
      render: (p) => (
        <span
          className={`text-xs px-2 py-1 rounded ${
            p.status === "released" ? "bg-emerald-400/10 text-emerald-400" : "bg-amber-400/10 text-amber-400"
          }`}
        >
          {p.status.toUpperCase()}
        </span>
      ),
    },
    { key: "createdAt", label: "Created", render: (p) => p.createdAt },
    {
      key: "actions",
      label: "Actions",
      render: () => (
        <div className="flex gap-3 text-xs">
          <button onClick={() => toast("Problem saved", { type: "success", icon: "💾" })} className="text-[#5b8def] hover:underline">
            Edit
          </button>
          <button onClick={() => toast("Previewing problem", { type: "info", icon: "👁️" })} className="text-[#8f909a] hover:underline">
            Preview
          </button>
          <button onClick={() => toast("Problem deleted", { type: "error", icon: "🗑️" })} className="text-red-400 hover:underline">
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-white">Problems</h1>
        <button
          onClick={() => toast("Problem created", { type: "success", icon: "➕" })}
          className="px-4 py-2 text-sm bg-[#5b8def] text-white rounded-md hover:bg-[#4a7ee0] transition-colors"
        >
          Create
        </button>
      </div>

      <div className="max-w-xs mb-8">
        <ReleaseControl released={released} onToggle={toggleRelease} />
      </div>

      <DataTable columns={columns} rows={problems} />
    </AdminLayout>
  );
}
