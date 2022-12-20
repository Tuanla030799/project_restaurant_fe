import { lazy, number, object, string } from 'yup'

export const validationSchema = lazy(() =>
  object().shape({
    name: string()
      .required('Please enter name')
      .min(2, 'Name must be at least 2 characters'),

    categoryId: number().nullable().required('Please select category'),

    type: string().nullable().required('Please select food type'),

    inventory: string().nullable().required('Please select inventory'),

    status: string().nullable().required('Please select status'),

    amount: number()
      .required('Please enter product quantity')
      .min(1, 'Amount must be at least 1')
      .max(999, 'mount must be at more 15'),

    price: number()
      .required('Please enter product quantity')
      .min(1000, 'Amount must be at least 1000đ')
  })
)
