import clsx from 'clsx'
import React, { useState, useEffect } from 'react'
import { styles } from './ButtonGroup.styled'

export type ButtonGroupColor = 'primary'

export type ButtonGroupSize = 'sm' | 'md'

export type ButtonGroupOptions = {
  label: string
  value: string
}

export type ButtonGroupProps = {
  name: string
  color?: ButtonGroupColor
  size?: ButtonGroupSize
  options: ButtonGroupOptions[]
  defaultActiveButton?: string
  className?: string
  onChange?: (value?: string) => void
}

const ButtonGroup = ({
  name,
  color = 'primary',
  size = 'md',
  options,
  defaultActiveButton,
  className,
  onChange,
}: ButtonGroupProps) => {
  const [activeButton, setActiveButton] = useState(
    defaultActiveButton || options[0].value
  )

  const handleClickButton = (value) => {
    setActiveButton(value)
    onChange && onChange(value)
  }

  useEffect(() => {
    defaultActiveButton && setActiveButton(defaultActiveButton)
  }, [onChange, defaultActiveButton])

  return (
    <div className={clsx(styles.color[color].base, className)}>
      {options.map(({ label, value }) => (
        <button
          key={value}
          name={name}
          type="button"
          className={clsx(
            styles.item,
            styles.size[size],
            activeButton === value && styles.color[color].active
          )}
          onClick={() => handleClickButton(value)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default ButtonGroup
