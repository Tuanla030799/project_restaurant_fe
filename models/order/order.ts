import { Profile, Seat, SeatId } from '@/models'
export interface OrderPayload {
  amount?: number
  note?: string
  time?: string
  totalPrice?: number
  fullName?: string
  phone?: string
  orderDetails?: OrderFoodPayload[]
  seatIds?: SeatId[]
}

export interface OrderFoodPayload {
  foodId?: number
  price?: number
  quantity?: number
}

export interface Order {
  id: number
  fullName: string
  phone: string
  amount: number
  note: string
  seatIds: SeatId[]
  seats?: Seat[]
  user?: Profile
  orderDetails?: OrderFood[]
  status: number
  time: string
  totalPrice: number
  createdAt: string
  updatedAt: string
}
export interface OrderFood {
  createdAt?: string
  foodId?: number
  id?: number
  foodName?: string
  orderId?: number
  price?: number
  quantity?: number
  updatedAt?: string
}
