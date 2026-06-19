import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storage";
import { createId, isThisWeek } from "@/lib/utils";
import { seedWorkouts } from "@/data/seed";
import type { Workout } from "@/types";

export type WorkoutInput = Omit<Workout, "id">;

/**
 * Hook que gere os treinos e calcula o resumo da semana.
 */
export function useWorkouts() {
  const [workouts, setWorkouts] = useLocalStorage<Workout[]>(
    STORAGE_KEYS.workouts,
    seedWorkouts(),
  );

  function addWorkout(input: WorkoutInput) {
    const workout: Workout = { ...input, id: createId() };
    setWorkouts((prev) => [workout, ...prev]);
  }

  function updateWorkout(id: string, patch: Partial<WorkoutInput>) {
    setWorkouts((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...patch } : w)),
    );
  }

  function removeWorkout(id: string) {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  }

  // Histórico ordenado por data (mais recentes primeiro).
  const sorted = useMemo(
    () => [...workouts].sort((a, b) => b.date.localeCompare(a.date)),
    [workouts],
  );

  // Resumo da semana atual.
  const weekSummary = useMemo(() => {
    const week = workouts.filter((w) => isThisWeek(w.date));
    return {
      count: week.length,
      minutes: week.reduce((sum, w) => sum + w.duration, 0),
      calories: week.reduce((sum, w) => sum + (w.calories ?? 0), 0),
    };
  }, [workouts]);

  return {
    workouts: sorted,
    weekSummary,
    addWorkout,
    updateWorkout,
    removeWorkout,
  };
}
