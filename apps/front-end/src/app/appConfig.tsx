import React from 'react';
import { useAxiosInterceptors } from './hooks/useAxiosInterceptors';
import { useAuth } from './hooks/useAuth/useAuth';

interface AppConfigProps {
    children: React.ReactNode;
}

export const AppConfig = ({ children }: AppConfigProps) => {
    useAxiosInterceptors();
    useAuth().forRoot();
    return children;
};
