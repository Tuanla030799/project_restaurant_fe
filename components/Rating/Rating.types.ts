import { ReactNode } from 'react'

export type RatingPrecisions = 'full' | 'half'

export type RatingSizes = 'sm' | 'md' | 'lg'

export type RatingProps = {
  defaultValue?: number
  precision?: RatingPrecisions
  size?: RatingSizes
  disabled?: boolean
  readOnly?: boolean
  max?: number
  color?: string
  className?: string
  icon?: ReactNode
  emptyIcon?: ReactNode
  leading?: ReactNode
  trailing?: ReactNode
  onChange?: (rate: number) => void
  onHover?: (rate: number) => void
} & React.HTMLAttributes<HTMLDivElement>
