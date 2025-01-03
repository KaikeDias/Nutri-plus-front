import type Food from "./food"

export default interface Meal {
    title: string
    foods: Food[]
}