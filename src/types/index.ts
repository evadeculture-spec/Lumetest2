/*
  Modelo de dados da Lumé.
  Todos os tipos partilhados pela app vivem aqui, para haver uma única
  fonte de verdade. Quando no futuro ligarmos a uma base de dados,
  estes tipos continuam a servir de contrato.
*/

// ---------- Tarefas ----------

export type Priority = "baixa" | "media" | "alta";

export type TaskFilter = "todas" | "pendentes" | "concluidas";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  category?: string;
  dueDate?: string; // ISO (YYYY-MM-DD)
  completed: boolean;
  createdAt: string; // ISO datetime
}

// ---------- Finanças ----------

export type TransactionType = "receita" | "despesa";

export type FinanceCategory =
  | "Alimentação"
  | "Casa"
  | "Transporte"
  | "Saúde"
  | "Lazer"
  | "Compras"
  | "Trabalho"
  | "Outros";

export type PaymentMethod =
  | "Dinheiro"
  | "Multibanco"
  | "MB Way"
  | "Cartão"
  | "Transferência";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number; // sempre positivo; o "type" indica entrada/saída
  category: FinanceCategory;
  description: string;
  date: string; // ISO (YYYY-MM-DD)
  method?: PaymentMethod;
}

// ---------- Treinos ----------

export type WorkoutType =
  | "força"
  | "cardio"
  | "ciclismo"
  | "caminhada"
  | "pilates"
  | "outro";

export type Intensity = "baixa" | "media" | "alta";

export interface Workout {
  id: string;
  type: WorkoutType;
  duration: number; // minutos
  intensity: Intensity;
  notes?: string;
  date: string; // ISO (YYYY-MM-DD)
  calories?: number;
  distance?: number; // km
}
