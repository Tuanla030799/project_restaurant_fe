import React, { useEffect, useMemo, useState } from 'react'
import {
  Button,
  CustomDatePicker,
  Form,
  Input,
  InputTime,
  Modal,
  Select,
  Textarea,
  Typography,
} from '@/components'
import { OrderProps } from '@/page-components/Customer/Orders/types'
import format from 'date-fns/format'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from '@/page-components/Customer/Orders/function'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { useOrderDetailById } from '@/lib/order'
import isBefore from 'date-fns/isBefore'
import { getSelectOptions, numberFormatPrice } from '@/utils'
import { OrderPayload } from '@/models'
import { useLoadingOverlayContext } from '@/hooks'
import { useToast } from '@/lib/store'
import { updateOrder } from 'apis/order'

type OrderModalProps = {
  orderID: number
  showModal: boolean
  setShowModal: () => void
}

const OrderModal = ({ orderID, showModal, setShowModal }: OrderModalProps) => {
  const { t } = useTranslation(['common', 'manager', 'food', 'order'])
  const { setToast } = useToast()
  const { toggleLoadingOverlay } = useLoadingOverlayContext()
  const { data: order } = useOrderDetailById(orderID)
  const [isPast, setIsPast] = useState<boolean>(true)
  const seatOptions = getSelectOptions(order?.seats)

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
      seatIds: [],
    }
  }, [])

  const {
    handleSubmit,
    getValues,
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
    if (order) {
      setValue('name', order.fullName)
      setValue('phone', order.phone)
      setValue('amount', order.amount)
      setValue('note', order.note)
      setValue(
        'startDate',
        new Date(format(new Date(order.time), 'yyyy/MM/dd'))
      )
      setValue(
        'startTime',
        new Date(format(new Date(order.time), 'yyyy/MM/dd HH:mm'))
      )

      const startDate = getValues().startDate || new Date()

      setIsPast(
        isBefore(
          new Date(format(startDate, 'yyyy/MM/dd')),
          new Date(format(new Date(), 'yyyy/MM/dd'))
        )
      )
    }
  }, [order])

  const onSubmit = async (data) => {
    try {
      const time = `${format(data.startDate, 'yyyy/MM/dd')} ${format(
        data.startTime,
        'HH:mm'
      )}`
      // const orderDetails: OrderFoodPayload[] = listFoodAll
      //   .filter((food) => food.quantity)
      //   .map((food) => {
      //     return {
      //       foodId: +food.id,
      //       price: food.price ? +food.price : 0,
      //       quantity: +food.quantity,
      //     }
      //   })
      // const totalPrice = listFoodAll
      //   .filter((food) => food.quantity)
      //   .reduce((acc: number, crr) => {
      //     return (acc = acc + Number(crr.price) * Number(crr.quantity))
      //   }, 0)
      let orders: OrderPayload = {}
      orders.amount = data.amount
      orders.fullName = data.name
      orders.phone = data.phone
      orders.time = time
      orders.note = data.note
      orders.seatIds = data.seatIds

      if (Object.keys(orders).length) {
        toggleLoadingOverlay()
        await updateOrder(orderID, orders)

        setToast({
          color: 'success',
          title: t('message.success', { ns: 'order' }),
        })
      }
    } catch (error) {
      setToast({
        color: 'error',
        title: t('message.error', { ns: 'order' }),
      })
    } finally {
      toggleLoadingOverlay()
    }
  }
  return (
    <Modal
      isOpen={showModal}
      title={t('orders.modal.title', { ns: 'manager' })}
      toggle={setShowModal}
      acceptMessage={t('action.save', { ns: 'common' })}
      rejectMessage={t('action.cancel', { ns: 'common' })}
      classNameContainer="max-w-full max-w-screen-md max-w-screen-lg max-w-screen-xl"
      typeButtonAccept="submit"
      formButtonAccept="order_detail_form"
    >
      <div className="max-h-[calc(100vh-350px)] overflow-y-auto">
        <div className="flex flex-wrap gap-8">
          <Typography fontSize="text-sm" weight="semibold">
            {`${t('orders.modal.user_Name', {
              ns: 'manager',
            })}: ${!!order?.user && order.user.username}`}
          </Typography>
          <Typography fontSize="text-sm" weight="semibold">
            {`${t('orders.modal.email', {
              ns: 'manager',
            })}: ${!!order?.user && order.user.email}`}
          </Typography>
        </div>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          id="order_detail_form"
          className="flex flex-wrap justify-between"
        >
          <div className="flex grow basis-1/2 py-4 flex-col mb-10 gap-2 px-[5%]">
            <div>
              <Input
                label={t('orders.modal.label.name', { ns: 'manager' })}
                placeholder={t('orders.modal.label.name', {
                  ns: 'manager',
                })}
                disabled={isPast}
                error={errors.name && (errors.name?.message as string)}
                isRequired
                {...register('name')}
              />
            </div>

            <div>
              <Input
                label={t('orders.modal.label.phone', { ns: 'manager' })}
                placeholder={t('orders.modal.label.phone', {
                  ns: 'manager',
                })}
                disabled={isPast}
                error={errors.phone && (errors.phone?.message as string)}
                isRequired
                {...register('phone')}
              />
            </div>

            <div>
              <label className="flex text-base text-gray-700 font-semibold mb-1.5">
                {t('orders.modal.label.time', {
                  ns: 'manager',
                })}
              </label>
              <div className="flex gap-4 flex-wrap relative">
                <div className="">
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field: { onChange, value } }) => (
                      <CustomDatePicker
                        className="mr-6"
                        placeholder={t('orders.modal.placeholder.select_date', {
                          ns: 'manager',
                        })}
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
                <div className="mr-6">
                  <Controller
                    control={control}
                    name="startTime"
                    render={({ field }) => (
                      <InputTime
                        {...field}
                        value={
                          field?.value ? format(field?.value, 'HH:mm') : ''
                        }
                      />
                    )}
                  />
                </div>
                {!!seatOptions.length && !!order?.seats?.length && (
                  <div>
                    <Controller
                      control={control}
                      name="seatIds"
                      render={({ field: { value, onChange } }) => (
                        <Select
                          name="seatIds"
                          dropdownMinWidth={200}
                          placeholder="Select table"
                          options={seatOptions}
                          defaultOption={
                            order?.seats?.find((data) => data.isChoose)
                              ? getSelectOptions(
                                  order?.seats.filter((data) => data.isChoose)
                                )
                              : undefined
                          }
                          className="w-full"
                          onChange={(data) => {
                            onChange(data.map((data) => data.value))
                          }}
                          loading
                          multiple
                        />
                      )}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center w-40">
              <Input
                label={t('orders.modal.label.amount', { ns: 'manager' })}
                type="number"
                disabled={isPast}
                placeholder={t('orders.modal.label.amount', {
                  ns: 'manager',
                })}
                error={errors.amount && (errors.amount?.message as string)}
                isRequired
                {...register('amount')}
              />
            </div>

            <div>
              <Textarea
                label={t('orders.modal.label.note', { ns: 'manager' })}
                placeholder={t('orders.modal.label.note', {
                  ns: 'manager',
                })}
                disabled={isPast}
                error={errors.note && (errors.note?.message as string)}
                {...register('note')}
              />
            </div>

            {!!order?.orderDetails?.length && (
              <div className="flex grow flex-col items-center px-4 gap-2">
                <Typography
                  variant="h1"
                  weight="semibold"
                  align="center"
                  gutter
                >
                  {t('orders.modal.order_food', { ns: 'manager' })}
                </Typography>

                <div className="table w-full">
                  <div className="table-header-group font-semibold">
                    <div className="table-row">
                      <div className="table-cell text-left p-3">Id</div>
                      <div className="table-cell text-left p-3">Name</div>
                      <div className="table-cell text-center p-3">Quantity</div>
                      <div className="table-cell text-right p-3">Price</div>
                    </div>
                  </div>
                  <div className="table-row-group">
                    {order.orderDetails.map((food, index) => {
                      return (
                        <div className="table-row" key={index}>
                          <div className="table-cell text-left p-3">
                            {food.foodId}
                          </div>
                          <div className="table-cell text-left p-3">
                            {food.foodName}
                          </div>
                          <div className="table-cell text-center p-3">
                            {food.quantity}
                          </div>
                          <div className="table-cell text-right p-3">
                            {numberFormatPrice(
                              Number(food.quantity) * Number(food.price)
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="flex  w-full justify-end p-3 font-semibold">
                  {numberFormatPrice(order.totalPrice)}
                </div>
              </div>
            )}
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default OrderModal
