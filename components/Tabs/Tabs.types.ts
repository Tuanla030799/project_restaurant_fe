import React, { ReactNode } from 'react'

export type TabsTypes = 'primary' | 'gray' | 'underline'

export type TabsSizes = 'sm' | 'md'

export type TabsDirections = 'vertical' | 'horizontal'

export type TabsProps = {
  children: ReactNode[]
  defaultActiveTab?: string | number
  type?: TabsTypes
  size?: TabsSizes
  direction?: TabsDirections
  spacing?: number
  destroyInactiveTab?: boolean
  fluid?: boolean
  centered?: boolean
  className?: string
  labelClassName?: string
  labelMinWidth?: number
  stackClassName?: string
  onChange?: () => void
} & React.HTMLAttributes<HTMLDivElement>
