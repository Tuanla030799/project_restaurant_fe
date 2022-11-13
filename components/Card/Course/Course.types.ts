import React from 'react'
import { PropsSpread } from 'utils/PropsSpread'
import {
  TCourseType,
  CourseLevel,
  CourseCategory,
  InstructorType,
} from '@/global/types'

export type CourseStatus =
  | 'guest'
  | 'pending'
  | 'approve'
  | 'inprogress'
  | 'archive'
  | 'discard'

export type CourseStatistics = {
  total_sessions_highest: number
  total_attendees: number
  total_tests: number
}

export type CourseRating = {
  average: number
  total: number
}

export interface CourseProps
  extends PropsSpread<
    React.HTMLAttributes<HTMLDivElement>,
    {
      id: number
      title: string
      description: any
      thumbnail: any
      status: CourseStatus
      start_date: string
      end_date: string
      due_date: string
      level: CourseLevel
      categories: CourseCategory[]
      instructors: InstructorType[]
      course_type: TCourseType
      statistics: CourseStatistics
      rating: CourseRating
      lastest_update: string
      percent_done: number
      updateStatus?: (
        id: number,
        status: string,
        url?: string,
        isShowToast?: boolean
      ) => void
      enrollCourse?: (id: number) => void
    }
  > {}
