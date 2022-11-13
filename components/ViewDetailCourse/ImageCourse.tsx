import { IImage } from '@/page-components/Courses/CourseTabs/Content/types'
import React from 'react'

const ImageCourse = ({ file }: IImage) => {
  return (
    <div className="my-4">
      <img className="mx-auto" src={file.url} alt={file.name} />
    </div>
  )
}

export default ImageCourse
