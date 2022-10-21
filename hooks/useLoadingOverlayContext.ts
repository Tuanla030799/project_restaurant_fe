import { useContext } from 'react'
import { LoadingOverlayContext } from 'providers/LoadingOverlay'

const useLoadingOverlayContext = () => {
  const loading = useContext(LoadingOverlayContext)

  if (!loading) {
    throw new Error(
      'useLoadingOverlayContext must be used within LoadingOverlayProvider'
    )
  }

  return loading
}

export default useLoadingOverlayContext
