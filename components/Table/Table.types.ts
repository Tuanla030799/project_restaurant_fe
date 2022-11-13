import { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react'

interface TableHeader {
  label: string
  field: string
  className?: string
}

interface TableRowProps {
  id: number
  handleClick?: () => void
}

interface TableRowContent {
  content: Record<string, string | number | ReactElement>
  className?: string
}

interface TableRow {
  data: Record<string, TableRowContent>
  props: TableRowProps
}

export interface TableProps extends React.HTMLAttributes<HTMLInputElement> {
  headers: TableHeader[]
  rows: TableRow[]
  headerClassName?: string
  rowClassName?: string
  actionClassName?: string
  className?: string
  manageActions?: (id: number) => ReactNode
  hasCheckData?: boolean
  checkedData?: number[]
  setCheckedData?: Dispatch<SetStateAction<number[]>>
  currentPage?: number
  pageSize?: number
}
