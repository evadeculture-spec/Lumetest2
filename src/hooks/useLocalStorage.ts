import { useCallback, useEffect, useState } from "react";
import { readStorage, writeStorage } from "@/lib/storage";

/**
 * Hook genérico que sincroniza um estado React com o localStorage.
 *
 * Funciona como o useState normal, mas:
 *  - lê o valor inicial do localStorage (ou usa o `initialValue`);
 *  - sempre que o valor muda, grava-o automaticamente.
 *
 * @param key   chave de armazenamento (sem prefixo)
 * @param initialValue valor usado quando ainda não há nada guardado
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => readStorage(key, initialValue));

  // Sempre que o valor muda, persistimos no localStorage.
  useEffect(() => {
    writeStorage(key, value);
  }, [key, value]);

  // Versão estável de setValue (útil em dependências de outros hooks).
  const update = useCallback(
    (next: T | ((prev: T) => T)) => setValue(next),
    [],
  );

  return [value, update] as const;
}
