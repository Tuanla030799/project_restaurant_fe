import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import { Typography } from '@/components'
import EmptyState from '@/public/images/course_empty_state.png'

interface CoursesEmptyProps {
  action: ReactNode
}

const CoursesEmpty = ({ action }: CoursesEmptyProps) => {
  const { t } = useTranslation(['common'])

  return (
    <div className="flex flex-col items-center px-4 pt-16 pb-12">
      <Image src={EmptyState} width={330} height={294} />
      <Typography fontSize="display-xs" weight="semibold" className="pt-4 pb-6">
        {t('empty.courses.title')}
      </Typography>
      {action}
    </div>
  )
}

export default CoursesEmpty
