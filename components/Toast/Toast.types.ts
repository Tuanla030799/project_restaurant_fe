import { ReactNode } from 'react'

export type ToastColors =
  | 'primary'
  | 'gray'
  | 'info'
  | 'error'
  | 'warning'
  | 'success'

export type ToastVariants = 'contained' | 'outlined'

export type ToastPlacements = {
  horizontal: 'center' | 'left' | 'right'
  vertical: 'bottom' | 'top'
}

export type ToastProps = {
  color?: ToastColors
  variant?: ToastVariants
  icon?: JSX.Element | boolean
  title: ReactNode
  description?: ReactNode
  width?: string
  open?: boolean
  closeButton?: boolean
  floating?: boolean
  autoHideDuration?: number
  placement?: ToastPlacements
  zIndex?: number | null
  className?: string
  onClose?: () => void
} & React.HTMLAttributes<HTMLDivElement>
