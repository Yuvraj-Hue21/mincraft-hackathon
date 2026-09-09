export interface Announcement {
  id: string;
  icon: string;
  title: string;
  body: string;
  timestamp: string;
  published: boolean;
}

export const mockAnnouncements: Announcement[] = [
  {
    id: "A001",
    icon: "📢",
    title: "Hackathon starts tomorrow",
    body: "Check-in opens at 8:00 AM. Bring your ID badge and laptop charger.",
    timestamp: "2026-09-08 18:00",
    published: true,
  },
  {
    id: "A002",
    icon: "⚡",
    title: "Problem statements release at opening",
    body: "Problems unlock the moment the opening ceremony ends. Watch the dashboard.",
    timestamp: "2026-09-08 12:00",
    published: true,
  },
  {
    id: "A003",
    icon: "🔥",
    title: "Checkpoint at 12 hours",
    body: "A mentor will check in with every team at the 12-hour mark. Have something to show.",
    timestamp: "2026-09-07 09:00",
    published: true,
  },
  {
    id: "A004",
    icon: "🏆",
    title: "Results at the final ceremony",
    body: "Winners are announced live. All teams must be present.",
    timestamp: "2026-09-06 15:30",
    published: true,
  },
];
