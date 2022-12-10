import { Category } from '@/models'
import React from 'react'
import { PropsSpread } from 'utils/PropsSpread'

export interface CategoriesProps
  extends PropsSpread<
    React.HTMLAttributes<HTMLDivElement>,
    Category
  > {}
