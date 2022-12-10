import { axios } from '@/lib/axios'
import { Category } from '@/models'
import useSWR from 'swr'

type response = {
  data: Category[]
}

export const useCategories = () => {
  return useSWR<response, any>(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    axios
  )
}

// export const useInfiniteCategories = ({
//   name = '',
//   items = CATEGORIES_PER_REQUEST,
// }) => {
//   const {
//     data: dataFetched,
//     size,
//     error,
//     isValidating,
//     ...props
//   } = useSWRInfinite(
//     (pageIndex, previousPageData) => {
//       if (previousPageData && !previousPageData.data.categories.length)
//         return null

//       const searchParams = new URLSearchParams()
//       searchParams.set('page', pageIndex + 1 + '')
//       searchParams.set('items', items + '')

//       if (name) searchParams.set('name', name)

//       return `${
//         process.env.NEXT_PUBLIC_API_URL
//       }/manager/categories?${searchParams.toString()}`
//     },
//     axios,
//     { initialSize: 1 }
//   )

//   let data, total, messages

//   if (dataFetched) {
//     data = dataFetched.map(({ data }) => data.categories).flat()
//     total = dataFetched[0].data.total
//     messages = dataFetched[0].messages
//   }

//   const isLoadingInitialData = !data && !error
//   const isLoadingMore =
//     isLoadingInitialData ||
//     (size > 0 && dataFetched && typeof dataFetched[size - 1] === 'undefined')
//   const isEmpty = dataFetched?.length === 0
//   const isReachingEnd =
//     isEmpty ||
//     (dataFetched &&
//       dataFetched[dataFetched.length - 1]?.data.categories?.length < items)
//   const isRefreshing =
//     isValidating && dataFetched && dataFetched.length === size

//   return {
//     data,
//     total,
//     messages,
//     error,
//     size,
//     isEmpty,
//     isLoadingMore,
//     isReachingEnd,
//     isRefreshing,
//     ...props,
//   }
//}
