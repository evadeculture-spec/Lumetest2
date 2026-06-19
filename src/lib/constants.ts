/*
  Listas e "etiquetas" reutilizadas nos formulários e nos cartões.
  Centralizar aqui evita repetir strings pela app e facilita traduções.
*/
import type {
  FinanceCategory,
  Intensity,
  PaymentMethod,
  Priority,
  WorkoutType,
} from "@/types";

export const PRIORITIES: { value: Priority; label: string }[] = [
  { value: "baixa", label: "Baixa" },
  { value: "media", label: "Média" },
  { value: "alta", label: "Alta" },
];

export const FINANCE_CATEGORIES: FinanceCategory[] = [
  "Alimentação",
  "Casa",
  "Transporte",
  "Saúde",
  "Lazer",
  "Compras",
  "Trabalho",
  "Outros",
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  "Dinheiro",
  "Multibanco",
  "MB Way",
  "Cartão",
  "Transferência",
];

export const WORKOUT_TYPES: { value: WorkoutType; label: string }[] = [
  { value: "força", label: "Força" },
  { value: "cardio", label: "Cardio" },
  { value: "ciclismo", label: "Ciclismo" },
  { value: "caminhada", label: "Caminhada" },
  { value: "pilates", label: "Pilates" },
  { value: "outro", label: "Outro" },
];

export const INTENSITIES: { value: Intensity; label: string }[] = [
  { value: "baixa", label: "Baixa" },
  { value: "media", label: "Média" },
  { value: "alta", label: "Alta" },
];

/** Cores (classes Tailwind) associadas a cada prioridade de tarefa. */
export const PRIORITY_STYLES: Record<Priority, string> = {
  baixa: "bg-sage-soft text-sage",
  media: "bg-gold-soft text-gold",
  alta: "bg-rose-soft text-rose",
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
};

/** Ícone (nome lucide) sugerido por tipo de treino — usado nos cartões. */
export const WORKOUT_ICONS: Record<WorkoutType, string> = {
  força: "Dumbbell",
  cardio: "HeartPulse",
  ciclismo: "Bike",
  caminhada: "Footprints",
  pilates: "Flower2",
  outro: "Activity",
};
