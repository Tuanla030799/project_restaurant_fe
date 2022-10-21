import React, { forwardRef, useState } from 'react'
import { Info, Warning, WarningCircle, CheckCircle, X } from 'phosphor-react'
import clsx from 'clsx'
import { useInterval } from '@/hooks'
import { styles } from './Toast.styled'
import { AnimatePresence, motion } from 'framer-motion'
import { ToastProps } from './Toast.types'

const toastIcons = {
  primary: <Info size={24} />,
  gray: <Info size={24} />,
  info: <Info size={24} />,
  error: <WarningCircle size={24} />,
  warning: <Warning size={24} />,
  success: <CheckCircle size={24} />,
}

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      color = 'primary',
      variant = 'outlined',
      icon = true,
      title,
      description,
      width = 'auto',
      open = true,
      closeButton = true,
      floating = true,
      autoHideDuration = 5000,
      placement = {
        horizontal: 'right',
        vertical: 'top',
      },
      zIndex = null,
      className,
      onClose,
      ...rest
    },
    ref
  ) => {
    const allClassNames = clsx(
      styles.base,
      styles.colors[color][variant],
      closeButton && 'xs:pr-12',
      className
    )
    const [timer, setTimer] = useState<number>(0)
    const [pause, setPause] = useState<boolean>(false)

    useInterval(() => {
      if (!open) return

      if (!pause) {
        setTimer((prevState) => prevState + 1)

        if (autoHideDuration && timer === autoHideDuration / 1000) {
          onClose && onClose()
        }
      }
    })

    return (
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
            }}
            className={clsx(
              'w-toast',
              floating && styles.placements[placement.horizontal],
              floating && styles.placements[placement.vertical],
              floating && 'fixed p-4',
              !zIndex && floating && 'z-sticky'
            )}
            style={{
              ...(width && { ['--toast-width' as any]: width }),
              ...(zIndex && { zIndex }),
            }}
          >
            <div
              className={allClassNames}
              onMouseEnter={() => setPause(true)}
              onMouseLeave={() => setPause(false)}
              ref={ref}
              {...rest}
            >
              <div className="shrink-0">
                {typeof icon === 'boolean' ? icon && toastIcons[color] : icon}
              </div>
              <div className="flex flex-col items-start gap-3">
                <div className="flex flex-col gap-1 text-sm">
                  <div className="font-semibold mt-0.5">{title}</div>
                  <div>{description}</div>
                </div>
              </div>
              {closeButton && (
                <button
                  type="button"
                  className="absolute top-4 right-4"
                  onClick={() => onClose && onClose()}
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)
Toast.displayName = 'Toast'

export default Toast
