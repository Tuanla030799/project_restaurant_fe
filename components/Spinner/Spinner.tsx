import clsx from 'clsx'
import React from 'react'
import { styles } from './Spinner.styled'

type TSpinnerTypes = 'circular' | 'dash'

type TSpinnerThemes = 'dark' | 'light'

type TSpinnerSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type TSpinnerProps = {
  type?: TSpinnerTypes
  theme?: TSpinnerThemes
  size?: TSpinnerSizes
  className?: string
}

const Spinner = ({
  type = 'dash',
  theme = 'dark',
  size = 'md',
  className,
}: TSpinnerProps) => {
  const [box, line, space] = styles.sizes[size]
  const isAbsolute = className?.includes('absolute')

  return (
    <div
      className={clsx(
        type === 'circular' && 'rounded-full outline outline-gray-200',
        !isAbsolute && 'relative',
        className
      )}
      style={{
        ...(type === 'circular' && {
          outlineWidth: `${line}px`,
          outlineOffset: `-${line}px`,
          width: `${box}px`,
          height: `${box}px`,
        }),

        ['--dash-array-1' as any]: box * 4 - line * 2,
        ['--dash-array-2' as any]: box * 6,
        ['--dash-offset-1' as any]: -box - line * 4,
        ['--dash-offset-2' as any]: -box * 5 - line * 2 - space,
      }}
    >
      <svg
        className={clsx(
          'text-primary-400 animate-rotate-loading',
          styles.themes[theme],
          type === 'circular' && 'absolute inset-0'
        )}
        style={{
          width: `${box}px`,
          height: `${box}px`,
        }}
        viewBox={`0 0 ${box * 2} ${box * 2}`}
      >
        <circle
          className="animate-dash-loading"
          cx={box}
          cy={box}
          r={box - line}
          fill="none"
          stroke="currentColor"
          strokeWidth={line * 1.5}
          strokeLinecap="round"
        ></circle>
      </svg>
    </div>
  )
}

export default Spinner
