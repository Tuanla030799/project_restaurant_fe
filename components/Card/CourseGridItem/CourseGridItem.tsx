import React, { forwardRef, Fragment, useMemo } from 'react'
import { formatDate } from '@/utils'
import { AspectRatio, Badge, CustomLink, Stack, Typography } from 'components'
import {
  CalendarBlank,
  ChalkboardTeacher,
  DotsThreeOutlineVertical,
  GearSix,
  GlobeHemisphereWest,
  PencilSimpleLine,
  Trash,
  Users,
  WifiHigh,
} from 'phosphor-react'
import Image from 'next/image'
import { BadgeColors } from 'components/Badge/Badge.types'
import { CourseGridItemProps } from './CourseGridItem.types'
import { useTranslation, Trans } from 'next-i18next'
import { COURSE_TYPES } from '@/constants/course'
import { routes } from '@/constants/routes'
import DefaultThumbnail from '@/public/images/course_default_thumbnail.jpeg'
import { Button, Dropdown, Menu, MenuItem, ModalConfirm } from '@/components'
import { useRouter } from 'next/router'
import { useToggle } from '@/hooks'

const CourseGridItem = forwardRef<HTMLDivElement, CourseGridItemProps>(
  (
    {
      id,
      title,
      description,
      thumbnail,
      time_start_publish,
      time_end_publish,
      level,
      owner,
      categories,
      instructors,
      course_status,
      course_type,
      number_of_attendees,
      updateStatus,
      publishCourse,
      deleteCourse,
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation(['course', 'common'])
    const { ONLINE, SCORM } = COURSE_TYPES
    const isOnline = [ONLINE, SCORM].includes(course_type)
    const [showModalDelete, showModalDeleteToggler] = useToggle()
    const router = useRouter()

    const courseByStatus = useMemo(
      () => ({
        draft: {
          label: t('status.draft'),
          color: 'gray',
        },
        publish: {
          label: t('status.publish'),
          color: 'success',
        },
        close: {
          label: t('status.close'),
          color: 'error',
        },
      }),
      []
    )

    return (
      <>
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
              <span className="inline-block bg-primary-400 rounded-full w-1 h-1 mr-1.5 shrink-0"></span>
              <div className="text-xs text-gray-500 font-medium truncate grow">
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
              <Dropdown
                className="inline-flex shrink-0 ml-1.5 -mr-1.5"
                overlay={
                  <Menu maxWidth={160} placement="bottom-right">
                    <MenuItem
                      onClick={() =>
                        router.push(routes.setting.general.generatePath(id))
                      }
                    >
                      <Stack spacing={12}>
                        <GearSix size={20} className="text-primary-400" />
                        <span>{t('action.settings', { ns: 'common' })}</span>
                      </Stack>
                    </MenuItem>
                    <MenuItem
                      onClick={() => router.push(routes.editCourse.generatePath(id))}
                    >
                      <Stack spacing={12}>
                        <PencilSimpleLine
                          size={20}
                          className="text-primary-400"
                        />
                        <span>{t('action.edit', { ns: 'common' })}</span>
                      </Stack>
                    </MenuItem>
                    {course_status !== 'publish' ? (
                      <MenuItem
                        onClick={() => publishCourse && publishCourse(id)}
                      >
                        <Stack spacing={12}>
                          <GlobeHemisphereWest
                            size={20}
                            className="text-primary-400"
                          />
                          <span>{t('action.publish', { ns: 'common' })}</span>
                        </Stack>
                      </MenuItem>
                    ) : (
                      // TODO: Thêm action CLOSE khi API cập nhật status cho course (role manager) được bổ sung
                      <></>
                    )}
                    <MenuItem onClick={showModalDeleteToggler}>
                      <Stack spacing={12}>
                        <Trash size={20} className="text-primary-400" />
                        <span>{t('action.delete', { ns: 'common' })}</span>
                      </Stack>
                    </MenuItem>
                  </Menu>
                }
              >
                <Button variant="text" size="xs" color="gray" onlyIcon>
                  <DotsThreeOutlineVertical weight="fill" size={20} />
                </Button>
              </Dropdown>
            </div>
            <h2 className="grow line-clamp-2 text-xl text-gray-700 font-bold mb-3">
              <CustomLink href={routes.detailCourse.generatePath(id)}>
                {title}
              </CustomLink>
            </h2>
            <Stack spacing={12} justify="flex-start" className="mb-3">
              <Badge
                size="sm"
                color={courseByStatus[course_status].color as BadgeColors}
                className="inline-block"
              >
                {courseByStatus[course_status].label}
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
            <div className="flex items-center gap-2 text-xs text-gray-500 font-regular mb-3">
              <span>
                {t('label.level')}: {level?.name}
              </span>
              <span className="h-3 border-r border-gray-300"></span>
              <span>
                {t('label.owner')}: {owner?.name}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="text-blue-400" size={16} />
              <span className="text-xs text-gray-700 font-semibold">
                {t('label.total_learner', {
                  count: number_of_attendees,
                  ns: 'course',
                })}
              </span>
            </div>
            <div className="flex items-center gap-3 min-w-[1px] min-h-[18px]">
              <div className="flex items-center gap-2 text-xs text-gray-700 font-semibold">
                {time_start_publish && (
                  <>
                    <CalendarBlank className="text-primary-400" size={16} />
                    {t('label.start')}: {formatDate(time_start_publish)}
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700 font-semibold">
                {time_end_publish && (
                  <>
                    <CalendarBlank className="text-primary-400" size={16} />
                    {t('label.end')}: {formatDate(time_end_publish)}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <ModalConfirm
          type="warning"
          isOpen={showModalDelete}
          confirmMessage={t('action.confirm', { ns: 'common' })}
          rejectMessage={t('action.cancel', { ns: 'common' })}
          toggle={showModalDeleteToggler}
          onConfirm={() => deleteCourse && deleteCourse(id, title)}
        >
          <Typography align="center">
            <Trans
              i18nKey="new_course.course.delete.message"
              ns="manager"
              values={{ name: title }}
              components={{ 1: <strong /> }}
            />
          </Typography>
        </ModalConfirm>
      </>
    )
  }
)

export default CourseGridItem
