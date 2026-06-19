import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Junta classes do Tailwind de forma segura (resolve conflitos).
 * Ex.: cn("p-2", condicao && "p-4") -> "p-4"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Gera um id único simples (suficiente para um MVP local). */
export function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/** Formata um valor em euros (€). */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

/** Formata uma data ISO para algo legível em PT (ex.: "19 jun"). */
export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("pt-PT", opts ?? { day: "numeric", month: "short" }).format(date);
}

/** Devolve a data de hoje em formato ISO curto (YYYY-MM-DD). */
export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Verifica se uma data ISO pertence ao mês/ano indicados (por omissão, o atual). */
export function isSameMonth(iso: string, ref = new Date()): boolean {
  const d = new Date(iso);
  return d.getMonth() === ref.getMonth() && d.getFullYear() === ref.getFullYear();
}

/** Verifica se uma data ISO pertence à semana atual (segunda a domingo). */
export function isThisWeek(iso: string, ref = new Date()): boolean {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return false;

  const start = new Date(ref);
  const day = (start.getDay() + 6) % 7; // 0 = segunda
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - day);

  const end = new Date(start);
  end.setDate(start.getDate() + 7);

  return d >= start && d < end;
}

/** Saudação consoante a hora do dia. */
export function greeting(ref = new Date()): string {
  const h = ref.getHours();
  if (h < 12) return "Bom dia";
  if (h < 20) return "Boa tarde";
  return "Boa noite";
}
