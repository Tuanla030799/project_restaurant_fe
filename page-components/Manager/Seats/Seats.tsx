import React, { useMemo } from 'react'
import {
  Badge,
  Breadcrumbs,
  Button,
  Dropdown,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@/components'
import Link from 'next/link'
import { routes } from '@/constants/routes'
import { DotsThreeVertical, House, Table } from 'phosphor-react'
import { useTranslation } from 'next-i18next'
import { useSeats } from '@/lib/seat'
import { clsx } from 'clsx'

const Seats = () => {
  const { t } = useTranslation(['common', 'manager'])
  const { data: { data: seats } = {}, isValidating } = useSeats()

  const examActions = useMemo(
    () => [
      {
        label: t('action.duplicate'),
        onClick: () => {},
      },
      {
        label: t('action.edit'),
        onClick: () => {},
      },
    ],
    []
  )

  return (
    <>
      <div className="bg-management bg-center bg-cover pt-4 pb-8 px-8">
        <Breadcrumbs maxItems={3} className="pb-6">
          <Link href={routes.manager.orders.generatePath()}>
            <a>
              <House weight="fill" size={20} />
            </a>
          </Link>
          <Typography>{t('seats.title', { ns: 'manager' })}</Typography>
        </Breadcrumbs>
        <Stack direction="column">
          <Typography fontSize="display-md" weight="medium">
            {t('seats.title', { ns: 'manager' })}
          </Typography>
          <Stack>
            <Table size={24} weight="fill" className="text-primary-400" />
          </Stack>
        </Stack>
      </div>
      <div className="px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-8">
        {seats?.map((seat) => {
          return (
            <div className="relative h-full max-w-[300px]" key={seat.id}>
              <div className="flex flex-col items-center h-full shadow-md rounded-lg border-2 border-gray-200 px-4 pt-8 pb-6 bg-white">
                <div className="h-full flex flex-col items-center">
                  <Typography
                    transform="capitalize"
                    weight="semibold"
                    variant="p"
                    fontSize="text-xs"
                    align="center"
                    className="mt-1 mb-3"
                  >
                    Bàn số {seat.position}
                  </Typography>

                  <Typography
                    transform="capitalize"
                    weight="semibold"
                    variant="p"
                    fontSize="text-xs"
                    align="center"
                    className="mt-1 mb-3"
                  >
                    {seat.content}
                  </Typography>
                  <Badge
                    size="sm"
                    color={seat.isReady ? 'success' : 'error'}
                    className="w-fit"
                  >
                    {seat.isReady ? 'Trống' : 'Sử dụng'}
                  </Badge>
                </div>
              </div>
              <div className="absolute right-2 top-3">
                <Dropdown
                  className="inline-flex flex-shrink-0"
                  preventClose={false}
                  overlay={
                    <Menu maxWidth={172} placement="bottom-right">
                      {examActions.map((item, index) => (
                        <>
                          <MenuItem
                            className="text-gray-700"
                            onClick={item.onClick}
                            key={index}
                          >
                            {item.label}
                          </MenuItem>
                        </>
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
                      seat.isReady ? 'bg-success-500' : 'bg-red-500'
                    )}
                  ></span>
                  <span
                    className={clsx(
                      'relative inline-flex rounded-full h-2 w-2',
                      seat.isReady ? 'bg-success-500' : 'bg-red-500'
                    )}
                  ></span>
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Seats
