import {
  Button,
  Dropdown,
  Grid,
  Input,
  Menu,
  MenuItem,
  Select,
} from '@/components'
import { useCategories } from '@/lib/category'
import { getSelectOptions, getSelectOptionsFromConst } from '@/utils'
import { useTranslation } from 'next-i18next'
import {
  ArrowCounterClockwise,
  MagnifyingGlass,
  Plus,
  Trash,
} from 'phosphor-react'
import React, { ChangeEvent, useState } from 'react'

type FilterFormProps = {
  isReset: boolean
  onResetFilter: () => void
}

const FilterForm = ({ isReset, onResetFilter }: FilterFormProps) => {
  const [filters, setFilters] = useState<any>([])
  const { t } = useTranslation(['food'])
  const { data: { data: categories } = {}, isValidating } = useCategories()
  const categoryOptions = getSelectOptions(categories)

  const handleAddFilter = () => {
    setFilters([...filters, {}])
  }

  const handleDeleteFilter = (id) => {
    const newFilters = [...filters].filter((_, index) => index !== id)
    setFilters(newFilters)
  }

  return (
    <div className="flex flex-wrap justify-between items-end gap-2.5">
      <div className='flex flex-wrap gap-8'>
        <div className="min-w-[16%] shrink">
          <Select
            name="categories"
            label={t('filter.label_category', { ns: 'food' })}
            options={categoryOptions}
            shouldReset={isReset}
            multiple
            hasClear
          />
        </div>
        {filters.map((filter, index) => {
          return (
            <div key={index} className="flex items-end min-w-[16%] shrink">
              <div className=" w-full">
                <Select
                  name="filter"
                  label="New Filter"
                  options={[
                    { value: 'option-1', label: 'Option 1' },
                    { value: 'option-2', label: 'Option 2' },
                  ]}
                  hasClear
                />
              </div>
              <Button
                variant="text"
                color="gray"
                onlyIcon
                onClick={() => handleDeleteFilter(index)}
              >
                <Trash size={16} className="text-gray-500" />
              </Button>
            </div>
          )
        })}
      </div>
      <div className="min-w-[20%] items-end  flex gap-2 shrink">
        <Dropdown
          className="inline-flex flex-shrink-0"
          preventClose={true}
          overlay={
            <Menu maxWidth={260} placement="bottom-left">
              <MenuItem>
                <Input
                  name="search-course"
                  type="search"
                  placeholder="Search"
                  leading={
                    <button type="submit" className="leading-0">
                      <MagnifyingGlass size={16} className="text-gray-700" />
                    </button>
                  }
                />
              </MenuItem>
              <MenuItem onClick={handleAddFilter}>
                <div>Filter 1</div>
              </MenuItem>
              <MenuItem onClick={handleAddFilter}>
                <div>Filter 2</div>
              </MenuItem>
              <MenuItem onClick={handleAddFilter}>
                <div>Filter 3</div>
              </MenuItem>
            </Menu>
          }
        >
          <Button
            variant="outlined"
            color="gray"
            leading={<Plus size={20} className="text-gray-700" />}
          >
            {t('filter.add_filters', { ns: 'food' })}
          </Button>
        </Dropdown>
        <Button
          variant="outlined"
          color="gray"
          leading={
            <ArrowCounterClockwise size={20} className="text-gray-700" />
          }
          onClick={onResetFilter}
        >
          {t('filter.reset', { ns: 'food' })}
        </Button>
        <Button type="submit">{t('filter.apply', { ns: 'food' })}</Button>
      </div>
    </div>
  )
}

export default FilterForm
