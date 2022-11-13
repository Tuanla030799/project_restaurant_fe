import React from 'react'
import { useToggle } from '@/hooks'
import { IVideo } from '@/page-components/Courses/CourseTabs/Content/types'
import { Clock, Eye, VideoCamera } from 'phosphor-react'
import { Modal, Typography } from '..'
import { useRouter } from 'next/router'
import { routes } from '@/constants/routes'
import { VIEW_MODE } from '@/constants/common'
import { convertSecondsToHHMMSS } from '@/utils'

interface IProps {
  viewMode?: 'modal' | 'newPage'
}

const Video = ({
  id,
  title,
  description,
  file,
  viewMode,
  video_duration,
}: IVideo & IProps) => {
  const [toggle, setToggle] = useToggle()
  const { query, push } = useRouter()
  const { MODAL, NEW_PAGE } = VIEW_MODE
  const isPreview = viewMode === MODAL
  const newPage = viewMode === NEW_PAGE

  return (
    <>
      <div
        className="flex items-center mb-1 p-3 rounded border-[1px] border-gray-300 cursor-pointer text-primary-400"
        onClick={() => {
          isPreview && setToggle()
          newPage &&
            push(
              routes.learningCourse.video.generatePath(
                Number(query?.courseId),
                Number(query?.contentId),
                id
              )
            )
        }}
      >
        <VideoCamera size={24} />
        <Typography className="flex-1 mx-8 font-medium line-clamp-1">
          {title}
        </Typography>
        <div className="flex justify-between items-center ml-auto">
          <Clock size={24} />
          <p className="mx-6">{convertSecondsToHHMMSS(video_duration)}</p>
          <Eye size={24} />
        </div>
      </div>
      {isPreview && (
        <Modal
          isOpen={toggle}
          title={title}
          toggle={setToggle}
          classNameContainer="!top-1/2 !-translate-y-1/2 !max-w-[800px]"
          classNameChildren="mt-5"
        >
          <video
            className="w-full aspect-video mx-auto"
            src={file.url}
            controls
          />
          <Typography className="max-h-[150px] mt-4 text-md overflow-y-auto whitespace-pre-wrap">
            {description}
          </Typography>
        </Modal>
      )}
    </>
  )
}

export default Video
