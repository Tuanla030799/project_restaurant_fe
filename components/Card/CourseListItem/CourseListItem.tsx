import React, { Fragment, forwardRef, useMemo } from 'react'
import Image from 'next/image'
import { useTranslation, Trans } from 'next-i18next'
import { CourseListItemProps } from './CourseListItem.types'
import {
  AspectRatio,
  Badge,
  Button,
  Dropdown,
  Menu,
  MenuItem,
  ModalConfirm,
  Stack,
  Typography,
  CustomLink
} from '@/components'
import { COURSE_TYPES } from '@/constants/course'
import DefaultThumbnail from '@/public/images/course_default_thumbnail.jpeg'
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
import { formatDate } from '@/utils'
import { routes } from '@/constants/routes'
import { useRouter } from 'next/router'
import { useToggle } from '@/hooks'
import { BadgeColors } from 'components/Badge/Badge.types'

const CourseListItem = forwardRef<HTMLDivElement, CourseListItemProps>(
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
          className="w-full p-4 flex gap-6 flex-row items-center shadow-md rounded-lg"
          ref={ref}
          {...rest}
        >
          <CustomLink href={routes.detailCourse.generatePath(id)}>
            <AspectRatio ratio={16 / 9} className="relative w-[150px] rounded-lg">
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
          <Stack align="flex-start" className="grow">
            <Stack
              align="flex-start"
              direction="column"
              spacing={4}
              className="grow"
            >
              <div className="flex items-center">
                <span className="inline-block bg-primary-400 rounded-full w-1 h-1 mr-1.5"></span>
                <div className="text-sm text-gray-500 truncate">
                  {t('label.category', { ns: 'course' })}:
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
              <Typography
                variant="h2"
                fontSize="text-xl"
                weight="bold"
                className="line-clamp-2 text-gray-700"
              >
                {title}
              </Typography>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-regular">
                <span>
                  {t('label.level', { ns: 'course' })}: {level?.name}
                </span>
                <span className="h-3 border-r border-gray-300"></span>
                <span>
                  {t('label.owner', { ns: 'course' })}: {owner?.name}
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
            </Stack>
            <Stack spacing={12} className="shrink-0">
              {/* TODO: change color and label when BE update course status (draft, publish, close) */}
              <Badge
                size="sm"
                color={courseByStatus[course_status].color as BadgeColors}
                className="inline-block"
              >
                {courseByStatus[course_status].label}
              </Badge>
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
              <Stack spacing={4}>
                <Users weight="bold" className="text-blue-400" />
                <Typography transform="capitalize" weight="semibold">
                  {t('label.total_learner', {
                    count: number_of_attendees,
                    ns: 'course',
                  })}
                </Typography>
              </Stack>
              <Dropdown
                className="inline-flex flex-shrink-0"
                overlay={
                  <Menu
                    maxWidth={160}
                    placement="bottom-right"
                    onClick={() => router.push(routes.editCourse.generatePath(id))}
                  >
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
                    <MenuItem>
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
            </Stack>
          </Stack>
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

export default CourseListItem
