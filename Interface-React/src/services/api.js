import axios from "axios";

export const api = axios.create({
<<<<<<< HEAD
    baseURL: 'http://localhost:3001/',
=======
  baseURL: import.meta.env.VITE_API_URL,
>>>>>>> a5ba3ba1758dd71a93c451c4c94eb01ee367aab4
});

api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('burguer:userData') || '{}')?.token;

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});
