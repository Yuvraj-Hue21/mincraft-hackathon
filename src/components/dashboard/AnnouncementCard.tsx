import type { Announcement } from "../../data/announcements";

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  return (
    <div className="flex gap-4 p-5 border border-[var(--color-stone)] bg-[var(--color-obsidian)]/60">
      <span className="text-xl leading-none">{announcement.icon}</span>
      <div>
        <h3 className="font-medium text-[var(--color-parchment)]">{announcement.title}</h3>
        <p className="mt-1 text-sm text-[var(--color-stone-light)]">{announcement.body}</p>
        <p className="mt-2 text-[10px] font-display text-[var(--color-stone-light)]">{announcement.timestamp}</p>
      </div>
    </div>
  );
}
