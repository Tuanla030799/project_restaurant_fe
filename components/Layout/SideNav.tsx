import clsx from 'clsx'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { Typography, Stack } from '@/components'

interface SideNavProps {
  title?: string
  children: ReactNode | ReactNode[]
  className?: string
}

const SideNav = ({ title, children, className }: SideNavProps) => {
  return (
    <aside
      className={clsx(
        'w-64 shrink-0 px-4 bg-gray-50 border-r border-gray-200',
        className
      )}
    >
      {title && (
        <Typography fontSize="text-xl" weight="semibold" className="pb-8 px-4">
          {title}
        </Typography>
      )}
      <nav>
        <Stack align="stretch" direction="column">
          {children}
        </Stack>
      </nav>
    </aside>
  )
}

interface SideNavLinkProps {
  label: ReactNode
  href: string
  icon?: ReactNode
  isActive?: boolean
  className?: string
}

const SideNavLink = React.memo(
  ({ label, href, icon, isActive, className }: SideNavLinkProps) => {
    return (
      <Link href={href}>
        <a
          className={clsx(
            'inline-flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-primary-400 hover:text-white',
            isActive && 'bg-primary-400 text-white',
            className
          )}
        >
          {icon}
          {label}
        </a>
      </Link>
    )
  }
)

SideNav.Link = SideNavLink

export default SideNav
