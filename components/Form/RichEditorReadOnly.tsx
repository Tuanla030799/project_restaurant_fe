import {
  Editor,
  EditorState,
  convertFromRaw,
  CompositeDecorator,
} from 'draft-js'
import React from 'react'
import {
  findLinkEntities,
  getBlockStyle,
  styleMap,
  Link,
  blockRenderMap,
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
      blockRenderMap={blockRenderMap}
      blockStyleFn={getBlockStyle}
      customStyleMap={styleMap}
      editorState={editorState}
      readOnly
    />
  )
}

export default RichEditorReadOnly
