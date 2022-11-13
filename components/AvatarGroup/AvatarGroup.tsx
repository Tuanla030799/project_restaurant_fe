import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import { styles } from './AvatarGroup.styled'

type TAvatarGroupVariants = 'circular' | 'rounded' | 'square'

type TAvatarGroupSpacings = 'sm' | 'md' | 'lg'

type TAvatarGroupProps = {
  variant?: TAvatarGroupVariants
  max?: number
  spacing?: TAvatarGroupSpacings
  children: ReactNode | ReactNode[]
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

const AvatarGroup = forwardRef<HTMLDivElement, TAvatarGroupProps>(
  (
    {
      variant = 'circular',
      max = 5,
      spacing = 'md',
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const [avatarClassNames, setAvatarClassNames] = useState('')
    const allClassNames = clsx(styles.base, styles.spacings[spacing], className)
    const avatarRef = useRef(null)
    const isArray =
      typeof children === 'object' && (children as ReactNode[]).length
    const isOverflow = isArray && (children as ReactNode[]).length > max

    useEffect(() => {
      if (avatarRef && avatarRef.current) {
        setAvatarClassNames((avatarRef.current as any).className)
      }
    }, [max])

    return (
      <div className={allClassNames} ref={ref} {...rest}>
        {isArray
          ? (children as ReactNode[])
              .map((child: any, index) =>
                React.cloneElement(child, {
                  ...child.props,
                  key: index,
                  variant,
                  ref: avatarRef,
                  className: clsx(
                    'border-2 border-white',
                    child.props.className
                  ),
                })
              )
              .slice(0, max)
          : children}
        {isArray && isOverflow && (
          <div
            className={clsx(
              'inline-flex justify-center align-center font-semibold text-gray-700 bg-gray-100 text-sm',
              avatarClassNames
            )}
          >
            <span>+{(children as ReactNode[]).length - max}</span>
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = 'AvatarGroup'

export default AvatarGroup
