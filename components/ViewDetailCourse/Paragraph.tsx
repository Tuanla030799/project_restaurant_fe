import { IParagraph } from '@/page-components/Courses/CourseTabs/Content/types'
import { RichEditorReadOnly } from 'components/Form'
import React from 'react'

const Paragraph = ({ paragraph }: IParagraph) => {
  return (
    <div className="my-4">
      <RichEditorReadOnly rawContent={paragraph} />
    </div>
  )
}

export default Paragraph
