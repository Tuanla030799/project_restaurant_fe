import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { styles } from './Tooltip.styled'

type TTooltipPlacements =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'right'
  | 'right-top'
  | 'right-bottom'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'left-top'
  | 'left-bottom'

type TTooltipThemes = 'light' | 'dark'

type TTooltipProps = {
  children: ReactElement
  theme?: TTooltipThemes
  title: ReactNode
  description?: ReactNode
  placement?: TTooltipPlacements
  maxWidth?: number | null
  mouseEnterDelay?: number
  zIndex?: number | null
  noWrap?: boolean
  className?: string
  containerClassName?: string
  isFixed?: boolean
  isMoveElement?: boolean
}

const Tooltip = ({
  children,
  theme = 'dark',
  title,
  description,
  placement = 'top',
  maxWidth = 320,
  mouseEnterDelay = 300,
  zIndex = null,
  noWrap = true,
  className = '',
  containerClassName,
  isFixed,
  isMoveElement,
  ...rest
}: TTooltipProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [delayHandler, setDelayHandler] = useState<any>(null)
  const [offset, setOffset] = useState<{
    top: number
    height: number
  }>({
    top: 0,
    height: 0,
  })

  const allClassNames = clsx(
    styles.base,
    styles.themes[theme],
    styles.placements[placement],
    isFixed && `!fixed !translate-x-0 left-[unset] bottom-[unset]`,
    !zIndex && 'z-sticky',
    noWrap ? 'w-auto whitespace-nowrap' : 'w-screen',
    className
  )

  useEffect(() => {
    isHovered && setIsHovered(false)
  }, [isMoveElement])

  useEffect(() => {
    if (isFixed) {
      //@ts-ignore
      const { top, height } = children?.ref?.current?.getBoundingClientRect()
      setOffset({
        top,
        height,
      })
    }
  }, [isFixed, children])

  const handleMouseEnter = () => {
    setDelayHandler(
      setTimeout(() => {
        setIsHovered(true)
      }, mouseEnterDelay)
    )
  }

  const handleMouseLeave = () => {
    clearTimeout(delayHandler)
    setIsHovered(false)
  }

  return (
    <span
      className={clsx('inline-block relative leading-none', containerClassName)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className={allClassNames}
            style={{
              maxWidth: `${maxWidth}px`,
              ...(zIndex && { zIndex }),
              top: isFixed
                ? `${offset.top - (offset.height + 16)}px`
                : undefined,
            }}
          >
            <div className="flex flex-col gap-1 text-sm">
              <div className="font-medium">{title}</div>
              {description && <div>{description}</div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}

export default Tooltip
