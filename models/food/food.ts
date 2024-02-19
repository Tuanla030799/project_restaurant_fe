export enum FoodStatus {
  publish = 'PUBLISH',
  hide = 'HIDE',
}

export enum FoodInventory {
  sold = 'SOLD',
  stocking = 'STOCKING',
}

export enum FoodType {
  drink = 'DRINK',
  food = 'FOOD',
  fast = 'FAST',
  snack = 'SNACKS',
}

export interface Food {
  id: number
  name: string
  slug: string
  image: string | null
  content: string | null
  discount: number | null
  inventory: string | null
  liked: number | null
  price: number | null
  rating: number | null
  soldQuantity: number | null
  quantity?: number
  status?: FoodStatus
  summary: string | null
  type: string | null
  deletedAt?: string | null
  createdAt?: string | null
  updatedAt?: string | null
}
