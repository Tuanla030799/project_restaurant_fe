import React, { forwardRef } from 'react'
import styles from './Grid.module.css'
import clsx from 'clsx'
import { GridProps } from './Grid.types'

const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      align,
      justify,
      row,
      column,
      spacing = 16,
      expanded,
      className,
      xl,
      lg,
      md,
      sm,
      xs,
      ...rest
    },
    ref
  ) => {
    const isRow: boolean = row || !column

    const allClassNames: string = clsx(
      !isRow ? styles.column : styles.row,
      isRow && expanded ? ` ${styles.expanded}` : '',
      isRow && justify ? ` ${styles[justify]}` : '',
      isRow && align ? ` ${styles['align-' + align]}` : '',
      !isRow && xs ? ` ${styles['xs-' + xs]}` : '',
      !isRow && sm ? ` ${styles['sm-' + sm]}` : '',
      !isRow && md ? ` ${styles['md-' + md]}` : '',
      !isRow && lg ? ` ${styles['lg-' + lg]}` : '',
      !isRow && xl ? ` ${styles['xl-' + xl]}` : '',
      className
    )

    return (
      <div
        className={allClassNames}
        style={{
          ...(isRow && {
            ['--grid-spacing' as any]: `${spacing / 2}px`,
          }),
        }}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    )
  }
)

export default Grid
