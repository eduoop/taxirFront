import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3333",
});

export const useApi = () => ({
  validate: async (token: string) => {
    const response = await api.get("/auth/validate", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  signin: async (email: string, password: string) => {
    const response = await api.post("/auth", { email, password });
    return response.data;
  },
  logout: async (token: string | null) => {
    const response = await api.delete("/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return response.data;
  },
});
