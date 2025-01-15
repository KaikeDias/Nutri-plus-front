import type FoodDTO from "./foodDTO"

export default interface MealDTO {
    title: string
    aliments: FoodDTO[]
}