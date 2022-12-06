import React from 'react'
import { CategoryCard, Typography, Container, FoodCard } from '@/components'
import Wrapper from 'components/Wrapper'
import { axios } from '@/lib/axios'
import { getProfile, login } from '@/apis'
import { ArrowRight, CaretRight } from 'phosphor-react'
import Link from 'next/link'

const Home = () => {
  const handleLogin = async () => {
    const data = {
      email: 'user@email.com',
      password: 'secret',
    }

    await login(data)
  }

  return (
    <div className="pt-1 bg-gray-100">
      <Container>
        <Wrapper className="px-7 pb-12">
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
        <Wrapper className="mt-2 px-7 pb-12">
          <div className="flex justify-between items-center mt-7 mb-3   ">
            <Typography
              weight="semibold"
              variant="h6"
              fontSize="text-lg"
              align="center"
              className="flex items-center"
            >
              Mới nhất trên FatFood <CaretRight size={16} weight="bold" />
            </Typography>

            <Link href="/collection">
              <a>
                <Typography
                  className="text-red-500 hover:text-red-600 flex items-center"
                  align="center"
                  fontSize="text-sm"
                >
                  Xem tất cả <ArrowRight size={16} />
                </Typography>
              </a>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
          </div>
        </Wrapper>
      </Container>
    </div>
  )
}

export default Home
