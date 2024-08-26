import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import axios from 'axios';
import { RegisterRequest, LoginRequest, AuthResponse } from './fetch.model';

const API_URL = '/api/auth';

export const authApi = {
  register: (userData: RegisterRequest): Observable<void> => {
    return from(axios.post(`${API_URL}/register`, userData)).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Registration error:', error);
        throw error;
      })
    );
  },

  login: (credentials: LoginRequest) => {
    return from(axios.post<AuthResponse>(`${API_URL}/login`, credentials)).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Login error:', error);
        throw error;
      })
    );
  },

  loginByToken: (refreshToken: string): Observable<AuthResponse> => {
    return from(axios.get(`${API_URL}/token`, {
      headers: { Authorization: `Bearer ${refreshToken}` }
    })).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Get token error:', error);
        throw error;
      })
    );
  },

  logout: (): Observable<void> => {
    return from(axios.get(`${API_URL}/logout`)).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Logout error:', error);
        throw error;
      })
    );
  },

};
