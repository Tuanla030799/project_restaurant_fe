import React from 'react'
import clsx from 'clsx'
import Logo from 'public/images/logo.png'
import { AspectRatio } from 'components/AspectRatio'

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
