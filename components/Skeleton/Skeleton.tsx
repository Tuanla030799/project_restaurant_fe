import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { styles } from './Skeleton.styled'
import { SkeletonProps } from './Skeleton.types'

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'rectangular',
      width,
      height,
      animation = true,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const allClassNames = clsx(
      styles.base,
      styles.variants[variant],
      animation && 'animate-pulse',
      className
    )

    return (
      <div
        className={allClassNames}
        ref={ref}
        style={{
          ...(width && { width }),
          ...(height && { height }),
          ...(style && { ...style }),
        }}
        {...rest}
      />
    )
  }
)
Skeleton.displayName = 'Skeleton'

export default Skeleton
