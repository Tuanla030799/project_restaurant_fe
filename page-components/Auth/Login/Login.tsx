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

const Login = () => {
  const { mutate } = useHeaderData()
  const { t } = useTranslation(['common', 'auth'])
  const { loading, setLoading } = useLoading()
  const { setToast } = useToast()
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>({
    mode: 'onSubmit',
    defaultValues: INITIAL_VAL_LOGIN_FORM,
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = async (data) => {
    try {
      await login(data)

      setToast({
        color: 'success',
        title: t('login.message.success', {
          ns: 'auth',
        }),
      })

      await slowLoading(500)

      await mutate()

      await router.push({
        pathname: routes.home.generatePath(),
      })
    } catch (error: any) {
      setToast({
        color: 'error',
        title:
          (error?.response?.data?.message as string) ||
          t('login.message.error', {
            ns: 'auth',
          }),
      })
    } finally {
      setLoading('login', false)
    }
  }

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
                  <Typography>{t('login.login', { ns: 'auth' })}</Typography>
                </Breadcrumbs>
                <Typography
                  variant="h1"
                  fontSize="display-xs"
                  weight="semibold"
                  align="center"
                  gutter
                  className="mt-7"
                >
                  {t('login.title', { ns: 'auth' })}
                </Typography>
                <Form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex justify-center"
                >
                  <div className="flex py-4 flex-col px-4 mb-10 gap-6 w-[624px]">
                    <div>
                      <Input
                        label={t('label.email', { ns: 'auth' })}
                        type="email"
                        placeholder={t('placeholder.email', { ns: 'auth' })}
                        error={
                          errors.email && (errors.email?.message as string)
                        }
                        // isUsedInForm={false}
                        isRequired
                        {...register('email')}
                      />
                    </div>

                    <div>
                      <Input
                        label={t('label.password', { ns: 'auth' })}
                        type="password"
                        placeholder={t('placeholder.password', { ns: 'auth' })}
                        // isUsedInForm={false}
                        error={
                          errors.password &&
                          (errors.password?.message as string)
                        }
                        isRequired
                        {...register('password')}
                      />
                    </div>

                    <Button
                      size="sm"
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-2"
                      loading={loading['login']}
                    >
                      {t('login.login', { ns: 'auth' })}
                    </Button>

                    <Link href="/forgot-password">
                      <a>
                        <Typography
                          className="text-red-500 hover:text-red-600"
                          weight="semibold"
                          align="center"
                          fontSize="text-sm"
                        >
                          {t('forgot_pass', { ns: 'auth' })}
                        </Typography>
                      </a>
                    </Link>
                    <Link href="/register">
                      <a>
                        <Typography
                          className="text-red-500 hover:text-red-600"
                          weight="semibold"
                          align="center"
                          fontSize="text-sm"
                        >
                          {t('register_member', { ns: 'auth' })}
                        </Typography>
                      </a>
                    </Link>
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

export default Login
