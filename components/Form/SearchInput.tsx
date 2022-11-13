import clsx from 'clsx'
import { MagnifyingGlass } from 'phosphor-react'
import React, { ChangeEvent, forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { styles } from './SearchInput.styled'
import SelectDropdown from './SelectDropdown'

type TSearchInputSizes = 'sm' | 'md' | 'lg'

type TOption = {
  value: string
  label: string
}

interface ISearchInputProps {
  className?: string
  size?: TSearchInputSizes
  name: string
  value?: string
  placeholder?: string
  disabled?: boolean
  hasFilter?: boolean
  options?: TOption[]
  defaultOption?: TOption
  onBlur?: (() => void) | ((event: ChangeEvent<HTMLInputElement>) => void)
  onChange?: (() => void) | ((event: ChangeEvent<HTMLInputElement>) => void)
  onFilter?: (() => void) | ((event: ChangeEvent<HTMLInputElement>) => void)
}

const SearchInput = forwardRef<HTMLInputElement, ISearchInputProps>(
  (
    {
      className,
      size = 'md',
      name,
      value,
      placeholder,
      disabled = false,
      hasFilter = false,
      options,
      defaultOption,
      onBlur,
      onChange,
      onFilter,
      ...rest
    },
    ref
  ) => {
    const allClassNames = clsx(
      styles.base,
      styles.sizes[size],
      styles.fontSizes[size],
      className
    )
    const { setValue } = useFormContext()

    const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(event)
      }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target

      if (onChange) {
        onChange(event)
      }

      setValue(name, value)
    }

    return (
      <div className={allClassNames}>
        <MagnifyingGlass
          size={styles.iconSizes[size]}
          className="text-gray-400 mr-3 shrink-0"
        />
        <input
          type="text"
          className="w-full border-none bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          placeholder={placeholder}
          ref={ref}
          name={name}
          value={value}
          disabled={disabled}
          onBlur={handleBlur}
          onChange={handleChange}
          {...rest}
        />
        {hasFilter && (
          <div className="flex items-center">
            <span className="w-px h-4 bg-gray-300 mx-4"></span>
            <SelectDropdown
              size={size}
              options={options as TOption[]}
              onChange={onFilter as any}
              defaultOption={defaultOption}
              className="whitespace-nowrap"
            />
          </div>
        )}
      </div>
    )
  }
)

export default SearchInput
