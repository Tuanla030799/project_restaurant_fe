import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { CalendarBlank } from 'phosphor-react'
import React, { FC, forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import { Button, Typography } from '..'
import { DATE_FORMAT_DEFAULT } from '@/constants/common'

type DatePickerPropsType = {
  placeholder?: string
  className?: string
  onChange: (newValue: Date | null) => void
  value?: string
  daySelected?: Date | null
  dateFormat?: string
  onClear?: () => void
  onResetToday?: () => void
  error?: boolean | string
}

const InputDatePicker = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>((props, ref) => {
  return (
    <div className="relative">
      <CalendarBlank
        className="absolute top-3 left-4"
        size={22}
        color={'gray'}
      />
      <input ref={ref} {...props} />
    </div>
  )
})

const DatePickerContainer = ({ className, children }) => {
  return (
    <div
      className={clsx(
        'flex items-center flex-col w-[313px] bg-white shadow-lg shadow-black pt-6',
        className
      )}
    >
      {children}
    </div>
  )
}

const CustomDatePicker: FC<DatePickerPropsType> = ({
  placeholder,
  className,
  onChange,
  value,
  daySelected,
  dateFormat = DATE_FORMAT_DEFAULT,
  onClear,
  onResetToday,
  error,
}) => {
  const { t } = useTranslation('common')

  return (
    <div>
      <DatePicker
        className={clsx(
          'pl-[44px] py-[10px] pr-[10px] border border-gray-300 rounded-lg placeholder:text-gray-400',
          'ring-primary-50 focus-within:border-primary-300 focus-within:ring-4 outline-none',
          error && 'border-error-300 ring-red-100',
          className
        )}
        dateFormat={dateFormat}
        onChange={(newDate) => onChange(newDate)}
        customInput={<InputDatePicker />}
        placeholderText={placeholder}
        value={value}
        selected={daySelected}
        calendarContainer={DatePickerContainer}
        weekDayClassName={() => 'w-[35px] text-gray-700 mt-6'}
        dayClassName={() =>
          'w-[35px] h-[35px] leading-[35px] hover:bg-gray-100 rounded-full'
        }
        wrapperClassName="w-fit"
      >
        <div className="flex w-full gap-3 px-4 py-3 border-t border-gray-200">
          <Button className="w-full" variant="outlined" onClick={onClear}>
            {t('action.clear')}
          </Button>
          <Button className="w-full" onClick={onResetToday}>
            {t('action.today')}
          </Button>
        </div>
      </DatePicker>
      {error && typeof error === 'string' && (
        <Typography fontSize="text-sm" className="mt-1.5 text-red-600">
          {error}
        </Typography>
      )}
    </div>
  )
}

export default CustomDatePicker
