import React, { useEffect, useMemo, useState } from 'react'
import {
  Form,
  Input,
  Modal,
  RichEditor,
  Select,
  Stack,
  Textarea,
  Typography,
  UploadImage,
} from '@/components'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { getSelectOptions, trimDataObject } from '@/utils'
import { FoodProps } from './type'
import { validationSchema } from './function'
import { useCategories } from '@/lib/category'
import { convertFromRaw, convertToRaw } from 'draft-js'
import { useError, useToast } from '@/lib/store'
import update from 'immutability-helper'
import { handleCheckCharacter } from '@/page-components/Customer/Orders/function'
import { createFood } from '@/apis'

type FoodModalProps = {
  foodID?: number
  showModal: boolean
  setShowModal: () => void
  mutate?: () => void
}

export const MAX_CHARACTER_LENGTH = 5000

const FoodModal = ({
  foodID,
  showModal,
  setShowModal,
  mutate,
}: FoodModalProps) => {
  const { t } = useTranslation(['common', 'manager', 'food'])
  // const { data: order } = useOrderDetailById(foodID)
  const { data: { data: categories } = {} } = useCategories()
  const categoryOptions = getSelectOptions(categories)
  const [content, setContent] = useState<any>(null)
  const [resetContent, setResetContent] = useState<boolean>(false)
  const [isChangeThumbnail, setIsChangeThumbnail] = useState<boolean>(false)
  const { error, setError, resetError } = useError()
  const { setToast } = useToast()

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
      image: null,
      amount: 999,
      summary: '',
      content: '',
      discount: 0.1,
      inventory: null,
      liked: 5,
      price: 1000,
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
    formState: { errors },
  } = useForm<FoodProps>({
    mode: 'onSubmit',
    defaultValues: INITIAL_VAL_FOOD,
    resolver: yupResolver(validationSchema),
  })

  // useEffect(() => {
  //   setValue('summary', summary)
  // }, [summary])

  // useEffect(() => {
  //   setValue('content', content)
  // }, [content])

  useEffect(() => {
    console.log('errors', errors)
  }, [errors])

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

  const onSubmit = async (data) => {
    const {
      name,
      categoryId,
      type,
      image,
      amount,
      discount,
      inventory,
      liked,
      price,
      rating,
      soldQuantity,
      status,
      summary,
    } = trimDataObject(data)

    const contentChanged = validatorRichEditor(content)

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('categoryId', categoryId)
      formData.append('type', type)
      formData.append('amount', amount)
      formData.append('discount', discount)
      formData.append('liked', liked)
      formData.append('inventory', inventory)
      formData.append('price', price)
      formData.append('rating', rating)
      formData.append('soldQuantity', soldQuantity)
      formData.append('status', status)
      formData.append('content', JSON.stringify(contentChanged))
      formData.append('summary', summary)
      image instanceof File && formData.append('image', image)

      await createFood(formData)

      mutate && (await mutate())

      setShowModal

      setToast({
        color: 'success',
        title: t('foods.message.create.success', {
          ns: 'manager',
        }),
      })
    } catch (error) {
      setToast({
        color: 'error',
        title: t('foods.message.create.error', {
          ns: 'manager',
        }),
      })
    }
  }

  const validatorRichEditor = (description) => {
    const rawDescription = description && convertToRaw(description)

    const rawDescriptionLength = rawDescription && rawDescription.blocks.length

    const changedRawDescription =
      rawDescription &&
      update(rawDescription, {
        blocks: {
          0: {
            text: {
              $set: rawDescription.blocks[0].text.trim(),
            },
          },
          [rawDescriptionLength - 1]: {
            text: {
              $set: rawDescription.blocks[rawDescriptionLength - 1].text.trim(),
            },
          },
        },
      })

    const descriptionLength = rawDescription
      ? handleCheckCharacter(changedRawDescription)
      : 0

    if (descriptionLength >= MAX_CHARACTER_LENGTH) {
      setError({
        ...error,
        [description]: [`The ${description} is too long (max 5000 characters)`],
      })
    }

    return changedRawDescription
  }

  return (
    <Modal
      isOpen={showModal}
      title={t('foods.create.title', { ns: 'manager' })}
      toggle={setShowModal}
      acceptMessage={t('action.save', { ns: 'common' })}
      rejectMessage={t('action.cancel', { ns: 'common' })}
      classNameContainer="max-w-full max-w-screen-md max-w-screen-lg max-w-screen-xl"
      onAccept={() => {}}
      typeButtonAccept="submit"
      formButtonAccept="food_form"
    >
      <div className="h-[calc(100vh-350px)] overflow-y-auto p-1">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap justify-between"
          id="food_form"
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
            <Stack className="flex flex-wrap justify-between items-start">
              <div className="grow">
                <Controller
                  control={control}
                  name="categoryId"
                  render={({ field: { value, onChange } }) => (
                    <Select
                      name="categoryId"
                      label={t('foods.filter.label.category', {
                        ns: 'manager',
                      })}
                      options={categoryOptions}
                      isRequired
                      className="w-full"
                      onChange={(data) => onChange(data.value)}
                    />
                  )}
                />
                {errors?.categoryId && (
                  <Typography
                    fontSize="text-sm"
                    className="mt-1.5 text-red-600"
                  >
                    {errors.categoryId?.message as string}
                  </Typography>
                )}
              </div>
              <div className="grow">
                <Controller
                  control={control}
                  name="inventory"
                  render={({ field: { value, onChange } }) => (
                    <Select
                      name="inventory"
                      label={t('foods.filter.label.inventory', {
                        ns: 'manager',
                      })}
                      isRequired
                      options={inventoryOptions}
                      className="w-full"
                      onChange={(data) => onChange(data.value)}
                    />
                  )}
                />
                {errors?.inventory && (
                  <Typography
                    fontSize="text-sm"
                    className="mt-1.5 text-red-600"
                  >
                    {errors.inventory?.message as string}
                  </Typography>
                )}
              </div>
              <div className="grow">
                <Controller
                  control={control}
                  name="status"
                  render={({ field: { value, onChange } }) => (
                    <Select
                      name="status"
                      label={t('foods.filter.label.status', { ns: 'manager' })}
                      isRequired
                      options={statusOptions}
                      className="w-full"
                      onChange={(data) => onChange(data.value)}
                    />
                  )}
                />
                {errors?.status && (
                  <Typography
                    fontSize="text-sm"
                    className="mt-1.5 text-red-600"
                  >
                    {errors.status?.message as string}
                  </Typography>
                )}
              </div>
            </Stack>
            <Stack className="flex flex-nowrap justify-between items-start">
              <div className="grow basis-1/4">
                <Controller
                  control={control}
                  name="type"
                  render={({ field: { value, onChange } }) => (
                    <Select
                      name="type"
                      label={t('foods.filter.label.type', { ns: 'manager' })}
                      isRequired
                      options={foodTypeOptions}
                      className="w-full"
                      onChange={(data) => onChange(data.value)}
                    />
                  )}
                />
                {errors?.type && (
                  <Typography
                    fontSize="text-sm"
                    className="mt-1.5 text-red-600"
                  >
                    {errors.type?.message as string}
                  </Typography>
                )}
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
              <Textarea
                label={t('foods.filter.label.summary', { ns: 'manager' })}
                placeholder={t('foods.filter.label.summary', {
                  ns: 'manager',
                })}
                error={errors.summary && (errors.summary?.message as string)}
                {...register('summary')}
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
            <div className="max-w-[650px]">
              <UploadImage
                label={t('foods.filter.label.thumbnail', { ns: 'manager' })}
                title={t('foods.filter.upload_image', { ns: 'manager' })}
                description={t('foods.filter.thumbnail_description', {
                  ns: 'manager',
                })}
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
