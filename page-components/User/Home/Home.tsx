import React from 'react'
import { CategoryCard, Typography, Container } from '@/components'
import Wrapper from 'components/Wrapper'

const Home = () => {
  return (
    <div className='pt-1 bg-gray-100 h-screen'>
      <Container>
        <Wrapper className="px-2 pb-12">
          <Typography
            transform="capitalize"
            weight="semibold"
            variant="p"
            fontSize="text-lg"
            align="center"
            className="mt-7 mb-3"
          >
            Danh Mục
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(8)].map((_, index) => (
              <CategoryCard
                key={index}
                {...{
                  id: 1,
                  slug: '123',
                  title: 'Đồ nhậu',
                  thumbnail:
                    '	https://pastaxi-manager.onepas.vn//Upload/DanhMucHienThi/Avatar/638036438488453397-lau-pasgo.vn.png',
                }}
              />
            ))}
          </div>
        </Wrapper>
      </Container>
    </div>
  )
}

export default Home
