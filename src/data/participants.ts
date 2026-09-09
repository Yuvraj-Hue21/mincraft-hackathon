export type ParticipantStatus = "active" | "disabled";

export interface Participant {
  id: string;
  name: string;
  team: string;
  email: string;
  status: ParticipantStatus;
}

export const mockParticipant: Participant = {
  id: "HACK-042",
  name: "Alex Kumar",
  team: "Creeper Coders",
  email: "alex.kumar@example.edu",
  status: "active",
};

export const mockParticipants: Participant[] = [
  { id: "HACK-001", name: "Alex Kumar", team: "Creeper Coders", email: "alex@example.edu", status: "active" },
  { id: "HACK-002", name: "Rahul Mehta", team: "Team Alpha", email: "rahul@example.edu", status: "active" },
  { id: "HACK-003", name: "Priya Sharma", team: "Team Beta", email: "priya@example.edu", status: "active" },
  { id: "HACK-004", name: "Arjun Nair", team: "Team Gamma", email: "arjun@example.edu", status: "disabled" },
  { id: "HACK-005", name: "Sneha Rao", team: "Redstone Rangers", email: "sneha@example.edu", status: "active" },
  { id: "HACK-006", name: "Kabir Singh", team: "Redstone Rangers", email: "kabir@example.edu", status: "active" },
  { id: "HACK-007", name: "Meera Iyer", team: "End Enders", email: "meera@example.edu", status: "active" },
  { id: "HACK-008", name: "Dev Patel", team: "End Enders", email: "dev@example.edu", status: "disabled" },
];
