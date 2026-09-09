export type ProblemStatus = "draft" | "released";

export interface Problem {
  id: string;
  code: string;
  title: string;
  category: "AI/ML" | "Robotics" | "Web" | "Sustainability" | "FinTech" | "Education";
  status: ProblemStatus;
  summary: string;
  description: string;
  createdAt: string;
}

export const mockProblems: Problem[] = [
  {
    id: "P001",
    code: "01",
    title: "Smart Emergency Assistant",
    category: "AI/ML",
    status: "draft",
    summary: "Build an intelligent system that triages emergency calls and routes help faster.",
    description:
      "Design a system that listens to (simulated) emergency call transcripts, classifies severity, and recommends the nearest available responder. Bonus points for explainable triage decisions and a responder-facing dashboard.",
    createdAt: "2026-09-01",
  },
  {
    id: "P002",
    code: "02",
    title: "Campus Navigator",
    category: "Web",
    status: "draft",
    summary: "A wayfinding web app for a sprawling, confusing campus.",
    description:
      "Build a web app that helps new students find classrooms, offices, and events across a large campus, including indoor routing and accessibility-aware paths.",
    createdAt: "2026-09-01",
  },
  {
    id: "P003",
    code: "03",
    title: "Autonomous Warehouse Scout",
    category: "Robotics",
    status: "draft",
    summary: "Plan safe, efficient paths for a fleet of warehouse robots.",
    description:
      "Simulate a fleet of robots navigating a warehouse floor, avoiding collisions, and re-routing around blocked aisles in real time.",
    createdAt: "2026-09-02",
  },
  {
    id: "P004",
    code: "04",
    title: "Micro-Grid Balancer",
    category: "Sustainability",
    status: "draft",
    summary: "Balance renewable energy supply and demand for a small community grid.",
    description:
      "Build a tool that forecasts solar/wind output and household demand, then recommends load-shifting to reduce grid strain and cost.",
    createdAt: "2026-09-02",
  },
  {
    id: "P005",
    code: "05",
    title: "Micro-Investment Coach",
    category: "FinTech",
    status: "draft",
    summary: "Help first-time investors build a habit, safely.",
    description:
      "Create a guided micro-investing experience for students with plain-language risk explanations and simulated portfolios (no real money, no real brokerage integration).",
    createdAt: "2026-09-03",
  },
  {
    id: "P006",
    code: "06",
    title: "Adaptive Study Companion",
    category: "Education",
    status: "draft",
    summary: "A study tool that adjusts to how a student is actually learning.",
    description:
      "Build a spaced-repetition study tool that adapts question difficulty and format based on a learner's recent performance and stated confidence.",
    createdAt: "2026-09-03",
  },
];
