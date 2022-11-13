import { Typography } from '@/components'
import { IHeading } from '@/page-components/Courses/CourseTabs/Content/types'
import React from 'react'

const Heading = ({ title }: IHeading) => {
  return (
    <Typography
      variant="h5"
      fontSize="text-lg"
      weight="medium"
      className="my-4"
    >
      {title}
    </Typography>
  )
}

export default Heading
