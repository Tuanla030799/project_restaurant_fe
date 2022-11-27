import React, { ReactNode } from 'react'
import clsx from 'clsx'

interface WrapperProps {
  children: ReactNode | ReactNode[]
  className?: string
}
const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <div
      className={clsx(
        'bg-white relative float-left clear-both shadow-md rounded-sm w-full',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Wrapper
