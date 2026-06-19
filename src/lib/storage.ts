// =============================================================
// Camada de armazenamento. Hoje usa localStorage.
// No futuro, basta trocar estas funções por chamadas a uma API
// (Supabase/Firebase) — o resto da app não precisa de mudar.
// =============================================================

/** Prefixo das chaves para não colidir com outras apps no mesmo domínio */
const PREFIX = 'lume:';

export const STORAGE_KEYS = {
  tasks: `${PREFIX}tasks`,
  transactions: `${PREFIX}transactions`,
  workouts: `${PREFIX}workouts`,
  seeded: `${PREFIX}seeded`,
} as const;

/** Lê e faz parse de um valor; devolve `fallback` se não existir ou falhar */
export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Guarda um valor (serializado em JSON) */
export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Em modo privado o storage pode estar bloqueado — ignoramos em silêncio.
  }
}

/** Apaga todos os dados da app */
export function clearAllStorage(): void {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
}
