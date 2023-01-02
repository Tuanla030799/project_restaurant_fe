export type ImageType = {
  name: string
  size: number
  type: string
  url: string
}

export type PaginationType = {
  total?: number
  perPage?: string
  currentPage?: string
  totalPages?: number
}

export type TPagination = {
  totalItems?: number
  currentPage?: number
  itemCount?: number
  itemsPerPage?: number
  totalPages?: number
}