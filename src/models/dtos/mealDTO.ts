import type FoodDTO from "./foodDTO"

export default interface MealDTO {
    title: string
    mealTime: string
    aliments: FoodDTO[]
}