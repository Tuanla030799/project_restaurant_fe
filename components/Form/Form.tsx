import React, { ReactNode } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

interface IFormProps extends React.HTMLAttributes<HTMLFormElement> {
  onSubmit?: (data: any) => void
  children: ReactNode
  className?: string
  defaultValueForm?: Record<string, any>
}

const Form = ({
  onSubmit,
  className,
  defaultValueForm,
  ...rest
}: IFormProps) => {
  const methods = useForm({
    defaultValues: defaultValueForm,
  })
  const {
    handleSubmit,
    formState: { isSubmitting: isSubmitting },
  } = methods

  const handleSubmitForm = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()

    if (isSubmitting) return
    return handleSubmit(onSubmit as SubmitHandler<any>)()
  }

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={onSubmit && handleSubmitForm}
        {...rest}
      />
    </FormProvider>
  )
}

export default Form
