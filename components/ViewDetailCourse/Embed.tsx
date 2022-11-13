import { IEmbed } from '@/page-components/Courses/CourseTabs/Content/types'
import React from 'react'

const Embed = ({ title, embed, description }: IEmbed) => {
  return (
    <div className="w-full my-4">
      <p className="text-center font-medium mb-2">{title}</p>
      <iframe className="w-[70%] aspect-video mx-auto" src={embed}></iframe>
      <p className="text-center text-sm text-gray-500 mt-2">{description}</p>
    </div>
  )
}

export default Embed
