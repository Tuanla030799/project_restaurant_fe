import { Breadcrumbs, Container, Typography } from '@/components'
import { routes } from '@/constants/routes'
import Wrapper from 'components/Wrapper'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { House } from 'phosphor-react'
import React from 'react'

const Login = () => {
  const { t } = useTranslation(['common', 'auth'])
  return (
    <div className="pt-1 bg-gray-100 h-screen">
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
                  fontSize="display-sm"
                  weight="semibold"
                  align="center"
                  gutter
                  className="mt-7"
                >
                  {t('login.title', { ns: 'auth' })}
                </Typography>
              </Container>
            </div>
          </>
        </Wrapper>
      </Container>
    </div>
  )
}

export default Login
