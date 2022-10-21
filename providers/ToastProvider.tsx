import React, { ReactNode } from 'react'
import { useToast } from '@/lib/store'
import { Toast } from 'components/Toast'

type ToastProviderProps = {
  children: ReactNode
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const { toasts, removeToast } = useToast()

  return (
    <>
      {children}
      {toasts && toasts.length ? (
        <div className="fixed z-sticky top-0 right-0 flex flex-col items-stretch gap-3 p-4">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              floating={false}
              onClose={() => removeToast(toast.id)}
              {...toast}
            />
          ))}
        </div>
      ) : null}
    </>
  )
}

export default ToastProvider
