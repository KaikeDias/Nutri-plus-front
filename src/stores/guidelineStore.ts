import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import type GuidelineDTO from "src/models/dtos/guidelineDTO";
import type Guideline from "src/models/guideline";
import { ref } from "vue";

export const useGuidelineStore = defineStore('guideline', () => {
    const guidelines = ref<Guideline[]>([])

    const fetchGuidelines = async (patientId: string) => {
        try {
            const response = await api.get(`/guidelines/patients/${patientId}`)

            guidelines.value = response.data.map((guideline: Guideline) => ({
                id: guideline.id,
                title: guideline.title,
                content: guideline.content,
            }))
        } catch (error) {
            console.error('Erro ao buscar orientações nutricionais:', error)
        }
    }

    const createGuideline = async (data: GuidelineDTO) => {
        try {
            await api.post(`/guidelines`, data)
        } catch (error) {
            console.error('Erro ao adicionar orientações nutricionais:', error)
            throw new Error('Erro ao adicionar orientações nutricionais');
        }
    }

    return { guidelines, fetchGuidelines, createGuideline }
})