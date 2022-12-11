import React, { ReactNode } from 'react'
import { SideNav, Stack } from '@/components'
import { useRouter } from 'next/router'

interface LayoutWithSideNavProps {
  title?: string
  navLinks: {
    label: ReactNode
    href: string
    icon: ReactNode
  }[]
  children: ReactNode | ReactNode[]
  className?: string
}

const LayoutWithSideNav = ({
  title,
  navLinks,
  children,
  className,
}: LayoutWithSideNavProps) => {
  const { asPath } = useRouter()

  return (
    <Stack align="stretch" spacing={0} className="grow !flex-nowrap pt-[96px]">
      <SideNav title={title} className={className}>
        {navLinks.map((navLink) => {
          const isActive = asPath.includes(navLink.href)

          return (
            <SideNav.Link key={navLink.href} isActive={isActive} {...navLink} />
          )
        })}
      </SideNav>
      <div className="grow">{children}</div>
    </Stack>
  )
}

export default LayoutWithSideNav
