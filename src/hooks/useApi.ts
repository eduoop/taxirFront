import axios from "axios";

const api = axios.create({
    baseURL: 'https://sai-do-papel-api.herokuapp.com'
})

export const useApi = () => ({
    validateToken: async (token: string) => {
        const response = await api.post('/validade', { token })
        return response.data
    },
    signin: async (email: string, password: string) => {
        const response = await api.post('/v1/auth/login', {email, password})
        return response.data
    },
    logout: async () => {
        const response = await api.post('/v1/auth/logout')
        return response.data
    }
})