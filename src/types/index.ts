// =============================================================
// Tipos centrais da app. Tudo o que é "dado" passa por aqui.
// Mantém isto bem definido para o resto da app ficar seguro.
// =============================================================

/** Páginas/áreas principais da navegação */
export type PageKey = 'dashboard' | 'tasks' | 'finance' | 'workouts' | 'settings';

// ---------- Tarefas ----------
export type Priority = 'baixa' | 'média' | 'alta';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  category?: string;
  /** Data limite em formato ISO (yyyy-mm-dd) */
  dueDate?: string;
  completed: boolean;
  /** Data de criação em ISO */
  createdAt: string;
}

// ---------- Finanças ----------
export type TransactionType = 'receita' | 'despesa';

export interface Transaction {
  id: string;
  type: TransactionType;
  /** Valor sempre positivo; o sinal vem do `type` */
  amount: number;
  category: string;
  description?: string;
  /** Data do movimento em ISO (yyyy-mm-dd) */
  date: string;
  paymentMethod?: string;
}

// ---------- Treinos ----------
export type WorkoutType =
  | 'força'
  | 'cardio'
  | 'ciclismo'
  | 'caminhada'
  | 'pilates'
  | 'outro';

export type Intensity = 'baixa' | 'média' | 'alta';

export interface Workout {
  id: string;
  type: WorkoutType;
  /** Duração em minutos */
  durationMin: number;
  intensity: Intensity;
  notes?: string;
  /** Data do treino em ISO (yyyy-mm-dd) */
  date: string;
  calories?: number;
  /** Distância em km */
  distanceKm?: number;
}
