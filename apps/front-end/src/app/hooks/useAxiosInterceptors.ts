import axios from 'axios';
import { useAuth } from './useAuth/useAuth';

export const useAxiosInterceptors = () => {
    axios.defaults.baseURL =
        import.meta.env.BASE_URL || 'http://localhost:3000/api';

    const { accessToken, loginByToken } = useAuth();

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
            if (error.response.status === 401) {
                if (!originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        return axios(originalRequest);
                    } catch (refreshError) {
                        console.error('Failed to refresh token:', refreshError);
                    }
                } else {
                    loginByToken();
                }
            }
            return Promise.reject(error);
        },
    );
};
