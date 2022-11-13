interface IContent {
  content_parent_id?: number
  id: number
  level: number
  name: string
  order_index: number
}

export interface IViewContentTree {
  contents: IContent[]
  hidden?: boolean
}
