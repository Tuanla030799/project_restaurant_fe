import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { styles } from './Badge.styled'
import { BadgeProps } from './Badge.types'

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      color = 'primary',
      size = 'md',
      rounded = 'full',
      className,
      children,
      leading,
      trailing,
      ...rest
    },
    ref
  ) => {
    const allClassNames = clsx(
      styles.base,
      styles.color[color],
      styles.size[size],
      styles.rounded[rounded],
      className
    )

    return (
      <span className={allClassNames} ref={ref} {...rest}>
        {leading && leading}
        {children}
        {trailing && trailing}
      </span>
    )
  }
)

export default Badge
