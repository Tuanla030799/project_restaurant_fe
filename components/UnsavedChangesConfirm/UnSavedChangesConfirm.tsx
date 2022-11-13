import { useEffect, useCallback, useState } from 'react'
import useToggle from 'hooks/useToggle'
import { useRouter } from 'next/router'
import { ModalConfirm } from '@/components'
import { useTranslation } from 'next-i18next'

interface UnsavedChangesConfirmProps {
  shouldConfirmLeave: boolean
  message: string
  callback?: () => void
}

const UnsavedChangesConfirm = ({
  shouldConfirmLeave,
  message,
  callback,
}: UnsavedChangesConfirmProps) => {
  const { t } = useTranslation('common')
  const [shouldShowLeaveConfirmDialog, setShouldShowLeaveConfirmDialog] =
    useToggle()
  const [nextRouterPath, setNextRouterPath] = useState<string | null>()
  const router = useRouter()

  const onRouteChangeStart = useCallback(
    (nextPath: string) => {
      if (!shouldConfirmLeave) return

      const nextPathCustom = nextPath.split('/').slice(3).join('/')

      setShouldShowLeaveConfirmDialog()
      setNextRouterPath('/' + nextPathCustom)

      throw 'cancelRouteChange'
    },
    [shouldConfirmLeave]
  )

  const onConfirmRouteChange = () => {
    setShouldShowLeaveConfirmDialog()
    removeListener()
    callback && callback()
    nextRouterPath && router.push(nextRouterPath)
  }

  const removeListener = () => {
    router.events.off('routeChangeStart', onRouteChangeStart)
  }

  useEffect(() => {
    router.events.on('routeChangeStart', onRouteChangeStart)

    return removeListener
  }, [onRouteChangeStart])

  return (
    <ModalConfirm
      type="warning"
      isOpen={shouldShowLeaveConfirmDialog}
      confirmMessage={t('action.confirm', { ns: 'common' })}
      rejectMessage={t('action.cancel', { ns: 'common' })}
      toggle={setShouldShowLeaveConfirmDialog}
      onConfirm={onConfirmRouteChange}
    >
      {message}
    </ModalConfirm>
  )
}

export default UnsavedChangesConfirm
