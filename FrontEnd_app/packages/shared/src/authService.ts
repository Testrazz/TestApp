import { User, LoginRequest, LoginResponse } from './types';

export interface TokenStorage {
  getToken(): string | null;
  setToken(token: string): void;
  clearToken(): void;
  getRefreshToken(): string | null;
  setRefreshToken(token: string): void;
  clearRefreshToken(): void;
}

export class LocalStorageTokenStorage implements TokenStorage {
  private readonly TOKEN_KEY = 'cricket_app_token';
  private readonly REFRESH_TOKEN_KEY = 'cricket_app_refresh_token';

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  clearToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  setRefreshToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  clearRefreshToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }
}

export class AuthService {
  private tokenStorage: TokenStorage;
  private currentUser: User | null = null;

  constructor(tokenStorage: TokenStorage = new LocalStorageTokenStorage()) {
    this.tokenStorage = tokenStorage;
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // This would typically make an API call
    // For now, we'll simulate a successful login
    const mockResponse: LoginResponse = {
      user: {
        id: '1',
        email: credentials.email,
        name: 'Test User',
        role: 'fan',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token',
    };

    this.setTokens(mockResponse.token, mockResponse.refreshToken);
    this.currentUser = mockResponse.user;

    return mockResponse;
  }

  async logout(): Promise<void> {
    this.clearTokens();
    this.currentUser = null;
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser;
    }

    const token = this.tokenStorage.getToken();
    if (!token) {
      return null;
    }

    // In a real app, you would validate the token with the server
    // For now, we'll return null if no user is cached
    return null;
  }

  isAuthenticated(): boolean {
    return this.tokenStorage.getToken() !== null;
  }

  private setTokens(token: string, refreshToken: string): void {
    this.tokenStorage.setToken(token);
    this.tokenStorage.setRefreshToken(refreshToken);
  }

  private clearTokens(): void {
    this.tokenStorage.clearToken();
    this.tokenStorage.clearRefreshToken();
  }

  getToken(): string | null {
    return this.tokenStorage.getToken();
  }

  getRefreshToken(): string | null {
    return this.tokenStorage.getRefreshToken();
  }
}

// Create a default auth service instance
export const authService = new AuthService(); 