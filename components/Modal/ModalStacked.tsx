import React, { ComponentProps } from 'react'
import { RequiredField } from 'utils/RequiredField'
import Modal from './Modal'

type ModalStackedProps = RequiredField<ComponentProps<typeof Modal>, 'target'>

const ModalStacked = (props: ModalStackedProps) => {
  return (
    <Modal {...props} size="sm" hasOnClickOutside={false} isCentered>
      {props.children}
    </Modal>
  )
}

export default ModalStacked
