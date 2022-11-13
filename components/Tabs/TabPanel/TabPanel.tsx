import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { TabPanelProps } from './TabPanel.types'
import { styles } from './TabPanel.styles'

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  (
    { children, panelKey, label, disabled = false, className, ...rest },
    ref
  ) => {
    return (
      <div
        id={`tabpanel-${panelKey}`}
        className={clsx(styles.base, className)}
        role="tabpanel"
        aria-labelledby={`tab-${panelKey}`}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    )
  }
)
TabPanel.displayName = 'TabPanel'

export default TabPanel
