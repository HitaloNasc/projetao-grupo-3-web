import { AuthService } from "@/services/AuthService";
import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 60000,
});

client.interceptors.request.use((config) => {
  const authService = new AuthService();
  const storedUser = authService.getLoggedUser();

  if (storedUser) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${storedUser.token}`;
    }
  }

  return config;
});
