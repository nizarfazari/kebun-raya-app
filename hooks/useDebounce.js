import { useEffect, useState } from 'react'

/**
 * Debounces a fast changing state.
 *
 * For example, You can use it as a dependency of a useEffect so the callback will be executed after the timeout not when the state changes.
 *
 * @template T
 * @param {T} value
 * @param {Number} delay
 * @returns {T}
 */
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
