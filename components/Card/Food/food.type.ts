import { Food } from '@/models'
import React from 'react'
import { PropsSpread } from 'utils/PropsSpread'

export interface FoodProps
  extends PropsSpread<React.HTMLAttributes<HTMLDivElement>, Food> {}
