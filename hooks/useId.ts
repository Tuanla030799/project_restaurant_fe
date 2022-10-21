import React from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

let id = 0
function generateId() {
  return ++id
}

const useId =
  React.useId ??
  function useId() {
    const [id, setId] = React.useState(generateId)

    useIsomorphicLayoutEffect(() => {
      if (id === null) setId(generateId())
    }, [id])

    return id !== null ? '' + id : undefined
  }

export default useId
