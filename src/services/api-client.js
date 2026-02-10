
import axios from "axios";
const apiClient = axios.create({
 baseURL: "https://learning-project-5618.vercel.app/api/v1/",
});

export default apiClient;