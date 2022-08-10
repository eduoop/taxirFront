import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:3333'
})

export const useApi = () => ({
    validateToken: async (token: string) => {
        const response = await api.post('/validade', { token })
        return response.data
    },
    singin: async (email: string, password: string) => {
        const response = await api.post('/auth', {email, password})
        return response.data
    },
    logout: async () => {
        const response = await api.delete('/auth')
        return response.data
    }
})