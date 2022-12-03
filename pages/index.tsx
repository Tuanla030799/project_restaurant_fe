import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, Seo } from '@/components'
import { Home } from '@/page-components/Customer/Home'

const HomePage = () => {
  return (
    <>
      <Seo
        data={{
          title: 'FatFood Restaurant',
          description:
            'FatFood là nhà hàng NGON, đa dạng, uy tín và chất lượng. Giúp thực khách đặt bàn dễ dàng, được tặng kèm ưu đãi mà không cần mua Deal, Voucher. Giải pháp đột phá mới cho câu chuyện ăn gì, ở đâu!',
          url: 'https://jamja.vn/assets/images/jamja-logo-2018-2x.png',
          thumbnailUrl: '',
        }}
      />
      <Home />
    </>
  )
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
