import clsx from 'clsx'
import Link from 'next/link'
import React, { forwardRef } from 'react'
import { styles } from './CustomLink.styled'
import { CustomLinkProps } from './CustomLink.types'

const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ type = 'normal', children, href, className, ...rest }, ref) => {
    const allClassNames = clsx(styles.base, styles.types[type], className)

    return (
      <Link href={href}>
        <a className={allClassNames} ref={ref} {...rest}>
          {children}
        </a>
      </Link>
    )
  }
)

export default CustomLink
