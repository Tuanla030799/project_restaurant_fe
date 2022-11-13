import React, { Fragment, ReactNode, useState } from 'react'
import { CaretRight, DotsThree } from 'phosphor-react'
import { styles } from './Breadcrumbs.styled'
import { Button } from '@/components'
import clsx from 'clsx'

interface IBreadcrumbsProps {
  divider?: ReactNode
  children: ReactNode[]
  maxItems?: number
  itemsAfterCollapse?: number
  itemsBeforeCollapse?: number
  className?: string
}

const Breadcrumbs = ({
  children,
  divider = <CaretRight />,
  maxItems = 5,
  itemsAfterCollapse = 1,
  itemsBeforeCollapse = 1,
  className,
}: IBreadcrumbsProps) => {
  const computedChildren: ReactNode[] = children
    .filter(Boolean)
    .reduce((prevChildren, reactNode) => {
      if (Array.isArray(reactNode))
        return [...(prevChildren as ReactNode[]), ...reactNode]
      return [...(prevChildren as ReactNode[]), reactNode]
    }, []) as ReactNode[]

  const totalItems = computedChildren.length
  const isOverflow = totalItems > maxItems
  const [shouldCollapsed, setShouldCollapsed] = useState<boolean>(isOverflow)
  const allClassNames = clsx(styles.base, className)

  return (
    <ol className={allClassNames}>
      {computedChildren.map((item, index) => {
        const isHidden =
          index >= itemsBeforeCollapse &&
          !(index >= totalItems - itemsAfterCollapse)

        if (index === itemsBeforeCollapse && shouldCollapsed) {
          return (
            <Fragment key={index}>
              <Button
                color="gray"
                variant="link"
                className="bg-gray-200 rounded px-0.5"
                onClick={() => setShouldCollapsed(false)}
              >
                <DotsThree weight="bold" size={14} />
              </Button>
              <span className={styles.divider}>{divider}</span>
            </Fragment>
          )
        }

        if (isHidden && shouldCollapsed) {
          return null
        }

        return (
          <li key={index} className={`${styles.item}`}>
            {item}
            {computedChildren.length - 1 !== index && (
              <span className={styles.divider}>{divider}</span>
            )}
          </li>
        )
      })}
    </ol>
  )
}

export default Breadcrumbs
