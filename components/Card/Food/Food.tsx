import React from 'react'
import {
  AspectRatio,
  Badge,
  Button,
  CustomLink,
  Rating,
  Stack,
  Typography,
} from '@/components'
import { routes } from '@/constants/routes'
import DefaultThumbnail from '@/public/images/course_default_thumbnail.jpeg'
import Image from 'next/image'
import { ChatCircleDots, CookingPot, ThumbsUp } from 'phosphor-react'

const Food = () => {
  return (
    <div className="h-full flex flex-col shadow-md rounded-lg bg-white">
      <div className="w-full">
        <CustomLink href={routes.detailFood.generatePath('slug')}>
          <AspectRatio ratio={16 / 9} className="relative">
            {/* {thumbnail ? (
              <img src={thumbnail.url} alt={title} />
            ) : ( */}
            <Image
              layout="fill"
              src={DefaultThumbnail}
              alt={'title'}
              className="object-cover rounded-t-lg"
            />
            <Badge
              size="sm"
              color="error"
              className="absolute z-elevate bottom-3 right-4"
            >
              bán hết
            </Badge>
            {/* )} */}
          </AspectRatio>
        </CustomLink>
      </div>
      <div className="flex flex-col grow p-4">
        <div className="flex items-center mb-3">
          <span className="inline-block bg-success-500 rounded-full w-1 h-1 mr-1.5"></span>
          <div className="text-xs text-gray-500 font-medium truncate">
            <span className="ml-1">{'đồ nhậu,'}</span>
            <span className="ml-1">{'món chính'}</span>
          </div>
        </div>
        <h2 className="grow line-clamp-2 text-lg text-gray-700 font-bold mb-3 truncate">
          <CustomLink href={routes.detailFood.generatePath('slug')}>
            Gà Luộc & Gà Ủ Muối Thanh Mai - Trần Thái Tông
          </CustomLink>
        </h2>
        <h6 className="grow line-clamp-2 text-xs text-gray-500 font-regular mb-3 ">
          Chân gà hấp tàu xì, Gân hươu sốt nấm Đông Cô, Ba chỉ quay giòn bì, Xá
          xíu quay Quảng Đông, Sườn vị tỏi HongKong, Há cảo sò điệp, Bánh bao
          kim sa Đài Bắc, Vịt quay Quảng Đông, Đậu bò
        </h6>
        <Stack spacing={12} justify="space-between" className="mb-3">
          <Rating defaultValue={5} size="xs" readOnly />
          <div className="flex items-center">
            <span className="mr-1 text-xs text-gray-500 line-through">
              50.000đ
            </span>
            <Badge size="sm" color="gray" className="text-xs">
              53.250đ
            </Badge>
          </div>
        </Stack>
        {/* like */}
        <div className="flex flex-wrap items-center mb-3">
          <div className="flex items-center gap-2">
            <ThumbsUp className="text-green-400" size={16} />
            <span className="text-xs text-gray-700 font-semibold">2</span>
          </div>

          <span className="text-xs text-gray-300 mx-2">|</span>

          <div className="flex items-center gap-2">
            <ChatCircleDots className="text-blue-400" size={16} />
            <span className="text-xs text-gray-700 font-semibold">0</span>
          </div>

          <span className="text-xs text-gray-300 mx-2">|</span>

          <div className="flex items-center gap-2">
            <CookingPot className="text-violet-500" size={16} />
            <span className="text-xs text-gray-700 font-semibold">999</span>
          </div>
        </div>
        {/* action */}
        <div className="flex justify-end items-center gap-2">
          <Button as="a" size="xs" variant="contained" className="rounded-3xl">
            <Typography fontSize="text-xs" align="center">
              Đặt bàn ngay
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Food
