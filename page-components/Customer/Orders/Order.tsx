import React, { useEffect, useMemo, useState } from 'react'
import {
  AspectRatio,
  Breadcrumbs,
  Button,
  Container,
  CustomDatePicker,
  Form,
  Input,
  InputTime,
  Textarea,
  Typography,
} from '@/components'
import { routes } from '@/constants/routes'
import Wrapper from 'components/Wrapper'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { House, Info } from 'phosphor-react'
import { number, object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import InstructionBooking from 'components/InstructionBooking'
import { useToast } from '@/lib/store'
import { useRouter } from 'next/router'
import { useHeaderData } from '@/lib/header'
import { OrderProps } from './types'
import format from 'date-fns/format'
import { validationSchema } from './function'
import { useToggle } from '@/hooks'
import ListFoodModal from './ListFoodModal'
const Orders = () => {
  const { profile } = useHeaderData()
  const { mutate } = useHeaderData()
  const { t } = useTranslation(['common', 'order'])
  const { setToast } = useToast()
  const router = useRouter()
  const [showListFoodModal, setShowListFoodModal] = useToggle()

  const INITIAL_VAL_BOOKING_FORM = useMemo<OrderProps>(() => {
    return {
      name: '',
      phone: '',
      amount: 0,
      note: '',
      startDate: new Date(format(new Date(), 'yyyy/MM/dd')),
      startTime: new Date(format(new Date(), 'yyyy/MM/dd HH:mm')),
      totalPrice: 0,
      orderDetails: [],
    }
  }, [profile])

  const {
    handleSubmit,
    setValue,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm<OrderProps>({
    mode: 'onSubmit',
    defaultValues: INITIAL_VAL_BOOKING_FORM,
    resolver: yupResolver(validationSchema),
  })

  useEffect(() => {
    if (profile) {
      setValue('name', profile.firstName + ' ' + profile.lastName)
      setValue('phone', profile.phone)
    }
  }, [profile])

  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <div className="pt-1 bg-gray-100">
      <Container>
        <Wrapper className="px-2 pb-12">
          <>
            <div className=" py-4">
              <Container>
                <Breadcrumbs maxItems={3}>
                  <Link href={routes.home.generatePath()}>
                    <a>
                      <House weight="fill" size={20} />
                    </a>
                  </Link>
                  <Typography>{t('orders', { ns: 'order' })}</Typography>
                </Breadcrumbs>

                <Form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex justify-between"
                >
                  <div className="flex basis-1/2 py-4 flex-col items-center px-4 mb-10 gap-6 h-[624px]">
                    <Typography
                      variant="h1"
                      fontSize="display-xs"
                      weight="semibold"
                      align="center"
                      gutter
                      className="mt-7"
                    >
                      {t('order_food', { ns: 'order' })}
                    </Typography>

                    <Typography
                      className="text-gray-600 mt-7 font-semibold"
                      align="center"
                      gutter
                    >
                      {t('no_food', { ns: 'order' })}
                    </Typography>

                    <div className="w-fit">
                      <Button size="md" variant="outlined" className="mt-2" onClick={setShowListFoodModal}>
                        {t('action.order', { ns: 'order' })}
                      </Button>
                    </div>
                  </div>
                  <div className="flex basis-1/2 py-4 flex-col mb-10 gap-6 px-[5%]">
                    <Typography
                      variant="h1"
                      fontSize="display-xs"
                      weight="semibold"
                      align="center"
                      gutter
                      className="mt-7"
                    >
                      {t('title', { ns: 'order' })}
                    </Typography>

                    <div>
                      <Input
                        label={t('form_order.label.name', { ns: 'order' })}
                        placeholder={t('form_order.label.name', {
                          ns: 'order',
                        })}
                        error={errors.name && (errors.name?.message as string)}
                        isRequired
                        {...register('name')}
                      />
                    </div>

                    <div>
                      <Input
                        label={t('form_order.label.phone', { ns: 'order' })}
                        placeholder={t('form_order.label.phone', {
                          ns: 'order',
                        })}
                        error={
                          errors.phone && (errors.phone?.message as string)
                        }
                        isRequired
                        {...register('phone')}
                      />
                    </div>

                    <div className="flex gap-4 items-end">
                      <div>
                        <label className="block text-base text-gray-700 font-semibold mb-1.5">
                          {t('form_order.label.time', {
                            ns: 'order',
                          })}
                        </label>
                        <div className="flex gap-4 relative">
                          <div className="">
                            <Controller
                              control={control}
                              name="startDate"
                              render={({ field: { onChange, value } }) => (
                                <CustomDatePicker
                                  className="mr-6"
                                  placeholder={t(
                                    'form_order.placeholder.select_date',
                                    {
                                      ns: 'order',
                                    }
                                  )}
                                  onChange={(newDate) => onChange(newDate)}
                                  daySelected={value}
                                  onClear={() => onChange(null)}
                                  onResetToday={() => onChange(new Date())}
                                  error={!!errors?.startDate}
                                />
                              )}
                            />
                            {!!errors?.startDate && (
                              <span className="absolute text-xs text-red-600 left-0 top-12">
                                {t(errors?.startDate?.message as string)}
                              </span>
                            )}
                            {!errors?.startDate && !!errors?.startTime && (
                              <span className="absolute text-xs text-red-600 left-0 top-12">
                                {t(errors?.startTime?.message as string)}
                              </span>
                            )}
                          </div>
                          <Controller
                            control={control}
                            name="startTime"
                            render={({ field }) => (
                              <InputTime
                                {...field}
                                value={
                                  field?.value
                                    ? format(field?.value, 'HH:mm')
                                    : ''
                                }
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center w-40">
                      <Input
                        label={t('form_order.label.amount', { ns: 'order' })}
                        type="number"
                        placeholder={t('form_order.label.amount', {
                          ns: 'order',
                        })}
                        error={
                          errors.amount && (errors.amount?.message as string)
                        }
                        isRequired
                        {...register('amount')}
                      />
                    </div>

                    <div>
                      <Textarea
                        label={t('form_order.label.note', { ns: 'order' })}
                        placeholder={t('form_order.label.note', {
                          ns: 'order',
                        })}
                        error={errors.note && (errors.note?.message as string)}
                        {...register('note')}
                      />
                    </div>

                    <Typography
                      className="text-gray-600 font-semibold"
                      align="center"
                      gutter
                    >
                      {t('form_order.instruction', { ns: 'order' })}
                    </Typography>

                    <div className="flex justify-end items-center">
                      <Button size="sm" type="submit" className="mt-2">
                        {t('action.booking_table', { ns: 'order' })}
                      </Button>
                    </div>
                  </div>
                </Form>
              </Container>
            </div>
          </>
        </Wrapper>
        <Wrapper className="my-3 pb-12">
          <InstructionBooking />
        </Wrapper>
        {showListFoodModal && (
          <ListFoodModal
            showModal={showListFoodModal}
            setShowModal={setShowListFoodModal}
          />
        )}
      </Container>
    </div>
  )
}

export default Orders
