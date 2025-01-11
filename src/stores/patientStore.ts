import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import type CreatePatientDTO from "src/models/dtos/createPatientDTO";
import type Patient from "src/models/patient";
import { ref } from "vue";

export const usePatientStore = defineStore('patient', () => {
    const patients = ref<Patient[]>([]);

    const fetchPatients = async () => {
        try {
            const response = await api.get('/nutritionists/patients');

            patients.value = response.data.map((patient: Patient) => ({
                id: patient.id,
                username: patient.username,
                email: patient.email,
                name: patient.name,
                phone: patient.phone,
                cpf: patient.cpf
            }))
            console.log('patients', patients.value)

        } catch (error) {
            console.error('Erro ao buscar pacientes:', error)
        }
    }

    const createPatient = async (data: CreatePatientDTO) => {
        try {
            await api.post('/nutritionists/createPatient', data)
        } catch (error) {
            console.error('Erro ao criar paciente:', error)
            throw new Error('Erro no cadastro de paciente');
        }
    }

    return { patients, fetchPatients, createPatient }
})