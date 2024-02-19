import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { Layout } from '@/components'
import FoodDetail from '@/page-components/Customer/Foods/FoodDetail'

const FoodDetailPage = () => {
  return <FoodDetail />
}

FoodDetailPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources()
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'foods'])),
    },
  }
}

export default FoodDetailPage
