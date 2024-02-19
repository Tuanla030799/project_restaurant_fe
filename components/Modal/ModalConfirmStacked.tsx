import React, { ComponentProps } from 'react'
import ModalConfirm from './ModalConfirm'
import { RequiredField } from 'utils/RequiredField'

type ModalConfirmStackedProps = RequiredField<
  ComponentProps<typeof ModalConfirm>,
  'target'
>

const ModalConfirmStacked = (props: ModalConfirmStackedProps) => {
  return (
    <ModalConfirm {...props} preventClickOutsideToClose={true} isCentered>
      {props.children}
    </ModalConfirm>
  )
}

export default ModalConfirmStacked
