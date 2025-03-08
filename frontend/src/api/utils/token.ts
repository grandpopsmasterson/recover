interface TokenPayload {
  exp: number;
  [key: string]: any;
}

class TokenManager {
  private static instance: TokenManager;

  private constructor() {}

  public static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  async refreshToken(): Promise<string> {
    // Implement token refresh logic
    // This should call your backend refresh token endpoint
    try {
      // Example refresh call
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}`
        }
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const { token } = await response.json();
      this.setToken(token);
      return token;
    } catch (error) {
      this.clearAuth();
      throw error;
    }
  }

  clearAuth(): void {
    this.removeToken();
    // Additional logout logic (clear user state, etc.)
  }
}

export default TokenManager.getInstance();