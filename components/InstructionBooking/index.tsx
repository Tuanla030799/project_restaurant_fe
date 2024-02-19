import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import InstructionBookingImg from '@/public/images/intruction-booking.png'
import { Typography } from 'components/Typography'
import Wrapper from 'components/Wrapper'

const InstructionBooking = () => {
  return (
    <>
      <Typography
        variant="h1"
        fontSize="text-lg"
        weight="semibold"
        align="center"
        gutter
        className="mt-7"
      >
        Hướng dẫn đặt bàn ưu đãi
      </Typography>
      <hr className="my-4 mx-auto w-[120px] border-top-1" />
      <Link href="/register">
        <a>
          <Typography
            fontSize="text-sm"
            align="center"
            gutter
            className="text-blue-500 hover:text-blue-600"
          >
            Xem chi tiết hướng dẫn tại đây
          </Typography>
        </a>
      </Link>
      <div className="px-[70px] py-4">
        <Image
          layout="responsive"
          src={InstructionBookingImg}
          alt="InstructionBookingImg"
          className="object-cover"
        />
      </div>
    </>
  )
}

export default InstructionBooking
