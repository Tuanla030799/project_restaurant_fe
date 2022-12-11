import React from 'react'
import { AdminLayout } from '@/components'
import Seats from '@/page-components/Manager/Seats/Seats'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Blogs from '@/page-components/Manager/Blogs/Blogs'

const BlogsPage = () => {
  return <Blogs />
}

BlogsPage.getLayout = function getLayout(page) {
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

export default BlogsPage
