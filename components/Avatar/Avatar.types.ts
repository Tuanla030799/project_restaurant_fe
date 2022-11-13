import { ReactNode } from 'react'

type TAvatarVariants = 'circular' | 'rounded' | 'square'

type TAvatarSizes =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'

export type TAvatarStatus = 'online' | 'offline'

export type TAvatarProps = {
  variant?: TAvatarVariants
  size?: TAvatarSizes
  src?: string
  alt?: string
  children?: ReactNode
  border?: boolean
  className?: string
  status?: TAvatarStatus
} & React.HTMLAttributes<HTMLDivElement & HTMLImageElement>
