import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { DotsThreeVertical } from 'phosphor-react'
import React, { forwardRef, useMemo } from 'react'
import { SeatProps } from './seat.type'
import {
  Badge,
  Button,
  Dropdown,
  Menu,
  MenuItem,
  Typography,
} from '@/components'

const Seat = forwardRef<HTMLDivElement, SeatProps>(
  ({ id, content, isReady, image, position, updateStatus, ...rest }, ref) => {
    const { t } = useTranslation(['manager'])
    const seatActions = useMemo(
      () => [
        {
          label: t('seats.action.change_status', { ns: 'manager' }),
          onClick: () => updateStatus && updateStatus(id, isReady),
        },
        {
          label: t('seats.action.edit', { ns: 'manager' }),
          onClick: () => {
            console.log('click edit')
          },
        },
      ],
      [isReady]
    )

    const status = useMemo(() => {
      return {
        available: t('seats.status.available', { ns: 'manager' }),
        full: t('seats.status.full', { ns: 'manager' }),
      }
    }, [])
    return (
      <div
        className="relative h-full max-w-[300px] min-w-[200px]"
        ref={ref}
        // {...rest}
      >
        <div className="flex flex-col items-center h-full shadow-md rounded-lg border-2 border-gray-200 px-4 pt-8 pb-6 bg-white">
          <div className="h-full flex flex-col items-center">
            <Typography
              weight="semibold"
              variant="p"
              fontSize="text-xs"
              align="center"
              className="mt-1 mb-3"
            >
              {`${t('seats.position', { ns: 'manager' })} ${position}`}
            </Typography>

            <Typography
              transform="capitalize"
              weight="semibold"
              variant="p"
              fontSize="text-xs"
              align="center"
              className="mt-1 mb-3"
            >
              {content}
            </Typography>
            <Badge
              size="sm"
              color={isReady ? 'success' : 'error'}
              className="w-fit"
            >
              {isReady ? status.available : status.full}
            </Badge>
          </div>
        </div>
        <div className="absolute right-2 top-3">
          <Dropdown
            className="inline-flex flex-shrink-0"
            overlay={
              <Menu maxWidth={172} placement="bottom-right">
                {seatActions.map((item, index) => (
                  <div key={index}>
                    <MenuItem className="text-gray-700" onClick={item.onClick}>
                      {item.label}
                    </MenuItem>
                  </div>
                ))}
              </Menu>
            }
          >
            <Button variant="text" color="gray" onlyIcon className="!p-0">
              <DotsThreeVertical size={22} weight="bold" />
            </Button>
          </Dropdown>
        </div>
        <div className="absolute left-2 top-2">
          <span className="flex h-2 w-2">
            <span
              className={clsx(
                'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                isReady ? 'bg-success-500' : 'bg-red-500'
              )}
            ></span>
            <span
              className={clsx(
                'relative inline-flex rounded-full h-2 w-2',
                isReady ? 'bg-success-500' : 'bg-red-500'
              )}
            ></span>
          </span>
        </div>
      </div>
    )
  }
)

export default React.memo(Seat)
