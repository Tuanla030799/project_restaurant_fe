import React, { forwardRef, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import {
  Input,
  Textarea,
  HighlightIcon,
  AspectRatio,
  Typography,
} from '@/components'
import { bytesToSize } from '@/utils'
import { styles } from './FileUploader.styled'
import { CheckCircle, Trash } from 'phosphor-react'
import { useTranslation, Trans } from 'next-i18next'
import { useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import type { DropTargetMonitor } from 'react-dnd'
import { FileUploaderProps } from './FileUploader.types'

const UPLOAD_STATUS_UPLOADING = 'uploading'
const UPLOAD_STATUS_COMPLETE = 'complete'
const UPLOAD_STATUS_ERROR = 'error'

const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>(
  (
    {
      title,
      description,
      titlePlaceholder,
      descriptionPlaceholder,
      defaultTitle,
      defaultDescription,
      defaultFile,
      errorTitle,
      errorDescription,
      errorFile,
      name,
      label,
      icon,
      supportedFormats,
      isRequired,
      isPreviewed,
      maxSizeByMB = 10,
      extensionsAllowed = [],
      onChangeTitle,
      onChangeDescription,
      onChange,
      ...rest
    },
    ref
  ) => {
    const [file, setFile] = useState<any>(null)
    const [fileProgress, setFileProgress] = useState<any>({
      progress: 0,
    })
    const [isFileTooLarge, setIsFileTooLarge] = useState<boolean>(false)
    const inputFile = useRef<any>(null)
    const { t } = useTranslation(['common', 'course'])
    const [{ canDrop, isOver }, drop] = useDrop(
      () => ({
        accept: [NativeTypes.FILE],
        drop(item: any) {
          if (item.files) {
            resetFile()
            handleDragFile(item.files[0])
          }
        },
        collect: (monitor: DropTargetMonitor) => {
          return {
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
          }
        },
      }),
      []
    )

    const fileExt = file && file?.name.split('.').pop()
    const isValidFile =
      typeof fileExt === 'string' &&
      extensionsAllowed.includes(fileExt.toLowerCase())
    const isDragActive = canDrop && isOver
    const hasError = isFileTooLarge || errorFile

    useEffect(() => {
      if (defaultFile && defaultFile.name) {
        const { name, url, size, type: mime } = defaultFile
        const type = getPreviewType(mime, name)

        const createFile = async () => {
          const response = await fetch(url)
          const data = await response.blob()
          const metadata = {
            type: mime,
          }
          const fileData = new File([data], name, metadata)

          const newFile = {
            file: fileData,
            mime,
            name,
            size,
            type,
            url,
          }

          setFile(newFile)
          setFileProgress({
            progress: 100,
            status: UPLOAD_STATUS_COMPLETE,
          })
        }

        createFile()
      }
    }, [defaultFile])

    const getPreviewType = (mime, name) => {
      const mimeParts = mime.toLowerCase().split('/')
      let type = mimeParts[0]

      if (type === 'application') {
        type = mimeParts[1]
      }

      if (type.startsWith('x-') || type.includes('vnd')) {
        type = name.split('.').pop()
      }

      return type
    }

    const updateFile = (data) => {
      setFileProgress({
        ...data,
      })
    }

    const fileUploader = (file) => {
      const formData = new FormData()
      const req = new XMLHttpRequest()
      const url = 'https://httpbin.org/post'

      formData.append('file', file)

      req.onabort =
        req.onerror =
        req.ontimeout =
          () => {
            handleRemoveFile()
            setFileProgress({
              ...fileProgress,
              status: UPLOAD_STATUS_ERROR,
            })
          }

      req.upload.onprogress = (e) => {
        if (!e.lengthComputable) {
          return
        }

        updateFile({
          progress: Math.floor((e.loaded / e.total) * 100),
          status: UPLOAD_STATUS_UPLOADING,
        })
      }

      req.onload = (e) => {
        updateFile({
          progress: 100,
          status: UPLOAD_STATUS_COMPLETE,
        })
      }

      req.open('POST', url, true)
      req.setRequestHeader('Content-Type', file.type)
      req.send(formData)
    }

    const handleDragFile = (file) => {
      const fileState = {
        type: getPreviewType(file.type, file.name),
        mime: file.type,
        name: file.name,
        size: file.size,
        url: window.URL.createObjectURL(file),
        file,
      }

      fileUploader(file)

      setFile(fileState)
      onChange && onChange(file)
    }

    const handleFile = (e) => {
      const file = [...e.target.files].map((file) => {
        const newFile = {
          type: getPreviewType(file.type, file.name),
          mime: file.type,
          name: file.name,
          size: file.size,
          url: window.URL.createObjectURL(file),
          file,
        }

        fileUploader(file)

        return newFile
      })[0]

      const maximumSize = maxSizeByMB * 1024 * 1024

      if (file?.size > maximumSize) {
        setIsFileTooLarge(true)
        return
      }

      setFile(file)
      setIsFileTooLarge(false)
      onChange && onChange(file.file)
    }

    const handleRemoveFile = () => {
      file?.url && window.URL.revokeObjectURL(file.url)

      resetFile()
    }

    const resetFile = () => {
      setFile(null)
      setFileProgress({
        progress: 0,
      })
      inputFile.current && ((inputFile.current as any).value = '')
    }

    const isReadytoPreview = (type) => {
      return (
        file &&
        file.type === type &&
        isValidFile &&
        isPreviewed &&
        fileProgress.progress === 100
      )
    }

    return (
      <div className="flex flex-col items-stretch gap-2" ref={ref}>
        {label && (
          <label className={clsx(styles.label, isRequired && styles.required)}>
            {label}
          </label>
        )}
        {titlePlaceholder && (
          <Input
            className="bg-white"
            name="title"
            placeholder={titlePlaceholder}
            defaultValue={defaultTitle}
            error={errorTitle}
            onChange={onChangeTitle}
          />
        )}
        {descriptionPlaceholder && (
          <Textarea
            className="bg-white"
            name="description"
            placeholder={descriptionPlaceholder}
            defaultValue={defaultDescription}
            error={errorDescription}
            onChange={onChangeDescription}
            rows={3}
          />
        )}
        <label
          className={clsx(
            'px-6 py-4 rounded-lg border text-center cursor-pointer',
            isDragActive
              ? 'border-primary-200 bg-primary-25'
              : 'border-gray-200 bg-white',
            hasError && 'border-error-300 bg-error-25'
          )}
          ref={drop}
        >
          <input
            ref={inputFile}
            type="file"
            className="hidden"
            onClick={resetFile}
            onChange={handleFile}
            {...rest}
          />
          <HighlightIcon
            color={hasError ? 'error' : 'primary'}
            icon={icon}
            size="md"
            className="mb-3"
          />
          <p className="text-md mb-1">
            <Trans i18nKey="action.click_to_upload">
              <span
                className={clsx(
                  hasError ? 'text-error-500' : 'text-primary-400'
                )}
              >
                Click to upload
              </span>{' '}
              or drag and drop
            </Trans>
          </p>
          <p className="text-sm">{supportedFormats}</p>
        </label>
        {isFileTooLarge && (
          <Typography fontSize="text-sm" className="text-red-600">
            {t('new.upload_too_large', { ns: 'course' })}
          </Typography>
        )}
        {errorFile && (
          <Typography fontSize="text-sm" className="text-red-600">
            {errorFile}
          </Typography>
        )}
        {isReadytoPreview('image') && (
          <AspectRatio ratio={16 / 9}>
            <img src={file.url} />
          </AspectRatio>
        )}
        {isReadytoPreview('video') && (
          <AspectRatio ratio={16 / 9}>
            <video controls>
              <source src={file.url} type={file.mine}></source>
            </video>
          </AspectRatio>
        )}
        {file &&
          !isFileTooLarge &&
          (isValidFile ? (
            <div className="flex items-start p-4 rounded-lg border border-primary-300 bg-white">
              <HighlightIcon icon={icon} size="sm" className="mr-4" />
              <div className="w-full flex flex-col items-stretch">
                <div className="flex justify-between items-center gap-4">
                  <div className="grow text-sm text-gray-700 font-medium">
                    {file.name}
                  </div>
                  {fileProgress.status === UPLOAD_STATUS_COMPLETE ? (
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="text-primary-400"
                    />
                  ) : (
                    <Trash
                      role="button"
                      size={20}
                      className="text-gray-500"
                      onClick={handleRemoveFile}
                    />
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {bytesToSize(file.size)}
                </div>
                <div className="flex items-center">
                  <div className="relative grow h-2 bg-gray-200 rounded overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-primary-400 transition-all duration-200"
                      style={{ width: `${fileProgress.progress}%` }}
                    ></div>
                  </div>
                  <span className="ml-3">{fileProgress.progress}%</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start p-4 rounded-lg border border-error-300 bg-error-25">
              <HighlightIcon
                icon={icon}
                color="error"
                size="sm"
                className="mr-4"
              />
              <div className="w-full flex flex-col items-stretch">
                <div className="flex justify-between items-center gap-4">
                  <div className="grow text-sm text-error-700 font-medium">
                    {t('new.upload_invalid', { ns: 'course' })}
                  </div>
                  <Trash
                    role="button"
                    size={20}
                    className="text-error-600"
                    onClick={handleRemoveFile}
                  />
                </div>
                <div className="text-sm text-error-600">{file.name}</div>
              </div>
            </div>
          ))}
      </div>
    )
  }
)

export default FileUploader
