import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import type Patient from "src/models/patient";
import { ref } from "vue";

export const usePatientStore = defineStore('patient', () => {
    const patients = ref<Patient[]>([]);

    const fetchPatients = async () => {
        try {

            const token = localStorage.getItem('token');
            console.log("Token antes da requisição:", token);  
            if (token) {
                console.log("Token antes da requisição:", token);  
            }

            const response = await api.get('/nutritionists/patients');

            console.log('Response' + response.data)
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


    return { patients, fetchPatients }
})