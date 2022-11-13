import { ReactNode } from 'react'

export type Styles = {
  [key: string]: React.CSSProperties
}

export type AspectProps = {
  children: ReactNode
  ratio?: number
  className?: string
  style?: React.CSSProperties | Styles
} & React.HTMLAttributes<HTMLDivElement>
