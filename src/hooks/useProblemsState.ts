/* eslint-disable react/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import { problemsService } from "../lib/services/problemsService";
import type { Problem } from "../data/problems";

export function useProblemsState() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [released, setReleased] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const [list, isReleased] = await Promise.all([problemsService.list(), problemsService.isReleased()]);
    setProblems(list);
    setReleased(isReleased);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggleRelease = useCallback(
    async (value: boolean) => {
      await problemsService.setReleased(value);
      await refresh();
    },
    [refresh]
  );

  return { problems, released, loading, toggleRelease, refresh };
}
