export interface OrderPayload {
  amount?: number
  note?: string
  time?: string
  totalPrice?: number
  fullName?: string
  phone?: string
  orderDetails?: OrderFoodPayload[]
}

export interface OrderFoodPayload {
  foodId?: number
  price?: number
  quantity?: number
}
