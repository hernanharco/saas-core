import axios, { AxiosInstance } from 'axios';
import { AuthResponse, RegistrationRequest, LoginRequest } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add JWT token
    this.api.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle auth errors
    this.api.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('tenantId');
          window.location.href = '/onboarding';
        }
        return Promise.reject(error);
      }
    );
  }

  async register(request: RegistrationRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/api/auth/register', request);
    return response.data;
  }

  async login(request: LoginRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/api/auth/login', request);
    return response.data;
  }

  async validateToken(): Promise<void> {
    await this.api.get('/api/auth/validate');
  }

  setAuthData(authResponse: AuthResponse) {
    localStorage.setItem('token', authResponse.token);
    localStorage.setItem('tenantId', authResponse.tenantId);
    localStorage.setItem('userId', authResponse.userId);
    localStorage.setItem('userEmail', authResponse.email);
    localStorage.setItem('companyName', authResponse.companyName);
    localStorage.setItem('userRole', authResponse.role);
  }

  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('tenantId');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('companyName');
    localStorage.removeItem('userRole');
  }

  getAuthData() {
    return {
      token: localStorage.getItem('token'),
      tenantId: localStorage.getItem('tenantId'),
      userId: localStorage.getItem('userId'),
      userEmail: localStorage.getItem('userEmail'),
      companyName: localStorage.getItem('companyName'),
      userRole: localStorage.getItem('userRole'),
    };
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

export const apiService = new ApiService();
