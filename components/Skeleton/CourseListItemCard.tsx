import React from 'react'
import { AspectRatio, Stack } from '@/components'
import Skeleton from './Skeleton'

const CourseListItemCard = () => {
  return (
    <div className="w-full p-4 flex gap-6 flex-row items-center shadow-md rounded-lg">
      <AspectRatio ratio={16 / 9} className="relative w-[150px] rounded-lg">
        <Skeleton />
      </AspectRatio>
      <Stack align="flex-start" className="grow">
        <Stack
          align="flex-start"
          direction="column"
          spacing={4}
          className="grow"
        >
          <Skeleton variant="text" width="30%" className="text-sm" />
          <Skeleton variant="text" width="75%" className="text-xl" />
          <Skeleton variant="text" width={100} className="text-sm" />
        </Stack>
        <Stack spacing={12} className="shrink-0">
          <Skeleton variant="circular" width={55} height={22} />
          <Skeleton width={60} height={22} />
          <Skeleton width={100} height={22} />
          <Skeleton width={32} height={32} />
        </Stack>
      </Stack>
    </div>
  )
}

export default CourseListItemCard
