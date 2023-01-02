import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import {
  Breadcrumbs,
  Button,
  Container,
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
import { useUserOrders } from '@/lib/order'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { House } from 'phosphor-react'
import { initialParams, ORDERS_USER_HEADER_TABLE } from './constants'
import { dateToString, getUrlFromNestedObject } from '@/utils'
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@/constants/paginate'
import { usePaginate, useToggle } from '@/hooks'
import { useToast } from '@/lib/store'
import OrderModal from './OrderModal'
import Wrapper from 'components/Wrapper'
import { getColor } from '@/page-components/Manager/Orders/function'

const DD_MM_YYYY_HH_MM_DATE_FORMAT = 'dd/MM/yyyy  HH:mm'

const Orders = () => {
  const { t } = useTranslation(['manager'])
  const [params, setParams] = useState<any>(initialParams)
  const [showOrderDetail, setShowOrderDetail] = useToggle()
  const [orderID, setOrderID] = useState<number>(0)
  const { setToast } = useToast()
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PER_PAGE)
  const [currentPage, handlePaginate] = usePaginate(DEFAULT_PAGE)
  const {
    data: { items: orders = [], meta: pagination = {} } = {},
    mutate,
    isValidating,
  } = useUserOrders(getUrlFromNestedObject(params))

  useEffect(() => {
    setParams({
      ...params,
      page: currentPage,
      perPage: pageSize,
    })
  }, [currentPage, pageSize])

  const ordersTableHeader = useMemo(
    () =>
      ORDERS_USER_HEADER_TABLE?.map(({ label, field, className }) => ({
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

  return (
    <div className="pt-1 bg-gray-100">
      <Container>
        <Wrapper className="px-2 pb-12 mb-2">
          <Breadcrumbs maxItems={3} className="pb-6 py-4">
            <Link href={routes.home.generatePath()}>
              <a>
                <House weight="fill" size={20} />
              </a>
            </Link>
            <Typography>{t('orders.title', { ns: 'manager' })}</Typography>
          </Breadcrumbs>

          <div className="min-h-[calc(100vh-500px)]">
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
                <Typography className="text-gray-700 pt-6">
                  No orders
                </Typography>
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
        </Wrapper>
      </Container>
    </div>
  )
}

export default Orders
