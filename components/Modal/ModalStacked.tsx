import React, { ComponentProps } from 'react'
import Modal from './Modal'
import { RequiredField } from 'utils/RequiredField'

type ModalStackedProps = RequiredField<ComponentProps<typeof Modal>, 'target'>

const ModalStacked = (props: ModalStackedProps) => {
  return (
    <Modal {...props} size="sm" hasOnClickOutside={false} isCentered>
      {props.children}
    </Modal>
  )
}

export default ModalStacked
