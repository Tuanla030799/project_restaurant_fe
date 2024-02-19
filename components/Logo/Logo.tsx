import clsx from 'clsx'
import React from 'react'
import { AspectRatio } from 'components/AspectRatio'
import Logo from 'public/images/logo.png'

interface IEdxLogoProps {
  className?: string
}

const EdxLogo = ({ className }) => {
  return (
    <div className={clsx('w-[125px]', className)}>
      <AspectRatio ratio={125 / 56}>
        <img src={Logo.src} alt="logo" />
      </AspectRatio>
    </div>
  )
}

export default EdxLogo
