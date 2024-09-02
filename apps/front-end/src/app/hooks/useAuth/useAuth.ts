import { useCallback } from 'react';
import { tap, switchMap } from 'rxjs';
import { create } from 'zustand';

import { authApi } from './api';
import useLocalStorageStore from '../useLocalStorage';

enum AuthTokenKey {
    AccessToken = 'accessToken',
    RefreshToken = 'refreshToken',
}
const useAuthStore = create<{
    isInit: boolean;
    isLoggedIn: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    setIsInit: (isInit: boolean) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setAccessToken: (token: string | null) => void;
    setRefreshToken: (token: string | null) => void;
}>((set) => ({
    isInit: false,
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    setIsInit: (isInit) => set({ isInit }),
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    setAccessToken: (token) => set({ accessToken: token }),
    setRefreshToken: (token) => set({ refreshToken: token }),
}));

export const useAuth = () => {
    const { getItem, setItem, removeItem } = useLocalStorageStore();
    const {
        isInit,
        isLoggedIn,
        accessToken,
        refreshToken,
        setIsInit,
        setIsLoggedIn,
        setAccessToken,
        setRefreshToken,
    } = useAuthStore();

    const forRoot = useCallback(() => {
        if (isInit) throw new Error('useAuth().forRoot() must be called only once');
        const accessTokenFromLocalStorage = getItem<string>(
            AuthTokenKey.AccessToken,
        );
        const refreshTokenFromLocalStorage = getItem<string>(
            AuthTokenKey.RefreshToken,
        );
        if (accessTokenFromLocalStorage && refreshTokenFromLocalStorage) {
            setIsLoggedIn(true);
            setAccessToken(accessTokenFromLocalStorage);
            setRefreshToken(refreshTokenFromLocalStorage);
        }
        setIsInit(true);
    }, [getItem, setAccessToken, setIsLoggedIn, setRefreshToken]);

    const updateTokenState = ({
        newAccessToken,
        newRefreshToken,
    }: {
        newAccessToken: string;
        newRefreshToken: string;
    }) => {
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

    const login = (credentials: Parameters<typeof authApi.login>[0]) =>
        authApi.login(credentials).pipe(
            tap(({ accessToken, refreshToken }) => {
                setIsLoggedIn(true);
                updateTokenState({
                    newAccessToken: accessToken,
                    newRefreshToken: refreshToken,
                });
            }),
        );

    const register = (userData: Parameters<typeof authApi.register>[0]) =>
        authApi.register(userData).pipe(
            switchMap(() =>
                login({
                    email: userData.email,
                    password: userData.password,
                }),
            ),
        );

    const loginByToken = () => {
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
    };

    const logout = () =>
        authApi.logout().pipe(
            tap(() => {
                setIsLoggedIn(false);
                resetToken();
            }),
        );

    return {
        forRoot,
        isLoggedIn,
        accessToken,
        register,
        login,
        loginByToken,
        logout,
    };
};
