import { useEffect } from 'react'

const confirmMessage = 'You have unsaved changes. Continue?'

const useUnload = (isDirty: boolean) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = confirmMessage
      return confirmMessage
    }

    if (isDirty) {
      window.addEventListener('beforeunload', handleBeforeUnload)
    } else {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isDirty])
}

export default useUnload
