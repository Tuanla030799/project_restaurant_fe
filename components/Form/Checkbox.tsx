import clsx from 'clsx'
import React, { ChangeEvent, forwardRef } from 'react'
import { Typography } from '..'
import { styles } from './Checkbox.styled'

type TCheckboxSize = 'sm' | 'md'

type TCheckboxColor = 'primary' | 'success' | 'error'

interface ICheckboxProps {
  size?: TCheckboxSize
  name?: string
  value?: string | number
  label?: string
  className?: string
  optionClassName?: string
  disabled?: boolean
  isChecked?: boolean
  type?: 'checkbox' | 'radio'
  onChange?: (() => void) | ((event: ChangeEvent<HTMLInputElement>) => void)
  isIndeterminate?: boolean
  color?: TCheckboxColor
}

const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(
  (
    {
      size = 'sm',
      name,
      value,
      label,
      className,
      disabled,
      type = 'checkbox',
      onChange,
      optionClassName,
      isIndeterminate,
      isChecked,
      color = 'primary',
      ...rest
    },
    ref
  ) => {
    const handleChange = (event) => {
      onChange && onChange(event)
    }

    return (
      <label
        className={clsx(
          styles.base,
          className,
          disabled && 'cursor-not-allowed'
        )}
      >
        <input
          type={type}
          name={name}
          value={value}
          ref={ref}
          disabled={disabled}
          className="hidden peer"
          onChange={handleChange}
          checked={isChecked}
          {...rest}
        />

        <span
          className={clsx(
            'bg-white border rounded shrink-0 border-gray-300',
            !isIndeterminate && styles.checkmark.base,
            isIndeterminate && styles.checkmark.indeterminate,
            styles.checkmark[size],
            styles.sizes[size],
            styles.color[color],
            optionClassName
          )}
        ></span>

        {label && (
          <Typography
            weight="medium"
            fontSize={styles.fontSize[size] as any}
            className="text-gray-700"
          >
            {label}
          </Typography>
        )}
      </label>
    )
  }
)

export default Checkbox
