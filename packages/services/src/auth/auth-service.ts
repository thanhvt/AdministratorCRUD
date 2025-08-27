import { apiClient } from '../api/client';
import { LoginCredentials, AuthResponse, User } from '../types/auth';

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Even if logout fails on server, we should clear client state
      console.error('Logout error:', error);
    }
  }

  async refreshToken(): Promise<void> {
    try {
      await apiClient.post('/auth/refresh');
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const user = await apiClient.get<User>('/auth/me');
      return user;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await apiClient.post('/auth/change-password', {
        currentPassword,
        newPassword,
      });
    } catch (error) {
      throw error;
    }
  }

  async requestPasswordReset(email: string): Promise<void> {
    try {
      await apiClient.post('/auth/forgot-password', { email });
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await apiClient.post('/auth/reset-password', {
        token,
        newPassword,
      });
    } catch (error) {
      throw error;
    }
  }

  async validateSession(): Promise<boolean> {
    try {
      await this.getCurrentUser();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const authService = new AuthService();
