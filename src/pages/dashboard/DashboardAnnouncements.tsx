import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { AnnouncementCard } from "../../components/dashboard/AnnouncementCard";
import { announcementsService } from "../../lib/services/participantsService";
import type { Announcement } from "../../data/announcements";

export default function DashboardAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    announcementsService.list().then(setAnnouncements);
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-[var(--color-parchment)]">Announcements</h1>
      <hr className="my-8 border-[var(--color-stone)]" />
      <div className="space-y-4 max-w-2xl">
        {announcements.map((a) => (
          <AnnouncementCard key={a.id} announcement={a} />
        ))}
      </div>
    </DashboardLayout>
  );
}
