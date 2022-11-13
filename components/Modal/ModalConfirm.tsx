import React, { forwardRef, ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle, Info, X } from 'phosphor-react'
import { Button } from '..'
import { styles } from './ModalConfirm.styled'
import { motion } from 'framer-motion'
import Image from 'next/image'
import clsx from 'clsx'

type ModalConfirmTypes = 'error' | 'warning' | 'success' | 'info' | 'image'

type TImage = {
  src: string
  width?: number
  height?: number
}

interface ModalConfirmProps {
  title?: string
  image?: TImage
  type: ModalConfirmTypes
  rejectMessage: string
  confirmMessage: string
  children: ReactNode
  isOpen: boolean
  preventClickOutsideToClose?: boolean
  isCentered?: boolean
  imageClassName?: string
  toggle: () => void
  onReject?: () => void
  onConfirm?: () => void
  onOpen?: () => void
  onClose?: () => void
}

const titleDefault = {
  error: 'Error',
  warning: 'Warning',
  success: 'Success',
  info: 'Info',
  image: 'Info',
}

const iconTypes = {
  error: <X size={24} className="text-red-600" />,
  warning: <Info size={24} className="text-yellow-600" />,
  success: <CheckCircle size={24} className="text-green-600" />,
  info: <Info size={24} className="text-blue-600" />,
}

const ModalConfirm = forwardRef<HTMLDivElement, ModalConfirmProps>(
  (
    {
      title,
      image,
      type,
      isOpen,
      preventClickOutsideToClose = false,
      rejectMessage,
      confirmMessage,
      children,
      isCentered,
      imageClassName,
      toggle,
      onReject,
      onConfirm,
      onOpen,
      onClose,
    },
    ref
  ) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden'

        onOpen && onOpen()

        return () => {
          document.body.removeAttribute('style')
        }
      }
    }, [isOpen])

    const handleConfirm = () => {
      onConfirm && onConfirm()
      onClose && onClose()
      toggle()
    }

    const handleReject = () => {
      onReject && onReject()
      onClose && onClose()
      toggle()
    }

    const handleBackdropClick = () => {
      if (preventClickOutsideToClose) return

      onClose && onClose()
      toggle()
    }

    return (
      isOpen &&
      createPortal(
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.2 }}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          className="fixed inset-0 z-modal overflow-y-auto h-full w-full"
          ref={ref}
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-60"
            onClick={handleBackdropClick}
          ></div>
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.2 }}
            variants={{
              visible: { transform: 'scale(1)' },
              hidden: { transform: 'scale(0.4)' },
            }}
            className={clsx(
              'relative z-elevate w-[400px] top-[200px] mx-auto p-7 shadow-lg rounded-md bg-white',
              {
                '!top-1/2 !-translate-y-1/2': isCentered,
              }
            )}
          >
            <div className="flex justify-center items-center mb-2">
              {type === 'image' ? (
                image && (
                  <div className={imageClassName}>
                    <Image
                      src={image.src}
                      width={image.width}
                      height={image.height}
                      className="!mb-2"
                    />
                  </div>
                )
              ) : (
                <span
                  className={`${styles.highlightColor[type]} border-8 rounded-full p-1.5`}
                >
                  {iconTypes[type]}
                </span>
              )}
            </div>
            <h2 className="text-xl font-medium text-gray-700 text-center">
              {title || (type && titleDefault[type])}
            </h2>
            <div className="text-gray-700 text-center mt-3 mb-5">
              {children}
            </div>
            <div className="flex items-stretch gap-2 pt-2">
              <Button size="lg" fluid onClick={handleConfirm}>
                {confirmMessage}
              </Button>
              <Button size="lg" variant="outlined" fluid onClick={handleReject}>
                {rejectMessage}
              </Button>
            </div>
          </motion.div>
        </motion.div>,
        document.body
      )
    )
  }
)

export default ModalConfirm
