import React from 'react'
import Skeleton from './Skeleton'
import { AspectRatio, AvatarGroup } from '@/components'

const CourseCard = () => {
  return (
    <div className="shadow-md rounded-lg">
      <AspectRatio ratio={16 / 9}>
        <Skeleton />
      </AspectRatio>
      <div className="p-4">
        <Skeleton variant="text" width="75%" className="text-xs mb-3" />
        <Skeleton variant="text" className="text-xl mb-3" />
        <Skeleton width={80} height={28} className="rounded-full mb-3" />
        <Skeleton variant="text" width="35%" className="text-xs mb-3" />
        <div className="flex flex-wrap items-center mb-3">
          <Skeleton width={80} height={18} />
          <span className="text-xs text-gray-300 mx-2">|</span>
          <Skeleton width={80} height={18} />
          <span className="text-xs text-gray-300 mx-2">|</span>
          <Skeleton width={80} height={18} />
        </div>
        <div className="flex justify-between items-center">
          <AvatarGroup>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="circular" width={24} height={24} />
          </AvatarGroup>
          <Skeleton variant="rounded" width={80} height={38} />
        </div>
      </div>
    </div>
  )
}

export default CourseCard
