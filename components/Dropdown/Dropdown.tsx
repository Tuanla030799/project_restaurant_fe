import React, {
  Fragment,
  ReactElement,
  ReactNode,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import { useOnClickOutside } from '@/hooks'
import { styles } from './Dropdown.styled'

type TMenuPlacements =
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

interface IDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactElement
  overlay: ReactElement
  className?: string
  preventClose?: boolean
}

interface IMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  children: ReactNode | ReactNode[]
  open?: boolean
  maxWidth?: number
  className?: string
  placement?: TMenuPlacements
}

interface IMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: ReactNode | ReactNode[]
  className?: string
  onClick?: () => void
  onClose?: () => void
}

export const Dropdown = ({
  children,
  overlay,
  className,
  preventClose = false,
  ...rest
}: IDropdownProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const ref = useRef(null)
  const allClassNames = clsx(styles.dropdown.base, className)

  const onToggle = () => setOpen((prevState) => !prevState)
  const onClose = () => setOpen(false)

  useOnClickOutside(ref, onClose)

  const renderOverlayChildren = (elements) => {
    return elements.map((menuItem: ReactElement, index: number) => {
      if (Array.isArray(menuItem)) {
        return renderOverlayChildren(menuItem)
      }

      return (
        <Fragment key={index}>
          {React.cloneElement(menuItem, {
            onClose: preventClose ? null : onClose,
          })}
        </Fragment>
      )
    })
  }

  return (
    <div className={allClassNames} ref={ref} {...rest}>
      {React.cloneElement(children, { onClick: onToggle })}
      <Menu
        className={overlay.props.className}
        placement={overlay.props.placement}
        maxWidth={overlay.props.maxWidth}
        open={open}
      >
        {overlay.props.children?.length ? (
          renderOverlayChildren(overlay.props.children)
        ) : (
          <Fragment>
            {!!overlay.props.children &&
              React.cloneElement(overlay.props.children, { onClose })}
          </Fragment>
        )}
      </Menu>
    </div>
  )
}

export const Menu = ({
  children,
  open,
  maxWidth = 250,
  className,
  placement = 'bottom-right',
  ...rest
}: IMenuProps) => {
  const allClassNames = clsx(
    styles.menu.base,
    styles.menu.placements[placement],
    className
  )

  return open ? (
    <ul
      className={allClassNames}
      style={{ ['--menu-dropdown-width' as any]: `${maxWidth}px` }}
      {...rest}
    >
      {children}
    </ul>
  ) : (
    <></>
  )
}

export const MenuDivider = ({ className }: { className?: string }) => {
  const classLists = clsx(className, styles.divider.base)
  return <li className={classLists}></li>
}

export const MenuItem = ({
  children,
  className,
  onClick,
  onClose,
  ...rest
}: IMenuItemProps) => {
  return (
    <li
      className={clsx(styles.item.base, className, onClick && 'cursor-pointer')}
      onClick={() => {
        onClick && onClick()
        onClose && onClose()
      }}
      {...rest}
    >
      {children}
    </li>
  )
}
