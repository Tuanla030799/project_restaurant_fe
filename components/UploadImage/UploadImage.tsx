import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { Paperclip, Trash, UploadSimple } from 'phosphor-react'
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import uploadImage from '../../public/images/upload.svg'
import { styles } from './UploadImage.styled'
import { Button } from '@/components'

interface IUploadImageProps extends React.HTMLAttributes<HTMLInputElement> {
  name?: string
  label?: string
  title?: string
  action?: string
  description?: string
  isRequired?: boolean
  error?: string
  accept?: string
  maxSizeByMB?: number
  extensionsAllowed?: string[]
  defaultImage?: string
  onChange?: (file: any) => void
  setIsChangeImage?: Dispatch<SetStateAction<boolean>>
}

const UploadImage = ({
  name,
  label,
  title = 'Upload Image',
  action,
  description,
  isRequired,
  error,
  maxSizeByMB = 10,
  extensionsAllowed = ['jpeg', 'jpg', 'png', 'gif', 'webp'],
  defaultImage,
  onChange,
  setIsChangeImage,
  ...rest
}: IUploadImageProps) => {
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [uploadError, setUploadError] = useState<string>('')
  const { t } = useTranslation(['course'])
  const inputFile = React.useRef<any>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files

    if (files) {
      const maximumSize = maxSizeByMB * 1024 * 1024
      const file = inputFile.current.files[0]
      const extension = file?.name.split('.').pop().toLowerCase()
      const isValid = file && extensionsAllowed.includes(extension)

      if (file?.size > maximumSize) {
        setUploadError(t('new.upload_too_large'))
        return
      }

      if (!isValid) {
        setSelectedImage(null)
        setUploadError(t('new.upload_invalid'))
        return
      }

      setSelectedImage(URL.createObjectURL(files[0]))
      setUploadError('')
      setIsChangeImage && setIsChangeImage(true)
      onChange && onChange(files[0])
    }
  }

  const handleDeleteImage = () => {
    inputFile.current.value = ''
    setIsChangeImage && setIsChangeImage(false)
    setSelectedImage(null)
  }

  return (
    <div className="text-left">
      {label && (
        <label className={clsx(styles.label, isRequired && styles.required)}>
          {label}
        </label>
      )}

      <div className="flex gap-4 my-2">
        {selectedImage || defaultImage ? (
          <img
            className="shrink-0 rounded-lg w-[250px] h-[160px]"
            src={selectedImage || defaultImage}
          />
        ) : (
          <div className="flex justify-center items-center bg-primary-25 border border-dashed border-primary-200 shrink-0 rounded-lg w-[250px] h-[160px]">
            <img {...uploadImage} />
          </div>
        )}

        <div className="text-left">
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>

          <Button as="label" disabled size="sm" variant="outlined">
            <input
              hidden
              type="file"
              name={name}
              ref={inputFile}
              onChange={handleChange}
              {...rest}
            />
            <span>{action || 'Click to upload'}</span>
            <UploadSimple size={20} />
          </Button>

          <p className="text-sm text-red-500 mt-2">{error || uploadError}</p>

          {selectedImage && (
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center text-gray-400">
                <Paperclip size={16} />
                <span className="text-sm ml-2">
                  {inputFile.current.files[0]?.name}
                </span>
              </div>

              <Button
                onlyIcon={true}
                size="sm"
                variant="text"
                onClick={handleDeleteImage}
              >
                <Trash size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UploadImage
