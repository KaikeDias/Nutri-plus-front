import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import type MealDTO from "src/models/dtos/mealDTO";
import type Food from "src/models/food";
import type Meal from "src/models/meal";
import { ref } from "vue";

export const useMealsStore = defineStore('meal', () => {
    const meals = ref<Meal[]>([])
    const substitutions = ref<Food[]>([])

    const fetchMeals = async (menuId: string) => {
        try {
            const response = await api.get(`/menus/${menuId}/meals`);

            meals.value = response.data.map((meal: Meal) => ({
                id: meal.id,
                title: meal.title,
                mealTime: meal.mealTime,
                aliments: meal.aliments.map((food: Food) => ({
                    id: food.id,
                    name: food.name,
                    quantity: food.quantity,
                    unit: food.unit,
                    homeQuantity: food.homeQuantity,
                    homeUnit: food.homeUnit
                }))
            }))
        } catch (error) {
            console.error('Erro ao buscar refeicoes:', error)
        }
    }

    const fetchSubstitutions = async (foodId: string) => {
        try {
            const response = await api.get(`/menus/meals/${foodId}/substitutions`)

            substitutions.value = response.data.map((food: Food) => ({
                id: food.id,
                name: food.name,
                quantity: food.quantity,
                unit: food.unit,
                homeQuantity: food.homeQuantity,
                homeUnit: food.homeUnit
            }))
        } catch (error) {
            console.error('Erro ao buscar substituicoes:', error)
        }
    }

    const addMeal = async (meal: MealDTO, menuId: string) => {
        try {
            await api.post(`/menus/${menuId}/meals`, meal)
        } catch (error) {
            console.error('Erro ao adicionar refeicao:', error)
            throw new Error('Erro no cadastro de refeicao');
        }
    }

    const deleteMeal = async (menuID: string, mealID: string) => {
        try {
            await api.delete(`/menus/${menuID}/meals/${mealID}`)
        } catch (error) {
            console.error('Erro ao remover refeicao:', error)
            throw new Error('Erro na remocao de refeicao');
        }
    }

    return { meals, substitutions, fetchMeals, fetchSubstitutions, addMeal, deleteMeal }
}) 