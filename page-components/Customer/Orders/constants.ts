import { DEFAULT_PER_PAGE } from '@/constants/paginate'

export enum Status {
  APPROVE = 1,
  REJECT = 2,
  PENDING = 0,
}

export const ORDERS_USER_HEADER_TABLE = [
  { label: 'orders.table.id', field: 'id' },
  { label: 'orders.table.name', field: 'fullName' },
  { label: 'orders.table.phone', field: 'phone' },
  {
    label: 'orders.table.amount',
    field: 'amount',
    className: 'text-center',
  },
  {
    label: 'orders.table.status',
    field: 'status',
    className: 'text-center',
  },
  {
    label: 'orders.table.note',
    field: 'note',
  },
  {
    label: 'orders.table.time',
    field: 'time',
    className: 'text-center',
  }
]

export const initialParams = {
  page: 1,
  perPage: DEFAULT_PER_PAGE,
}

export enum statusActions {
  APPROVE = 'Approve',
  REJECT = 'Reject',
}

export const COURSE_STATUSES = {
  APPROVE: 1,
  REJECT: 2,
}

export type TypeHandler = 'Approve' | 'Reject'

