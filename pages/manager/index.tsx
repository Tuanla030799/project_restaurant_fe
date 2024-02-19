import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React from 'react'
import { AdminLayout } from '@/components'
import { routes } from '@/constants/routes'

const MainPage = () => {
  const router = useRouter()
  router.push({
    pathname: routes.manager.orders.generatePath(),
  })
  return <></>
}

MainPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources()
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'manager'])),
    },
  }
}

export default MainPage
