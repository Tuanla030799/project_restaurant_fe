import { AdminLayout } from '@/components'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

const ManagerPage = () => {
  return <>Manager pages</>
}

ManagerPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>
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

export default ManagerPage
