import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { styles } from './Typography.styled'
import { TypographyProps } from './Typography.types'

const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      children,
      variant = 'p',
      weight = 'regular',
      align = 'left',
      fontSize = 'text-md',
      transform = 'none',
      gutter = false,
      noWrap = false,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const allClassNames = clsx(
      styles.align[align],
      styles.weights[weight],
      styles.fontSizes[fontSize],
      styles.transform[transform],
      gutter && styles.gutter,
      noWrap && styles.noWrap,
      className
    )

    return React.createElement(
      variant,
      { className: allClassNames, ref, style, ...rest },
      children
    )
  }
)

export default Typography
