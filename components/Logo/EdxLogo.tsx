import React from 'react'
import clsx from 'clsx'

interface IEdxLogoProps {
  className?: string
}

const EdxLogo = ({ className }) => {
  return (
    <div className={clsx('w-16 h-12 rounded bg-primary-400', className)}></div>
  )
}

export default EdxLogo
