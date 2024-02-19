import clsx from 'clsx'
import React, { ChangeEvent, FC } from 'react'

type PropTypes = {
  label?: string
  onChange: (newValue: boolean) => void
  checked: boolean
  className?: string
  name?: string
  labelClassName?: string
}

const Switch: FC<PropTypes> = ({
  label,
  onChange,
  checked = false,
  className,
  name,
  labelClassName,
}) => {
  return (
    <label
      htmlFor={name}
      className={clsx(
        'inline-flex relative items-center cursor-pointer',
        className
      )}
    >
      <input
        type="checkbox"
        id={name}
        name={name}
        className="sr-only peer"
        checked={checked}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.checked)
        }
      />
      <div
        className={clsx(
          'relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full',
          "peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]",
          'after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all',
          'dark:border-gray-600 peer-checked:bg-primary-400'
        )}
      ></div>
      {label && (
        <span
          className={clsx(
            'ml-3 text-base text-gray-700 font-medium dark:text-gray-300 select-none',
            labelClassName
          )}
        >
          {label}
        </span>
      )}
    </label>
  )
}

export default Switch
