import clsx from 'clsx'
import { Check } from 'phosphor-react'
import React from 'react'
import { styles } from './Step.styled'

type TStep = {
  step: number
  title: string
  description?: string
}

interface IStepProps {
  steps: TStep[]
  currentStep: number
  onChange?: () => void
}

const Step = ({ steps, currentStep, onChange }: IStepProps) => {
  return (
    <ul className={styles.base}>
      {steps.map((item, index) => {
        const { step, title, description } = item
        const isActive = step === currentStep

        return (
          <li
            key={step}
            onClick={onChange}
            className={clsx(
              styles.item,
              isActive && styles.active,
              onChange && 'cursor-pointer'
            )}
          >
            {index !== 0 && (
              <div
                className={clsx(
                  styles.arrow.base,
                  styles.arrow.left,
                  'after:border-l-white'
                )}
              ></div>
            )}
            {index !== steps.length - 1 && (
              <div
                className={clsx(
                  styles.arrow.base,
                  styles.arrow.right,
                  isActive ? 'after:border-l-gray-50' : 'after:border-l-white'
                )}
              ></div>
            )}
            <div
              className={clsx(
                styles.number,
                step < currentStep
                  ? 'bg-primary-400 text-white'
                  : isActive
                    ? 'bg-white text-primary-300'
                    : 'bg-gray-100 text-gray-400'
              )}
            >
              {step < currentStep ? <Check size={24} weight="bold" /> : step}
            </div>
            <div className="flex flex-col justify-center pl-3">
              <span className="text-gray-700 text-lg font-semibold">
                {title}
              </span>
              {description && (
                <span className="text-gray-500 text-sm">{description}</span>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default Step
