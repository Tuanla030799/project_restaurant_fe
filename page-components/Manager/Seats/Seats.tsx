import React from 'react'
import { Breadcrumbs, Stack, Typography } from '@/components'
import Link from 'next/link'
import { routes } from '@/constants/routes'
import { House, Table } from 'phosphor-react'
import { useTranslation } from 'next-i18next'

const Seats = () => {
  const { t } = useTranslation(['common', 'manager'])
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
      <div className="px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
      </div>
    </>
  )
}

export default Seats
