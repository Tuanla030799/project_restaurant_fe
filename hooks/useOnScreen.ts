import { useState, useEffect, RefObject } from 'react'

const useOnScreen = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>
) => {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    )

    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [])

  return isIntersecting
}

export default useOnScreen
