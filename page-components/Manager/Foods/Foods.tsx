import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import {
  AspectRatio,
  Breadcrumbs,
  Button,
  FoodCard,
  Form,
  Input,
  Pagination,
  Select,
  Skeleton,
  Stack,
  Typography,
} from '@/components'
import { routes } from '@/constants/routes'
import { useToast } from '@/lib/store'
import { useTranslation } from 'next-i18next'
import { Hamburger, House, MagnifyingGlass, Plus } from 'phosphor-react'
import Link from 'next/link'
import { useFoods } from '@/lib/food'
import { getSelectOptions, getUrlFromNestedObject } from '@/utils'
import { MY_FOODS_PER_PAGE } from '@/constants/paginate'
import { useDebounce, usePaginate, useToggle } from '@/hooks'
import { useCategories } from '@/lib/category'
import { Food, FoodStatus } from '@/models'
import { updateFoodStatus } from '@/apis'
import FoodModal from './FoodModal'

const initialParams = {
  page: 1,
  perPage: MY_FOODS_PER_PAGE,
}

const Foods = () => {
  const { t } = useTranslation(['manager'])
  const { setToast } = useToast()
  const [params, setParams] = useState<any>(initialParams)
  const [currentPage, handlePaginate] = usePaginate(1)
  const [keyword, setKeyword] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('')
  const debouncedSearchFood = useDebounce<string>(keyword)
  const { data: { data: categories } = {} } = useCategories()
  const [showInputSearch, setShowInputSearch] = useToggle()
  const [showFoodModal, setShowFoodModal] = useToggle()
  const {
    data: { data: foods, meta: { pagination = {} } = {} } = {},
    isValidating: isValidatingFood,
    mutate,
  } = useFoods(getUrlFromNestedObject(params))

  const categoryOptions = [
    { value: '', label: 'All' },
    ...getSelectOptions(categories),
  ]
  const foodTypeOptions = useMemo(
    () => [
      { value: '', label: 'All' },
      { value: 'FOOD', label: 'Food' },
      { value: 'DRINK', label: 'Drink' },
      { value: 'FAST', label: 'Fast' },
      { value: 'SNACKS', label: 'Snacks' },
    ],
    []
  )

  useEffect(() => {
    setParams({
      ...params,
      page: currentPage,
      search: encodeURIComponent(debouncedSearchFood),
      categoryId: selectedCategory,
      type: selectedType,
    })
  }, [currentPage, debouncedSearchFood, selectedCategory, selectedType])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setKeyword(value)
  }

  const handleChangeStatus = async (id: number, status: FoodStatus) => {
    try {
      switch (status) {
        case FoodStatus.publish:
          await updateFoodStatus(id, FoodStatus.hide)
          break
        case FoodStatus.hide:
          await updateFoodStatus(id, FoodStatus.publish)
          break

        default:
          return
      }

      await mutate()

      setToast({
        color: 'success',
        title: t('foods.message.status.success', { ns: 'manager' }),
      })
    } catch (error) {
      setToast({
        color: 'error',
        title: t('foods.message.status.error', { ns: 'manager' }),
      })
    }
  }

  return (
    <>
      <div className="bg-management bg-center bg-cover pt-4 pb-8 px-8">
        <Breadcrumbs maxItems={3} className="pb-6">
          <Link href={routes.manager.orders.generatePath()}>
            <a>
              <House weight="fill" size={20} />
            </a>
          </Link>
          <Typography>{t('foods.title', { ns: 'manager' })}</Typography>
        </Breadcrumbs>
        <Stack direction="column">
          <Typography fontSize="display-md" weight="medium">
            {t('foods.title', { ns: 'manager' })}
          </Typography>
          <Stack>
            <Hamburger size={24} weight="fill" className="text-primary-400" />
            <Typography
              variant="div"
              fontSize="text-xl"
              weight="medium"
              className="text-gray-500"
            >
              {isValidatingFood ? (
                <Skeleton width={100} variant="text" />
              ) : (
                t('foods.foods_count', {
                  count: pagination?.total,
                  ns: 'manager',
                })
              )}
            </Typography>
          </Stack>
        </Stack>
      </div>
      <div className="p-8">
        <Form className="" onSubmit={(data) => setKeyword(data.search_food)}>
          <div className="flex justify-between flex-wrap pb-8 gap-y-8">
            <Stack spacing={24} className="flex justify-start flex-wrap">
              <Select
                name="categories"
                label={t('foods.filter.label.category', { ns: 'manager' })}
                options={categoryOptions}
                defaultOption={
                  selectedCategory
                    ? categoryOptions.filter(
                        (data) => selectedCategory === data.value
                      )[0]
                    : categoryOptions[0]
                }
                className="min-w-[150px]"
                onChange={(data) => setSelectedCategory(data?.value)}
              />
              <Select
                name="foodType"
                label={t('foods.filter.label.type', { ns: 'manager' })}
                options={foodTypeOptions}
                defaultOption={
                  selectedCategory
                    ? foodTypeOptions.filter(
                        (data) => selectedType === data.value
                      )[0]
                    : foodTypeOptions[0]
                }
                className="min-w-[150px]"
                onChange={(data) => setSelectedType(data?.value)}
              />
            </Stack>
            <div className="flex items-end gap-4">
              {showInputSearch ? (
                <Input
                  type="search"
                  name="search_food"
                  size="md"
                  className={showInputSearch ? 'w-auto' : 'w-0'}
                  value={keyword}
                  placeholder="Enter search food name..."
                  leading={
                    <button type="submit" className="leading-0">
                      <MagnifyingGlass size={20} className="text-gray-700" />
                    </button>
                  }
                  onChange={handleSearch}
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

              <Button
                onClick={setShowFoodModal}
                leading={<Plus weight="bold" size={20} />}
              >
                {t('foods.action.create_foot', { ns: 'manager' })}
              </Button>
            </div>
          </div>
        </Form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {!foods && isValidatingFood
            ? [...Array(8)].map((_, index) => (
                <AspectRatio ratio={316 / 420} key={index}>
                  <Skeleton variant="rounded" width={'100%'} />
                </AspectRatio>
              ))
            : foods?.map((food: Food) => (
                <FoodCard
                  key={food.id}
                  {...food}
                  isManagement={true}
                  changeStatus={handleChangeStatus}
                />
              ))}
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
      </div>
      {showFoodModal && (
        <FoodModal showModal={showFoodModal} setShowModal={setShowFoodModal} />
      )}
    </>
  )
}

export default Foods
