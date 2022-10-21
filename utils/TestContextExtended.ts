import { ObjectSchema, TestContext } from 'yup'

export type TestContextExtended<T> = {
  from: {
    schema: typeof ObjectSchema
    value: T
  }[]
} & TestContext
