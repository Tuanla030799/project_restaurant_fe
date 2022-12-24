import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, Seo } from '@/components'
import { Home } from '@/page-components/Customer/Home'

const HomePage = () => {
  return (
    <>
      <Seo
        data={{
          title: 'Fat Food - Đặt bàn online | Booking food',
          description:
            'FatFood là nhà hàng NGON, đa dạng, uy tín và chất lượng. Giúp thực khách đặt bàn dễ dàng, được tặng kèm ưu đãi mà không cần mua Deal, Voucher. Giải pháp đột phá mới cho câu chuyện ăn gì, ở đâu!',
          url: 'https://fatfood.vercel.app/',
          thumbnailUrl:
            'https://cdn.pixabay.com/photo/2021/04/09/08/12/steamer-6163747_1280.png',
        }}
      />
      <Home />
    </>
  )
}

HomePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default HomePage
