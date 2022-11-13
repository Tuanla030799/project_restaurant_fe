import { routes } from '@/constants/routes'
import { IAttachment } from '@/page-components/Courses/CourseTabs/Content/types'
import { bytesToSize } from '@/utils'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { LockKey, FileText, Eye } from 'phosphor-react'
import React from 'react'

interface IProps {
  disabled?: boolean
}

const Attachment = ({ id, title, file, disabled }: IAttachment & IProps) => {
  const { push, query } = useRouter()

  return (
    <div
      className={clsx(
        'flex items-center mb-1 p-3 rounded border-[1px] border-gray-300 cursor-pointer text-primary-400',
        {
          'text-gray-400 !cursor-not-allowed': disabled,
        }
      )}
      onClick={() =>
        !disabled &&
        push(
          routes.learningCourse.attachment.generatePath(
            Number(query?.courseId),
            Number(query?.contentId),
            id
          )
        )
      }
    >
      <FileText size={24} />
      <p className="flex-1 ml-8 font-medium line-clamp-1">{title}</p>
      <div className="flex gap-6 ml-auto">
        <p>{bytesToSize(file?.size || 0)}</p>
        {disabled ? <LockKey size={24} /> : <Eye size={24} />}
      </div>
    </div>
  )
}

export default Attachment
