import clsx from 'clsx'
import React, { ReactNode } from 'react'

interface IContainerProps {
  children: ReactNode | ReactNode[]
  className?: string
}

const Container = ({ children, className }: IContainerProps) => {
  return (
    <div
      className={clsx(
        'container px-4 mx-auto flex flex-col items-stretch',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Container
