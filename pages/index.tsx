import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, Seo } from '@/components'
import { Home } from '@/page-components/Customer/Home'

const HomePage = () => {
  return (
    <>
      <Seo
        data={{
          title: 'FatFood Restaurant | Đặt bàn online',
          description:
            'FatFood là nhà hàng NGON, đa dạng, uy tín và chất lượng. Giúp thực khách đặt bàn dễ dàng, được tặng kèm ưu đãi mà không cần mua Deal, Voucher. Giải pháp đột phá mới cho câu chuyện ăn gì, ở đâu!',
          url: 'https://fatfood.vercel.app/',
          thumbnailUrl: 'https://fatfood.vercel.app/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2FBanner.33238d70.jpg&w=1920&q=75',
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
