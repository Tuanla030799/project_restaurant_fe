import React from 'react'
import { PropsSpread } from 'utils/PropsSpread'

export interface SeatProps
  extends PropsSpread<
    React.HTMLAttributes<HTMLDivElement>,
    {
      id: number
      content: string
      isReady: boolean
      position: number
      image: string | null
      deletedAt?: string | null
      createdAt?: string | null
      updatedAt?: string | null
      updateStatus?: (id: number, status: boolean) => void
    }
  > {}
