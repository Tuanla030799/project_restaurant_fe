import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { AuthLayout } from '@/components'
import Orders from '@/page-components/Customer/Orders/Orders'

const OrdersPage = () => {
  return <Orders />
}

OrdersPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>
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

export default OrdersPage
