import React, { forwardRef, Fragment, useMemo } from 'react'
import { formatDate } from '@/utils'
import {
  AspectRatio,
  AvatarGroup,
  Avatar,
  Badge,
  Button,
  CustomLink,
  Stack,
  Typography,
} from '@/components'
import {
  Books,
  CalendarBlank,
  CalendarCheck,
  ChalkboardTeacher,
  ClipboardText,
  Users,
  WifiHigh,
} from 'phosphor-react'
import Image from 'next/image'
import { BadgeColors } from 'components/Badge/Badge.types'
import { CourseProps } from './Course.types'
import { useTranslation } from 'next-i18next'
import { COURSE_STATUSES, COURSE_TYPES } from '@/constants/course'
import { routes } from '@/constants/routes'
import DefaultThumbnail from '@/public/images/course_default_thumbnail.jpeg'
import DefaultAvatar from '@/public/images/avatar.png'
import { useRouter } from 'next/router'

const Course = forwardRef<HTMLDivElement, CourseProps>(
  (
    {
      id,
      title,
      description,
      thumbnail,
      status,
      start_date,
      end_date,
      due_date,
      level,
      categories = [],
      instructors = [],
      course_type,
      statistics,
      rating,
      lastest_update,
      percent_done,
      updateStatus,
      enrollCourse,
      ...rest
    },
    ref
  ) => {
    const { total_sessions_highest, total_attendees, total_tests } = statistics
    const { GUEST, APPROVE, INPROGRESS, ARCHIVE, DISCARD, CANCEL } =
      COURSE_STATUSES
    const { ONLINE, SCORM } = COURSE_TYPES
    const isProgress = status === INPROGRESS || status === ARCHIVE
    const isContainedButton = [GUEST, APPROVE, DISCARD].includes(status)
    const isOnline = [ONLINE, SCORM].includes(course_type)
    const { t } = useTranslation(['course'])
    const router = useRouter()

    const courseByStatus = useMemo(
      () => ({
        guest: {
          label: t('status.guest'),
          color: 'gray',
          button: t('action.enroll'),
          action: () => enrollCourse && enrollCourse(id),
        },
        pending: {
          label: t('status.pending'),
          color: 'secondary',
          button: t('action.cancel'),
          action: () => updateStatus && updateStatus(id, CANCEL),
        },
        discard: {
          label: t('status.discard'),
          color: 'black',
          button: t('action.enroll'),
          action: () => enrollCourse && enrollCourse(id),
        },
        approve: {
          label: t('status.approve'),
          color: 'primary',
          button: t('action.start_now'),
          action: () => {
            const callbackUrl =
              course_type === SCORM
                ? routes.learningSCORM.content.generatePath(id, null)
                : routes.learningCourse.content.generatePath(id, null)

            updateStatus && updateStatus(id, INPROGRESS, callbackUrl, false)
          },
        },
        inprogress: {
          label: t('status.inprogress'),
          color: 'success',
          button: t('action.continue'),
          action: () => {
            if (course_type === SCORM) {
              router.push(routes.learningSCORM.content.generatePath(id, null))
              return
            }

            router.push(routes.learningCourse.content.generatePath(id, null))
          },
        },
        archive: {
          label: t('status.archive'),
          color: 'info',
          button: t('action.summary'),
          action: () => null,
        },
        cancel: {
          label: t('status.cancel'),
          color: 'black',
          button: t('action.enroll'),
          action: () => enrollCourse && enrollCourse(id),
        },
      }),
      [course_type]
    )

    return (
      <div
        className="h-full flex flex-col shadow-md rounded-lg"
        ref={ref}
        {...rest}
      >
        <div className="w-full">
          <CustomLink href={routes.detailCourse.generatePath(id)}>
            <AspectRatio ratio={16 / 9} className="relative">
              {thumbnail ? (
                <img src={thumbnail.url} alt={title} />
              ) : (
                <Image
                  layout="fill"
                  src={DefaultThumbnail}
                  alt={title}
                  className="object-cover"
                />
              )}
              {course_type && course_type === SCORM && (
                <Badge
                  size="sm"
                  color="success"
                  className="absolute z-elevate top-3 right-4"
                >
                  scorm
                </Badge>
              )}
            </AspectRatio>
          </CustomLink>
        </div>

        <div className="flex flex-col grow p-4">
          <div className="flex items-center mb-3">
            <span className="inline-block bg-primary-400 rounded-full w-1 h-1 mr-1.5"></span>
            <div className="text-xs text-gray-500 font-medium truncate">
              {t('label.category')}:
              {categories.map((category, index, array) => {
                const { id, name } = category
                return (
                  <Fragment key={id}>
                    <span className="ml-1">{name}</span>
                    {index !== array.length - 1 && <>,</>}
                  </Fragment>
                )
              })}
            </div>
          </div>
          <h2 className="grow line-clamp-2 text-xl text-gray-700 font-bold mb-3">
            <CustomLink href={routes.detailCourse.generatePath(id)}>
              {title}
            </CustomLink>
          </h2>
          <Stack spacing={12} justify="flex-start" className="mb-3">
            <Badge
              size="sm"
              color={courseByStatus[status].color as BadgeColors}
              className="inline-block"
            >
              {courseByStatus[status].label}
            </Badge>
            {course_type && (
              <Stack spacing={4}>
                {isOnline ? (
                  <WifiHigh weight="bold" className="text-blue-400" />
                ) : (
                  <ChalkboardTeacher
                    weight="fill"
                    className="text-violet-400"
                  />
                )}
                <Typography transform="capitalize" weight="semibold">
                  {isOnline ? 'Online' : 'Offline'}
                </Typography>
              </Stack>
            )}
          </Stack>
          <div className="text-xs text-gray-500 font-regular mb-3">
            {t('label.level')}: {level?.name}
          </div>
          {isProgress ? (
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2 text-xs text-gray-700 font-semibold">
                <CalendarBlank className="text-primary-400" size={16} />
                Start: {formatDate(start_date)}
              </div>
              {end_date && (
                <div className="flex items-center gap-2 text-xs text-gray-700 font-semibold">
                  <span className="text-xs text-gray-300">|</span>
                  <CalendarCheck className="text-primary-400" size={16} />
                  End: {formatDate(end_date)}
                </div>
              )}
              {due_date && (
                <div className="flex items-center gap-2 text-xs text-gray-700 font-semibold">
                  <span className="text-xs text-gray-300">|</span>
                  <CalendarCheck className="text-primary-400" size={16} />
                  Due: {formatDate(due_date)}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap items-center mb-3">
              <div className="flex items-center gap-2">
                <Books className="text-green-400" size={16} />
                <span className="text-xs text-gray-700 font-semibold">
                  {t('label.total_section', {
                    count: total_sessions_highest,
                    ns: 'course',
                  })}
                </span>
              </div>

              <span className="text-xs text-gray-300 mx-2">|</span>

              <div className="flex items-center gap-2">
                <Users className="text-blue-400" size={16} />
                <span className="text-xs text-gray-700 font-semibold">
                  {t('label.total_learner', {
                    count: total_attendees,
                    ns: 'course',
                  })}
                </span>
              </div>

              <span className="text-xs text-gray-300 mx-2">|</span>

              <div className="flex items-center gap-2">
                <ClipboardText className="text-violet-500" size={16} />
                <span className="text-xs text-gray-700 font-semibold">
                  {t('label.total_test_other', {
                    count: total_tests,
                    ns: 'course',
                  })}
                </span>
              </div>
            </div>
          )}
          <div className="flex justify-between items-center gap-2">
            {isProgress ? (
              <div className="flex items-center gap-3 grow">
                <div className="w-10/12 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-400 h-2 rounded-full"
                    style={{ width: `${percent_done}%` }}
                  ></div>
                </div>
                <span className="whitespace-nowrap text-sm font-medium text-gray-700">
                  {percent_done}%
                </span>
              </div>
            ) : (
              <div className="flex grow items-center gap-2">
                {instructors.length ? (
                  <AvatarGroup max={3}>
                    {instructors?.map(({ id, avatar, name }) => (
                      <Avatar
                        size="xs"
                        key={id}
                        src={avatar?.url || DefaultAvatar.src}
                        alt={name}
                      />
                    ))}
                  </AvatarGroup>
                ) : null}
              </div>
            )}
            <Button
              size="sm"
              variant={isContainedButton ? 'contained' : 'outlined'}
              onClick={courseByStatus[status].action}
            >
              {courseByStatus[status].button}
            </Button>
          </div>
        </div>
      </div>
    )
  }
)

export default React.memo(Course)
