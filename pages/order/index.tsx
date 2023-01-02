import { AuthLayout } from '@/components'
import Order from '@/page-components/Customer/Order/Order'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

const OrdersPage = () => {
  return <Order />
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
      ...(await serverSideTranslations(locale, ['common', 'order', 'food'])),
    },
  }
}

export default OrdersPage
