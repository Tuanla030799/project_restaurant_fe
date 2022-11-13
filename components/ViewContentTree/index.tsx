import React, { useEffect, useRef, useState } from 'react'
import { Typography, Tooltip } from '@/components'
import { CaretDown, CheckCircle, Lock } from 'phosphor-react'
import clsx from 'clsx'
import useToggle from 'hooks/useToggle'
import { IViewContentTree } from './types'
import { useRouter } from 'next/router'
import { routes } from '@/constants/routes'
import { COMPONENT_STATUSES } from '@/constants/course'
import { useTranslation } from 'next-i18next'
import { isTextEllipsis } from '@/utils'

const ViewContentTree = ({ contents, hidden }: IViewContentTree) => {
  const { query, push } = useRouter()

  useEffect(() => {
    if (query.contentId === 'null' && contents) {
      const idFirstContent = contents.filter(
        (content) => content.content_parent_id === null
      )?.[0].id
      push(
        routes.learningCourse.content.generatePath(
          Number(query.courseId),
          idFirstContent
        )
      )
    }
  }, [contents, query])

  const nestedContent = (content, parentId) => {
    return content
      ?.sort((a, b) => a.order_index - b.order_index)
      ?.reduce((acc, cur) => {
        const obj = { ...cur, children: [] }

        if (parentId === cur.content_parent_id) {
          const children = nestedContent(content, cur.id)
          if (children.length) obj.children = children
          acc.push(obj)
        }

        return acc
      }, [])
  }

  return (
    <div className={clsx('relative flex flex-col', { hidden: hidden })}>
      {nestedContent(contents, null)?.map((content) => (
        <TreeItem key={content.id} contents={contents} {...content} />
      ))}
    </div>
  )
}

const TreeItem = ({ contents, id, name, status, children }) => {
  const { t } = useTranslation(['learning'])
  const { query, push } = useRouter()
  const [toggle, setToggle] = useToggle(true)
  const [isOverflow, setIsOverflow] = useState(false)
  const treeNameRef = useRef<HTMLParagraphElement>(null)
  const nameRef = useRef<HTMLParagraphElement>(null)
  const iconLockRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const treeNameEl = treeNameRef.current

    if (treeNameRef.current) {
      const isOverflow = isTextEllipsis(treeNameEl)
      setIsOverflow(isOverflow)
    }
  }, [treeNameRef])

  return (
    <div
      className={clsx(
        'relative mt-2 after:absolute after:top-7 after:left-[7px] after:h-[calc(100%-24px)] after:border-l after:border-gray-200',
        !toggle && 'after:content-none'
      )}
    >
      <div className="relative flex items-center gap-1">
        <div className="flex items-center w-full">
          {!!children?.length && (
            <CaretDown
              size={16}
              weight="fill"
              className={clsx(
                'mr-1 flex-shrink-0 cursor-pointer',
                !toggle && '-rotate-90'
              )}
              onClick={() => setToggle()}
            />
          )}
          <div
            className={clsx(
              'relative inline-flex items-center w-full px-1.5 rounded duration-300 truncate',
              status === COMPONENT_STATUSES.LOCK
                ? 'cursor-not-allowed'
                : 'hover:bg-primary-400 hover:text-white cursor-pointer',
              {
                'bg-primary-400 !text-white': Number(query.contentId) === id,
              },
              {
                'text-primary-400':
                  status === COMPONENT_STATUSES.NOT_YET_STARTED ||
                  status === COMPONENT_STATUSES.IN_PROGRESS,
              }
            )}
            onClick={() =>
              !(status === COMPONENT_STATUSES.LOCK) &&
              push(
                routes.learningCourse.content.generatePath(
                  Number(query.courseId),
                  id
                )
              )
            }
          >
            <Typography
              noWrap
              className="absolute w-full h-0"
              ref={treeNameRef}
            >
              {name}
            </Typography>
            {isOverflow ? (
              <Tooltip
                isFixed
                title={name}
                containerClassName="w-full"
                maxWidth={null}
              >
                <Typography ref={nameRef} noWrap>
                  {name}
                </Typography>
              </Tooltip>
            ) : (
              <Typography>{name}</Typography>
            )}
          </div>
          {status === COMPONENT_STATUSES.LOCK && (
            <div className="flex items-center text-gray-400 ml-2">
              <Tooltip
                isFixed
                title={t('sidebar.lock')}
                containerClassName="w-full"
                maxWidth={null}
              >
                <Lock size={22} ref={iconLockRef} />
              </Tooltip>
            </div>
          )}
          {status === COMPONENT_STATUSES.COMPLETED && (
            <div className="flex items-center text-green-500 ml-2">
              <CheckCircle size={22} weight="fill" />
            </div>
          )}
        </div>
      </div>
      <div
        className={clsx(!toggle && 'h-0 overflow-hidden')}
        style={{ ...(children?.length && { marginLeft: '20px' }) }}
      >
        {!!children?.length &&
          children?.map((content) => (
            <TreeItem key={content.id} contents={contents} {...content} />
          ))}
      </div>
    </div>
  )
}

export default ViewContentTree
