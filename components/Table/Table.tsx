import clsx from 'clsx'
import { Info } from 'phosphor-react'
import React, { ChangeEvent, FC, useMemo, useState } from 'react'
import { TableProps } from './Table.types'
import { Tooltip } from '@/components'
import { Checkbox } from 'components/Form'

const Table: FC<TableProps> = ({
  headers,
  rows,
  className,
  currentPage,
  pageSize,
  headerClassName = 'py-3 px-6',
  rowClassName = 'py-4 px-6',
  actionClassName = 'w-60 py-4 px-6',
  manageActions,
  hasCheckData,
  checkedData,
  setCheckedData,
  checkClassName,
  isOverflow = true,
}) => {
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false)
  const handleCheckAll = () => {
    setIsCheckAll((prevState) => !prevState)

    if (isCheckAll) {
      setCheckedData && setCheckedData([])

      return
    }

    setCheckedData && setCheckedData(rows?.map(({ props }) => props?.id!))
  }

  const isIndeterminate = useMemo(() => {
    if (!checkedData?.length) {
      setIsCheckAll(false)
    }

    return checkedData?.length !== rows?.length
  }, [checkedData])

  const handleCheckItem = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)

    if (checkedData?.includes(value)) {
      setCheckedData &&
        setCheckedData(checkedData?.filter((item) => item !== value))

      return
    }

    setIsCheckAll(true)
    setCheckedData && checkedData && setCheckedData([...checkedData, value])
  }

  return (
    <div
      className={clsx('relative', isOverflow && 'overflow-x-auto', className)}
    >
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-base text-gray-400 border-b border-gray-300">
          <tr>
            {hasCheckData && (
              <th
                scope="col"
                className={clsx(headerClassName, 'flex w-2 pl-2.5')}
              >
                <Checkbox
                  size="sm"
                  name="checkAll"
                  onChange={handleCheckAll}
                  isChecked={isCheckAll}
                  isIndeterminate={isIndeterminate}
                />
                <span className="pl-4">#</span>
              </th>
            )}
            {headers.map(({ label, className, leading, trailing }, index) => (
              <th
                scope="col"
                className={clsx(headerClassName, className)}
                key={index}
              >
                {leading}
                {label}
                {trailing}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map(({ data, props }, index) => (
            <tr className="even:bg-slate-50" key={props?.id || index}>
              {hasCheckData && (
                <td className={checkClassName}>
                  <div className="flex p-2 content-center">
                    <Checkbox
                      size="sm"
                      value={props?.id}
                      onChange={handleCheckItem}
                      isChecked={checkedData?.includes(props?.id!)}
                    />
                    <div className="pl-4 w-10">
                      {index + 1 + Number(pageSize) * (Number(currentPage) - 1)}
                    </div>
                  </div>
                </td>
              )}
              {Object.values(data).map((val: any, cellIndex) => (
                <td
                  className={clsx(
                    rowClassName,
                    val.className,
                    props?.handleClick && 'cursor-pointer'
                  )}
                  key={cellIndex}
                  onClick={props?.handleClick}
                >
                  <span
                    className={clsx('grow inline-block', val.classNameContent)}
                  >
                    {val.content}
                  </span>
                  {val.tooltip && (
                    <span className={clsx('inline-flex items-center')}>
                      <Tooltip
                        title={val.tooltip}
                        maxWidth={320}
                        noWrap={false}
                        placement="bottom"
                      >
                        <Info className="text-gray-400 text-lg relative cursor-pointer hover:text-primary-400" />
                      </Tooltip>
                    </span>
                  )}
                </td>
              ))}
              {manageActions && (
                <td className={actionClassName}>{manageActions(props?.id!)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
