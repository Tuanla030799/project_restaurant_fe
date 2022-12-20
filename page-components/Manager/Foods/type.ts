import { FoodInventory, FoodStatus, FoodType } from "@/models"

export type FoodProps = {
  name: string,
  categoryId: number | null,
  type: FoodType | null
  image?: any,
  amount: number | null,
  summary: string | null,
  content: string | null,
  discount: number,
  inventory: FoodInventory | null,
  liked: number | null,
  price: number,
  rating: number | null,
  soldQuantity: number | null,
  status: FoodStatus | null,
}