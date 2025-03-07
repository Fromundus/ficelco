import axios from "axios";
import ipconfig from "./ipconfig";
import { toast } from "react-toastify";

const axiosClient = axios.create({
    baseURL: `${ipconfig}:8000`,
    withCredentials: true,
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("role"); // remove role
            localStorage.removeItem("id"); // remove id
            // Optional: Store the error for user feedback

            error.logout = true;
        }
        return Promise.reject(error);
    }
);

export default axiosClient;