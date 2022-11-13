import clsx from 'clsx'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { Typography } from '@/components'
import { TCourseType } from '@/global/types'
import { styled } from './CourseType.styled'

export interface ICourseTypeProps {
  url: string
  title: string
  description: string
  icon: ReactNode
  color?: string
  className?: string
  query: Record<'c_t', TCourseType>
  isOnlineDetails?: boolean
  isOnlineTab?: boolean
  onMouseEnter?: () => void
}

const CourseType = ({
  url,
  title,
  description,
  icon,
  color = 'violet',
  className,
  query,
  isOnlineDetails,
  isOnlineTab,
  onMouseEnter,
}: ICourseTypeProps) => {
  const allClassName = clsx(
    className,
    isOnlineDetails ? styled.baseOnlineDetails : styled.base,
    styled.color[color].background
  )
  const spanClassName = clsx(
    isOnlineDetails ? styled.iconOnlineDetails : styled.icon,
    styled.color[color].icon
  )

  return (
    <Link
      href={{
        pathname: url,
        query: query,
      }}
    >
      <a
        className={allClassName}
        onMouseEnter={isOnlineTab ? onMouseEnter : undefined}
      >
        <span className={spanClassName}>{icon}</span>
        <div>
          <Typography
            weight="bold"
            fontSize={isOnlineDetails ? 'text-md' : 'text-lg'}
            className={
              isOnlineDetails ? styled.titleOnlineDetails : styled.title
            }
          >
            {title}
          </Typography>
          <Typography
            weight="medium"
            fontSize={isOnlineDetails ? 'text-xs' : 'text-sm'}
            className="leading-6"
          >
            {description}
          </Typography>
        </div>
      </a>
    </Link>
  )
}

export default CourseType
