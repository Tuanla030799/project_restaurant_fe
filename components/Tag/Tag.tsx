import clsx from 'clsx'
import { X } from 'phosphor-react'
import React from 'react'
import { styles } from './Tag.styled'

type TTagAction = 'text' | 'close' | 'count'

type TTagSizes = 'xs' | 'sm' | 'md'

interface ITagProps {
  label: string
  action?: TTagAction
  size?: TTagSizes
  count?: number
  hasCheckbox?: boolean
  hasAvatar?: boolean
  onClose?: any
  onCheck?: any
}

const Tag = ({
  label,
  action = 'text',
  size = 'md',
  count = 0,
  hasCheckbox = false,
  hasAvatar = false,
  onClose,
  onCheck,
}: ITagProps) => {
  const allClassNames = clsx(styles.base, styles.sizes[size])

  return (
    <span className={allClassNames}>
      {label}
      {action === 'close' && (
        <X role="button" size={styles.iconSizes[size]} onClick={onClose} />
      )}
      {action === 'count' && (
        <span
          className={clsx(
            'text-gray-700 bg-gray-100 rounded',
            styles.countSizes[size]
          )}
        >
          {count}
        </span>
      )}
    </span>
  )
}

export default Tag
