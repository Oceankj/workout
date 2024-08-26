import axios from 'axios';
import { useAuth } from './useAuth/useAuth';

export const useAxiosConfig = () => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

    const { accessToken, loginByToken } = useAuth();

    // Apply accessToken to the header
    axios.interceptors.request.use((config) => {
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    });

    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    return axios(originalRequest);
                } catch (refreshError) {
                    // Handle refresh token failure (e.g., logout user)
                    console.error('Failed to refresh token:', refreshError);
                    // Implement logout logic here
                }
            }
            return Promise.reject(error);
        },
    );  
};