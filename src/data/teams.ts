export interface Team {
  id: string;
  name: string;
  members: string[];
  status: "active" | "disqualified";
}

export const mockTeam: Team = {
  id: "T001",
  name: "Creeper Coders",
  members: ["Alex Kumar", "Rahul Mehta", "Priya Sharma", "Arjun Nair"],
  status: "active",
};

export const mockTeams: Team[] = [
  { id: "T001", name: "Creeper Coders", members: ["Alex", "Rahul", "Priya", "Arjun"], status: "active" },
  { id: "T002", name: "Redstone Rangers", members: ["Sneha", "Kabir"], status: "active" },
  { id: "T003", name: "End Enders", members: ["Meera", "Dev", "Ishaan"], status: "active" },
  { id: "T004", name: "Nether Ninjas", members: ["Zoya", "Farhan", "Aditi", "Rohan"], status: "active" },
];
