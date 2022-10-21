import { useCallback, useState } from 'react'

const HEADER_HEIGHT = 96

const usePaginate = (
  initialState: number = 1,
  offsetTop = HEADER_HEIGHT
): [number, (page) => void] => {
  const [currentPage, setCurrentPage] = useState<number>(initialState)

  const handlePaginate = useCallback((page: number) => {
    setCurrentPage(page)

    setTimeout(
      () =>
        window.scrollTo({
          top: offsetTop,
          left: 0,
          behavior: 'smooth',
        }),
      0
    )
  }, [])

  return [currentPage, handlePaginate]
}

export default usePaginate
