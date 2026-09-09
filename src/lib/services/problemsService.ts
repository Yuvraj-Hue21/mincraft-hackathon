import { mockProblems, type Problem } from "../../data/problems";

// TODO: Replace this in-memory store with a Supabase table (`problems`).
// The function signatures below are the contract the UI depends on —
// keep them stable when swapping the implementation.

let _problems: Problem[] = [...mockProblems];

// TODO: Replace local release state with database-backed release state
// (e.g. a `hackathon_settings.problems_released` row, read via Supabase
// realtime so every participant's dashboard updates instantly).
let _problemsReleased = false;

export const problemsService = {
  async list(): Promise<Problem[]> {
    return _problems;
  },

  async isReleased(): Promise<boolean> {
    return _problemsReleased;
  },

  // Demo-only control. In production this should be an authenticated
  // admin action backed by row-level security, not a client-side flag.
  async setReleased(released: boolean): Promise<void> {
    _problemsReleased = released;
    _problems = _problems.map((p) => ({ ...p, status: released ? "released" : "draft" }));
  },

  async create(problem: Problem): Promise<void> {
    _problems = [..._problems, problem];
  },

  async remove(id: string): Promise<void> {
    _problems = _problems.filter((p) => p.id !== id);
  },
};
