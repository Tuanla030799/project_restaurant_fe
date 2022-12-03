import { Layout } from '@/components'
import Login from '@/page-components/Auth/Login/Login'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

type Props = {}

const LoginPage = () => {
  return (
    <Login />
  )
}

LoginPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources()
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'auth'])),
    },
  }
}


export default LoginPage
