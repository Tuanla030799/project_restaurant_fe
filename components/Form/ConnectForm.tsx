import React, { ReactElement } from 'react'
import { useFormContext, FieldValues, UseFormReturn } from 'react-hook-form'

type ConnectFormProps = FieldValues & {
  children(children: UseFormReturn): ReactElement
}

const ConnectForm: React.FunctionComponent<ConnectFormProps> = ({
  children,
}) => {
  const methods = useFormContext()

  return children({ ...methods })
}

export default ConnectForm
