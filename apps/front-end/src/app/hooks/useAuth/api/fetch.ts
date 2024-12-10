import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import axios from 'axios';
import { RegisterRequest, LoginRequest, AuthResponse } from './fetch.model';

const API_URL = '/api/auth';

export const register = (userData: RegisterRequest): Observable<void> =>
    from(axios.post(`${API_URL}/register`, userData)).pipe(
        map((response) => response.data),
        catchError((error) => {
            console.error('Registration error:', error);
            throw error;
        }),
    );

export const login = (credentials: LoginRequest): Observable<AuthResponse> =>
    from(axios.post<AuthResponse>(`${API_URL}/login`, credentials)).pipe(
        map((response) => response.data),
        catchError((error) => {
            console.error('Login error:', error);
            throw error;
        }),
    );

export const loginByToken = (refreshToken: string): Observable<AuthResponse> =>
    from(
        axios.get(`${API_URL}/token`, {
            headers: { Authorization: `Bearer ${refreshToken}` },
        }),
    ).pipe(
        map((response) => response.data),
        catchError((error) => {
            console.error('Get token error:', error);
            throw error;
        }),
    );

export const logout = (): Observable<void> =>
    from(axios.get(`${API_URL}/logout`)).pipe(
        map((response) => response.data),
        catchError((error) => {
            console.error('Logout error:', error);
            throw error;
        }),
    );
