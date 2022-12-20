import React, { useEffect, useRef, useState } from 'react'
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  CompositeDecorator,
} from 'draft-js'
import {
  TextBolder,
  TextItalic,
  TextUnderline,
  ListBullets,
  ListNumbers,
  Quotes,
  Code,
  TextStrikethrough,
  TextAlignLeft,
  TextAlignCenter,
  TextAlignRight,
  CodeSimple,
  LinkBreak,
  LinkSimple,
} from 'phosphor-react'
import { Button, Tooltip, Typography } from '@/components'
import { useOnClickOutside } from '@/hooks'
import { styles } from './RichEditor.styled'
import clsx from 'clsx'
import { Map } from 'immutable'

interface IRichEditorProps {
  classNameContainer?: string
  classNameInput?: string
  label?: string
  placeholder?: string
  minHeight?: number
  isRequired?: boolean
  autoFocus?: boolean
  defaultValue?: any
  error?: string
  onChange: (value: any) => void
  isResetValue?: boolean
  onResetValue?: (value: boolean) => void
}

export const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontSize: 16,
    padding: 4,
    borderRadius: '4px',
  },
}

export const blockRenderMap = Map({
  blockquote: {
    element: 'blockquote',
  },
  'code-block': {
    element: 'div',
  },
  'ordered-list-item': {
    element: 'li',
    wrapper: <ol />,
  },
  'unordered-list-item': {
    element: 'li',
    wrapper: <ul />,
  },
  unstyled: {
    element: 'div',
  },
})

export const getBlockStyle = (block) => {
  switch (block.getType()) {
    case 'left':
      return styles.block.left
    case 'center':
      return styles.block.center
    case 'right':
      return styles.block.right
    case 'unordered-list-item':
      return styles.block.ul
    case 'ordered-list-item':
      return styles.block.ol
    case 'blockquote':
      return styles.block.blockquote
    case 'code-block':
      return styles.block.codeBlock
    default:
      return null
  }
}

const RichEditor = ({
  classNameContainer,
  classNameInput,
  label,
  placeholder = 'Enter a description',
  minHeight,
  isRequired = false,
  autoFocus = false,
  defaultValue,
  error,
  onChange: handleChange,
  isResetValue = false,
  onResetValue,
}: IRichEditorProps) => {
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ])
  const initialState = defaultValue
    ? () => EditorState.createWithContent(defaultValue, decorator)
    : () => EditorState.createEmpty(decorator)
  const [editorState, setEditorState] = useState(initialState)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [urlValue, setUrlValue] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputContainerRef = useRef<HTMLDivElement>(null)
  const contentState = editorState.getCurrentContent()

  const onClose = () => setShowUrlInput(false)

  useOnClickOutside(inputContainerRef, onClose)

  useEffect(() => {
    const input = ref.current

    if (!input) return

    if (autoFocus) {
      input.focus()
    }
  }, [autoFocus])

  useEffect(() => {
    if (!isResetValue) return

    const newState = defaultValue
      ? () => EditorState.createWithContent(defaultValue, decorator)
      : () => EditorState.createEmpty(decorator)

    setEditorState(newState)
    onResetValue && onResetValue(false)
  }, [isResetValue])

  const onChange = (editorState) => {
    const contentState = editorState.getCurrentContent()

    setEditorState(editorState)
    handleChange(contentState)
  }

  const onFocus = () => {
    if (ref.current) {
      ref.current.focus()
    }
  }

  const onURLChange = (event) => setUrlValue(event.target.value)

  const onLinkInputKeyDown = (event) => {
    if (event.which === 13) {
      confirmLink(event)
    }
  }

  const isValidHttpUrl = (string) => {
    let url

    try {
      url = new URL(string)
    } catch (_) {
      return false
    }

    return url.protocol === 'http:' || url.protocol === 'https:'
  }

  const promptForLink = (event) => {
    event.preventDefault()
    const selection = editorState.getSelection()

    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent()
      const startKey = editorState.getSelection().getStartKey()
      const startOffset = editorState.getSelection().getStartOffset()
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey)
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset)
      let url = ''

      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey)
        url = linkInstance.getData().url
      }

      setShowUrlInput(true)
      setUrlValue(url)
      setTimeout(() => inputRef.current && (inputRef.current as any).focus(), 0)
    }
  }

  const confirmLink = (event) => {
    event.preventDefault()
    const contentState = editorState.getCurrentContent()
    const url = isValidHttpUrl(urlValue) ? urlValue : '//' + urlValue

    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()

    let nextEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    })

    nextEditorState = RichUtils.toggleLink(
      nextEditorState,
      nextEditorState.getSelection(),
      entityKey
    )

    setEditorState(nextEditorState)
    setShowUrlInput(false)
    setUrlValue('')
    setTimeout(() => ref.current && (ref.current as any).focus(), 0)
  }

  const removeLink = (event) => {
    event.preventDefault()
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null))
    }
  }

  const checkContent = () => {
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        return true
      }
      return false
    }
  }

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onChange(newState)
      return true
    }
    return false
  }

  const mapKeyToEditorCommand = (event) => {
    if (event.keyCode === 9) {
      const newEditorState = RichUtils.onTab(event, editorState, 4)
      if (newEditorState !== editorState) {
        onChange(newEditorState)
      }
      return
    }
    return getDefaultKeyBinding(event)
  }

  const toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType))
  }

  const toggleInlineStyle = (inlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  return (
    <div>
      {label && (
        <Typography
          weight="medium"
          fontSize="text-md"
          className="mb-1.5 text-gray-700"
        >
          {label}
          {isRequired && <span className="text-red-500 ml-0.5">*</span>}
        </Typography>
      )}
      <div
        className={clsx(
          styles.base,
          error ? styles.states.error : styles.states.enabled,
          classNameContainer
        )}
      >
        <div className={styles.toolbar}>
          <InlineStyleControls
            editorState={editorState}
            onToggle={toggleInlineStyle}
          />
          <BlockStyleControls
            editorState={editorState}
            onToggle={toggleBlockType}
          />
          <div className="relative leading-none">
            <Tooltip title="Add link">
              <span
                role="button"
                className={clsx(styles.button.base)}
                onMouseUp={promptForLink}
              >
                <LinkSimple size={20} />
              </span>
            </Tooltip>
            {showUrlInput && (
              <div ref={inputContainerRef} className={styles.urlInputContainer}>
                <label>
                  <div className="font-medium text-gray-700 text-sm mb-0.5">
                    URL
                  </div>
                  <input
                    onChange={onURLChange}
                    ref={inputRef}
                    className={styles.urlInput}
                    type="text"
                    value={urlValue}
                    onKeyDown={onLinkInputKeyDown}
                  />
                </label>
                <div className="flex justify-end">
                  <Button className="mt-2" size="xs" onMouseUp={confirmLink}>
                    Insert
                  </Button>
                </div>
              </div>
            )}
          </div>
          <Tooltip title="Remove link">
            <span
              role="button"
              className={clsx(styles.button.base)}
              onMouseUp={removeLink}
            >
              <LinkBreak size={20} />
            </span>
          </Tooltip>
        </div>
        <div
          className={clsx(
            'px-3 py-2 text-left',
            checkContent() && 'rich-editor-hide-placeholder',
            classNameInput
          )}
          style={{
            ...(minHeight && { minHeight: `${minHeight}px` }),
          }}
          onClick={onFocus}
        >
          <Editor
            blockRenderMap={blockRenderMap}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={mapKeyToEditorCommand}
            onChange={onChange}
            placeholder={placeholder}
            ref={ref}
            spellCheck={true}
          />
        </div>
      </div>
      {error && (
        <Typography fontSize="text-sm" className="mt-1.5 text-red-600">
          {error}
        </Typography>
      )}
    </div>
  )
}

export const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    )
  }, callback)
}

export const Link = ({ contentState, entityKey, children }) => {
  const { url } = contentState.getEntity(entityKey).getData()

  return (
    <a href={url} className={styles.link}>
      {children}
    </a>
  )
}

const StyleButton = ({ active, icon: Icon, label, style, onToggle }) => {
  return (
    <Tooltip title={label}>
      <span
        role="button"
        className={clsx(styles.button.base, active && styles.button.active)}
        onMouseDown={(event) => {
          event.preventDefault()
          onToggle(style)
        }}
      >
        <Icon size={20} weight="fill" />
      </span>
    </Tooltip>
  )
}

const INLINE_STYLES = [
  { icon: TextBolder, label: 'Bold', style: 'BOLD' },
  { icon: TextItalic, label: 'Italic', style: 'ITALIC' },
  { icon: TextUnderline, label: 'Underline', style: 'UNDERLINE' },
  { icon: TextStrikethrough, label: 'Strikethrough', style: 'STRIKETHROUGH' },
  { icon: CodeSimple, label: 'Code', style: 'CODE' },
]
const InlineStyleControls = ({ editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle()

  return (
    <>
      {INLINE_STYLES.map(({ icon, label, style }) => (
        <StyleButton
          key={style}
          active={currentStyle.has(style)}
          icon={icon}
          label={label}
          onToggle={onToggle}
          style={style}
        />
      ))}
    </>
  )
}

const BLOCK_TYPES = [
  { icon: TextAlignLeft, label: 'Text left', style: 'left' },
  { icon: TextAlignCenter, label: 'Text center', style: 'center' },
  { icon: TextAlignRight, label: 'Text right', style: 'right' },
  { icon: ListBullets, label: 'Unordered list', style: 'unordered-list-item' },
  { icon: ListNumbers, label: 'Ordered list', style: 'ordered-list-item' },
  { icon: Quotes, label: 'Blockquote', style: 'blockquote' },
  { icon: Code, label: 'Code block', style: 'code-block' },
]

const BlockStyleControls = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <>
      {BLOCK_TYPES.map(({ icon, label, style }) => (
        <StyleButton
          key={style}
          active={style === blockType}
          icon={icon}
          label={label}
          onToggle={onToggle}
          style={style}
        />
      ))}
    </>
  )
}

export default RichEditor
