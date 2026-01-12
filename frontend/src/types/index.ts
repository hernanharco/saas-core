export interface User {
  id: string;
  tenantId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  name: string;
  subdomain: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  userId: string;
  tenantId: string;
  email: string;
  companyName: string;
  role: string;
}

export interface RegistrationRequest {
  companyName: string;
  subdomain: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  tenantId: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Add type declarations for environment variables
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}
