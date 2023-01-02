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
import { OrderProps } from '@/page-components/Customer/Order/types'
import format from 'date-fns/format'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from '@/page-components/Customer/Order/function'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { useOrderDetailById } from '@/lib/order'
import { getSelectOptions, numberFormatPrice } from '@/utils'

type OrderModalProps = {
  orderID: number
  showModal: boolean
  setShowModal: () => void
}

const OrderModal = ({ orderID, showModal, setShowModal }: OrderModalProps) => {
  const { t } = useTranslation(['common', 'manager', 'food', 'order'])
  const [table, setTable] = useState<number | string>('')
  const { data: order } = useOrderDetailById(orderID)

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

  const { setValue, control, register } = useForm<OrderProps>({
    mode: 'onSubmit',
    defaultValues: INITIAL_VAL_BOOKING_FORM,
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
      const tableInfo = order?.seats?.find((data) => data.isChoose)
      if (tableInfo) setTable(tableInfo?.position)
    }
  }, [order])

  return (
    <Modal
      isOpen={showModal}
      title={t('orders.modal.title', { ns: 'manager' })}
      toggle={setShowModal}
      rejectMessage={t('action.cancel', { ns: 'common' })}
      classNameContainer="max-w-full max-w-screen-md max-w-screen-lg max-w-screen-xl"
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
          <Typography fontSize="text-sm" weight="semibold">
            {`Table: ${table}`}
          </Typography>
        </div>
        <Form id="order_detail_form" className="flex flex-wrap justify-between">
          <div className="flex grow basis-1/2 py-4 flex-col mb-10 gap-2 px-[5%]">
            <div>
              <Input
                label={t('orders.modal.label.name', { ns: 'manager' })}
                placeholder={t('orders.modal.label.name', {
                  ns: 'manager',
                })}
                disabled={true}
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
                disabled={true}
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
                      />
                    )}
                  />
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
              </div>
            </div>

            <div className="flex items-center w-40">
              <Input
                label={t('orders.modal.label.amount', { ns: 'manager' })}
                type="number"
                disabled={true}
                placeholder={t('orders.modal.label.amount', {
                  ns: 'manager',
                })}
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
                disabled={true}
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
