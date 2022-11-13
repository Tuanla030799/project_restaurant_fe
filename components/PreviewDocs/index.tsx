import React from 'react'
import clsx from 'clsx'
interface IProps {
  url: string
  scale?: number
}

const PreviewDocs = ({ url, scale }: IProps) => {
  return (
    <div className="flex bg-gray-100">
      <div className="flex-1 m-8 w-0 overflow-auto">
        <iframe
          style={{ transform: `scale(${scale})` }}
          className="w-full h-screen"
          src={url}
        />
      </div>
    </div>
  )
}

export default PreviewDocs
