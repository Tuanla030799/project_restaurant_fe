import clsx from 'clsx'
import React from 'react'
import { styles } from './HighlightIcon.styled'

type THighlightIconColors =
  | 'primary'
  | 'gray'
  | 'info'
  | 'error'
  | 'warning'
  | 'success'

type THighlightIconSizes = 'sm' | 'md'

interface IHighlightIconProps {
  color?: THighlightIconColors
  size?: THighlightIconSizes
  icon: React.ElementType
  className?: string
}

const HighlightIcon = ({
  color = 'primary',
  size = 'sm',
  icon,
  className,
}: IHighlightIconProps) => {
  const allClassNames = clsx(
    styles.base,
    styles.colors[color],
    styles.sizes[size],
    className
  )
  const Icon = icon

  return (
    <span className={allClassNames}>
      <Icon size={styles.iconSizes[size]} />
    </span>
  )
}

export default HighlightIcon
