import React, { ChangeEvent, ReactNode } from 'react'

export type Option = {
  label: string
  value: string
}

export type InfiniteOptions = {
  isRefreshing?: boolean
  isLoadingMore?: boolean
  isReachingEnd?: boolean
  size: number
  setSize: (
    size: number | ((_size: number) => number)
  ) => Promise<any[] | undefined>
}

export type SelectSizes = 'sm' | 'md'

export type DropdownPositions = 'left' | 'right'

export type DirectionType = 'row' | 'column'

export interface SelectProps extends React.HTMLAttributes<HTMLInputElement> {
  options: Option[]
  size?: SelectSizes
  defaultOption?: Option | Option[] | {} | []
  label?: string
  hasClear?: boolean
  name: string
  placeholder?: string
  dropdownMaxHeight?: number
  dropdownMinWidth?: number
  maxItems?: number
  disabled?: boolean
  multiple?: boolean
  searchable?: boolean
  isRequired?: boolean
  isSearching?: boolean
  isSearchDropdown?: boolean
  shouldReset?: boolean
  direction?: DirectionType
  infiniteOptions?: InfiniteOptions
  error?: string
  loading?: boolean
  leading?: ReactNode
  trailing?: ReactNode
  dropdownRef?: any
  className?: string
  dropdownPosition?: DropdownPositions
  onChange?: (any) => void
  hasOnClickOutside?: boolean
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void
}
