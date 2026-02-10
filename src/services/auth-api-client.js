
import axios from "axios";

const authApiClient = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "https://learning-project-5618.vercel.app/api/v1").replace(/\/+$/, '') + '/'
});

export default authApiClient;

authApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authTokens");
    if (token) {
      config.headers.Authorization = `JWT ${JSON.parse(token)?.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);