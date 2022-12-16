import { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import update from 'immutability-helper'
import { FoodContext, TFood } from 'providers/FoodProvider'
import { actionFoodType } from 'components/Card/Food/food.type'

export type FoodContextReturn = {
  foods: TFood[]
  setFoods: Dispatch<SetStateAction<TFood[]>>
  handleQuantity: (id: number, action: actionFoodType) => void
  resetOrder: () => void
  deleteFood: (id: number) => void
  getQuantity: (id: number) => number
}

const useFoodContext = (): FoodContextReturn => {
  const { foods, setFoods } = useContext(FoodContext)

  const handleQuantity = (id: number, action: actionFoodType) => {
    const foodIndex = foods.findIndex((food) => food.id === id)
    switch (action) {
      case 'plus':
        setFoods(
          update(foods, {
            [foodIndex]: {
              quantity: {
                $set: foods[foodIndex]?.quantity + 1,
              },
            },
          })
        )
        break
      case 'minus':
        setFoods(
          update(foods, {
            [foodIndex]: {
              quantity: {
                $set: foods[foodIndex]?.quantity - 1,
              },
            },
          })
        )
        break

      default:
        break
    }
  }

  const deleteFood = (id: number) => {
    const foodIndex = foods.findIndex((food) => food.id === id)
    setFoods(
      update(foods, {
        [foodIndex]: {
          quantity: {
            $set: 0,
          },
        },
      })
    )
  }

  const getQuantity = (id: number): number => {
    const foodIndex = foods.findIndex((food) => food.id === id)

    return foods[foodIndex]?.quantity
  }

  const resetOrder = () => {
    const foodChanged = foods.map((food: TFood) => {
      return {
        ...food,
        quantity: 0,
      }
    })

    setFoods(foodChanged)
  }

  return {
    foods,
    setFoods,
    resetOrder,
    handleQuantity,
    deleteFood,
    getQuantity,
  }
}

export default useFoodContext
