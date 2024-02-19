import clsx from 'clsx'
import React, { forwardRef } from 'react'
import styles from './Stack.module.css'
import { StackProps } from './Stack.types'

const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl']
const DEFAULT_SPACING = 16

const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'row',
      align = 'center',
      justify = 'center',
      wrap = 'wrap',
      spacing = 16,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const allClassNames: string = clsx(
      styles.stack,
      styles[direction],
      styles['align-' + align],
      styles[justify],
      styles[wrap],
      className
    )

    const spacingVariables = () => {
      const spacings = BREAKPOINTS.reduce((prev, curr, index) => {
        const breakpoint = BREAKPOINTS[index - 1]

        if (spacing[curr]) {
          return { ...prev, [curr]: spacing[curr] }
        }

        if (!prev[curr] && !prev[breakpoint]) {
          return { ...prev, [curr]: DEFAULT_SPACING }
        }

        return { ...prev, [curr]: prev[breakpoint] }
      }, {})

      return Object.entries(spacings).reduce((prev, curr) => {
        const [key, value] = curr

        return {
          ...prev,
          [`--${key}-stack-spacing` as any]: `${value}px`,
        }
      }, {})
    }

    const style = {
      ...(typeof spacing === 'number'
        ? { ['--stack-spacing' as any]: `${spacing}px` }
        : spacingVariables()),
    }

    return (
      <div className={allClassNames} style={style} ref={ref} {...rest}>
        {children}
      </div>
    )
  }
)
Stack.displayName = 'Stack'

export default Stack
