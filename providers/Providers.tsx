import React, { ReactNode } from 'react'
import { Provider, useCreateStore } from '@/lib/store'
import LoadingOverlayProvider from './LoadingOverlay'
import ToastProvider from './ToastProvider'
import ErrorBoundary from 'components/ErrorBoundary'

type ProvidersProps = {
  children: ReactNode
  pageProps: any
}

const Providers = ({ children, pageProps }: ProvidersProps) => {
  const createStore = useCreateStore(pageProps.initialZustandState)

  return (
    <ErrorBoundary>
      <Provider createStore={createStore}>
        <ToastProvider>
          <LoadingOverlayProvider>{children}</LoadingOverlayProvider>
        </ToastProvider>
      </Provider>
    </ErrorBoundary>
  )
}

export default Providers
