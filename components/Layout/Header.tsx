import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Button,
  CustomLink,
  Dropdown,
  Logo,
  Form,
  Menu,
  MenuDivider,
  MenuItem,
  SearchInput,
  Stack,
} from '@/components'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useLocalStorage } from '@/hooks'
import { KEY_INPUT_SEARCH_HEADER } from '@/constants/keyLocalStorage'
import {
  Bell,
  BookBookmark,
  CaretDown,
  ChartLine,
  DotsNine,
  GearSix,
  House,
  LockKeyOpen,
  SignIn,
  SignOut,
  User,
} from 'phosphor-react'
import { getUrlFromNestedObject } from '@/utils'
import { routes } from '@/constants/routes'
import AvatarImgDefault from 'public/images/avatar.png'
import { useHeaderData } from '@/lib/header'
import Link from 'next/link'

const SearchInputWithFilter = () => {
  const [inputSearch, setInputSearch] = useState<string>()
  const [valueLocalStorage, setValueLocalStorage] = useLocalStorage<string>(
    KEY_INPUT_SEARCH_HEADER,
    ''
  )

  const { setValue } = useFormContext()
  const { t } = useTranslation('common')
  const router = useRouter()

  const options = [
    { value: 'title', label: t('filter.foodName') },
    { value: 'food_type', label: t('filter.foodType') },
    { value: 'categories_name', label: t('filter.category') }
  ]

  const defaultOption =
    options.find(({ value }) => router.asPath.includes(value)) || options[0]

  useEffect(() => {
    setValue('filter_by', defaultOption.value)
    router.asPath.includes(defaultOption.value) &&
      setInputSearch(valueLocalStorage)
  }, [])

  const handleFilter = (option) => {
    setValue('filter_by', option.value)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setInputSearch(value)
    setValueLocalStorage(value)
  }
  return (
    <SearchInput
      size="md"
      placeholder={t('header.search')}
      hasFilter
      value={inputSearch}
      options={options}
      defaultOption={defaultOption}
      onFilter={handleFilter}
      name="query"
      onChange={handleChange}
    />
  )
}

const Header = () => {
  const { t } = useTranslation('common')
  const { profile } = useHeaderData()

  const router = useRouter()
  const subMenuAccounts = profile
    ? [
        { url: '/', label: t('header.accounts_dropdown.profile'), icon: User },
        {
          url: '/',
          label: t('header.accounts_dropdown.my_courses'),
          icon: BookBookmark,
        },
        {
          url: '/',
          label: t('header.accounts_dropdown.management'),
          icon: House,
        },
        {
          url: '/',
          label: t('header.accounts_dropdown.dashboard'),
          icon: ChartLine,
        },
        {
          url: '/',
          label: t('header.accounts_dropdown.settings'),
          icon: GearSix,
        },
        { url: '/', label: t('header.accounts_dropdown.logout'), icon: SignOut },
      ]
    : [
        {
          url: '/login',
          label: t('header.sign_in'),
          icon: SignIn,
        },
        {
          url: '/register',
          label: t('header.sign_up'),
          icon: LockKeyOpen,
        },
      ]

  const onSubmit = (data) => {
    const { query, filter_by } = data

    const params = {
      q: {
        [`${filter_by}_cont`]: query && encodeURIComponent(query.trim()),
      },
    }

    router.push(
      routes.explore.generatePath() + '?' + getUrlFromNestedObject(params),
      undefined,
      {
        shallow: true,
      }
    )
  }

  return (
    <header className="h-header bg-white px-8 py-4 border-b border-gray-300">
      <div className="flex items-center justify-between">
        <div className="flex  grow pr-4 items-center">
          <Logo className="mr-12" />
          <Form
            onSubmit={onSubmit}
            className="w-full max-w-[440px] lg:block hidden"
          >
            <SearchInputWithFilter />
          </Form>
        </div>
        <nav className="flex items-center">
          <Stack spacing={16} wrap="nowrap" className="md:flex hidden">
            <CustomLink
              type="underlined"
              href="/"
              className="hover:text-red-500"
            >
              Home
            </CustomLink>
            <CustomLink
              type="underlined"
              href="/foods"
              className="hover:text-red-500"
            >
              Foods
            </CustomLink>
            <CustomLink
              type="underlined"
              href="/blog"
              className="hover:text-red-500"
            >
              Blogs
            </CustomLink>
            <CustomLink
              type="underlined"
              href="/about"
              className="hover:text-red-500"
            >
              About Us
            </CustomLink>
          </Stack>
          <Dropdown
            className="md:inline-flex md:flex-shrink-0 ml-4 hidden"
            preventClose={true}
            overlay={
              <Menu maxWidth={200}>
                <MenuItem>
                  <div>Service 1</div>
                  <div>Service 2</div>
                </MenuItem>
                <MenuItem>
                  <div>Service 3</div>
                  <div>Service 4</div>
                </MenuItem>
              </Menu>
            }
          >
            <Button color="gray" variant="text" size="sm" onlyIcon>
              <DotsNine size={24} weight="bold" />
            </Button>
          </Dropdown>
          <div className="w-px h-4 bg-gray-400 mx-8 sm:block hidden"></div>
          <div className="flex items-center gap-4">
            <Bell size={24} />
            <Dropdown
              className="inline-flex shrink-0"
              preventClose={false}
              overlay={
                <Menu className="mt-[10px]" maxWidth={240}>
                  {profile ? (
                    <div className="flex gap-2.5 items-center px-[16px] py-[12px]">
                      <Avatar
                        className="select-none relative flex-none"
                        src={profile?.avatar || AvatarImgDefault.src}
                        size="sm"
                        status="online"
                      />
                      <div>
                        <h6 className="font-medium text-sm">
                          {t('header.user_name')}
                        </h6>
                        <span className="text-xs text-gray-500 line-clamp-3">
                          {profile?.email}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2.5 items-center px-[16px] py-[12px]"></div>
                  )}
                  <MenuDivider className="my-[0px]" />
                  {subMenuAccounts
                    .filter(Boolean)
                    .map(({ url, label, icon: Icon }, index) => (
                      <MenuItem className="cursor-pointer" key={index}>
                        <Link href={url}>
                          <a className="flex gap-4 justify-start items-center">
                            <Icon size={20} />
                            <span className="text-sm">{label}</span>
                          </a>
                        </Link>
                      </MenuItem>
                    ))}
                </Menu>
              }
            >
              <div className="cursor-pointer flex items-center gap-2">
                <Avatar
                  className="select-none"
                  src={profile?.avatar || AvatarImgDefault.src}
                  size="xs"
                />

                {profile ? (
                  <span className="font-medium">{`${profile?.firstName} ${profile?.lastName}`}</span>
                ) : (
                  <span className="font-medium"> Tài khoản </span>
                )}
                <CaretDown size={16} />
              </div>
            </Dropdown>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
