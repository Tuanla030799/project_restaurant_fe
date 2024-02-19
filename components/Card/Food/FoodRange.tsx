import Image from 'next/image'
import { Minus, Plus, Trash } from 'phosphor-react'
import React, { forwardRef } from 'react'
import { FoodProps } from './food.type'
import {
  AspectRatio,
  Badge,
  Button,
  CustomLink,
  Input,
  Rating,
  Stack,
  Typography,
} from '@/components'
import { routes } from '@/constants/routes'
import { FoodInventory } from '@/models'
import DefaultThumbnail from '@/public/images/course_default_thumbnail.jpeg'
import { numberFormatPrice } from '@/utils'

const FoodRange = forwardRef<HTMLDivElement, FoodProps>(
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
      quantity,
      onHandleQuantity,
      deleteFood,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className="h-full flex shadow-md rounded-lg bg-white"
        ref={ref}
        // {...rest}
      >
        <div className="grow basis-1/3 p-2">
          <CustomLink href={routes.detailFood.generatePath(slug)}>
            <AspectRatio ratio={1}>
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="object-cover rounded-md"
                />
              ) : (
                <Image
                  layout="fill"
                  src={DefaultThumbnail}
                  alt={'title'}
                  className="object-cover rounded-md"
                />
              )}
            </AspectRatio>
          </CustomLink>
        </div>
        <div className="flex basis-2/3 flex-col  py-2 pr-2">
          <h2 className="grow line-clamp-2 text-lg text-gray-600 font-semibold text-left">
            <CustomLink href={routes.detailFood.generatePath(slug)}>
              {name}
            </CustomLink>
          </h2>
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

          {/* action */}
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center">
              <Button
                size="xs"
                variant="outlined"
                color="success"
                className="w-7 h-7"
                disabled={!quantity}
                onClick={() =>
                  onHandleQuantity && onHandleQuantity(id, 'minus')
                }
              >
                <Minus className="text-success-700" weight="bold" />
              </Button>
              <div className="w-10">
                <input
                  name=""
                  type="number"
                  value={quantity || 0}
                  className="w-full text-center outline-none text-gray-600 font-semibold bg-white"
                  disabled
                />
              </div>
              <Button
                size="xs"
                variant="outlined"
                color="success"
                className="w-7 h-7 p-0 "
                disabled={!quantity && Number(quantity) > 2}
                onClick={() => onHandleQuantity && onHandleQuantity(id, 'plus')}
              >
                <Plus className="text-success-700" weight="bold" />
              </Button>
            </div>
            {deleteFood ? (
              <Button
                size="xs"
                variant="outlined"
                color="error"
                className="w-7 h-7 p-0"
                disabled={!quantity && Number(quantity) > 2}
                onClick={() => deleteFood && deleteFood(id)}
              >
                <Trash className="text-red-700" weight="bold" />
              </Button>
            ) : inventory === FoodInventory.stocking ? (
              <Badge size="sm" color="success">
                {inventory?.toLowerCase()}
              </Badge>
            ) : (
              <Badge size="sm" color="error">
                {inventory?.toLowerCase()}
              </Badge>
            )}
          </div>
        </div>
      </div>
    )
  }
)

export default React.memo(FoodRange)
