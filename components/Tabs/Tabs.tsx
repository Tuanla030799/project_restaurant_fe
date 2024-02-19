import clsx from 'clsx'
import React, { forwardRef, useState } from 'react'
import TabPanel from './TabPanel/TabPanel'
import { styles } from './Tabs.styles'
import { TabsProps } from './Tabs.types'
import { Stack } from '@/components'
import { ForwardRefWithStaticComponent } from 'utils/ForwardRefWithStaticComponent'

type TabsComponent = ForwardRefWithStaticComponent<
  TabsProps,
  {
    TabPanel: typeof TabPanel
  }
>

const Tabs: TabsComponent = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      children,
      defaultActiveTab,
      type = 'primary',
      size = 'sm',
      direction = 'horizontal',
      spacing = 8,
      destroyInactiveTab = false,
      fluid,
      centered,
      className,
      labelClassName,
      labelMinWidth,
      stackClassName,
      onChange,
      ...rest
    },
    ref
  ) => {
    const [activeTab, setActiveTab] = useState(
      defaultActiveTab || (children[0] as any)?.key
    )

    const handleChangeTab = (key) => {
      setActiveTab(key)

      onChange && onChange()
    }

    return (
      <div
        className={clsx(styles.directions[direction].tabs, className)}
        ref={ref}
        {...rest}
      >
        <Stack
          justify={centered ? 'center' : 'flex-start'}
          spacing={spacing}
          direction={direction === 'horizontal' ? 'row' : 'column'}
          className={clsx(
            styles.types[type].labelContainer,
            styles.directions[direction].labelContainer,
            stackClassName
          )}
        >
          {children.map((child: any) => {
            if (!child) return null

            const { props, key } = child
            const isActive = child.key === activeTab

            return (
              <button
                key={key}
                className={clsx(
                  styles.label,
                  styles.types[type].label,
                  styles.sizes[type][size],
                  props.disabled
                    ? styles.types[type].states.disabled
                    : isActive
                      ? styles.types[type].states.active
                      : styles.types[type].states.default,
                  fluid && 'flex-1',
                  labelClassName
                )}
                style={{
                  ...(labelMinWidth && { minWidth: `${labelMinWidth}px` }),
                }}
                type="button"
                id={`tab-${key}`}
                role="tab"
                aria-controls={`tabpanel-${key}`}
                tabIndex={0}
                onClick={() => !props.disabled && handleChangeTab(key)}
              >
                {props.label}
              </button>
            )
          })}
        </Stack>
        {children.map((child: any) => {
          if (!child) return null

          const isActive = child.key === activeTab

          if (destroyInactiveTab && !isActive) return null

          return React.cloneElement(child, {
            ...child.props,
            ...(!isActive && { hidden: true }),
            panelKey: child.key,
            className: clsx(
              child.props.className,
              isActive ? 'block' : 'hidden'
            ),
          })
        })}
      </div>
    )
  }
) as any
Tabs.displayName = 'Tabs'
Tabs.TabPanel = TabPanel

export default Tabs
