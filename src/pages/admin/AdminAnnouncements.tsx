import { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { mockAnnouncements, type Announcement } from "../../data/announcements";
import { toast } from "../../components/effects/toastEvents";

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handlePublish() {
    if (!title.trim() || !content.trim()) return;
    // TODO: Replace with a Supabase insert into `announcements`.
    const next: Announcement = {
      id: `A${Date.now()}`,
      icon: "📢",
      title,
      body: content,
      timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
      published: true,
    };
    setAnnouncements([next, ...announcements]);
    setTitle("");
    setContent("");
    toast("Announcement published", { type: "success", icon: "📢" });
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold text-white mb-8">Announcements</h1>

      <div className="max-w-lg border border-[#26272c] bg-[#15161a] p-6 mb-10">
        <p className="text-sm font-medium text-white mb-4">Create Announcement</p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full mb-3 bg-[#0d0e11] border border-[#26272c] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#5b8def] rounded-md"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={3}
          className="w-full mb-4 bg-[#0d0e11] border border-[#26272c] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#5b8def] rounded-md resize-none"
        />
        <button
          onClick={handlePublish}
          className="px-4 py-2 text-sm bg-[#5b8def] text-white rounded-md hover:bg-[#4a7ee0]"
        >
          Publish
        </button>
      </div>

      <div className="space-y-3 max-w-lg">
        {announcements.map((a) => (
          <div key={a.id} className="border border-[#26272c] bg-[#15161a] p-4">
            <p className="text-sm font-medium text-white">{a.title}</p>
            <p className="text-sm text-[#8f909a] mt-1">{a.body}</p>
            <p className="text-xs text-[#5f6068] mt-2">{a.timestamp}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
