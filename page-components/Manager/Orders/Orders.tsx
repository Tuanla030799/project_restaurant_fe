import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import {
  Breadcrumbs,
  Button,
  Container,
  CustomDatePicker,
  Form,
  Input,
  Pagination,
  Select,
  Spinner,
  Stack,
  Table,
  Typography,
} from '@/components'
import { routes } from '@/constants/routes'
import { useOrders } from '@/lib/order'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import {
  Check,
  DeviceTabletSpeaker,
  House,
  MagnifyingGlass,
  X,
} from 'phosphor-react'
import {
  initialParams,
  ORDERS_HEADER_TABLE,
  pageOptions,
  Status,
  statusActions,
  TypeHandler,
} from './constants'
import { getColor } from './function'
import { dateToString, getUrlFromNestedObject } from '@/utils'
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@/constants/paginate'
import { useDebounce, usePaginate, useToggle } from '@/hooks'
import { useToast } from '@/lib/store'
import { updateOrderStatus } from 'apis/order'
import OrderModal from './OrderModal'
import format from 'date-fns/format'

const DD_MM_YYYY_HH_MM_DATE_FORMAT = 'dd/MM/yyyy  HH:mm'

const Orders = () => {
  const { t } = useTranslation(['manager'])
  const [params, setParams] = useState<any>(initialParams)
  const [showOrderDetail, setShowOrderDetail] = useToggle()
  const [orderID, setOrderID] = useState<number>(0)
  const { setToast } = useToast()
  const [keyword, setKeyword] = useState<string>('')
  const [idsClickedLoading, setIdsClickedLoading] = useState<number>()
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PER_PAGE)
  const [currentPage, handlePaginate] = usePaginate(DEFAULT_PAGE)
  const debouncedSearchLearner = useDebounce<string>(keyword)
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [dateSelected, setDateSelected] = useState<Date | null>(null)
  const {
    data: { items: orders = [], meta: pagination = {} } = {},
    mutate,
    isValidating,
  } = useOrders(getUrlFromNestedObject(params))

  const statusOptions = useMemo(
    () => [
      { value: '', label: t('orders.filter.all') },
      { value: '0', label: t('orders.filter.status.waiting') },
      { value: '1', label: t('orders.filter.status.approve') },
      { value: '2', label: t('orders.filter.status.reject') },
    ],
    []
  )

  useEffect(() => {
    setParams({
      ...params,
      page: currentPage,
      perPage: pageSize,
      search: encodeURIComponent(debouncedSearchLearner),
      status: selectedStatus,
      orderStartTime: dateSelected ? format(dateSelected, 'dd/MM/yyyy') : '',
      orderEndTime: dateSelected ? format(dateSelected, 'dd/MM/yyyy') : '',
    })
  }, [
    currentPage,
    pageSize,
    debouncedSearchLearner,
    selectedStatus,
    dateSelected,
  ])

  const renderActions = (status, id) => {
    const { rejectedButton, approvedButton } = getColor(status)

    return (
      <>
        {idsClickedLoading === id && isValidating ? (
          <Stack align="center" className="w-full h-9">
            <Spinner size="xs" />
          </Stack>
        ) : (
          <div className="flex align-center justify-center gap-2">
            <div className="w-9">
              <Button
                size="xs"
                onlyIcon
                color="gray"
                variant="text"
                className={status === Status.APPROVE ? 'hidden' : ''}
                onClick={(event) => {
                  handleChangeStatus(event, statusActions.APPROVE, id)
                }}
              >
                <span
                  className={`p-1.5 rounded-[50px] ${rejectedButton?.bgColor}`}
                >
                  <Check
                    size={14}
                    color={rejectedButton?.textColor}
                    weight="bold"
                  />
                </span>
              </Button>
            </div>
            <div className="w-9">
              <Button
                size="xs"
                onlyIcon
                color="gray"
                variant="text"
                className={status === Status.REJECT ? 'hidden' : ''}
                onClick={(event) => {
                  handleChangeStatus(event, statusActions.REJECT, id)
                }}
              >
                <span
                  className={`p-1.5 rounded-[50px] ${approvedButton?.bgColor}`}
                >
                  <X
                    size={12}
                    color={approvedButton?.textColor}
                    weight="bold"
                  />
                </span>
              </Button>
            </div>
          </div>
        )}
      </>
    )
  }

  const ordersTableHeader = useMemo(
    () =>
      ORDERS_HEADER_TABLE?.map(({ label, field, className }) => ({
        label: t(label),
        field,
        className,
      })),
    []
  )

  const renderStatus = (status) => {
    const { label, bgColor, textColor } = getColor(status)

    return (
      <div className={`text-center`}>
        <span
          className={`text-${textColor} border-${bgColor} bg-${bgColor} rounded-[20px] text-sm py-1 px-4`}
        >
          {t(label)}
        </span>
      </div>
    )
  }

  const rows = orders?.map(
    ({ id, fullName, phone, amount, status, note, time }) => ({
      data: {
        id: { content: id },
        name: { content: fullName },
        phone: { content: phone },
        amount: { content: amount, className: 'text-center w-[110px]' },
        status: {
          content: renderStatus(status),
          className: 'text-center min-w-[150px]',
        },
        note: { content: note },
        time: {
          content: dateToString(new Date(time), DD_MM_YYYY_HH_MM_DATE_FORMAT),
          className: 'text-center min-w-[150px]',
        },
        action: {
          content: renderActions(status, id),
          className: 'text-center',
        },
      },
      props: {
        id: id,
        handleClick: () => handleOrderDetail(id),
      },
    })
  )

  const handleOrderDetail = (id: number) => {
    setShowOrderDetail()
    setOrderID(id)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setKeyword(value)
  }

  const handleChangeStatus = async (event, type: TypeHandler, id) => {
    event.stopPropagation()
    try {
      switch (type) {
        case 'Approve':
          await updateOrderStatus(id, Status.APPROVE)
          break
        case 'Reject':
          await updateOrderStatus(id, Status.REJECT)
          break
        default:
          return
      }

      setIdsClickedLoading(id)

      await mutate()

      setToast({
        color: 'success',
        title: t('orders.message.success', { ns: 'manager' }),
      })
    } catch (error) {
      setToast({
        color: 'error',
        title: t('orders.message.error', { ns: 'manager' }),
      })
    }
  }

  return (
    <>
      <div className="bg-management bg-center bg-cover pt-4 pb-8 px-8">
        <Breadcrumbs maxItems={3} className="pb-6">
          <Link href={routes.home.generatePath()}>
            <a>
              <House weight="fill" size={20} />
            </a>
          </Link>
          <Typography>{t('orders.title', { ns: 'manager' })}</Typography>
        </Breadcrumbs>
        <Stack direction="column">
          <Typography fontSize="display-md" weight="medium">
            {t('orders.title', { ns: 'manager' })}
          </Typography>
          <Stack>
            <DeviceTabletSpeaker
              size={24}
              weight="fill"
              className="text-primary-400"
            />
          </Stack>
        </Stack>
      </div>

      <div className="px-8 py-4">
        <Form className="py-4" onSubmit={(data) => setKeyword(data.learner)}>
          <div className="flex justify-between flex-wrap pb-8 gap-y-8">
            <Stack spacing={24} className="flex justify-start flex-wrap">
              <Select
                className="w-25"
                name="view_by_status"
                label={t('orders.filter.view_by_status')}
                direction="row"
                options={statusOptions}
                defaultOption={statusOptions[0]}
                loading={true}
                onChange={(data) => setSelectedStatus(data.value)}
              />
              <CustomDatePicker
                className="mr-6"
                placeholder={t('orders.modal.placeholder.select_date', {
                  ns: 'manager',
                })}
                onChange={(newDate) => {
                  if (newDate) setDateSelected(newDate)
                }}
                daySelected={dateSelected}
                onClear={() => setDateSelected(null)}
                onResetToday={() => setDateSelected(new Date())}
              />
            </Stack>
            <div>
              <Input
                type="search"
                name="learner"
                size="md"
                className="w-[350px]"
                value={keyword}
                placeholder={t('orders.filter.placeholder', {
                  ns: 'manager',
                })}
                leading={
                  <button type="submit" className="leading-0">
                    <MagnifyingGlass size={20} className="text-gray-700" />
                  </button>
                }
                onChange={handleSearch}
              />
            </div>
          </div>
          <div>
            <Select
              className="w-25"
              name="show_items"
              label={t('orders.filter.show_items')}
              direction="row"
              options={pageOptions}
              defaultOption={pageOptions[0]}
              dropdownMinWidth={80}
              onChange={(data) => setPageSize(Number(data.value))}
            />
          </div>
        </Form>

        <div>
          {isValidating && !rows?.length ? (
            <Stack align="center" className="pt-12">
              <Spinner size="sm" />
            </Stack>
          ) : orders.length ? (
            <Table
              headerClassName="py-3 px-6 text-md font-medium"
              rowClassName="py-4 px-6 text-sm font-medium"
              headers={ordersTableHeader}
              rows={rows}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          ) : (
            <Typography className="text-gray-700 pt-6">No order</Typography>
          )}
          {!!pagination?.totalPages && (
            <Pagination
              className="mt-6"
              totalItems={Number(pagination.totalItems)}
              pageSize={pageSize}
              currentPage={currentPage}
              onChange={handlePaginate}
            />
          )}
        </div>
      </div>
      {showOrderDetail && (
        <OrderModal
          orderID={orderID}
          showModal={showOrderDetail}
          setShowModal={setShowOrderDetail}
        />
      )}
    </>
  )
}

export default Orders
