import React from 'react'
import { PropsSpread } from 'utils/PropsSpread'
import {
  CourseCategory,
  CourseLevel,
  CourseManagementStatus,
  CourseOwner,
  TCourseType,
  ImageType,
  InstructorType,
} from '@/global/types'

export interface CourseListItemProps
  extends PropsSpread<
    React.HTMLAttributes<HTMLDivElement>,
    {
      id: number
      title: string
      description: any
      thumbnail: ImageType
      time_start_publish: string
      time_end_publish: string
      level: CourseLevel
      owner: CourseOwner
      categories: CourseCategory[]
      instructors: InstructorType[]
      course_status: CourseManagementStatus
      course_type: TCourseType
      number_of_attendees: number
      updateStatus?: (id: number, status: string) => void
      publishCourse?: (id: number) => void
      deleteCourse?: (id: number, name: string) => void
    }
  > {}
