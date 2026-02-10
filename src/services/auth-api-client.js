import axios from "axios";

const authApiClient = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "https://learning-project-5618.vercel.app/api/v1").replace(/\/+$/, '') + '/'
});

authApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authTokens");

    if (token) {
      const parsedToken = JSON.parse(token);
      if (parsedToken?.access) {
        config.headers.Authorization = `JWT ${parsedToken.access}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default authApiClient;
