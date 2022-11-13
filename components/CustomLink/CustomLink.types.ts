import React, { ReactNode } from 'react'

export type CustomLinkTypes = 'normal' | 'underlined'

export type CustomLinkProps = {
  type?: CustomLinkTypes
  children: ReactNode
  href: string
  className?: string
} & React.HTMLAttributes<HTMLAnchorElement>
