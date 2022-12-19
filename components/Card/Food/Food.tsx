import React, { forwardRef } from 'react'
import {
  AspectRatio,
  Badge,
  Button,
  CustomLink,
  Dropdown,
  Menu,
  MenuItem,
  Rating,
  Stack,
  Typography,
} from '@/components'
import { routes } from '@/constants/routes'
import DefaultThumbnail from '@/public/images/course_default_thumbnail.jpeg'
import Image from 'next/image'
import {
  ChatCircleDots,
  CookingPot,
  DotsThreeOutlineVertical,
  GearSix,
  GlobeHemisphereWest,
  PencilSimpleLine,
  Prohibit,
  ThumbsUp,
} from 'phosphor-react'
import { FoodProps } from './food.type'
import { FoodInventory, FoodStatus } from '@/models'
import { numberFormatPrice } from '@/utils'
import router from 'next/router'
import { useTranslation } from 'next-i18next'

const Food = forwardRef<HTMLDivElement, FoodProps>(
  (
    {
      id,
      slug,
      title,
      name,
      image,
      content,
      discount,
      inventory,
      liked,
      price,
      rating,
      soldQuantity,
      status,
      summary,
      type,
      changeStatus,
      isManagement = false,
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation(['manager', 'common'])
    return (
      <div
        className="h-full flex flex-col shadow-md rounded-lg bg-white"
        ref={ref}
        // {...rest}
      >
        <div className="w-full">
          <CustomLink href={routes.detailFood.generatePath('slug')}>
            <AspectRatio ratio={16 / 9} className="relative">
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="object-cover rounded-t-lg"
                />
              ) : (
                <Image
                  layout="fill"
                  src={DefaultThumbnail}
                  alt={'title'}
                  className="object-cover rounded-t-lg"
                />
              )}
              {inventory === FoodInventory.stocking ? (
                <Badge
                  size="sm"
                  color="success"
                  className="absolute z-elevate bottom-3 right-4"
                >
                  {inventory?.toLowerCase()}
                </Badge>
              ) : (
                <Badge
                  size="sm"
                  color="error"
                  className="absolute z-elevate bottom-3 right-4"
                >
                  {inventory?.toLowerCase()}
                </Badge>
              )}
            </AspectRatio>
          </CustomLink>
        </div>
        <div className="flex flex-col grow p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="inline-block bg-success-500 rounded-full w-1 h-1 mr-1.5"></span>
              <div className="text-xs text-gray-500 font-medium truncate">
                <span className="ml-1">{'đồ nhậu,'}</span>
                <span className="ml-1">{type?.toLowerCase()}</span>
              </div>
            </div>
            {isManagement && (
              <Dropdown
                className="inline-flex shrink-0 ml-1.5 -mr-1.5"
                overlay={
                  <Menu maxWidth={160} placement="bottom-right">
                    <>
                      <MenuItem onClick={() => null}>
                        <Stack spacing={12}>
                          <PencilSimpleLine
                            size={20}
                            className="text-primary-400"
                          />
                          <span>{t('action.edit', { ns: 'common' })}</span>
                        </Stack>
                      </MenuItem>
                    </>
                    <>
                      {isManagement && (
                        <MenuItem
                          onClick={() =>
                            changeStatus && status && changeStatus(id, status)
                          }
                        >
                          {status === FoodStatus.hide ? (
                            <Stack spacing={12}>
                              <GlobeHemisphereWest
                                size={20}
                                className="text-primary-400"
                              />
                              <span>
                                {t('action.publish', { ns: 'common' })}
                              </span>
                            </Stack>
                          ) : (
                            <Stack spacing={12}>
                              <Prohibit
                                size={20}
                                className="text-primary-400"
                              />
                              <span>{t('action.hide', { ns: 'common' })}</span>
                            </Stack>
                          )}
                        </MenuItem>
                      )}
                    </>
                  </Menu>
                }
              >
                <Button variant="text" size="xs" color="gray" onlyIcon>
                  <DotsThreeOutlineVertical weight="fill" size={20} />
                </Button>
              </Dropdown>
            )}
          </div>
          <h2 className="grow line-clamp-2 text-lg text-gray-700 font-bold mb-3">
            <CustomLink href={routes.detailFood.generatePath(slug)}>
              {name}
            </CustomLink>
          </h2>
          <h6 className="grow line-clamp-2 text-xs text-gray-500 font-regular mb-3 ">
            {summary}
          </h6>
          <Stack spacing={12} justify="space-between" className="mb-3">
            <Rating defaultValue={rating ? rating : 0} size="xs" readOnly />
            <div className="flex items-center">
              <span className="mr-1 text-xs text-gray-500 line-through">
                {numberFormatPrice(Number(price))}
              </span>
              <Badge size="sm" color="gray" className="text-xs">
                {numberFormatPrice(
                  Number(price) - Number(price) * Number(discount)
                )}
              </Badge>
            </div>
          </Stack>
          {/* like */}
          <div className="flex flex-wrap items-center mb-3">
            <div className="flex items-center gap-2">
              <ThumbsUp className="text-green-400" size={16} />
              <span className="text-xs text-gray-700 font-semibold">
                {liked ? liked : 0}
              </span>
            </div>

            <span className="text-xs text-gray-300 mx-2">|</span>

            <div className="flex items-center gap-2">
              <ChatCircleDots className="text-blue-400" size={16} />
              <span className="text-xs text-gray-700 font-semibold">
                {liked ? liked : 0}
              </span>
            </div>

            <span className="text-xs text-gray-300 mx-2">|</span>

            <div className="flex items-center gap-2">
              <CookingPot className="text-violet-500" size={16} />
              <span className="text-xs text-gray-700 font-semibold">
                {soldQuantity ? soldQuantity : 0}
              </span>
            </div>
          </div>
          {/* action */}
          <div className="flex justify-end items-center gap-2">
            {!isManagement ? (
              <Button
                as="a"
                size="xs"
                variant="contained"
                className="rounded-3xl"
                href={routes.orders.generatePath()}
              >
                <Typography fontSize="text-xs" align="center">
                  Đặt bàn ngay
                </Typography>
              </Button>
            ) : status === FoodStatus.hide ? (
              <Badge size="sm" color="error">
                {status}
              </Badge>
            ) : (
              <Badge size="sm" color="success">
                {status}
              </Badge>
            )}
          </div>
        </div>
      </div>
    )
  }
)

export default React.memo(Food)
