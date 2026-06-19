/*
  Pequena camada de acesso ao localStorage.
  Isolar isto aqui torna trivial, no futuro, trocar o localStorage por
  uma API/base de dados sem mexer no resto da app.
*/

/** Prefixo para evitar colisões com outras apps no mesmo domínio. */
const PREFIX = "lume:";

export const STORAGE_KEYS = {
  tasks: "tasks",
  transactions: "transactions",
  workouts: "workouts",
} as const;

/** Lê e desserializa um valor. Devolve `fallback` se não existir ou falhar. */
export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Serializa e guarda um valor. */
export function writeStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Em modo privado, ou com storage cheio, falha silenciosamente.
  }
}
