import { X } from 'phosphor-react'
import React, { ReactNode, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Button, Typography } from '@/components'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useOnClickOutside } from '@/hooks'
import { styles } from './Modal.styled'

type TModalSize = 'xs' | 'sm' | 'md' | 'lg'
type TButton = 'button' | 'submit'

interface IModalProps {
  isOpen: boolean
  isDisplayXButton?: boolean
  title: string
  children: ReactNode
  rejectMessage?: string
  acceptMessage?: string
  typeButtonAccept?: TButton
  formButtonAccept?: string
  classNameContainer?: string
  isCentered?: boolean
  toggle: () => void
  onReject?: () => void
  onAccept?: () => void
  size?: TModalSize
  classNameChildren?: string
  hasOnClickOutside?: boolean
  classButtonReject?: string
}

const Modal = ({
  isOpen,
  isDisplayXButton = true,
  title,
  children,
  rejectMessage,
  acceptMessage,
  typeButtonAccept,
  formButtonAccept,
  classNameContainer,
  isCentered,
  toggle,
  onAccept,
  onReject,
  size = 'md',
  classNameChildren = styles.children.base,
  hasOnClickOutside = true,
  classButtonReject,
}: IModalProps) => {
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, toggle, hasOnClickOutside)

  return (
    isOpen &&
    createPortal(
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
      >
        <div className="fixed inset-0 z-10 bg-black bg-opacity-60 h-full w-full">
          <div
            ref={ref}
            className={clsx(
              styles.base,
              styles.sizes[size],
              classNameContainer,
              {
                '!top-1/2 !-translate-y-1/2': isCentered,
              }
            )}
          >
            <div className="shadow-lg rounded-md bg-white p-4 md:p-6">
              <div className="flex justify-between items-center">
                <>
                  <Typography
                    weight="bold"
                    fontSize="display-xs"
                    className="text-gray-700 line-clamp-2 mr-8"
                  >
                    {title}
                  </Typography>
                  {isDisplayXButton && (
                    <Button
                      variant="link"
                      className="text-gray-500"
                      onlyIcon
                      onClick={toggle}
                    >
                      <X size={20} />
                    </Button>
                  )}
                </>
              </div>
              <div className={classNameChildren}>{children}</div>
              <div className="flex justify-end items-center gap-2 pt-2">
                {rejectMessage && (
                  <Button
                    size="sm"
                    variant="outlined"
                    className={classButtonReject}
                    onClick={() => {
                      toggle()
                      onReject && onReject()
                    }}
                  >
                    {rejectMessage}
                  </Button>
                )}
                {acceptMessage && (
                  <Button
                    size="sm"
                    type={typeButtonAccept}
                    form={formButtonAccept}
                    onClick={() => {
                      typeButtonAccept !== 'submit' && toggle()
                      onAccept && onAccept()
                    }}
                  >
                    {acceptMessage}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>,
      document.body
    )
  )
}

export default Modal
