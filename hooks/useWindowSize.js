import { useEffect, useState } from 'react'

/**
 * Returns the width & height of the window size
 *
 * @returns [width, height]
 */
export default function useWindowSize() {
  const [size, setSize] = useState([0, 0])

  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}
