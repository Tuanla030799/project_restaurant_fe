import React from 'react'
import { Stack } from '@/components'
import Skeleton from './Skeleton'

const QuestionForm = () => {
  return (
    <div className="bg-white rounded px-6 pt-8 pb-6">
      <Stack direction="column" align="stretch" spacing={30}>
        <Stack justify="flex-end">
          <Skeleton width={88} height={42} variant="rounded" />
        </Stack>
        <div className="relative">
          <div className="bg-gray-50 border-b border-dashed outline-none font-semibold border-gray-400 text-left">
            <Skeleton width={'100%'} height={42} variant="rectangular" />
          </div>
        </div>
        <Stack direction="column" align="stretch" spacing={20}>
          <Stack justify="flex-end">
            <Skeleton width={40} height={40} variant="rectangular" />
            <Skeleton width={240} height={40} variant="rounded" />
          </Stack>
          <Stack direction="column" align="stretch">
            <div className="border border-transparent px-6 py-4 bg-gray-50 rounded-lg outline-none">
              <Stack justify="space-between">
                <Skeleton width={20} height={20} variant="rounded" />
                <div className="grow">
                  <Skeleton width={150} height={40} variant="text" />
                </div>
                <Skeleton width={40} height={40} variant="rectangular" />
              </Stack>
            </div>
            <div className="border border-transparent px-6 py-3 bg-gray-50 rounded-lg outline-none">
              <Stack justify="space-between">
                <Skeleton width={20} height={20} variant="rounded" />
                <div className="grow">
                  <Skeleton width={150} height={40} variant="text" />
                </div>
                <Skeleton width={40} height={40} variant="rectangular" />
              </Stack>
            </div>
          </Stack>
          <div className="bg-gray-50 border-l-4 border-primary-300 rounded-md py-3 px-6">
            <Skeleton width={100} variant="text" />
            <Skeleton width={150} variant="text" />
          </div>
        </Stack>
      </Stack>
    </div>
  )
}

export default QuestionForm
