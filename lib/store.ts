import { ReactNode, useLayoutEffect } from 'react'
import create from 'zustand'
import createContext from 'zustand/context'
import shallow from 'zustand/shallow'
import { slowLoading } from '@/utils'
import { ToastColors } from 'components/Toast/Toast.types'

type Toast = {
  color: ToastColors
  title: ReactNode
  description?: ReactNode
}

let store

const initialState = {
  error: {},
  loading: {},
  toasts: [],
}
const zustandContext = createContext()

export const Provider = zustandContext.Provider
export const useStore = zustandContext.useStore

export const initializeStore = (preloadedState = {}) => {
  return create((set: any) => ({
    ...initialState,
    ...preloadedState,
    setError: (error) => {
      set({ error })
    },
    resetError: () => {
      set({ error: {} })
    },
    setLoading: (key, value) => {
      set({
        loading: {
          [key]: value,
        },
      })
    },
    setToast: (toast: Toast) => {
      set((state) => {
        let lastId =
          state.toasts.length && state.toasts[state.toasts.length - 1].id

        return {
          toasts: [
            ...state.toasts,
            {
              ...toast,
              id: lastId ? ++lastId : 1,
              open: true,
            },
          ],
        }
      })
    },
    removeToast: async (id: string) => {
      const TOAST_TRANSITION = 300

      set((state) => ({
        toasts: [...state.toasts].map((toast) =>
          toast.id === id ? { ...toast, open: false } : toast
        ),
      }))

      await slowLoading(TOAST_TRANSITION)

      set((state) => ({
        toasts: [...state.toasts].filter((toast) => toast.id !== id),
      }))
    },
  }))
}

export const useCreateStore = (initialState) => {
  if (typeof window === 'undefined') {
    return () => initializeStore(initialState)
  }

  store = store ?? initializeStore(initialState)

  useLayoutEffect(() => {
    if (initialState && store) {
      store.setState({
        ...store.getState(),
        ...initialState,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState])

  return () => store
}

export const useLoading = () => {
  return useStore(
    (store: any) => ({
      loading: store.loading,
      setLoading: store.setLoading,
    }),
    shallow
  )
}

export const useError = () => {
  return useStore(
    (store: any) => ({
      error: store.error,
      setError: store.setError,
      resetError: store.resetError,
    }),
    shallow
  )
}

export const useToast = () => {
  return useStore(
    (store: any) => ({
      toasts: store.toasts,
      setToast: store.setToast,
      removeToast: store.removeToast,
    }),
    shallow
  )
}
