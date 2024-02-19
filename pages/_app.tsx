import { NextPage } from 'next'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import React, { ReactNode, useEffect, useState } from 'react'
import { Providers } from '@/providers'
import 'react-datepicker/dist/react-datepicker.css'
import '@/styles/tailwind.css'
import '@/styles/globals.css'
import '@/styles/datePicker.css'

type NextPageWithLayout = NextPage & {
  getLayout?: () => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactNode | any) => page)
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  if (typeof window === 'undefined') {
    return <></>
  } else {
    return (
      <Providers pageProps={pageProps}>
        {getLayout(<Component {...pageProps} />)}
      </Providers>
    )
  }
}

export default appWithTranslation(MyApp)
