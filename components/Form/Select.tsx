import React, { forwardRef, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { CaretUp, CaretDown, Check, MagnifyingGlass } from 'phosphor-react'
import { useOnClickOutside, useOnScreen } from '@/hooks'
import { Typography, Tag, Button, Spinner, Stack, Input } from '@/components'
import { styles } from './Select.styled'
import { useFormContext } from 'react-hook-form'
import { Option, SelectProps } from './Select.types'
import { useTranslation } from 'next-i18next'

const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      options,
      size = 'sm',
      defaultOption,
      label,
      hasClear,
      name,
      placeholder = 'Select option',
      dropdownMaxHeight = 220,
      dropdownMinWidth,
      maxItems = 3,
      disabled = false,
      multiple = false,
      searchable = false,
      isRequired = false,
      isSearching = false,
      shouldReset = false,
      isSearchDropdown = false,
      direction = 'column',
      infiniteOptions,
      error,
      loading = false,
      leading,
      trailing,
      className,
      dropdownPosition = 'left',
      onChange,
      onSearch,
      hasOnClickOutside = true,
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation(['common'])
    const [optionSelected, setOptionSelected] = useState<
      Option | Option[] | {}
    >(defaultOption ? defaultOption : multiple ? [] : {})

    const [showOptions, setShowOptions] = useState<boolean>(false)
    const [showClear, setShowClear] = useState<boolean>(false)
    const [hasVerticalScrollbar, setHasVerticalScrollbar] =
      useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')
    const selectRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLUListElement>(null)
    const checkpointRef = useRef<HTMLLIElement>(null)
    const inputSearchRef = useRef<HTMLInputElement>(null)
    const isVisible = useOnScreen(checkpointRef)
    const { setValue } = useFormContext()
    const allClassNames = clsx(
      styles.base,
      styles.sizes[size],
      error
        ? styles.states.error
        : disabled
        ? styles.states.disabled
        : styles.states.enabled,
      className
    )
    const _optionSelected = optionSelected as Option
    const _optionsSelected = optionSelected as Option[]

    const handleClose = () => setShowOptions(false)

    useOnClickOutside(selectRef, handleClose, hasOnClickOutside)

    useEffect(() => {
      const clearDropdown = (event) => {
        if (event.key === 'Tab') {
          handleClose()
        }
      }

      document.addEventListener('keydown', clearDropdown)
      return () => document.removeEventListener('keydown', clearDropdown)
    }, [])

    useEffect(() => {
      if (shouldReset) {
        setOptionSelected([])
        setValue(name, [])
        setShowClear(false)
      }
    }, [shouldReset])

    useEffect(() => {
      if (!loading) {
        const optionSelected = defaultOption
          ? defaultOption
          : multiple
          ? []
          : {}

        setValue(name, optionSelected)
        setOptionSelected(optionSelected)
      }
    }, [loading, defaultOption])

    useEffect(() => {
      if (!infiniteOptions) return

      const { isReachingEnd, isRefreshing, isLoadingMore, size, setSize } =
        infiniteOptions

      if (isVisible && !isReachingEnd && !isRefreshing && !isLoadingMore) {
        setSize(size + 1)
      }
    }, [isVisible, infiniteOptions?.isRefreshing])

    useEffect(() => {
      const selectDropdown = dropdownRef.current

      const onScroll = () => {
        if (!infiniteOptions || !selectDropdown) return

        setHasVerticalScrollbar(
          selectDropdown.scrollHeight > selectDropdown.clientHeight
        )
      }

      if (selectDropdown) {
        selectDropdown.addEventListener('scroll', onScroll)

        return () => selectDropdown.removeEventListener('scroll', onScroll)
      }
    }, [dropdownRef])

    const handleSelect = ({ value, label }) => {
      const option: Option = { value, label }

      if (multiple) {
        const optionAll = (optionSelected as Option[]).filter(
          (option) => option.value === ''
        )
        const _optionsSelected = optionAll.length
          ? (optionSelected as Option[]).filter((option) => option.value !== '')
          : (optionSelected as Option[])

        const optionIndex = _optionsSelected.findIndex(
          (option) => option.value === value
        )

        const newOptions: Option[] = value
          ? optionIndex >= 0
            ? _optionsSelected.filter((_, index) => index !== optionIndex)
            : [..._optionsSelected, option]
          : [option]

        const shouldHasClear = newOptions.length !== 0

        setOptionSelected(newOptions)
        setValue(name, newOptions)
        setShowClear(shouldHasClear)
        onChange && onChange(newOptions)
      } else {
        handleClose()
        setOptionSelected(option)
        setValue(name, option)
        setShowClear(true)
        onChange && onChange(option)
      }
    }

    const handleClear = () => {
      const value = multiple ? [] : {}
      setOptionSelected(value)
      setValue(name, value)
      setShowClear(false)
      onChange && onChange(value)
    }

    const renderPlaceholder = () => {
      if (!searchable) {
        return (
          <span className="pointer-events-none text-gray-500">
            {placeholder}
          </span>
        )
      }

      return (
        <input
          name={name}
          type="text"
          className="bg-transparent outline-none placeholder:text-gray-500 w-full"
          placeholder={placeholder}
          ref={inputSearchRef}
          value={searchValue}
          onChange={(e) => {
            if (!onSearch) return
            hasVerticalScrollbar && setHasVerticalScrollbar(false)
            setSearchValue(e.target.value)
            onSearch(e)
          }}
          autoComplete="off"
        />
      )
    }

    const renderSearchDropdown = () => {
      return (
        <Input
          type="search"
          name={name}
          size="sm"
          className="m-4"
          placeholder={placeholder}
          leading={<MagnifyingGlass size={15} className="text-gray-700" />}
          onChange={(e) => {
            if (!onSearch) return
            hasVerticalScrollbar && setHasVerticalScrollbar(false)
            onSearch(e)
          }}
        />
      )
    }

    return (
      <div
        className={clsx(
          'relative flex',
          direction === 'row' ? 'gap-x-4' : 'flex-col gap-y-1.5'
        )}
        ref={selectRef}
      >
        {(label || hasClear) && (
          <div className="flex justify-between items-center">
            {label && (
              <Typography
                weight="medium"
                fontSize="text-md"
                className="text-gray-700 w-max"
              >
                {label}
                {isRequired && <span className="text-red-500 ml-0.5">*</span>}
              </Typography>
            )}
            {hasClear && showClear && !isSearchDropdown && (
              <Button
                as="label"
                variant="link"
                className="!text-md"
                onClick={handleClear}
              >
                Clear
              </Button>
            )}
          </div>
        )}
        <div
          className={allClassNames}
          tabIndex={0}
          onFocus={() => {
            setShowOptions(true)
            inputSearchRef?.current?.focus()
          }}
        >
          <input
            className="w-full absolute bottom-0 left-0 opacity-0 pointer-events-none"
            type="text"
            ref={ref}
            name={name}
            tabIndex={-1}
            {...rest}
          />
          {leading && <span className={styles.leading[size]}>{leading}</span>}
          <div className="grow text-left">
            {multiple ? (
              _optionsSelected.length ? (
                <div className="flex items-center gap-1.5">
                  {_optionsSelected
                    .slice(0, maxItems)
                    .map(({ value, label }) => (
                      <Tag
                        key={value}
                        size={size}
                        label={label}
                        action="close"
                        onClose={() => handleSelect({ value, label })}
                      />
                    ))}
                  {_optionsSelected.length > maxItems && (
                    <Tag
                      size={size}
                      label={`+${_optionsSelected.length - maxItems}`}
                    />
                  )}
                </div>
              ) : (
                renderPlaceholder()
              )
            ) : _optionSelected.label ? (
              _optionSelected.label
            ) : (
              renderPlaceholder()
            )}
          </div>
          {trailing && (
            <span className={styles.trailing[size]}>{trailing}</span>
          )}
          <button
            type="button"
            className={styles.trailing[size]}
            onClick={() => {
              setShowOptions(!disabled && !showOptions)
            }}
          >
            {!disabled && showOptions ? (
              <CaretUp size={20} />
            ) : (
              <CaretDown size={20} />
            )}
          </button>
        </div>
        {!disabled && (
          <div
            className={clsx(
              'absolute top-[calc(100%+6px)] z-dropdown flex flex-col items-stretch rounded-md border border-gray-300 bg-white shadow-md',
              showOptions ? 'block' : 'hidden',
              !dropdownMinWidth && 'w-full',
              styles.dropdownPosition[dropdownPosition]
            )}
            style={{
              ...(dropdownMinWidth && { minWidth: `${dropdownMinWidth}px` }),
            }}
          >
            {isSearchDropdown && renderSearchDropdown()}
            <ul
              className="overflow-auto"
              style={{ maxHeight: `${dropdownMaxHeight}px` }}
              ref={dropdownRef}
            >
              {isSearching && !hasVerticalScrollbar ? (
                <Stack align="center" className="py-2">
                  <Spinner type="dash" size="sm" />
                </Stack>
              ) : options && options.length ? (
                options.map(({ value, label }) => {
                  const isSelected = multiple
                    ? _optionsSelected.some((option) => option.value === value)
                    : _optionSelected.value === value

                  return (
                    <li
                      key={value}
                      className={clsx(
                        'flex justify-between items-center cursor-pointer transition-colors duration-200',
                        styles.sizes[size],
                        isSelected ? 'bg-gray-50' : 'hover:bg-gray-100'
                      )}
                      onClick={() => handleSelect({ value, label })}
                    >
                      {label}
                      {isSelected && (
                        <Check
                          size={20}
                          className="text-primary-400"
                          weight="bold"
                        />
                      )}
                    </li>
                  )
                })
              ) : (
                <li className="px-3 py-2">{t('empty.options')}</li>
              )}
              <li ref={checkpointRef} className="h-px"></li>
              {hasVerticalScrollbar && infiniteOptions?.isLoadingMore && (
                <Stack align="center">
                  <Spinner type="dash" size="sm" />
                </Stack>
              )}
            </ul>
          </div>
        )}
        {error && (
          <Typography fontSize="text-sm" className="mt-1.5 text-red-600">
            {error}
          </Typography>
        )}
      </div>
    )
  }
)

export default Select
