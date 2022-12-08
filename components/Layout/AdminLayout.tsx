import { routes } from '@/constants/routes'
import { useHeaderData } from '@/lib/header'
import router from 'next/router'
import React, { ReactNode, useEffect } from 'react'
import Header from './Header'

type TLayoutProps = {
  children: ReactNode
}

const AdminLayout = ({ children }: TLayoutProps) => {
  const { profile, error } = useHeaderData()

  // useEffect(() => {
    if (error?.response?.statusText === 'Unauthorized') {
      router.push({
        pathname: routes.auth.login.generatePath(),
      })

      return <></>
    }

    if (profile?.roles.data[0].slug !== 'admin') {
      router.push({
        pathname: routes.home.generatePath(),
      })

      return <></>
    }
  // }, [profile, error])

  return (
    <div className="flex flex-col items-stretch min-w-full min-h-screen">
      <Header />
      <main className="flex flex-col items-stretch grow">{children}</main>
    </div>
  )
}

export default AdminLayout
