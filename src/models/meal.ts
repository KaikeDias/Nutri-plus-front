import type Food from "./food"

export default interface Meal {
    id: string
    title: string
    aliments: Food[]
}