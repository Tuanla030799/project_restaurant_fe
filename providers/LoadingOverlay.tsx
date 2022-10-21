import React, { ReactNode, useEffect, useState } from 'react'
import { LoadingOverlay } from '@/components'

export const LoadingOverlayContext = React.createContext<any>(null)

const LoadingOverlayProvider = ({ children }: { children: ReactNode }) => {
  const [loadingOverlay, setLoadingOverlay] = useState<boolean>(false)

  useEffect(() => {
    if (loadingOverlay) {
      document.body.style.maxHeight = '100vh'
      document.body.style.overflow = 'hidden'
    } else {
      document.body.removeAttribute('style')
    }
  }, [loadingOverlay])

  const toggleLoadingOverlay = () =>
    setLoadingOverlay((prevState) => !prevState)

  const providerValue = {
    loadingOverlay,
    toggleLoadingOverlay,
  }

  return (
    <LoadingOverlayContext.Provider value={providerValue}>
      {children}
      {loadingOverlay && <LoadingOverlay />}
    </LoadingOverlayContext.Provider>
  )
}

export default LoadingOverlayProvider
