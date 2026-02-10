import axios from "axios";
const apiClient = axios.create({
    baseURL: (import.meta.env.VITE_API_URL || "https://learning-project-5618.vercel.app/api/v1").replace(/\/+$/, '') + '/'
});
export default apiClient;