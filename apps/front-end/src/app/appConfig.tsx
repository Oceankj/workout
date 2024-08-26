import React from 'react';
import { useAxiosConfig } from './hooks/useAxiosConfig';

interface AppConfigProps {
    children: React.ReactNode;
}

export const AppConfig = ({ children }: AppConfigProps) => {
    useAxiosConfig();
    return children;
};
