import React, { ComponentProps } from 'react'
import { RequiredField } from 'utils/RequiredField'
import ModalConfirm from './ModalConfirm'

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
