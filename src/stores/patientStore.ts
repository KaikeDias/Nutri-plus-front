import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import type CreatePatientDTO from "src/models/dtos/createPatientDTO";
import type Patient from "src/models/patient";
import { ref } from "vue";

export const usePatientStore = defineStore('patient', () => {
    const patients = ref<Patient[]>([]);
    const loadedPatient = ref<Patient | null>();

    const fetchPatients = async () => {
        try {
            const response = await api.get('/nutritionists/patients');

            patients.value = response.data.map((patient: Patient) => ({
                id: patient.id,
                username: patient.username,
                email: patient.email,
                name: patient.name,
                phone: patient.phone,
                cpf: patient.cpf,
                menuId: patient.menuId
            }))
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

    const editPatient = async (data: Patient) => {
        try {
            await api.put('/nutritionists/patients', data)
        } catch (error) {
            console.error('Erro ao editar paciente:', error)
            throw new Error('Erro na edicao de paciente');
        }
    }

    const deletePatient = async (id: string) => {
        try {
            await api.delete(`/nutritionists/patients/${id}`)
        } catch (error) {
            console.error('Erro ao deletar paciente:', error)
            throw new Error('Erro na delecao de paciente');
        }
    }

    const loadPatient = async (id: string) => {
        try {
            const response = await api.get(`/nutritionists/patients/${id}`);
            
            loadedPatient.value = {
                id: response.data.id,
                username: response.data.username,
                email: response.data.email,
                name: response.data.name,
                cpf: response.data.cpf,
                phone: response.data.phone,
                menuId: response.data.menuID,
            }

            localStorage.setItem('loadedPatient', JSON.stringify(loadedPatient.value));
        } catch (error) {
            console.error('Erro ao carregar paciente:', error)
            throw new Error('Erro no carregamento de paciente');
        }
    }

    const clearPatient = () => {
        loadedPatient.value = null;
        localStorage.removeItem('loadedPatient')
    }

    const getLoadedPatient = async () => {
        loadedPatient.value = await JSON.parse(localStorage.getItem('loadedPatient')!)
    }

    return { patients, fetchPatients, createPatient, deletePatient, editPatient, loadPatient, clearPatient, loadedPatient, getLoadedPatient }
})