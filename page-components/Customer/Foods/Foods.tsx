import React, { useEffect, useMemo, useState } from 'react'
import {
  AspectRatio,
  Breadcrumbs,
  Button,
  Container,
  FoodCard,
  Form,
  Input,
  Pagination,
  Skeleton,
  Typography,
} from '@/components'
import Link from 'next/link'
import { routes } from '@/constants/routes'
import { FunnelSimple, House, MagnifyingGlass } from 'phosphor-react'
import { useLocalStorage, usePaginate, useToggle } from '@/hooks'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { MY_FOODS_PER_PAGE } from '@/constants/paginate'
import { KEY_PREVIOUS_PAGE } from '@/constants/keyLocalStorage'
import update from 'immutability-helper'
import { getCategoryItems, getUrlFromNestedObject } from '@/utils'
import { useFoods } from '@/lib/food'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { Food } from '@/models'
import FilterForm from './FilterForm'
import { useCategories } from '@/lib/category'

type TPage = {
  title: string
  url: string
}

const initialParams = {
  page: 1,
  perPage: MY_FOODS_PER_PAGE,
}

const Foods = () => {
  const [currentPage, handlePaginate] = usePaginate(1)
  const [tabSelected, setTabSelected] = useState('')
  const [isReset, setIsReset] = useState<boolean>(false)
  const [tabHeading, setTabHeading] = useState('')
  const [showFilter, setShowFilter] = useToggle()
  const [params, setParams] = useState<any>(initialParams)
  const [search, setSearch] = useState<string>('')
  const [showInputSearch, setShowInputSearch] = useToggle()
  const { t } = useTranslation(['common', 'food'])
  const router = useRouter()

  const {
    data: { data: foods, meta: { pagination = {} } = {} } = {},
    isValidating: isValidatingFood,
  } = useFoods(getUrlFromNestedObject(params))

  const { data: { data: categories } = {} } = useCategories()

  const titles = useMemo(() => {
    return {
      all: t('food_type.all', { ns: 'food' }),
      ...categories?.reduce((acc, crr) => {
        return { ...acc, ...{ [crr.slug]: crr.name } }
      }, {}),
    }
  }, [!!categories])

  const navItems = useMemo(() => {
    return [
      { id: '', label: t('food_type.all', { ns: 'food' }), href: 'all' },
      ...getCategoryItems(categories),
    ]
  }, [!!categories])

  const [_, setPreviousPage] = useLocalStorage<TPage>(KEY_PREVIOUS_PAGE, {
    title: '',
    url: '',
  })

  useEffect(() => {
    const previousPage = {
      title: t('title_page', { ns: 'food' }),
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

  useEffect(() => {
    if (categories?.length) {
      const query = (router.query.all as any)[0]
      const allValidSubUrls = [
        'all',
        ...categories.map((category) => category.slug),
      ]
      const isValidUrl =
        allValidSubUrls.some((url) => url === query) &&
        (router.query.all as any).length === 1

      if (!isValidUrl) {
        shallowRouting('/all')
        handlePaginate(1)
        return
      }

      const navItem = navItems.find(({ href }) => href === query)
      const hrefSelected = navItem?.href

      setTabSelected(hrefSelected as string)
      setTabHeading(titles[hrefSelected as string])
    }
  }, [router.query, !!categories])

  useEffect(() => {
    const search = (router?.query?.search as string) || ''
    setSearch(search)
  }, [router?.query])

  useEffect(() => {
    setParams({ ...params, search })
  }, [search])

  const shallowRouting = (url) => {
    router.push(
      {
        pathname: routes.listFood.generatePath(url),
      },
      undefined,
      { shallow: true }
    )
  }

  const onChangeTab = ({ id, href }) => {
    shallowRouting(href)
    setParams(
      update(params, {
        $merge: {
          categoryId: id,
        },
      })
    )
    handlePaginate(1)
  }

  const onResetFilter = () => {
    setIsReset(true)

    setParams({
      ...initialParams,
    })

    setTimeout(() => setIsReset(false), 0)
  }

  const onSubmit = async (data) => {
    setParams({ ...params, type: data.type.value })
  }

  return (
    <>
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
        </Container>
      </div>
      <Container className="pt-4">
        <Form onSubmit={onSubmit}>
          <div className="flex flex-wrap gap-y-3 items-stretch justify-between pt-4">
            <div className="flex flex-wrap gap-3">
              {navItems.map(({ label, id, href }) => (
                <span
                  role="button"
                  key={href}
                  className={clsx(
                    'inline-flex justify-center items-center text-sm font-medium rounded-lg px-3.5 py-2 transition-colors duration-200',
                    tabSelected === href
                      ? 'text-gray-700 bg-gray-100'
                      : 'text-gray-400 hover:bg-gray-50'
                  )}
                  onClick={() => onChangeTab({ id, href })}
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <div>
                {showInputSearch ? (
                  <Input
                    name="title"
                    type="search"
                    placeholder={t('filter.search', { ns: 'food' })}
                    size="md"
                    className={showInputSearch ? 'w-auto' : 'w-0'}
                    leading={
                      <button type="submit" className="leading-0">
                        <MagnifyingGlass size={20} className="text-gray-700" />
                      </button>
                    }
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                ) : (
                  <Button
                    onlyIcon
                    color="gray"
                    variant="outlined"
                    className="!border-gray-300"
                    onClick={setShowInputSearch}
                  >
                    <MagnifyingGlass size={20} className="text-gray-700" />
                  </Button>
                )}
              </div>
              <Button
                variant="outlined"
                color="gray"
                size="sm"
                leading={<FunnelSimple size={20} className="text-gray-700" />}
                onClick={setShowFilter}
              >
                {t('filter.title', { ns: 'food' })}
              </Button>
            </div>
          </div>

          {!!foods?.length && (
            <p className="text-sm text-gray-500 font-semibold py-6">
              {t('filter.total_result', {
                count: pagination?.total,
                ns: 'food',
              })}
            </p>
          )}

          <motion.div
            initial={{ height: '0px', overflow: 'hidden' }}
            animate={showFilter ? 'open' : 'closed'}
            variants={{
              open: { height: 'auto', overflow: 'visible' },
              closed: { height: '0px', overflow: 'hidden' },
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <div className="mb-10">
              <FilterForm isReset={isReset} onResetFilter={onResetFilter} />
            </div>
          </motion.div>
        </Form>
        <div className="min-h-[calc(100vh-350px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {!foods && isValidatingFood ? (
              [...Array(8)].map((_, index) => (
                <AspectRatio ratio={316 / 420} key={index}>
                  <Skeleton variant="rounded" width={'100%'} />
                </AspectRatio>
              ))
            ) : foods?.length ? (
              foods?.map((food: Food) => <FoodCard key={food.id} {...food} />)
            ) : (
              <Typography className="p-3.5">No value</Typography>
            )}
          </div>
        </div>
        <div className="pt-4 pb-8">
          {Number(pagination?.total) > MY_FOODS_PER_PAGE && (
            <Pagination
              totalItems={Number(pagination?.total)}
              pageSize={MY_FOODS_PER_PAGE}
              currentPage={currentPage}
              onChange={handlePaginate}
            />
          )}
        </div>
      </Container>
    </>
  )
}

export default Foods
