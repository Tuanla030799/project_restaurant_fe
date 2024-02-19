import clsx from 'clsx'
import { CaretUp, CaretDown, Check } from 'phosphor-react'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from './SelectDropdown.styled'
import { useOnClickOutside } from '@/hooks'

type TOption = {
  label: string
  value: string | number
}

type TSelectDropdownSizes = 'sm' | 'md' | 'lg'

interface ISelectDropdownProps {
  size?: TSelectDropdownSizes
  options: TOption[]
  defaultOption?: TOption | object
  className?: string
  dropdownMenuClassName?: string
  onChange: any
  disabled?: boolean
}

const SelectDropdown = ({
  size,
  options,
  defaultOption = {},
  className,
  dropdownMenuClassName,
  onChange,
  disabled = false,
}: ISelectDropdownProps) => {
  const [optionSelected, setOptionSelected] = useState<TOption | object>(
    defaultOption
  )
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const ref = useRef(null)
  const allClassNames = clsx(
    styles.base,
    disabled && styles.disabled,
    className
  )
  const _optionSelected = optionSelected as TOption

  const handleClickOutside = () => setShowOptions(false)

  useOnClickOutside(ref, handleClickOutside)

  useEffect(() => {
    setOptionSelected(defaultOption)
  }, [defaultOption])

  const handleSelect = ({ value, label }) => {
    const option = { value, label }

    setShowOptions(false)
    setOptionSelected(option)

    onChange && onChange(option)
  }

  return (
    <div className="relative" ref={ref}>
      <div
        className={allClassNames}
        tabIndex={0}
        onFocus={() => !disabled && setShowOptions(true)}
      >
        <div className="grow">
          {_optionSelected.label && _optionSelected.label}
        </div>
        {showOptions ? <CaretUp size={20} /> : <CaretDown size={20} />}
      </div>
      <div
        className={clsx(
          'absolute right-0 top-full z-dropdown flex flex-col items-stretch rounded border border-gray-200 bg-white shadow-md p-2',
          styles.dropdown.sizes[size as string],
          showOptions ? 'block' : 'hidden',
          dropdownMenuClassName
        )}
      >
        <ul>
          {options &&
            options.map(({ value, label }) => {
              const isSelected = _optionSelected.value === value

              return (
                <li
                  key={value}
                  className={clsx(
                    'flex justify-between items-center whitespace-nowrap cursor-pointer transition-colors duration-200 px-3 py-2 hover:bg-gray-50',
                    isSelected && 'text-primary-400'
                  )}
                  onClick={() => !disabled && handleSelect({ value, label })}
                >
                  {label}
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export default React.memo(SelectDropdown)
