import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { LockedChest } from "../../components/dashboard/LockedChest";
import { ProblemCard } from "../../components/dashboard/ProblemCard";
import { useProblemsState } from "../../hooks/useProblemsState";

export default function DashboardProblems() {
  const { problems, released, loading } = useProblemsState();

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-[var(--color-parchment)]">Problem Statements</h1>
      <hr className="my-8 border-[var(--color-stone)]" />

      {!loading && !released && <LockedChest released={false} />}

      {!loading && released && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <ProblemCard key={p.id} problem={p} index={i} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
