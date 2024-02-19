import Image from 'next/image'
import React, { forwardRef } from 'react'
import { CategoriesProps } from './Categories.type'
import { AspectRatio, CustomLink, Typography } from '@/components'
import { routes } from '@/constants/routes'

const Categories = forwardRef<HTMLDivElement, CategoriesProps>(
  ({ id, slug, name, thumbnail, ...rest }, ref) => {
    return (
      <div className="border rounded-md transition duration-150 ease-out hover:ease-in hover:shadow-xl hover:border-none p-6">
        <CustomLink href={routes.listFood.generatePath(slug)}>
          <div
            className="h-full flex flex-col"
            ref={ref}
            // {...rest}
          >
            <div className="flex justify-center">
              <AspectRatio ratio={1} className="relative w-[50px]">
                <img src={thumbnail} alt={name} className="object-cover" />
              </AspectRatio>
            </div>
            <Typography
              transform="capitalize"
              weight="semibold"
              variant="p"
              fontSize="text-xs"
              align="center"
              className="mt-1 mb-3"
            >
              {name}
            </Typography>
          </div>
        </CustomLink>
      </div>
    )
  }
)

export default React.memo(Categories)
