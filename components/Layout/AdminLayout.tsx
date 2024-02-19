import { useTranslation } from 'next-i18next'
import router from 'next/router'
import {
  BookOpen,
  GraduationCap,
  Hamburger,
  Table,
  Users,
} from 'phosphor-react'
import React, { ReactNode, useEffect, useMemo } from 'react'
import Header from './Header'
import { LayoutWithSideNav } from '@/components'
import { routes } from '@/constants/routes'
import { useHeaderData } from '@/lib/header'

type TLayoutProps = {
  children: ReactNode
}

const AdminLayout = ({ children }: TLayoutProps) => {
  const { t } = useTranslation(['manager'])
  const { profile, error } = useHeaderData()

  useEffect(() => {
    if (error?.response?.statusText === 'Unauthorized') {
      router.push({
        pathname: routes.auth.login.generatePath(),
      })
    }

    if (profile?.roles?.data[0].slug !== 'admin') {
      router.push({
        pathname: routes.home.generatePath(),
      })
    }
  }, [profile, error])

  const navLinks = useMemo(
    () => [
      {
        label: t('orders.title', { ns: 'manager' }),
        href: routes.manager.orders.generatePath(),
        icon: <GraduationCap size={24} />,
      },
      {
        label: t('foods.title', { ns: 'manager' }),
        href: routes.manager.listFood.generatePath(),
        icon: <Hamburger size={24} />,
      },
      {
        label: t('seats.title', { ns: 'manager' }),
        href: routes.manager.seats.generatePath(),
        icon: <Table size={24} />,
      },
      {
        label: t('users.title', { ns: 'manager' }),
        href: routes.manager.users.generatePath(),
        icon: <Users size={24} />,
      },
      {
        label: t('blogs.title', { ns: 'manager' }),
        href: routes.manager.blogs.generatePath(),
        icon: <BookOpen size={24} />,
      },
    ],
    []
  )

  return (
    <div className="flex flex-col items-stretch min-w-full min-h-screen">
      <Header />
      <LayoutWithSideNav
        title={t('title', { ns: 'manager' })}
        navLinks={navLinks}
        className="pt-12"
      >
        <main className="flex flex-col items-stretch grow">{children}</main>
      </LayoutWithSideNav>
    </div>
  )
}

export default AdminLayout
