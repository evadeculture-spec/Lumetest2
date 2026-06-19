import { useMemo } from 'react';
import type { Task } from '@/types';
import { STORAGE_KEYS } from '@/lib/storage';
import { uid } from '@/lib/utils';
import { useLocalStorage } from './useLocalStorage';

/** Dados de uma tarefa sem os campos gerados automaticamente */
export type TaskInput = Omit<Task, 'id' | 'createdAt' | 'completed'> & {
  completed?: boolean;
};

/**
 * Gere a lista de tarefas (criar, editar, apagar, concluir).
 * Toda a lógica fica aqui — os componentes só chamam estas funções.
 */
export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEYS.tasks, []);

  const addTask = (input: TaskInput) => {
    const task: Task = {
      ...input,
      id: uid(),
      completed: input.completed ?? false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [task, ...prev]);
  };

  const updateTask = (id: string, patch: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Estatísticas derivadas, calculadas só quando a lista muda.
  const stats = useMemo(() => {
    const pending = tasks.filter((t) => !t.completed).length;
    const completed = tasks.length - pending;
    return { total: tasks.length, pending, completed };
  }, [tasks]);

  return { tasks, addTask, updateTask, toggleTask, removeTask, stats };
}
