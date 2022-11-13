import React, { useRef, useState } from 'react'
import clsx from 'clsx'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { Spinner, Stack } from '..'
import { slowLoading } from '@/utils'
import { useEffect } from 'react'
import { InView } from 'react-intersection-observer'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface IProps {
  url: string
  scale?: number
  isEnlarge?: boolean
}

const PreviewPdf = ({ url, scale = 1, isEnlarge }: IProps) => {
  const [numPages, setNumPages] = useState(null)
  const [totalPages, setTotalPages] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const pageRef = useRef<HTMLCanvasElement[]>([])

  useEffect(() => {
    if (numPages) {
      renderPages(numPages, 1)
    }
  }, [numPages])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  useEffect(() => {
    pageRef?.current[currentPage - 1]?.scrollIntoView()
    window.scrollBy(0, -200)
  }, [scale, isEnlarge])

  const renderPages = async (totalPages, startPage) => {
    const PAGES_LOAD_PER_TIME = 10
    const totalPagesNext =
      totalPages - startPage > PAGES_LOAD_PER_TIME
        ? PAGES_LOAD_PER_TIME
        : totalPages - startPage + 1
    const nextStartPage = startPage + totalPagesNext

    if (startPage >= totalPages) return

    const arr = [...Array(nextStartPage).keys()].slice(1)

    setTotalPages(arr)

    await slowLoading(1000)

    renderPages(totalPages, nextStartPage)
  }

  const handleClickPage = (index: number) => {
    setCurrentPage(index)
    pageRef.current[index - 1].scrollIntoView()
    window.scrollBy(0, -200)
  }

  return (
    <div className="flex items-stretch bg-gray-100">
      <div className="flex-1 m-8 w-0">
        <Document
          className="!w-full"
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <Stack align="center">
              <Spinner size="sm" />
            </Stack>
          }
        >
          {totalPages.map((pageNumber, index) => (
            <InView
              as="div"
              onChange={(inView) => {
                inView &&
                  totalPages.length === numPages &&
                  setCurrentPage(pageNumber)
              }}
              threshold={0.3}
            >
              <Page
                key={pageNumber}
                pageNumber={pageNumber}
                className="child-all:mx-auto mb-8 p-8 bg-white overflow-auto"
                scale={scale}
                loading={null}
                canvasRef={(el) => {
                  pageRef.current[index] = el
                }}
              />{' '}
            </InView>
          ))}
        </Document>
      </div>
      <div className="sticky top-20 h-screen w-60 mr-12 bg-white">
        <div className="absolute h-full p-5 overflow-y-auto overflow-x-hidden">
          <Document
            file={url}
            loading={
              <Stack align="center">
                <Spinner size="sm" />
              </Stack>
            }
          >
            {totalPages.map((pageNumber) => (
              <Page
                key={pageNumber}
                className={clsx('border-[1px] border-gray-300 mb-4', {
                  'border-primary-400': currentPage === pageNumber,
                })}
                pageNumber={pageNumber}
                width={200}
                loading={null}
                onClick={() => handleClickPage(pageNumber)}
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  )
}

export default PreviewPdf
