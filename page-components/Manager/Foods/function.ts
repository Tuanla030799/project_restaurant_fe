import { lazy, number, object, string } from 'yup'

export const validationSchema = lazy(() =>
  object().shape({
    name: string()
      .required('Please enter name')
      .min(5, 'Name must be at least 5 characters'),

    categoryId: number().nullable(),

    type: number().nullable(),

    inventory: number().nullable(),

    image: number().nullable(),

    status: number().nullable(),

    amount: number()
      .required('Please enter product quantity')
      .min(1, 'Amount must be at least 1')
      .max(999, 'mount must be at more 15'),
  })
)
