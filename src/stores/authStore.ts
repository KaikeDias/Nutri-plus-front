import { defineStore } from "pinia"
import { api } from "src/boot/axios"
import type RegisterNutritionistDTO from "src/models/dtos/registerNutritionistDTO"

interface LoginResponse {
    token: string
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
    }),

    actions: {
        async registerNutritionist(data: RegisterNutritionistDTO) {
            try {
                await api.post('/nutritionists/register', data)
            } catch (error) {
                console.error('Erro no login:', error);
                throw new Error('Erro no cadastro');
            }
        },

        async login(username: string, password: string) {
            try {
                const response = await api.post<LoginResponse>('/auth/login', {
                    username,
                    password
                });

                this.token = response.data.token;

                console.log('Token recebido:', this.token)
            } catch (error) {
                console.error('Erro no login:', error)
                throw new Error('Usuário ou senha incorretos')
            }
        },

        logout() {
            this.token = null;
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
        },

        loadToken() {
            const savedToken = localStorage.getItem('token');
            if (savedToken) {
                this.token = savedToken;
                api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`
            }
        }
    },


})
