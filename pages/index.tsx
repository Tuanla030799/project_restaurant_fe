import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout } from '@/components'

const HomePage = () => {
  return <div>This is a Home Page</div>
}

HomePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default HomePage