import React from 'react'
import { IExam } from '@/page-components/Courses/CourseTabs/Content/types'
import { useTranslation } from 'next-i18next'
import { BookBookmark, CaretRight, Clock, Crown } from 'phosphor-react'
import { Button } from '..'
import { useRouter } from 'next/router'
import { routes } from '@/constants/routes'

interface IProps {
  disabled: boolean
}

const Exam = ({
  exam_id,
  title,
  total_number_questions,
  result_pass,
  disabled,
}: IExam & IProps) => {
  const { t } = useTranslation(['course'])
  const { query } = useRouter()
  const courseId = Number(query.courseId)

  return (
    <div className="w-full my-4">
      <div className="py-2 px-4 text-lg font-semibold bg-primary-400 text-white rounded-t-lg">
        {t('exam.title')}
      </div>
      <div className="flex justify-between items-center p-4 border-[1px] border-gray-300 rounded-b-lg">
        <div>
          <p className="mb-1 font-bold text-primary-400">{title}</p>
          <div className="flex">
            <p className="flex items-center gap-1 text-sm text-gray-500 mr-4">
              <BookBookmark size={16} />
              {total_number_questions || 0}
              <span>{t('exam.question')}</span>
            </p>
            <p className="flex items-center gap-1 text-sm text-gray-500 mr-4">
              <Crown size={16} />
              <span>{t('exam.pass_exam')}:</span>
              {`${result_pass || 0}/${total_number_questions || 0}`}
            </p>
            <p className="flex items-center gap-1 text-sm text-gray-500 mr-4">
              <Clock size={16} />
              00:20:00
            </p>
          </div>
        </div>
        <Button
          disabled={disabled}
          className="disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:border-0"
          as="a"
          href={routes.exam.generatePath(courseId, exam_id)}
        >
          {t('exam.start')}
          <CaretRight size={20} />
        </Button>
      </div>
    </div>
  )
}

export default Exam
