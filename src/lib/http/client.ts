import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 8000,
});

client.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    const user = JSON.parse(storedUser);
    if (config.headers) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }

  return config;
});
