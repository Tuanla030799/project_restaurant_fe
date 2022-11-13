import { ChangeEvent } from 'react'

export type FileUploaderProps = {
  title?: string
  description?: string
  titlePlaceholder?: string
  descriptionPlaceholder?: string
  defaultTitle?: string
  defaultDescription?: string
  defaultFile?: any
  errorTitle?: string
  errorDescription?: string
  errorFile?: string
  name?: string
  label?: string
  icon: React.ElementType
  supportedFormats?: string
  isRequired?: boolean
  isPreviewed?: boolean
  accept?: string
  maxSizeByMB?: number
  extensionsAllowed?: string[]
  onChangeTitle?: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeDescription?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onChange?: (file: any) => void
} & React.HTMLAttributes<HTMLInputElement>
