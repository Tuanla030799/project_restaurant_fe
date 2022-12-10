import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

type TLayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: TLayoutProps) => {
  return (
    <div className="flex flex-col items-stretch min-w-full min-h-screen">
      <Header />
      <main className="mt-[96px] flex flex-col items-stretch grow">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
