import { useCallback, useEffect, useState } from 'react';
import { loadFromStorage, saveToStorage } from '@/lib/storage';

/**
 * Hook genérico que mantém um estado sincronizado com o localStorage.
 * Funciona como o useState normal, mas persiste automaticamente.
 *
 * Ex.: const [tasks, setTasks] = useLocalStorage('lume:tasks', []);
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => loadFromStorage(key, initialValue));

  // Sempre que o valor muda, guardamos no storage.
  useEffect(() => {
    saveToStorage(key, value);
  }, [key, value]);

  // Reset prático para repor valores (ex.: dados demo).
  const reset = useCallback(
    (next: T) => {
      setValue(next);
      saveToStorage(key, next);
    },
    [key],
  );

  return [value, setValue, reset] as const;
}
