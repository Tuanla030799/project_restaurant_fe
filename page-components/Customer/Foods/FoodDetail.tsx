import { Breadcrumbs, Container, Typography } from '@/components'
import { routes } from '@/constants/routes'
import { useFoodBySlug } from '@/lib/food'
import Wrapper from 'components/Wrapper'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { House } from 'phosphor-react'
import React from 'react'

const FoodDetail = () => {
  const router = useRouter()
  const slug = router?.query?.slug as string || ''
  const { data: { data: food } = {} } = useFoodBySlug(slug)
  
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
    </>
  )
}

export default FoodDetail
