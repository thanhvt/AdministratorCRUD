import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse, ApiError, ApiConfig } from '../types/api';

class ApiClient {
  private instance: AxiosInstance;

  constructor(config: ApiConfig) {
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout,
      withCredentials: config.withCredentials,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await this.refreshToken();
            const token = this.getAccessToken();
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return this.instance(originalRequest);
          } catch (refreshError) {
            // Redirect to login or handle refresh failure
            this.handleAuthFailure();
            return Promise.reject(refreshError);
          }
        }

        const apiError: ApiError = {
          message: error.response?.data?.message || error.message,
          code: error.response?.data?.code || 'UNKNOWN_ERROR',
          status: error.response?.status || 500,
        };

        return Promise.reject(apiError);
      }
    );
  }

  private getAccessToken(): string | null {
    // This will be implemented to get token from httpOnly cookie
    // For now, return null as tokens are in httpOnly cookies
    return null;
  }

  private async refreshToken(): Promise<void> {
    try {
      await this.instance.post('/auth/refresh');
    } catch (error) {
      throw error;
    }
  }

  private handleAuthFailure(): void {
    // Clear auth state and redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    return response.data.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);
    return response.data.data;
  }
}

// Create default API client instance
const defaultConfig: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  withCredentials: true,
};

export const apiClient = new ApiClient(defaultConfig);
export { ApiClient };
