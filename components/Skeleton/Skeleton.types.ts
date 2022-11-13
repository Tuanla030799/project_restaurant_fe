export type SkeletonVariants = 'text' | 'circular' | 'rectangular' | 'rounded'

export type SkeletonProps = {
  variant?: SkeletonVariants
  width?: number | string
  height?: number | string
  animation?: boolean
  className?: string
} & React.HTMLAttributes<HTMLDivElement>
