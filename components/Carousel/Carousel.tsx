import react, { useState } from 'react'
import { routes } from '@/constants/routes'
import { AspectRatio } from 'components/AspectRatio'
import { Button } from 'components/Button'
import { Typography } from 'components/Typography'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
}

/**
 * Carousel component for nextJS and Tailwind.
 * Using external library react-easy-swipe for swipe gestures on mobile devices (optional)
 *
 * @param images - Array of images with src and alt attributes
 * @returns React component
 */
export default function Carousel({ images }) {
  return (
    <div className="relative">
      <AspectRatio ratio={16 / 7}>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="relative z-10 w-full h-full"
        >
          {images.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <Image src={image} layout="fill" objectFit="cover" />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </AspectRatio>
      <div className="absolute flex justify-center p-2 bottom-[10px] right-10 m-auto z-20">
        <Button
          as="a"
          size="sm"
          color="success"
          variant="contained"
          className="rounded animate-bounce"
          href={routes.orders.generatePath()}
        >
          <Typography fontSize="text-sm" align="center" weight="semibold">
            Đặt bàn ngay
          </Typography>
        </Button>
      </div>
    </div>
  )
}
