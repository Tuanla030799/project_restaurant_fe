export type PaginationProps = {
  totalItems: number
  pageSize: number
  currentPage: number
  className?: string
  activeClassName?: string
  onChange: (page: number) => void
} & React.HTMLAttributes<HTMLDivElement>
