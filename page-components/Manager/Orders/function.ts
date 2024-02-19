import { Status } from './constants'

export const getColor = (status: Status) => {
  const GREEN_700 = '#027A48'
  const RED_700 = '#B42318'

  switch (status) {
    case Status.APPROVE:
      return {
        approvedButton: {
          textColor: RED_700,
          bgColor: 'bg-red-100',
        },
        bgColor: 'green-100',
        textColor: 'green-700',
        label: 'orders.filter.status.approve',
      }
    case Status.REJECT:
      return {
        rejectedButton: {
          textColor: GREEN_700,
          bgColor: 'bg-green-100',
        },
        bgColor: 'red-100',
        textColor: 'red-700',
        label: 'orders.filter.status.reject',
      }
    default:
      return {
        approvedButton: {
          textColor: RED_700,
          bgColor: 'bg-red-100',
        },
        rejectedButton: {
          textColor: GREEN_700,
          bgColor: 'bg-green-100',
        },
        bgColor: 'gray-100',
        textColor: 'gray-700',
        label: 'orders.filter.status.waiting',
      }
  }
}
