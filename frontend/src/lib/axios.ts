import axios, { type AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/",
  withCredentials: true,
});
