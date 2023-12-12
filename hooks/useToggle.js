import { useState } from 'react'

/**
 * Returns the opposite value by the given parameter
 *
 * Useful when you have a toggle button, e.g., show/hide modal, nav hamburger.
 *
 * @param {Boolean} defaultValue
 */
export default function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue)

  const toggleValue = value => {
    setValue(currentValue =>
      typeof value === 'boolean' ? value : !currentValue
    )
  }

  return [value, toggleValue]
}
