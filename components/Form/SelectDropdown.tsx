import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { CaretUp, CaretDown, Check } from 'phosphor-react'
import { useOnClickOutside } from '@/hooks'
import { styles } from './SelectDropdown.styled'

type TOption = {
  label: string
  value: string
}

type TSelectDropdownSizes = 'sm' | 'md' | 'lg'

interface ISelectDropdownProps {
  size?: TSelectDropdownSizes
  options: TOption[]
  defaultOption?: TOption | {}
  className?: string
  dropdownMenuClassName?: string
  onChange: any
}

const SelectDropdown = ({
  size,
  options,
  defaultOption = {},
  className,
  dropdownMenuClassName,
  onChange,
}: ISelectDropdownProps) => {
  const [optionSelected, setOptionSelected] = useState<TOption | {}>(
    defaultOption
  )
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const ref = useRef(null)
  const allClassNames = clsx(styles.base, className)
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
        onFocus={() => setShowOptions(true)}
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
                  onClick={() => handleSelect({ value, label })}
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
