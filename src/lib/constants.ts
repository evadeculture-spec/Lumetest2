import type {
  Intensity,
  Priority,
  TransactionType,
  WorkoutType,
} from '@/types';

// Listas reutilizadas nos formulários e nos badges.

export const TASK_CATEGORIES = [
  'Pessoal',
  'Trabalho',
  'Casa',
  'Saúde',
  'Estudo',
  'Outros',
] as const;

export const FINANCE_CATEGORIES = [
  'Alimentação',
  'Casa',
  'Transporte',
  'Saúde',
  'Lazer',
  'Compras',
  'Trabalho',
  'Outros',
] as const;

export const PAYMENT_METHODS = [
  'Cartão',
  'Dinheiro',
  'MB Way',
  'Transferência',
  'Outro',
] as const;

export const PRIORITIES: Priority[] = ['baixa', 'média', 'alta'];

export const TRANSACTION_TYPES: TransactionType[] = ['receita', 'despesa'];

export const WORKOUT_TYPES: WorkoutType[] = [
  'força',
  'cardio',
  'ciclismo',
  'caminhada',
  'pilates',
  'outro',
];

export const INTENSITIES: Intensity[] = ['baixa', 'média', 'alta'];

// Cores associadas (classes Tailwind) para badges consistentes.
export const PRIORITY_STYLES: Record<Priority, string> = {
  baixa: 'bg-sage-soft text-sage',
  média: 'bg-gold-soft text-gold',
  alta: 'bg-rose-soft text-rose',
};

export const INTENSITY_STYLES: Record<Intensity, string> = {
  baixa: 'bg-sage-soft text-sage',
  média: 'bg-gold-soft text-gold',
  alta: 'bg-rose-soft text-rose',
};
