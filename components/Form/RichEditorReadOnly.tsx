import React from 'react'
import {
  Editor,
  EditorState,
  convertFromRaw,
  CompositeDecorator,
} from 'draft-js'
import {
  findLinkEntities,
  getBlockStyle,
  styleMap,
  Link,
} from 'components/Form/RichEditor'

const RichEditorReadOnly = ({ rawContent }) => {
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ])
  const editorState = EditorState.createWithContent(
    convertFromRaw(rawContent),
    decorator
  )

  return (
    <Editor
      blockStyleFn={getBlockStyle}
      customStyleMap={styleMap}
      editorState={editorState}
      readOnly
    />
  )
}

export default RichEditorReadOnly
