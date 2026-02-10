import axios from "axios";

const authApiClient = axios.create({
  baseURL: "https://learning-project-5618.vercel.app/api/v1/",
});

authApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authTokens");

    if (token) {
      const accessToken = JSON.parse(token)?.access;
      if (accessToken) {
        config.headers.Authorization = `JWT ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default authApiClient;
