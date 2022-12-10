import { AspectRatio } from 'components/AspectRatio'
import { Button } from 'components/Button'
import { Typography } from 'components/Typography'
import Image from 'next/image'
import { CaretCircleLeft, CaretCircleRight } from 'phosphor-react'
import { useState } from 'react'
import Swipe from 'react-easy-swipe'

/**
 * Carousel component for nextJS and Tailwind.
 * Using external library react-easy-swipe for swipe gestures on mobile devices (optional)
 *
 * @param images - Array of images with src and alt attributes
 * @returns React component
 */
export default function Carousel({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNextSlide = () => {
    let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1
    setCurrentSlide(newSlide)
  }

  const handlePrevSlide = () => {
    let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1
    setCurrentSlide(newSlide)
  }
  return (
    <div className="relative">
      <CaretCircleLeft
        onClick={handlePrevSlide}
        className="absolute left-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-800 z-20"
        size={32}
        weight="fill"
      />
      <AspectRatio
        ratio={16 / 7}
        className="flex overflow-hidden relative m-auto"
      >
        <Swipe
          onSwipeLeft={handleNextSlide}
          onSwipeRight={handlePrevSlide}
          className="relative z-10 w-full h-full"
        >
          {images.map((image, index) => {
            if (index === currentSlide) {
              return (
                <Image
                  key={index}
                  src={image}
                  layout="fill"
                  objectFit="cover"
                  // className="animate-pulse"
                />
              )
            }
          })}
        </Swipe>
      </AspectRatio>
      <CaretCircleRight
        onClick={handleNextSlide}
        className="absolute right-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-800 z-20"
        size={32}
        weight="fill"
      />

      <div className="absolute flex justify-center p-2 bottom-0 left-[50%] translate-x-[-50%] m-auto z-20">
        {images.map((_, index) => {
          return (
            <div
              className={
                index === currentSlide
                  ? 'h-4 w-4 bg-gray-700 rounded-full mx-2 mb-2 cursor-pointer'
                  : 'h-4 w-4 bg-gray-300 rounded-full mx-2 mb-2 cursor-pointer'
              }
              key={index}
              onClick={() => {
                setCurrentSlide(index)
              }}
            />
          )
        })}
      </div>
      <div className="absolute flex justify-center p-2 bottom-[10px] right-10 m-auto z-20">
        <Button
          as="a"
          size="sm"
          color="success"
          variant="contained"
          className="rounded animate-bounce"
        >
          <Typography fontSize="text-sm" align="center" weight="semibold">
            Đặt bàn ngay
          </Typography>
        </Button>
      </div>
    </div>
  )
}
