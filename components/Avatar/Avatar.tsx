import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { styles } from './Avatar.styled'
import { TAvatarProps } from './Avatar.types'

const Avatar = forwardRef<HTMLDivElement & HTMLImageElement, TAvatarProps>(
  (
    {
      variant = 'circular',
      size = 'md',
      src,
      alt,
      children,
      border,
      className,
      status,
      ...rest
    },
    ref
  ) => {
    const allClassNames = clsx(
      styles.base,
      styles.variants[variant],
      styles.sizes[size],
      border && styles.border.base,
      border && styles.border[size],
      status ? 'overflow-visible' : 'overflow-hidden',
      className
    )

    if (src) {
      return (
        <div className={allClassNames} ref={ref}>
          <img
            className={clsx(
              status && 'rounded-full',
              'w-full h-full object-cover'
            )}
            src={src}
            alt={alt}
            {...rest}
          />
          {status && (
            <div
              className={clsx(
                'absolute border rounded-full border-white bottom-0 right-0 w-2.5 h-2.5',
                styles.status[status]
              )}
            />
          )}
        </div>
      )
    }

    return (
      <div className={allClassNames} ref={ref} {...rest}>
        {children}
      </div>
    )
  }
)
Avatar.displayName = 'Avatar'

export default Avatar
