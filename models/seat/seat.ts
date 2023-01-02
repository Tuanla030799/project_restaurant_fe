export interface Seat {
  id: number
  content: string
  isReady: boolean
  position: number
  image: string | null
  isChoose?: boolean
  deletedAt?: string | null
  createdAt?: string | null
  updatedAt?: string | null
}

export interface SeatId {
  id?: number
}
