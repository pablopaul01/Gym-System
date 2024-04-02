import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL:"http://localhost:8080"
    baseURL:"https://gym-back-pztx.onrender.com"
    
})