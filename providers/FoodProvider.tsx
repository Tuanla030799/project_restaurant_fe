import { KEY_FOOD_ORDER } from '@/constants/keyLocalStorage'
import { useLocalStorage } from '@/hooks'
import { useFoodAll } from '@/lib/food'
import { FoodStatus } from '@/models'
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'

export type TFood = {
  id: number
  name: string
  slug: string
  image: string | null
  content: string | null
  discount: number | null
  inventory: string | null
  liked: number | null
  price: number | null
  rating: number | null
  soldQuantity: number | null
  quantity: number
  status?: FoodStatus
  summary: string | null
  type: string | null
  deletedAt?: string | null
  createdAt?: string | null
  updatedAt?: string | null
}

export const FoodContext = React.createContext<{
  foods: TFood[] | []
  setFoods: Dispatch<SetStateAction<TFood[]>>
}>({
  foods: [],
  setFoods: () => {},
})

type Props = {
  children: ReactNode
}

const FoodProvider: React.FC<Props> = ({ children }) => {
  const { data: { data: foodsAll } = {} } = useFoodAll()
  const [foods, setFoods] = useState<TFood[]>([])
  const [valueLocalStorage, setValueLocalStorage] = useLocalStorage<
    TFood[] | null
  >(KEY_FOOD_ORDER, null)

  useEffect(() => {
    if (!foodsAll?.length) return
    let foodChanged
    if (valueLocalStorage?.length) {
      const ids = valueLocalStorage.map((food) => food.id)
      foodChanged = foodsAll.map((food) => {
        if (ids.includes(food.id)) {
          const foodIndex = ids.findIndex((id) => food.id === id)
          food.quantity = valueLocalStorage[foodIndex].quantity
        } else {
          food.quantity = 0
        }

        return food
      })
    } else {
      foodChanged = foodsAll?.map((food) => {
        return {
          ...food,
          quantity: 0,
        }
      })
    }

    if (foodChanged?.length) setFoods(foodChanged)
  }, [foodsAll, valueLocalStorage])

  return (
    <FoodContext.Provider
      value={{
        foods,
        setFoods,
      }}
    >
      {children}
    </FoodContext.Provider>
  )
}

export default FoodProvider
