import React from 'react'
import { Button, Container, Stack, Typography } from '@/components'
import Link from 'next/link'
import { FacebookLogo, YoutubeLogo, TwitterLogo, Share } from 'phosphor-react'

const Footer = () => {
  return (
    <footer className="px-4 py-10 border-t border-gray-200 bg-white shadow">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-32">
          <Stack direction="column">
            <Stack>
              <Link href="./">
                <a className="">FastFood</a>
              </Link>
            </Stack>
            <Typography fontSize="text-sm" className="text-gray-400 pt-3">
              FastFood là nhà hàng NGON, đa dạng, uy tín và chất lượng. Giúp thực
              khách đặt bàn dễ dàng, được tặng kèm ưu đãi mà không cần mua Deal,
              Voucher. Giải pháp đột phá mới cho câu chuyện ăn gì, ở đâu!
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="h3" className="font-bold">
              Về FastFood
            </Typography>
            <Stack className="mt-3" align="flex-start" direction="column">
              <Link href="./">
                <a className="text-gray-400 text-sm hover:text-red-500">
                  Những điều thú vị về App PasGo – Có thể bạn chưa biết!
                </a>
              </Link>
              <Link href="./">
                <a className="text-gray-400 text-sm hover:text-red-500">
                  Vì sao PasGo đang phát triển!
                </a>
              </Link>
              <Link href="./">
                <a className="text-gray-400 text-sm hover:text-red-500">
                  Hướng dẫn đặt bàn
                </a>
              </Link>
              <Link href="./">
                <a className="text-gray-400 text-sm hover:text-red-500">
                  Chính sách bảo mật
                </a>
              </Link>
            </Stack>
          </Stack>
          <Stack direction="column">
            <Typography variant="h3" className="font-bold">
              Tương tác
            </Typography>
            <Stack className="mt-3" align="flex-start" direction="column">
              <Link href="./">
                <a className="text-gray-400 text-sm hover:text-red-500">
                  Khiếu nại
                </a>
              </Link>
              <Link href="./">
                <a className="text-gray-400 text-sm hover:text-red-500">
                  Câu hỏi thường gặp
                </a>
              </Link>
              <Link href="./">
                <a className="text-gray-400 text-sm hover:text-red-500">
                  Dành cho nhà hàng
                </a>
              </Link>
              <Link href="./">
                <a className="text-gray-400 text-sm hover:text-red-500">
                  Tin tức
                </a>
              </Link>
              <Link href="./">
                <a className="text-gray-400 text-sm hover:text-red-500">
                  Liên hệ
                </a>
              </Link>
            </Stack>
          </Stack>
          <Stack direction="column">
            <Typography variant="h3" className="font-bold">
              Tham gia với chúng tôi
            </Typography>
            <Stack className="mt-3" spacing={8}>
              <Button
                size="xs"
                onlyIcon
                color="gray"
                variant="link"
                as="a"
                link="./"
              >
                <FacebookLogo size={40} weight="fill" color="#1b74e4" />
              </Button>

              <Button
                size="xs"
                onlyIcon
                color="gray"
                variant="link"
                as="a"
                link="./"
              >
                <YoutubeLogo size={40} weight="fill" color="#cc0000" />
              </Button>
              <Button
                size="xs"
                onlyIcon
                color="gray"
                variant="link"
                as="a"
                link="./"
              >
                <TwitterLogo size={40} weight="fill" color="#1b74e4" />
              </Button>
            </Stack>
            <Typography variant="h3" className="font-bold">
              Thương hiệu được chứng nhận
            </Typography>
            <Stack className="mt-3" spacing={8}>
              <Button
                size="xs"
                onlyIcon
                color="gray"
                variant="link"
                as="a"
                link="./"
              >
                <TwitterLogo size={40} weight="fill" color="#1b74e4" />
              </Button>
            </Stack>
          </Stack>
        </div>
        <Typography variant="h3" className="font-semibold mt-8 mb-4">
          © Copyright 2010 PasGo.jsc, All rights reserved
        </Typography>
        <Link href="./">
          <a className="text-blue-700 text-sm">Công ty cổ phần FastFood</a>
        </Link>
        <Typography className="mt-2.5 text-xs text-gray-400">
          Mã số doanh nghiệp: 0106329034 do Sở Kế hoạch đầu tư TP Hà Nội cấp
          ngày 08/10/2013
        </Typography>
        <Typography className="mt-2.5 text-xs text-gray-400">
          Văn Phòng TP.HCM: Lầu 13, Tòa nhà M-H, Số 728-730 Võ Văn Kiệt, P.1,
          Quận 5, TP Hồ Chí Minh
        </Typography>
        <Typography className="mt-2.5 text-xs text-gray-400">
          Tổng đài: 1900 6005 | Email:
          <span className="text-primary-500">CSKH@pasgo.vn</span>
        </Typography>
        <Typography className="mt-2.5 text-xs text-gray-400">
          Mã số doanh nghiệp: 0106329034 do Sở Kế hoạch đầu tư TP Hà Nội cấp
          ngày 08/10/2013
        </Typography>
        <Typography className="mt-2.5 text-xs text-black">
          Mọi ý tưởng, đóng góp của bạn đều được chúng tôi ghi nhận và trân
          trọng!
        </Typography>
        <div>
          <Button
            color="success"
            leading={<Share size={20} />}
            size="xs"
            className="mt-4 rounded-full"
          >
            Gửi đóng góp
          </Button>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
