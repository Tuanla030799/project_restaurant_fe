import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { AspectProps } from './AspectRatio.types'

const AspectRatio = forwardRef<HTMLDivElement, AspectProps>(
  ({ ratio = 1 / 1, children, className, style, ...rest }, ref) => {
    const isAbsolute = className?.includes('absolute')
    const allClassNames = clsx(className, !isAbsolute && 'relative')

    return (
      <div
        className={allClassNames}
        style={{
          ['--aspect-ratio' as any]: ratio,
          ...(style && { ...style }),
        }}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    )
  }
)

export default AspectRatio
