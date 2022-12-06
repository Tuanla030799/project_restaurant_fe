import React, { useEffect, useState } from 'react'
import { Breadcrumbs, Container, FoodCard, Typography } from '@/components'
import Link from 'next/link'
import { routes } from '@/constants/routes'
import { House } from 'phosphor-react'
import { useLocalStorage, usePaginate, useToggle } from '@/hooks'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { MY_COURSES_PER_PAGE } from '@/constants/paginate'
import { KEY_PREVIOUS_PAGE } from '@/constants/keyLocalStorage'
import update from 'immutability-helper'

type TPage = {
  title: string
  url: string
}

const initialParams = {
  q: {
    title_cont: '',
    attendees_status_in: [],
    level_id_in: [],
    instructors_id_in: [],
    categories_id_in: [],
    course_type_in: [],
  },
  page: 1,
  items: MY_COURSES_PER_PAGE,
}

const Foods = () => {
  const [currentPage, handlePaginate] = usePaginate(1)
  const [tabSelected, setTabSelected] = useState('')
  const [tabHeading, setTabHeading] = useState('')
  const [showFilter, setShowFilter] = useToggle()
  const [params, setParams] = useState<any>(initialParams)
  const [showInputSearch, setShowInputSearch] = useToggle()
  const { t } = useTranslation(['common', 'foods'])
  const router = useRouter()

  const titles = {
    all: t('my_courses.title.all', { ns: 'course' }),
    waiting: t('my_courses.title.waiting', { ns: 'course' }),
    rejected: t('my_courses.title.rejected', { ns: 'course' }),
    approved: t('my_courses.title.approved', { ns: 'course' }),
    inprogress: t('my_courses.title.inprogress', { ns: 'course' }),
    completed: t('my_courses.title.completed', { ns: 'course' }),
  }

  const navItems = [
    {
      label: t('status.all', { ns: 'course' }),
      status: [],
      href: 'all',
    },
    {
      label: t('my_courses.title.waiting', { ns: 'course' }),
      status: [0],
      href: 'waiting',
    },
    {
      label: t('my_courses.title.rejected', { ns: 'course' }),
      status: [4],
      href: 'rejected',
    },
    {
      label: t('my_courses.title.approved', { ns: 'course' }),
      status: [1],
      href: 'approved',
    },
    {
      label: t('my_courses.title.inprogress', { ns: 'course' }),
      status: [2],
      href: 'inprogress',
    },
    {
      label: t('my_courses.title.completed', { ns: 'course' }),
      status: [3],
      href: 'completed',
    },
  ]

  const [_, setPreviousPage] = useLocalStorage<TPage>(KEY_PREVIOUS_PAGE, {
    title: '',
    url: '',
  })

  useEffect(() => {
    const previousPage = {
      title: t('my_courses.title_page', { ns: 'course' }),
      url: routes.listFood.generatePath('all'),
    }

    setPreviousPage(previousPage)
  }, [])

  useEffect(() => {
    setParams({
      ...params,
      page: currentPage,
    })
  }, [currentPage])

  // useEffect(() => {
  //   const query = (router.query.all as any)[0]
  //   const allValidSubUrls = [
  //     'all',
  //     'waiting',
  //     'rejected',
  //     'approved',
  //     'inprogress',
  //     'completed',
  //   ]
  //   const isValidUrl =
  //     allValidSubUrls.some((url) => url === query) &&
  //     (router.query.all as any).length === 1

  //   if (!isValidUrl) {
  //     shallowRouting('/all')
  //     handlePaginate(1)
  //     return
  //   }

  //   const navItem = navItems.find(({ href }) => href === query)
  //   const courseStatus = navItem?.href

  //   setTabSelected(courseStatus as string)
  //   setTabHeading(titles[courseStatus as string])

  //   navItem &&
  //     setParams(
  //       update(params, {
  //         $merge: {
  //           q: {
  //             ...params.q,
  //             attendees_status_in: navItem.status as any,
  //           },
  //         },
  //       })
  //     )
  // }, [router.query])

  const shallowRouting = (url) => {
    router.push(
      {
        pathname: routes.listFood.generatePath(url),
      },
      undefined,
      { shallow: true }
    )
  }

  const onChangeTab = ({ status, href }) => {
    shallowRouting(href)
    setParams(
      update(params, {
        $merge: {
          q: {
            ...params.q,
            attendees_status_in: [status] as any,
          },
        },
      })
    )
    handlePaginate(1)
  }

  return (
    <div className="pt-1 bg-gray-50">
      <Container>
        <Breadcrumbs maxItems={3}>
          <Link href={routes.home.generatePath()}>
            <a>
              <House weight="fill" size={20} />
            </a>
          </Link>
          <Typography>foods</Typography>
        </Breadcrumbs>
        <Typography
          variant="h1"
          fontSize="display-md"
          weight="semibold"
          align="center"
          gutter
        >
          {tabHeading}
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FoodCard />
          <FoodCard />
          <FoodCard />
          <FoodCard />
          <FoodCard />
          <FoodCard />
          <FoodCard />
          <FoodCard />
        </div>
      </Container>
    </div>
  )
}

export default Foods
