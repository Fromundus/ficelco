// import axios from "axios";
// import ipconfig from "./ipconfig";
// import { useNavigate } from "react-router-dom";

// const axiosClient = axios.create({
//     baseURL: `${ipconfig}:8000/api`
// });

// axiosClient.interceptors.request.use( (config) => {
//     // const token = localStorage.getItem("auth_token");
//     const token = localStorage.getItem("U2FsdGVkX1+PqlF7w+7eK9z5n2Nbsl6G8Yk+dHb4M5gNl/M1poZt");
//     config.headers.Authorization = `Bearer ${token}`

//     return config;
// });

// axiosClient.interceptors.response.use( (response) => {
//     return response
// }, (error) => {
//     if(error.response.status === 401){
//         // localStorage.removeItem("auth_token")
//         // localStorage.removeItem("auth_role")
//         // localStorage.removeItem("auth_name")
//         // localStorage.removeItem("auth_id")
//         const navigate = useNavigate();

//         localStorage.removeItem("U2FsdGVkX1+PqlF7w+7eK9z5n2Nbsl6G8Yk+dHb4M5gNl/M1poZt")
//         localStorage.removeItem("U2FsdGVkX1+MzqF7wOa9iVp6K27rLZy8dS8GbTx9Y0Fw/E3Lbr")
//         localStorage.removeItem("U2FsdGVkX1+VmU9a5r9pG8f3J0nXZ4LfRr2bJ1Wd0T3i2GtVYZ4n")
//         localStorage.removeItem("U2FsdGVkX1+8fTn2Tq0g5zXpBv6y6Lo1Nl7ZpA2h9LwYk6M6Wli")

//         navigate('/');
//     }
//     throw error;
// })

// export default axiosClient;

// import axios from "axios";
// import ipconfig from "./ipconfig";

// const axiosClient = axios.create({
//     baseURL: `${ipconfig}:8000/api`
// });

// axiosClient.interceptors.request.use((config) => {
//     const token = localStorage.getItem("U2FsdGVkX1+PqlF7w+7eK9z5n2Nbsl6G8Yk+dHb4M5gNl/M1poZt");
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
// });

// axiosClient.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             // Clear tokens and sensitive data
//             localStorage.removeItem("U2FsdGVkX1+PqlF7w+7eK9z5n2Nbsl6G8Yk+dHb4M5gNl/M1poZt");
//             localStorage.removeItem("U2FsdGVkX1+MzqF7wOa9iVp6K27rLZy8dS8GbTx9Y0Fw/E3Lbr");
//             localStorage.removeItem("U2FsdGVkX1+VmU9a5r9pG8f3J0nXZ4LfRr2bJ1Wd0T3i2GtVYZ4n");
//             localStorage.removeItem("U2FsdGVkX1+8fTn2Tq0g5zXpBv6y6Lo1Nl7ZpA2h9LwYk6M6Wli");

//             // Optional: Store the error for user feedback
//             error.logout = true;
//         }
//         return Promise.reject(error);
//     }
// );

// export default axiosClient;

import axios from "axios";
import ipconfig from "./ipconfig";
import { Navigate } from "react-router-dom";

const axiosClient = axios.create({
    baseURL: `${ipconfig}:8000`,
    withCredentials: true,
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("U2FsdGVkX1+MzqF7wOa9iVp6K27rLZy8dS8GbTx9Y0Fw/E3Lbr"); // remove role
            localStorage.removeItem("U2FsdGVkX1+8fTn2Tq0g5zXpBv6y6Lo1Nl7ZpA2h9LwYk6M6Wli"); // remove id
            // Optional: Store the error for user feedback
            error.logout = true;
        }
        return Promise.reject(error);
    }
);

export default axiosClient;