import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { PageTransition } from "./components/effects/PageTransition";

const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));
const DashboardProblems = lazy(() => import("./pages/dashboard/DashboardProblems"));
const DashboardAnnouncements = lazy(() => import("./pages/dashboard/DashboardAnnouncements"));
const DashboardTeam = lazy(() => import("./pages/dashboard/DashboardTeam"));
const AdminHome = lazy(() => import("./pages/admin/AdminHome"));
const AdminParticipants = lazy(() => import("./pages/admin/AdminParticipants"));
const AdminTeams = lazy(() => import("./pages/admin/AdminTeams"));
const AdminProblems = lazy(() => import("./pages/admin/AdminProblems"));
const AdminAnnouncements = lazy(() => import("./pages/admin/AdminAnnouncements"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

export default function App() {
  return (
    <PageTransition>
      <Suspense fallback={<div className="min-h-screen bg-[var(--color-void)]" />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/problems" element={<DashboardProblems />} />
          <Route path="/dashboard/announcements" element={<DashboardAnnouncements />} />
          <Route path="/dashboard/team" element={<DashboardTeam />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/participants" element={<AdminParticipants />} />
          <Route path="/admin/teams" element={<AdminTeams />} />
          <Route path="/admin/problems" element={<AdminProblems />} />
          <Route path="/admin/announcements" element={<AdminAnnouncements />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Routes>
      </Suspense>
    </PageTransition>
  );
}
