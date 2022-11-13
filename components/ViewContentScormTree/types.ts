interface IContent {
  course_extract_path?: string
  course_id: number
  course_title?: string
  full_href?: string
  id: number
  identifier?: string
  identifierref?: string
  isvisible?: boolean
  level?: number
  parameters?: any
  parent_id?: number | null
  scorm_type?: string
  title?: string
}

export interface IViewContentScormTree {
  contents: IContent[]
  hidden?: boolean
}
