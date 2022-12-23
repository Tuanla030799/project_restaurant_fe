import React from 'react'
import { Breadcrumbs, SeatCard, Stack, Typography } from '@/components'
import Link from 'next/link'
import { routes } from '@/constants/routes'
import { House, Table } from 'phosphor-react'
import { useTranslation } from 'next-i18next'
import { useSeats } from '@/lib/seat'
import { Seat } from '@/models'
import { updateSeatStatus } from '@/apis'
import { useToast } from '@/lib/store'

const Seats = () => {
  const { t } = useTranslation(['manager'])
  const { setToast } = useToast()
  const { data: { data: seats } = {}, mutate } = useSeats()

  const handleUpdateStatus = async (id: number, status: boolean) => {
   
    try {
      console.log("status", status)
      await updateSeatStatus(id, !status)
      await mutate()
      setToast({
        color: 'success',
        title: t('seats.message.status.success', { ns: 'manager' }),
      })
    } catch (error) {
      setToast({
        color: 'error',
        title: t('seats.message.status.error', { ns: 'manager' }),
      })
    }
  }

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
      <div className="px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-16 gap-y-8">
        {seats &&
          seats.map((seat: Seat) => (
            <SeatCard
              key={seat.id}
              {...seat}
              updateStatus={handleUpdateStatus}
            />
          ))}
      </div>
    </>
  )
}

export default Seats
