import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import {
  AspectRatio,
  FoodRangeCard,
  Form,
  Input,
  Modal,
  Pagination,
  Select,
  Skeleton,
  Stack,
} from '@/components'
import { useTranslation } from 'next-i18next'
import { MY_FOOD_RANGER_PER_PAGE } from '@/constants/paginate'
import { useFoods } from '@/lib/food'
import { getSelectOptions, getUrlFromNestedObject } from '@/utils'
import { Food } from '@/models'
import { useDebounce, usePaginate } from '@/hooks'
import { useCategories } from '@/lib/category'
import { MagnifyingGlass } from 'phosphor-react'
import useFoodContext from '@/context/useFoodContext'
import useLocalStorage from 'hooks/useLocalStorage'
import { KEY_FOOD_ORDER } from '@/constants/keyLocalStorage'
import { TFood } from 'providers/FoodProvider'

type ListFoodModalProps = {
  showModal: boolean
  setShowModal: () => void
}

const initialParams = {
  page: 1,
  perPage: MY_FOOD_RANGER_PER_PAGE,
}

const ListFoodModal = ({ showModal, setShowModal }: ListFoodModalProps) => {
  const { t } = useTranslation(['common', 'order', 'food'])
  const [params, setParams] = useState<any>(initialParams)
  const [currentPage, handlePaginate] = usePaginate(1)
  const [keyword, setKeyword] = useState<string>('')
  const { data: { data: categories } = {} } = useCategories()
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('')
  const debouncedSearchFood = useDebounce<string>(keyword)
  const [valueLocalStorage, setValueLocalStorage] = useLocalStorage<
    TFood[] | null
  >(KEY_FOOD_ORDER, null)
  const {
    foods: listFoodAll,
    // setFoods,
    handleQuantity,
    getQuantity,
  } = useFoodContext()

  const categoryOptions = [
    { value: '', label: 'All' },
    ...getSelectOptions(categories),
  ]

  const {
    data: { data: foods, meta: { pagination = {} } = {} } = {},
    isValidating: isValidatingFood,
  } = useFoods(getUrlFromNestedObject(params))

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

  return (
    <Modal
      isOpen={showModal}
      title={t('action.order', { ns: 'order' })}
      toggle={setShowModal}
      acceptMessage={t('action.save', { ns: 'common' })}
      rejectMessage={t('action.cancel', { ns: 'common' })}
      classNameContainer="max-w-full max-w-screen-md max-w-screen-lg max-w-screen-xl"
      onAccept={() => {
        const foodChanged = listFoodAll.filter((food) => food.quantity)
        setValueLocalStorage(foodChanged)
      }}
    >
      <Form className="py-4" onSubmit={(data) => setKeyword(data.learner)}>
        <div className="flex justify-between flex-wrap pb-8 gap-y-8">
          <Stack spacing={24} className="flex justify-start flex-wrap">
            <Select
              name="categories"
              label={t('filter.label_category', { ns: 'food' })}
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
              label={t('filter.label_food_type', { ns: 'food' })}
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
          <div className="flex items-end">
            <Input
              type="search"
              name="learner"
              size="md"
              className="w-[350px]"
              value={keyword}
              placeholder="Enter search food name..."
              leading={
                <button type="submit" className="leading-0">
                  <MagnifyingGlass size={20} className="text-gray-700" />
                </button>
              }
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="h-[500px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isValidatingFood
              ? [...Array(8)].map((_, index) => (
                  <AspectRatio ratio={378 / 138} key={index}>
                    <Skeleton variant="rounded" width={'100%'} />
                  </AspectRatio>
                ))
              : foods?.map((food: Food, index) => (
                  <FoodRangeCard
                    key={food.id}
                    {...food}
                    quantity={getQuantity(food.id)}
                    onHandleQuantity={handleQuantity}
                  />
                ))}
          </div>
        </div>

        <div className="">
          {Number(pagination?.total) > MY_FOOD_RANGER_PER_PAGE && (
            <Pagination
              totalItems={Number(pagination.total)}
              pageSize={MY_FOOD_RANGER_PER_PAGE}
              currentPage={currentPage}
              onChange={handlePaginate}
            />
          )}
        </div>
      </Form>
    </Modal>
  )
}

export default ListFoodModal
