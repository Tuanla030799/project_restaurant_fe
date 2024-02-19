import React from 'react'
import { Category } from '@/models'
import { PropsSpread } from 'utils/PropsSpread'

export type CategoriesProps = PropsSpread<
  React.HTMLAttributes<HTMLDivElement>,
  Category
>
