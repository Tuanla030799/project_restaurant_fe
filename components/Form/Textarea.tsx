import clsx from 'clsx'
import React, { ChangeEvent, forwardRef, TextareaHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { styles } from './Input.styled'
import { Typography } from '@/components'

type TTextareaSizes = 'sm' | 'md'

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: TTextareaSizes
  name: string
  label?: string
  value?: string
  placeholder?: string
  className?: string
  error?: string
  readOnly?: boolean
  disabled?: boolean
  isRequired?: boolean
  defaultValue?: string
  rows?: number
  onBlur?: (() => void) | ((event: ChangeEvent<HTMLTextAreaElement>) => void)
  onChange?: (() => void) | ((event: ChangeEvent<HTMLTextAreaElement>) => void)
}

const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  (
    {
      size = 'sm',
      name,
      label,
      placeholder,
      className,
      error,
      readOnly = false,
      disabled = false,
      isRequired = false,
      defaultValue,
      rows = 5,
      onBlur,
      onChange,
      ...rest
    },
    ref
  ) => {
    const allClassNames = clsx(
      styles.base,
      error
        ? styles.states.error
        : disabled || readOnly
          ? styles.states.disabled
          : styles.states.enabled,
      className
    )
    const { setValue } = useFormContext()

    const handleBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (onBlur) {
        onBlur(event)
      }
    }

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = event.target

      if (onChange) {
        onChange(event)
      }

      setValue(name, value.trim())
    }

    return (
      <label className="block w-full">
        {label && (
          <Typography
            weight="medium"
            fontSize="text-md"
            className="mb-1.5 text-gray-700"
          >
            {label}
            {isRequired && <span className="text-red-500 ml-0.5">*</span>}
          </Typography>
        )}
        <div className={allClassNames}>
          <textarea
            className={clsx(
              'w-full border-none bg-transparent outline-none text-gray-700 resize-none placeholder:text-gray-400',
              styles.sizes[size]
            )}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder={placeholder}
            ref={ref}
            name={name}
            disabled={disabled}
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={defaultValue}
            rows={rows}
            {...rest}
          />
        </div>
        {error && (
          <Typography fontSize="text-sm" className="mt-1.5 text-red-600">
            {error}
          </Typography>
        )}
      </label>
    )
  }
)

export default Textarea
