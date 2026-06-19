import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storage";
import { createId } from "@/lib/utils";
import { seedTasks } from "@/data/seed";
import type { Task, TaskFilter } from "@/types";

/** Campos editáveis de uma tarefa (sem id/createdAt, geridos pelo hook). */
export type TaskInput = Omit<Task, "id" | "createdAt" | "completed"> & {
  completed?: boolean;
};

/**
 * Hook que gere todas as tarefas: criar, editar, apagar e concluir.
 * Os dados ficam guardados no localStorage automaticamente.
 */
export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    STORAGE_KEYS.tasks,
    seedTasks(),
  );

  function addTask(input: TaskInput) {
    const task: Task = {
      ...input,
      id: createId(),
      completed: input.completed ?? false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [task, ...prev]);
  }

  function updateTask(id: string, patch: Partial<TaskInput>) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    );
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  /** Devolve as tarefas aplicando um filtro (todas/pendentes/concluídas). */
  function filtered(filter: TaskFilter) {
    if (filter === "pendentes") return tasks.filter((t) => !t.completed);
    if (filter === "concluidas") return tasks.filter((t) => t.completed);
    return tasks;
  }

  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.completed).length;
    return {
      total: tasks.length,
      completed,
      pending: tasks.length - completed,
    };
  }, [tasks]);

  return {
    tasks,
    stats,
    addTask,
    updateTask,
    toggleTask,
    removeTask,
    filtered,
  };
}
