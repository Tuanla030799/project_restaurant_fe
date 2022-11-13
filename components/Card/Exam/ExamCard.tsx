import React, { useState } from 'react'
import { EXAM_STATUSES } from '@/constants/exam'
import {
  Badge,
  Typography,
  Dropdown,
  Menu,
  MenuItem,
  Button,
} from '@/components'
import clsx from 'clsx'
import DocumentActive from '@/public/images/document_active.png'
import DocumentInactive from '@/public/images/document _inactive.png'
import { DotsThreeVertical } from 'phosphor-react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import useToggle from 'hooks/useToggle'
import ModalDeleteExam from '@/page-components/Manager/Management/Exams/ModalDeleteExam'
import ShareModal from '@/page-components/Manager/Management/Exams/ShareModal'
import { deleteExam, duplicateExam } from 'apis/exam'
import { useToast } from '@/lib/store'
import { routes } from '@/constants/routes'
import Link from 'next/link'
import { useInfiniteSharedUserInExam } from '@/lib/exam'

interface TExamCard {
  id: number
  title: string
  isActive: boolean
  className?: string
  mutate?: () => void
  hasShare?: boolean
}

const ExamCard = ({
  id,
  title,
  isActive,
  className,
  mutate,
  hasShare,
}: TExamCard) => {
  const [isShowModal, setShowModal] = useToggle()
  const [showShareModal, setShowShareModal] = useToggle()
  const { t } = useTranslation(['common', 'manager'])
  const { setToast } = useToast()
  const [examId, setExamId] = useState<number>()

  const { data: sharedUsers, isValidating } =
    useInfiniteSharedUserInExam(examId)

  const handleDuplicateExam = async () => {
    try {
      await duplicateExam(id)
      mutate && mutate()

      setToast({
        color: 'success',
        title: t('exams.duplicate_success', { ns: 'manager' }),
      })
    } catch (error) {
      setToast({
        color: 'error',
        title: t('exams.duplicate_unsuccess', { ns: 'manager' }),
      })
    }
  }

  const handleDeleteExam = async () => {
    try {
      await deleteExam(id)
      mutate && mutate()

      setToast({
        color: 'success',
        title: t('exams.modal.success', { ns: 'manager' }),
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div
        className={clsx(
          'flex flex-col items-center shadow-md rounded-lg border border-gray-200 p-3 bg-white mx-3 w-full',
          className
        )}
      >
        <div className="w-full flex justify-end">
          <Dropdown
            className="inline-flex flex-shrink-0"
            preventClose={false}
            overlay={
              <Menu maxWidth={172} placement="bottom-right">
                <MenuItem
                  className="text-gray-700"
                  onClick={handleDuplicateExam}
                >
                  {t('action.duplicate')}
                </MenuItem>
                <MenuItem className="text-gray-700" onClick={setShowModal}>
                  {t('action.delete')}
                </MenuItem>
                <>
                  {hasShare && (
                    <MenuItem
                      className="text-gray-700"
                      onClick={() => {
                        setShowShareModal()
                        setExamId(id)
                      }}
                    >
                      {t('action.share')}
                    </MenuItem>
                  )}
                </>
              </Menu>
            }
          >
            <Button variant="text" color="gray" onlyIcon className="!p-0">
              <DotsThreeVertical size={20} />
            </Button>
          </Dropdown>
        </div>

        <div className="mb-4">
          <Image
            src={isActive ? DocumentActive?.src : DocumentInactive?.src}
            width={DocumentActive?.width}
            height={DocumentActive?.height}
          />
        </div>

        <Typography
          align="center"
          weight="semibold"
          fontSize="text-sm"
          className="text-gray-90 mb-4 line-clamp-3"
        >
          <Link href={routes.manager.examsSetting.generatePath(id)}>
            {title}
          </Link>
        </Typography>

        <Badge size="sm" color={isActive ? 'success' : 'gray'} className="mb-3">
          {isActive ? EXAM_STATUSES.ACTIVE : EXAM_STATUSES.INACTIVE}
        </Badge>
      </div>

      <ModalDeleteExam
        isShowModal={isShowModal}
        setShowModal={setShowModal}
        handleDeleteExam={handleDeleteExam}
      />
      <ShareModal
        showModal={showShareModal}
        setShowModal={setShowShareModal}
        title={t('exams.share_modal.exam_title', {
          name: title,
          ns: 'manager',
        })}
        sharedUsers={sharedUsers}
        isValidating={isValidating}
      />
    </>
  )
}

export default ExamCard
