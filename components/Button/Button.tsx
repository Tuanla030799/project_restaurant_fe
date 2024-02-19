import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import React, { ReactNode } from 'react'
import { styles } from './Button.styled'
import { Spinner } from '@/components'

type TButtonTypes = 'button' | 'submit' | 'reset'

type TButtonSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

type TButtonColors =
  | 'primary'
  | 'gray'
  | 'info'
  | 'error'
  | 'warning'
  | 'success'

type TButtonVariants = 'contained' | 'light' | 'outlined' | 'text' | 'link'

interface BaseProps {
  children: ReactNode | ReactNode[]
  type?: TButtonTypes
  size?: TButtonSizes
  color?: TButtonColors
  variant?: TButtonVariants
  leading?: ReactNode
  trailing?: ReactNode
  className?: string
  target?: string
  href?: string
  onlyIcon?: boolean
  fluid?: boolean
  loading?: boolean
  disabled?: boolean
  onClick?:
    | (() => void)
    | ((
        event: React.MouseEvent<
          HTMLButtonElement | HTMLAnchorElement | HTMLLabelElement,
          MouseEvent
        >
      ) => void)
  [rest: string]: any
}

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: 'button'
  }

type ButtonAsLink = BaseProps &
  Omit<LinkProps, keyof BaseProps> & {
    as: 'a'
  }

type ButtonAsLabel = BaseProps &
  Omit<React.LabelHTMLAttributes<HTMLLabelElement>, keyof BaseProps> & {
    as: 'label'
  }

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsLabel

const Button = ({
  children,
  type = 'button',
  size = 'md',
  color = 'primary',
  variant = 'contained',
  leading,
  trailing,
  className,
  target = '_self',
  href = '',
  onlyIcon = false,
  fluid,
  loading,
  onClick,
  ...rest
}: ButtonProps) => {
  const allClassNames = clsx(
    styles.base,
    styles.colors[color][variant],
    styles.fontSizes[size],
    styles.width[fluid ? 'fluid' : 'auto'],
    variant !== 'link' &&
      (onlyIcon ? styles.sizes.icon[size] : styles.sizes.default[size]),
    className
  )
  const Loading = (
    <Spinner
      theme={variant === 'contained' ? 'light' : 'dark'}
      size="xs"
      className="-my-1"
    />
  )

  if (rest.as === 'a') {
    return (
      <Link href={href}>
        <a
          className={allClassNames}
          target={target}
          onClick={onClick}
          {...rest}
        >
          {loading && Loading}
          {leading && leading}
          {children}
          {trailing && trailing}
        </a>
      </Link>
    )
  }

  if (rest.as === 'label') {
    return (
      <label
        role="button"
        className={allClassNames}
        onClick={onClick}
        {...rest}
      >
        {loading && Loading}
        {leading && leading}
        {children}
        {trailing && trailing}
      </label>
    )
  }

  return (
    <button className={allClassNames} type={type} onClick={onClick} {...rest}>
      {loading && Loading}
      {leading && leading}
      {children}
      {trailing && trailing}
    </button>
  )
}

export default Button
