import React from 'react'
import NumberFormat from 'react-number-format'
import clsx from 'clsx'
import { Clock } from 'phosphor-react'
import parse from 'date-fns/parse'
import isValid from 'date-fns/isValid'

type Props = {
  onChange: (event: { target: { name: string; value: Date } }) => void
  name: string
  value: string
  onBlur?: () => void
  className?: string
  error?: boolean
}

const TIME_LENGTH = 4

const InputTime = React.forwardRef<NumberFormat<Props>, Props>((props, ref) => {
  const { onChange, className, error, ...rest } = props

  const handleChangeValue = (values) => {
    const { value } = values
    if (value?.length === TIME_LENGTH) {
      const parseValue = parse(value, 'Hmm', new Date())
      isValid(parseValue) &&
        onChange({ target: { name: props?.name, value: parseValue } })
    }
  }

  const handleBlur = () => {
    const parseValue = parse(rest?.value, 'HH:mm', new Date())
    onChange({ target: { name: props?.name, value: parseValue } })
  }

  return (
    <div className="relative">
      <Clock className="absolute top-3 left-4" size={22} color={'gray'} />
      <NumberFormat
        {...rest}
        className={clsx(
          'pl-[44px] py-[10px] pr-[10px] w-[108px] border border-gray-300 rounded-lg placeholder:text-gray-400',
          'ring-primary-50 focus-within:border-primary-300 focus-within:ring-4 outline-none',
          error && 'border-error-300 ring-red-100',
          className
        )}
        getInputRef={ref}
        onValueChange={handleChangeValue}
        onBlur={handleBlur}
        format={'##:##'}
        placeholder={'00:00'}
      />
    </div>
  )
})

export default InputTime
