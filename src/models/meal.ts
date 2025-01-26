import type Food from "./food"

export default interface Meal {
    id: string
    title: string
    mealTime: string
    aliments: Food[]
}