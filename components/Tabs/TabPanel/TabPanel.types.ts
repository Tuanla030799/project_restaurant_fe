import React, { ReactNode } from 'react'

export type TabPanelProps = {
  children: ReactNode
  key: string
  panelKey?: string
  label: ReactNode
  disabled?: boolean
  className?: string
} & React.HTMLAttributes<HTMLDivElement>
