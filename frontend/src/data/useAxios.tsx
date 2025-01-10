import axios from "axios";
import { useMemo } from "react";

export const useAxios = () => {
    const axiosInstance = useMemo(() => {
        const instance = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_URL,
        });

        // request Interceptors
        instance.interceptors.request.use((config) => {
            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        // response Interceptors
        instance.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            return Promise.reject(error);
        });

        return instance;
        }, []);
    
    return axiosInstance;
}