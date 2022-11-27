import React from 'react'
import { PropsSpread } from 'utils/PropsSpread'

export interface CategoriesProps
  extends PropsSpread<
    React.HTMLAttributes<HTMLDivElement>,
    {
      id: number
      slug: string
      title?: string
      thumbnail?: any
      url?: string
    }
  > {}
