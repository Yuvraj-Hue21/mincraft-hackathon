import { AdminLayout } from "../../components/admin/AdminLayout";

export default function AdminSettings() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold text-white mb-8">Settings</h1>
      <div className="max-w-lg border border-[#26272c] bg-[#15161a] p-6 text-sm text-[#8f909a] space-y-3">
        <p>Hackathon name, dates, and team-size limits will live here.</p>
        <p className="text-xs text-[#5f6068]">
          {/* TODO: Wire these fields to a Supabase `hackathon_settings` table. */}
          Frontend placeholder — not yet connected to any backend.
        </p>
      </div>
    </AdminLayout>
  );
}
