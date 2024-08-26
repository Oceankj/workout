import { useEffect, useState } from 'react';
import useLocalStorageStore from '../useLocalStorage';
import { tap } from 'rxjs';

import { create } from 'zustand';
import { authApi } from './api/fetch';
enum AuthTokenKey {
    AccessToken = 'accessToken',
    RefreshToken = 'refreshToken',
}
const useAuthStore = create<{
    isLoggedIn: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setAccessToken: (token: string | null) => void;
    setRefreshToken: (token: string | null) => void;
}>((set) => ({
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
    setAccessToken: (token: string | null) => set({ accessToken: token }),
    setRefreshToken: (token: string | null) => set({ refreshToken: token }),
}));

export const useAuth = () => {
    const { getItem, setItem, removeItem } = useLocalStorageStore();
    const { isLoggedIn, accessToken, refreshToken, setIsLoggedIn, setAccessToken, setRefreshToken } = useAuthStore();
    // const [authorizationToken, setAuthorizationToken] = useState<string | null>(null);

    useEffect(() => {
        const accessTokenFromLocalStorage = getItem<string>(AuthTokenKey.AccessToken);
        const refreshTokenFromLocalStorage = getItem<string>(AuthTokenKey.RefreshToken);
        if (accessTokenFromLocalStorage && refreshTokenFromLocalStorage) {
            setIsLoggedIn(true);
            setAccessToken(accessTokenFromLocalStorage);
            setRefreshToken(refreshTokenFromLocalStorage);
        }
    }, [getItem, setAccessToken, setIsLoggedIn, setRefreshToken]);

    const updateTokenState = ({ newAccessToken, newRefreshToken }: { newAccessToken: string; newRefreshToken: string }) => {
        setAccessToken(newAccessToken);
        setRefreshToken(refreshToken);
        setItem(newAccessToken, AuthTokenKey.AccessToken);
        setItem(newRefreshToken, AuthTokenKey.RefreshToken);
    };
    const resetToken = () => {
        setAccessToken(null);
        setRefreshToken(null);
        removeItem(AuthTokenKey.AccessToken);
        removeItem(AuthTokenKey.RefreshToken);
    };

    return {
        isLoggedIn,
        accessToken,
        register: (userData: Parameters<typeof authApi.register>) =>
            authApi.register(...userData).pipe(
                tap(() => {
                    setIsLoggedIn(true);
                }),
            ),
        login: (credentials: Parameters<typeof authApi.login>) =>
            authApi.login(...credentials).pipe(
                tap(({ accessToken, refreshToken }) => {
                    setIsLoggedIn(true);
                    updateTokenState({
                        newAccessToken: accessToken,
                        newRefreshToken: refreshToken,
                    });
                }),
            ),
        loginByToken: () => {
            if (!refreshToken) throw new Error('Refresh token is required');
            return authApi.loginByToken(refreshToken).pipe(
                tap(({ accessToken, refreshToken }) => {
                    setIsLoggedIn(true);
                    updateTokenState({
                        newAccessToken: accessToken,
                        newRefreshToken: refreshToken,
                    });
                }),
            );
        },
        logout: () =>
            authApi.logout().pipe(
                tap(() => {
                    setIsLoggedIn(false);
                    resetToken();
                }),
            ),
    };
};
