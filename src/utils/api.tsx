import axios from "axios";
import { env } from "../config/env";

// Create an Axios instance with default config
const apiClient = axios.create({
  baseURL: env.TMDB_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: `Bearer ${env.TMDB_API_KEY}`,
  },
});

// Generic helper for API calls
export async function apiRequest<T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: unknown,
  config?: Record<string, unknown>
): Promise<T> {
  try {
    const response = await apiClient.request<T>({
      method,
      url,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    // Optionally handle errors globally here
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
}

export default apiClient;
