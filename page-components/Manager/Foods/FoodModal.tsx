import React, { useEffect, useMemo, useState } from 'react'
import { Form, Input, Modal, RichEditor, Select, Stack, UploadImage } from '@/components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { getSelectOptions } from '@/utils'
import { FoodProps } from './type'
import { validationSchema } from './function'
import { useCategories } from '@/lib/category'
import { convertFromRaw } from 'draft-js'
import { useError } from '@/lib/store'

type FoodModalProps = {
  foodID?: number
  showModal: boolean
  setShowModal: () => void
}

const FoodModal = ({ foodID, showModal, setShowModal }: FoodModalProps) => {
  const { t } = useTranslation(['common', 'manager', 'food'])
  // const { data: order } = useOrderDetailById(foodID)
  const { data: { data: categories } = {} } = useCategories()
  const categoryOptions = getSelectOptions(categories)
  const [summary, setSummary] = useState<any>(null)
  const [resetSummary, setResetSummary] = useState<boolean>(false)
  const [content, setContent] = useState<any>(null)
  const [resetContent, setResetContent] = useState<boolean>(false)
  const [isChangeThumbnail, setIsChangeThumbnail] = useState<boolean>(false)
  const { error, setError, resetError } = useError()

  const foodTypeOptions = useMemo(
    () => [
      { value: 'FOOD', label: 'Food' },
      { value: 'DRINK', label: 'Drink' },
      { value: 'FAST', label: 'Fast' },
      { value: 'SNACKS', label: 'Snacks' },
    ],
    []
  )

  const inventoryOptions = useMemo(
    () => [
      { value: 'SOLD', label: 'Sold' },
      { value: 'STOCKING', label: 'Stocking' },
    ],
    []
  )

  const statusOptions = useMemo(
    () => [
      { value: 'HIDE', label: 'Hide' },
      { value: 'PUBLISH', label: 'Publish' },
    ],
    []
  )

  const INITIAL_VAL_FOOD = useMemo<FoodProps>(() => {
    return {
      name: '',
      categoryId: null,
      type: null,
      image: '',
      amount: 999,
      summary: '',
      content: '',
      discount: 0.1,
      inventory: null,
      liked: 5,
      price: 0,
      rating: 5,
      soldQuantity: 123,
      status: null,
    }
  }, [])

  const {
    handleSubmit,
    getValues,
    setValue,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FoodProps>({
    mode: 'onSubmit',
    defaultValues: INITIAL_VAL_FOOD,
    resolver: yupResolver(validationSchema),
  })

  // useEffect(() => {
  //   if (order) {
  //     setValue('name', order.fullName)
  //     setValue('phone', order.phone)
  //     setValue('amount', order.amount)
  //     setValue('note', order.note)
  //     setValue(
  //       'startDate',
  //       new Date(format(new Date(order.time), 'yyyy/MM/dd'))
  //     )
  //     setValue(
  //       'startTime',
  //       new Date(format(new Date(order.time), 'yyyy/MM/dd HH:mm'))
  //     )

  //     const startDate = getValues().startDate || new Date()

  //     setIsPast(
  //       isBefore(
  //         new Date(format(startDate, 'yyyy/MM/dd')),
  //         new Date(format(new Date(), 'yyyy/MM/dd'))
  //       )
  //     )
  //   }
  // }, [order])

  const onSubmit = async (data) => {}
  return (
    <Modal
      isOpen={showModal}
      title={t('foods.create.title', { ns: 'manager' })}
      toggle={setShowModal}
      acceptMessage={t('action.save', { ns: 'common' })}
      rejectMessage={t('action.cancel', { ns: 'common' })}
      classNameContainer="max-w-full max-w-screen-md max-w-screen-lg max-w-screen-xl"
      onAccept={() => {}}
    >
      <div className="h-[calc(100vh-350px)] overflow-y-auto">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap justify-between"
        >
          <div className="flex grow basis-1/2 py-4 flex-col mb-10 gap-4">
            <div>
              <Input
                label={t('orders.modal.label.name', { ns: 'manager' })}
                placeholder={t('orders.modal.label.name', {
                  ns: 'manager',
                })}
                error={errors.name && (errors.name?.message as string)}
                isRequired
                {...register('name')}
              />
            </div>
            <Stack className="flex flex-wrap justify-between items-center">
              <div className="grow">
                <Select
                  name="categoryId"
                  label={t('foods.filter.label.category', { ns: 'manager' })}
                  options={categoryOptions}
                  isRequired
                  className="w-full"
                />
              </div>
              <div className="grow">
                <Select
                  name="inventory"
                  label={t('foods.filter.label.inventory', { ns: 'manager' })}
                  isRequired
                  options={inventoryOptions}
                  className="w-full"
                />
              </div>
              <div className="grow">
                <Select
                  name="status"
                  label={t('foods.filter.label.status', { ns: 'manager' })}
                  isRequired
                  options={statusOptions}
                  className="w-full"
                />
              </div>
            </Stack>
            <Stack className="flex flex-nowrap justify-between items-center">
              <div className="grow basis-1/4">
                <Select
                  name="type"
                  label={t('foods.filter.label.type', { ns: 'manager' })}
                  isRequired
                  options={foodTypeOptions}
                  className="w-full"
                />
              </div>
              <div className="basis-1/4">
                <Input
                  label={t('foods.filter.label.amount', { ns: 'manager' })}
                  placeholder={t('foods.filter.label.amount', {
                    ns: 'manager',
                  })}
                  error={errors.amount && (errors.amount?.message as string)}
                  isRequired
                  {...register('amount')}
                />
              </div>
              <div className="basis-1/4">
                <Input
                  label={t('foods.filter.label.discount', { ns: 'manager' })}
                  placeholder={t('foods.filter.label.discount', {
                    ns: 'manager',
                  })}
                  error={
                    errors.discount && (errors.discount?.message as string)
                  }
                  isRequired
                  {...register('discount')}
                />
              </div>
              <div className="basis-1/4">
                <Input
                  label={t('foods.filter.label.price', { ns: 'manager' })}
                  placeholder={t('foods.filter.label.price', {
                    ns: 'manager',
                  })}
                  error={errors.price && (errors.price?.message as string)}
                  isRequired
                  {...register('price')}
                />
              </div>
            </Stack>
            <div className="relative">
              <RichEditor
                label={t('foods.filter.label.summary', { ns: 'manager' })}
                minHeight={105}
                onChange={setSummary}
                defaultValue={
                  summary &&
                  summary?.blocks &&
                  Object.keys(summary?.blocks).length &&
                  convertFromRaw(summary)
                }
                isResetValue={resetSummary}
                onResetValue={setResetSummary}
                error={error?.summary}
              />
            </div>
            <div className="relative">
              <RichEditor
                label={t('foods.filter.label.content', { ns: 'manager' })}
                minHeight={105}
                onChange={setContent}
                defaultValue={
                  content &&
                  content?.blocks &&
                  Object.keys(content?.blocks).length &&
                  convertFromRaw(content)
                }
                isResetValue={resetContent}
                onResetValue={setResetContent}
                error={error?.content}
              />
            </div>
            <div className='max-w-[650px]'>
              <UploadImage
                label={t('foods.filter.label.thumbnail', { ns: 'manager' })}
                title={t('foods.filter.upload_image', { ns: 'manager' })}
                description={t('foods.filter.thumbnail_description', { ns: 'manager' })}
                extensionsAllowed={['jpeg', 'jpg', 'png', 'gif', 'webp']}
                accept="image/*"
                maxSizeByMB={10}
                defaultImage={getValues().image && getValues().image}
                onChange={(file) => setValue('image', file)}
                setIsChangeImage={setIsChangeThumbnail}
              />
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default FoodModal
