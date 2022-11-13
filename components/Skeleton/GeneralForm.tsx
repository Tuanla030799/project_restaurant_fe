import React from 'react'
import { Grid, Skeleton } from '@/components'

const GeneralForm = () => {
  return (
    <>
      <Grid spacing={24} row>
        <Grid column>
          <Skeleton width={100} variant="text" className="mb-1.5" />
          <Skeleton width={'100%'} height={42} variant="rounded" />
        </Grid>
        <Grid column>
          <Skeleton width={100} variant="text" className="mb-1.5" />
          <Skeleton width={'100%'} height={42} variant="rounded" />
        </Grid>
      </Grid>
      <Grid spacing={24} row>
        <Grid column>
          <Skeleton width={100} variant="text" className="mb-1.5" />
          <Skeleton width={'100%'} height={42} variant="rounded" />
        </Grid>
        <Grid column>
          <Skeleton width={100} variant="text" className="mb-1.5" />
          <Skeleton width={'100%'} height={42} variant="rounded" />
        </Grid>
      </Grid>
      <Grid spacing={24} row>
        <Grid column>
          <Skeleton width={100} variant="text" className="mb-1.5" />
          <Skeleton width={'100%'} height={160} variant="rounded" />
        </Grid>
        <Grid column>
          <Skeleton width={100} variant="text" className="mb-1.5" />
          <Skeleton width={'100%'} height={160} variant="rounded" />
        </Grid>
      </Grid>
    </>
  )
}

export default GeneralForm
