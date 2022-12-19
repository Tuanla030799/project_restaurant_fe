import React, { ChangeEvent, forwardRef } from 'react'
import { Typography } from '..'
import { styles } from './Radio.styled'
import clsx from 'clsx'

type TRadioSize = 'sm' | 'md'

type TRadioColor = 'primary' | 'success' | 'error'

interface IRadioProps {
  size?: TRadioSize
  color?: TRadioColor
  name?: string
  value?: string | number
  label?: string
  isChecked?: boolean
  className?: string
  optionClassName?: string
  onChange?: (() => void) | ((event: ChangeEvent<HTMLInputElement>) => void)
  [x: string]: any
  disabled?: boolean
}

const Radio = forwardRef<HTMLInputElement, IRadioProps>(
  (
    {
      size = 'sm',
      color = 'primary',
      name,
      value,
      label,
      isChecked,
      className,
      onChange,
      optionClassName,
      disabled,
      ...rest
    },
    ref
  ) => {
    const handleChange = (event) => {
      if (!disabled) {
        onChange && onChange(event)
      }
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
          type="radio"
          name={name}
          value={value}
          ref={ref}
          checked={isChecked}
          className="hidden peer"
          onChange={handleChange}
          {...rest}
        />

        <span
          className={clsx(
            'bg-white border border-gray-300 rounded-full shrink-0',
            clsx('shadow', styles.color[color]),
            styles.checked.base,
            styles.checked[size],
            styles.sizes[size],
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

export default Radio
