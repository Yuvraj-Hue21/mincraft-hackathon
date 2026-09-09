export interface TimelineStep {
  id: string;
  label: string;
  time: string;
  description: string;
}

export const mockTimeline: TimelineStep[] = [
  { id: "t1", label: "Registration", time: "Aug 20 – Sep 5", description: "Sign up solo or with a team of up to 4." },
  { id: "t2", label: "Opening", time: "Sep 12, 9:00 AM", description: "Kickoff ceremony and rules briefing." },
  { id: "t3", label: "Problem Release", time: "Sep 12, 10:00 AM", description: "Challenges unlock on every dashboard." },
  { id: "t4", label: "Hacking", time: "Sep 12 – 14", description: "48 hours to design, build, and break things." },
  { id: "t5", label: "Checkpoint", time: "Sep 13, 10:00 AM", description: "Mentors review progress with every team." },
  { id: "t6", label: "Submission", time: "Sep 14, 9:00 AM", description: "Final builds and demo videos are due." },
  { id: "t7", label: "Evaluation", time: "Sep 14, 10:00 AM – 1:00 PM", description: "Judges review and score submissions." },
  { id: "t8", label: "Results", time: "Sep 14, 2:00 PM", description: "Winners announced at the closing ceremony." },
];
