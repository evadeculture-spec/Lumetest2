import { useMemo } from 'react';
import type { Workout } from '@/types';
import { STORAGE_KEYS } from '@/lib/storage';
import { isThisWeek, uid } from '@/lib/utils';
import { useLocalStorage } from './useLocalStorage';

export type WorkoutInput = Omit<Workout, 'id'>;

/**
 * Gere o histórico de treinos e calcula o resumo da semana.
 */
export function useWorkouts() {
  const [workouts, setWorkouts] = useLocalStorage<Workout[]>(
    STORAGE_KEYS.workouts,
    [],
  );

  const addWorkout = (input: WorkoutInput) => {
    const workout: Workout = { ...input, id: uid() };
    setWorkouts((prev) => [workout, ...prev]);
  };

  const updateWorkout = (id: string, patch: Partial<Workout>) => {
    setWorkouts((prev) => prev.map((w) => (w.id === id ? { ...w, ...patch } : w)));
  };

  const removeWorkout = (id: string) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  };

  // Histórico ordenado por data (mais recente primeiro).
  const sorted = useMemo(
    () =>
      [...workouts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [workouts],
  );

  // Resumo da semana atual.
  const weekSummary = useMemo(() => {
    const week = workouts.filter((w) => isThisWeek(w.date));
    const totalMinutes = week.reduce((sum, w) => sum + w.durationMin, 0);
    const totalCalories = week.reduce((sum, w) => sum + (w.calories ?? 0), 0);
    return { count: week.length, totalMinutes, totalCalories };
  }, [workouts]);

  return {
    workouts: sorted,
    addWorkout,
    updateWorkout,
    removeWorkout,
    weekSummary,
  };
}
