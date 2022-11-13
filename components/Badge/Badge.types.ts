import React, { ReactNode } from 'react'

export type BadgeColors =
  | 'primary'
  | 'success'
  | 'error'
  | 'info'
  | 'secondary'
  | 'gray'
  | 'black'

export type BadgeSizes = 'sm' | 'md' | 'lg' | 'xl'

export type BadgeRounded = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export type BadgeProps = {
  color?: BadgeColors
  size?: BadgeSizes
  rounded?: BadgeRounded
  className?: string
  children: ReactNode
  leading?: ReactNode
  trailing?: ReactNode
} & React.HTMLAttributes<HTMLSpanElement>
