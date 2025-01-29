import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import type QuestionDTO from "src/models/dtos/QuestionDTO";
import type Question from "src/models/question";
import { ref } from "vue";

export const useFormStore = defineStore('form', () => {
    const questions = ref<Question[]>([]);

    const fetchQuestions = async (patientId: string) => {
        try {
            const response = await api.get(`/forms/patients/${patientId}`)

            questions.value = response.data.map((question: Question) => ({
                id: question.id,
                question: question.question,
                answer: question.answer
            }))

            console.log(questions.value)
        } catch (error) {
            console.error("Erro ao buscar perguntas: ", error)
        }
    }

    const addQuestion = async (formId: string, data: QuestionDTO) => {
        try {
            await api.post(`/forms/${formId}/questions`, data)
        } catch (error) {
            console.error("Erro ao buscar perguntas: ", error)
        }
    }

    const editQuestion = async (data: Question) => {
        try {
            await api.put(`/forms/questions/${data.id}`, {
                question: data.question
            })
        } catch (error) {
            console.error("Erro ao atualizar pergunta: ", error)
        }
    }

    const deleteQuestion = async (questionId: string) => {
        try {
            await api.delete(`/forms/questions/${questionId}`)
        } catch (error) {
            console.error("Erro ao atualizar pergunta: ", error)
        }
    }

    return { questions, fetchQuestions, addQuestion, editQuestion, deleteQuestion }
})