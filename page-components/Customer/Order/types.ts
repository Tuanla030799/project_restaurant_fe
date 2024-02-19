export type OrderProps = {
  name: string
  phone: string
  amount: number
  note: string
  startDate: Date | null
  startTime: Date | null
  totalPrice: number
  orderDetails: OrderDetailProps[] | []
  seatIds?: number[]
}

export type OrderDetailProps = {
  foodId: number
  price: number
  quantity: number
}
