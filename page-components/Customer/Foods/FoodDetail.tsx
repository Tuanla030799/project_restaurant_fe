import {
  AspectRatio,
  Badge,
  Breadcrumbs,
  Container,
  Typography,
} from '@/components'
import { routes } from '@/constants/routes'
import { useFoodBySlug } from '@/lib/food'
import { FoodInventory } from '@/models'
import Wrapper from 'components/Wrapper'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { House } from 'phosphor-react'
import React from 'react'
import DefaultThumbnail from '@/public/images/course_default_thumbnail.jpeg'
import Image from 'next/image'

const FoodDetail = () => {
  const router = useRouter()
  const slug = (router?.query?.slug as string) || ''
  const { data: { data: food } = {} } = useFoodBySlug(slug)

  console.log('food', food)
  return (
    <>
      <Container>
        <div className="mt-2">
          <Breadcrumbs maxItems={3}>
            <Link href={routes.home.generatePath()}>
              <a>
                <House weight="fill" size={20} />
              </a>
            </Link>
            <Typography>food detail</Typography>
          </Breadcrumbs>
        </div>
      </Container>
      <Container className="min-h-[calc(100vh-100px)]">
        <div className="flex flex-wrap items-stretch py-4 border-b">
          <div className="basis-2/3 grow">
            <div className="flex flex-col py-4 h-full gap-4">
              <Typography
                variant="h2"
                fontSize="display-md"
                weight="semibold"
                gutter
              >
                {food?.name}
              </Typography>

              <Typography fontSize="text-md">- {food?.summary}</Typography>
            </div>
          </div>
          <div className="basis-1/3 grow">
            <AspectRatio ratio={16 / 9} className="relative">
              {food?.image ? (
                <img
                  src={food?.image}
                  alt={food?.name}
                  className="object-cover rounded-lg"
                />
              ) : (
                <Image
                  layout="fill"
                  src={DefaultThumbnail}
                  alt={'title'}
                  className="object-cover rounded-t-lg"
                />
              )}
              {food?.inventory === FoodInventory.stocking ? (
                <Badge
                  size="sm"
                  color="success"
                  className="absolute z-elevate bottom-3 left-4"
                >
                  {food?.inventory?.toLowerCase()}
                </Badge>
              ) : (
                <Badge
                  size="sm"
                  color="error"
                  className="absolute z-elevate bottom-3 left-4"
                >
                  {food?.inventory?.toLowerCase()}
                </Badge>
              )}
            </AspectRatio>
          </div>
        </div>
        <div>
          <Typography className="mt-4" fontSize="text-md">
            {food?.content}
          </Typography>
        </div>
      </Container>
    </>
  )
}

export default FoodDetail
