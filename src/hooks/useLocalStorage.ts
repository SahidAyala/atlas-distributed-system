import { useState } from 'react'

/**
 * useState backed by localStorage. Reads initial value from storage on mount,
 * persists every update. Falls back to `initialValue` on parse failure.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      console.warn(`useLocalStorage: failed to persist key "${key}"`)
    }
  }

  return [storedValue, setValue]
}
