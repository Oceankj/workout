'use client';

import React from 'react';
import { useAxiosInterceptors } from './hooks/useAxiosInterceptors';
import { useAuth } from './hooks/useAuth/useAuth';
import { ErrorBoundary } from 'react-error-boundary';

interface AppConfigProps {
    children: React.ReactNode;
}

export const AppConfig = ({ children }: AppConfigProps) => {
    useAxiosInterceptors();
    useAuth().forRoot();
    
    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            {children}
        </ErrorBoundary>
    );
};
