import clsx from 'clsx'
import { ArrowLeft, ArrowRight, DotsThree } from 'phosphor-react'
import React, { forwardRef } from 'react'
import { Button } from '..'
import { PaginationProps } from './Pagination.types'

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      totalItems,
      pageSize,
      currentPage,
      className,
      activeClassName,
      onChange,
      ...rest
    },
    ref
  ) => {
    const pageCount = Math.ceil(totalItems / pageSize)

    const getPages = (start: number, end: number) => {
      const length = end - start + 1
      return Array.from({ length }, (_, index) => index + start)
    }

    const getPaginate = () => {
      const dots = 'dots'

      if (pageCount <= 6) {
        return getPages(1, pageCount)
      }

      if (currentPage > 3 && currentPage < pageCount - 2) {
        const middlePage = getPages(currentPage - 1, currentPage + 1)
        return [1, dots, ...middlePage, dots, pageCount]
      } else {
        const leftPage = getPages(1, 3)
        const rightPage = getPages(pageCount - 2, pageCount)
        return [...leftPage, dots, ...rightPage]
      }
    }

    return (
      <div
        className={clsx('flex justify-between pt-5', className)}
        ref={ref}
        {...rest}
      >
        <Button
          variant="text"
          color="gray"
          disabled={currentPage === 1}
          leading={<ArrowLeft />}
          onClick={() => onChange(currentPage - 1)}
        >
          Previous
        </Button>
        <ul className="flex items-center gap-1">
          {getPaginate()?.map((item, index) => {
            if (item === 'dots')
              return (
                <li key={index}>
                  <Button key={index} variant="text" color="gray" onlyIcon>
                    <DotsThree />
                  </Button>
                </li>
              )
            return (
              <li key={index}>
                <Button
                  variant="text"
                  color="gray"
                  onClick={() => onChange(+item)}
                  className={clsx(
                    item === currentPage
                      ? activeClassName
                        ? activeClassName
                        : '!bg-gray-50'
                      : '!text-gray-500'
                  )}
                >
                  {item}
                </Button>
              </li>
            )
          })}
        </ul>
        <Button
          variant="text"
          color="gray"
          disabled={currentPage === pageCount}
          trailing={<ArrowRight />}
          onClick={() => onChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    )
  }
)

export default Pagination
