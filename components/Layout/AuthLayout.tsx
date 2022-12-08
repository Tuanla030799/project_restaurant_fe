import React, { ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'
import { routes } from '@/constants/routes'
import { useHeaderData } from '@/lib/header'
import { useRouter } from 'next/router'
import Header from './Header'
import Footer from './Footer'

type TAuthLayoutProps = {
  children: ReactNode
}

const AuthLayout = ({ children }: TAuthLayoutProps) => {
  const { profile, error } = useHeaderData()
  const router = useRouter()
  const token = Cookies.get('jwt_token')

  // useEffect(() => {
    if (!token || error?.response?.statusText === 'Unauthorized') {
      router.push({
        pathname: routes.auth.login.generatePath(),
      })
    }
  // }, [profile, token, error])

  return (
    <div className="flex flex-col items-stretch min-w-full min-h-screen">
      <Header />
      <main className="flex flex-col items-stretch grow">{children}</main>
      <Footer />
    </div>
  )
}

export default AuthLayout
