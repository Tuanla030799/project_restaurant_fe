import React, { ChangeEvent, forwardRef, ReactNode, useState } from 'react'
import clsx from 'clsx'
import { FieldValues, useFormContext, UseFormReturn } from 'react-hook-form'
import { Eye, EyeSlash } from 'phosphor-react'
import { styles } from './Input.styled'
import { Typography } from '@/components'

const MAX_LENGTH_INPUT = 255

type TInputTypes = 'email' | 'text' | 'password' | 'search' | 'number'
type TInputSizes = 'sm' | 'md'

interface IInputProps extends React.HTMLAttributes<HTMLInputElement> {
  type?: TInputTypes
  size?: TInputSizes
  name: string
  label?: string
  value?: string
  placeholder?: string
  className?: string
  error?: string
  maxLength?: number
  readOnly?: boolean
  disabled?: boolean
  isRequired?: boolean
  isUsedInForm?: boolean
  isAlignRight?: boolean
  defaultValue?: string
  leading?: ReactNode
  trailing?: ReactNode
  onBlur?: (() => void) | ((event: ChangeEvent<HTMLInputElement>) => void)
  onChange?: (() => void) | ((event: ChangeEvent<HTMLInputElement>) => void)
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      type = 'text',
      size = 'sm',
      name,
      label,
      placeholder,
      className,
      error,
      maxLength = MAX_LENGTH_INPUT,
      readOnly = false,
      disabled = false,
      isRequired = false,
      isUsedInForm = true,
      isAlignRight = false,
      leading,
      trailing,
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
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const formContext = isUsedInForm && useFormContext()
    const isInputPassword = type === 'password'

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

      isUsedInForm &&
        (formContext as UseFormReturn<FieldValues, any>).setValue(name, value)
    }

    return (
      <label className="block w-full">
        {label && (
          <Typography
            weight="medium"
            fontSize="text-sm"
            className="mb-1.5 text-gray-700"
          >
            {label}
            {isRequired && <span className="text-red-500 ml-0.5">*</span>}
          </Typography>
        )}
        <div className={allClassNames}>
          {leading && (
            <span
              className={clsx('inline-flex items-center', styles.leading[size])}
            >
              {leading}
            </span>
          )}
          <input
            {...(isInputPassword && showPassword
              ? { type: 'text' }
              : { type: 'password' })}
            {...(!isInputPassword && { type: type })}
            className={clsx(
              'w-full border-none bg-transparent outline-none text-gray-700 placeholder:text-gray-400',
              isAlignRight && 'text-right',
              styles.sizes[size]
            )}
            maxLength={maxLength}
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
            {...rest}
          />
          {trailing && (
            <span
              className={clsx(
                'inline-flex items-center',
                styles.trailing[size]
              )}
            >
              {trailing}
            </span>
          )}
          {type === 'password' && (
            <button
              type="button"
              className={clsx('outline-none', styles.trailing[size])}
              onClick={() => setShowPassword((prevState) => !prevState)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
            </button>
          )}
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

export default Input
