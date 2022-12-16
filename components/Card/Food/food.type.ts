import { Food } from '@/models'
import React from 'react'
import { PropsSpread } from 'utils/PropsSpread'

export type actionFoodType = 'plus' | 'minus'
export interface FoodProps
  extends PropsSpread<
    React.HTMLAttributes<HTMLDivElement>,
    {
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
      status: string | null
      summary: string | null
      type: string | null
      deletedAt?: string | null
      createdAt?: string | null
      updatedAt?: string | null
      quantity?: number
      onHandleQuantity?: (quantity: number, action: actionFoodType) => void
      deleteFood?: (id: number) => void
    }
  > {}
