import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Junta classes do Tailwind de forma segura (sem conflitos).
 * Ex.: cn('p-2', condicao && 'bg-rose')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Gera um id único (com fallback para browsers antigos) */
export function uid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** Formata um número como euros (pt-PT) */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}

/** Data ISO -> "12 jun" */
export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: 'short',
  });
}

/** Data ISO -> "quinta, 12 de junho" */
export function formatDateLong(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-PT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

/** Devolve a data de hoje em formato ISO curto (yyyy-mm-dd) */
export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Verifica se uma data ISO está no mês/ano indicados */
export function isSameMonth(iso: string, ref: Date = new Date()): boolean {
  const d = new Date(iso);
  return d.getMonth() === ref.getMonth() && d.getFullYear() === ref.getFullYear();
}

/** Verifica se uma data ISO cai na semana atual (segunda a domingo) */
export function isThisWeek(iso: string, ref: Date = new Date()): boolean {
  const d = new Date(iso);
  const start = new Date(ref);
  const day = (start.getDay() + 6) % 7; // segunda = 0
  start.setDate(start.getDate() - day);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 7);
  return d >= start && d < end;
}

/** Saudação consoante a hora do dia */
export function greeting(ref: Date = new Date()): string {
  const h = ref.getHours();
  if (h < 6) return 'Boa madrugada';
  if (h < 13) return 'Bom dia';
  if (h < 20) return 'Boa tarde';
  return 'Boa noite';
}
