import React from 'react'
import {
  CategoryCard,
  Typography,
  Container,
  FoodCard,
  Skeleton,
  AspectRatio,
  Carousel,
} from '@/components'
import Wrapper from 'components/Wrapper'
import { ArrowRight, CaretRight } from 'phosphor-react'
import Link from 'next/link'
import { useCategories } from '@/lib/category'
import { Category, Food } from '@/models'
import { getUrlFromNestedObject } from '@/utils'
import { useFoods } from '@/lib/food'
import Banner from '@/public/images/Banner.jpg'
import Banner2 from '@/public/images/Banner2.jpg'
import Banner3 from '@/public/images/Banner3.jpg'

const initialParams = {
  page: 1,
  perPage: 8,
}

const Home = () => {
  const { data: { data: categories } = {}, isValidating } = useCategories()

  const { data: { data: foods } = {}, isValidating: isValidatingFood } =
    useFoods(getUrlFromNestedObject(initialParams))

  return (
    <div className="bg-gray-100">
      <Container>
        <Wrapper className="mb-3">
          {/* <AspectRatio ratio={16 / 7} className="relative"> */}
            {/* <Image
              layout="fill"
              src={Banner}
              alt={'banner'}
              className="object-cover"
            /> */}
            <Carousel images={[Banner, Banner2, Banner3]}/>
          {/* </AspectRatio> */}
        </Wrapper>
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
            {!categories && isValidating
              ? [...Array(10)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rounded"
                    width={'100%'}
                    height={134}
                  />
                ))
              : categories?.map((category: Category) => (
                  <CategoryCard key={category.id} {...category} />
                ))}
          </div>
        </Wrapper>
        <Wrapper className="mt-3 px-7 pb-12">
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
            {!foods && isValidatingFood
              ? [...Array(8)].map((_, index) => (
                  <AspectRatio ratio={316 / 420} key={index}>
                    <Skeleton variant="rounded" width={'100%'} />
                  </AspectRatio>
                ))
              : foods?.map((food: Food) => (
                  <FoodCard key={food.id} {...food} />
                ))}
          </div>
        </Wrapper>
      </Container>
    </div>
  )
}

export default Home
