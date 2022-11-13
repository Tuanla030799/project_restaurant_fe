import { FILE_UPLOAD_URL } from "@/constants/common"
import UploadBackgroundImage from '@/public/images/upload_scorm.jpg'
import { bytesToSize } from "@/utils"
import clsx from "clsx"
import { Trans, useTranslation } from "next-i18next"
import Image from "next/image"
import { CheckCircle, File, Trash } from "phosphor-react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { DropTargetMonitor, useDrop } from "react-dnd"
import { NativeTypes } from "react-dnd-html5-backend"
import { HighlightIcon } from 'components/HighlightIcon';

const UPLOAD_STATUS_UPLOADING = 'uploading'
const UPLOAD_STATUS_COMPLETE = 'complete'
const UPLOAD_STATUS_ERROR = 'error'

interface ProgressProps {
  progress: number
  status?: 'uploading' | 'complete' | 'error'
}

interface FileProps {
  name: string
  size: number
  type: string
}

type UploadFileProps = {
  allowedFileType: string[]
  inputFile: any
  uploadUrl?: string
  supportedFormats?: string
  otherText?: string
  onIsUploadProcessing?: Dispatch<SetStateAction<boolean>>
} & React.HTMLAttributes<HTMLInputElement>

const UploadFile = ({
  allowedFileType,
  inputFile,
  uploadUrl = FILE_UPLOAD_URL,
  supportedFormats,
  otherText,
  onIsUploadProcessing,
} : UploadFileProps) => {
  const { t } = useTranslation('common')
  const [file, setFile] = useState<null | FileProps>(null)
  const [fileProgress, setFileProgress] = useState<ProgressProps>({
    progress: 0,
  })
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: any) {
        if (item.files) {
          handleRemoveFile()
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

  const fileExt = file && file?.name.split('.').pop() || ''
  const isValidFile = allowedFileType && allowedFileType.includes(fileExt)
  const isDragActive = canDrop && isOver

  useEffect(() => {
    onIsUploadProcessing && onIsUploadProcessing(!file || fileProgress.progress != 100 || !isValidFile)
  }, [file, fileProgress])

  const fileUploader = (file) => {
    if (!file) return

    const formData = new FormData()
    const req = new XMLHttpRequest()

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

      setFileProgress({
        progress: Math.floor((e.loaded / e.total) * 100),
        status: UPLOAD_STATUS_UPLOADING,
      })
    }

    req.onload = (e) => {
      setFileProgress({
        progress: 100,
        status: UPLOAD_STATUS_COMPLETE,
      })
    }

    req.open('POST', uploadUrl, true)
    req.setRequestHeader('Content-Type', file.type)
    req.send(formData)
  }

  const handleDragFile = (file) => {
    const fileState = {
      name: file.name,
      size: file.size,
      type: file.type,
    }

    inputFile.current = {files: [file]}

    fileUploader(file)

    setFile(fileState)
  }

  const handleFile = (e) => {
    const file = [...e.target.files].map((file) => {
      const newFile = {
        name: file.name,
        size: file.size,
        type: file.type,
      }
      
      return newFile
    })[0]

    fileUploader(file)

    setFile(file)
  }

  const handleRemoveFile = () => {
    inputFile.current && (inputFile.current.value = null)

    setFile(null)
    setFileProgress({
      progress: 0,
    })
  }

  return (
    <div className="mx-auto w-[600px] flex flex-col">
      <label className={clsx(
        'flex flex-col px-11 text-center rounded-3xl border border-dashed border-gray-400 cursor-pointer',
        file ? 'pt-11 pb-[60px]' : 'pt-[70px] pb-[80px]'
      )}
      ref={drop}
      >
        <div className="w-full">
          <Image src={UploadBackgroundImage} />
        </div>
        <div className="mt-14 mb-4">
          <div
            className={clsx(
              'py-4 text-center bg-white',
              isDragActive
                ? 'border-primary-200 bg-primary-25'
                : 'border-gray-200 bg-white',
            )}
          >
            <input
              ref={inputFile}
              type="file"
              className="hidden"
              onClick={handleRemoveFile}
              onChange={handleFile}
            />
            <p className="text-lg mb-5 font-semibold px-[110px]">
              <Trans i18nKey="action.click_to_upload">
                <span
                  className={clsx(
                    'text-primary-400'
                  )}
                >
                  {t('action.click_to_upload')}
                </span>{' '}
                <span className="text-gray-800">
                </span>
              </Trans>
            </p>
            {supportedFormats && <p className="text-lg mt-[-12px] font-semibold px-[110px]">{supportedFormats}</p>}
            {otherText && <p className="text-xs text-gray-500 mt-5 text-center px-5">{otherText}</p>}
          </div>
        </div>
      </label>
      {file && 
        <div className={clsx('flex items-start p-4 rounded-lg border bg-white mt-9',
          isValidFile ? 'border-primary-300' : 'border-red-300'
        )}>
          <div>
            <HighlightIcon icon={File} size="sm" className={clsx('mr-4', !isValidFile && 'text-red-600')} />
          </div>
          {isValidFile ? (
            <div className="grow flex flex-col items-stretch">
              <div className="flex justify-between items-center gap-4">
                <p className="grow text-sm text-gray-700 font-medium">
                  {file.name}
                </p>
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
              <p className="text-sm text-gray-500">
                {bytesToSize(file.size)}
              </p>
              <div className="flex items-center">
                <div className="relative grow h-2 bg-gray-200 rounded overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-primary-400 transition-all duration-200"
                    style={{ width: `${fileProgress.progress}%` }}
                  ></div>
                </div>
                <span className="ml-3 text-gray-700">{fileProgress.progress}%</span>
              </div>
            </div>
          ) : (
            <div className="grow flex flex-col items-stretch">
              <div className="flex justify-between items-center gap-4">
                <p className="grow text-sm text-red-700 font-medium">
                  {t('action.upload_failed')}
                </p>
                <Trash
                  size={20}
                  className="text-red-700 cursor-pointer"
                  onClick={handleRemoveFile}
                />
              </div>
              <p className="text-sm text-red-600 my-1">
                {file.name}
              </p>
            </div>
          )}
        </div>
      }
    </div>
  )
}

export default UploadFile
