import { useEffect, RefObject } from 'react'

type Event = MouseEvent | TouchEvent

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
  hasOnClickOutside: boolean = true
) => {
  useEffect(() => {
    if (!hasOnClickOutside) return
    const listener = (event: Event) => {
      const element = ref?.current

      if (event.which !== 1) return

      if (!element || element.contains((event?.target as Node) || null)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler, hasOnClickOutside])
}

export default useOnClickOutside
