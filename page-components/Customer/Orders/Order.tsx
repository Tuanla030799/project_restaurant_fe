import React, { useState } from 'react'
import {
  AspectRatio,
  Breadcrumbs,
  Button,
  Container,
  Form,
  Input,
  Typography,
} from '@/components'
import { routes } from '@/constants/routes'
import Wrapper from 'components/Wrapper'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { Eye, EyeSlash, House, Info } from 'phosphor-react'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import InstructionBooking from 'components/InstructionBooking'
import { login } from '@/apis'
import { useLoading, useToast } from '@/lib/store'
import { useRouter } from 'next/router'
import { slowLoading } from '@/utils'
import { LoginPayload } from '@/models'
import { useHeaderData } from '@/lib/header'

const INITIAL_VAL_LOGIN_FORM = {
  email: '',
  password: '',
}

const validationSchema = object().shape({
  email: string()
    .required('Please enter email')
    .min(6, 'email is required to have at least 6 characters'),

  password: string()
    .required('Please enter password')
    .min(6, 'Password is required to have at least 6 characters'),
})

const Orders = () => {
  const { mutate } = useHeaderData()
  const { t } = useTranslation(['common', 'order'])
  const { setToast } = useToast()
  const router = useRouter()

  const onSubmit = async (data) => {}

  return (
    <div className="pt-1 bg-gray-100">
      <Container>
        <Wrapper className="px-2 pb-12">
          <>
            <div className=" py-4">
              <Container>
                <Breadcrumbs maxItems={3}>
                  <Link href={routes.home.generatePath()}>
                    <a>
                      <House weight="fill" size={20} />
                    </a>
                  </Link>
                  <Typography>{t('orders', { ns: 'order' })}</Typography>
                </Breadcrumbs>

                <Form onSubmit={onSubmit} className="flex justify-between">
                  <div className="flex basis-1/2 py-4 flex-col items-center px-4 mb-10 gap-6 h-[624px]">
                    <Typography
                      variant="h1"
                      fontSize="display-xs"
                      weight="semibold"
                      align="center"
                      gutter
                      className="mt-7"
                    >
                      {t('order_food', { ns: 'order' })}
                    </Typography>

                    <Typography
                      className="text-gray-600 mt-7 font-semibold"
                      align="center"
                      gutter
                    >
                      {t('no_food', { ns: 'order' })}
                    </Typography>

                    <div className='w-fit'>
                      <Button size="md" color="success" variant='outlined' className="mt-2">
                        {t('action.order', { ns: 'order' })}
                      </Button>
                    </div>
                  </div>
                  <div className="flex basis-1/2 py-4 flex-col px-4 mb-10 gap-6 h-[624px]">
                    <Typography
                      variant="h1"
                      fontSize="display-xs"
                      weight="semibold"
                      align="center"
                      gutter
                      className="mt-7"
                    >
                      {t('title', { ns: 'order' })}
                    </Typography>
                    {/* <Button size="sm" type="submit" className="mt-2">
                      {t('login.login', { ns: 'auth' })}
                    </Button> */}
                  </div>
                </Form>
              </Container>
            </div>
          </>
        </Wrapper>
        <Wrapper className="my-3 pb-12">
          <InstructionBooking />
        </Wrapper>
      </Container>
    </div>
  )
}

export default Orders
