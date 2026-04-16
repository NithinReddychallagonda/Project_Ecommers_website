const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    full_name: string;
    role: 'user' | 'admin';
    phone?: string;
    address?: string;
    city?: string;
    pincode?: string;
  };
}

interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'user' | 'admin';
  phone: string | null;
  address: string | null;
  city: string | null;
  pincode: string | null;
}

interface CheckAdminResponse {
  isAdmin: boolean;
}

class ApiClient {
  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private getHeaders(includeAuth = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async signup(email: string, password: string, full_name: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: this.getHeaders(false),
      body: JSON.stringify({ email, password, full_name }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Signup failed');
    }

    return response.json();
  }

  async signin(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: this.getHeaders(false),
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Signin failed');
    }

    return response.json();
  }

  async adminLogin(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/admin-login`, {
      method: 'POST',
      headers: this.getHeaders(false),
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Admin login failed');
    }

    return response.json();
  }

  async getProfile(): Promise<{ user: User }> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch profile');
    }

    return response.json();
  }

  async updateProfile(data: Partial<User>): Promise<{ message: string; user: User }> {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update profile');
    }

    return response.json();
  }

  async checkAdmin(): Promise<CheckAdminResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/check-admin`, {
      method: 'POST',
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to check admin');
    }

    return response.json();
  }

  async getUsers(): Promise<{ users: User[] }> {
    const response = await fetch(`${API_BASE_URL}/auth/users`, {
      method: 'GET',
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch users');
    }

    return response.json();
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  clearToken(): void {
    localStorage.removeItem('authToken');
  }
}

export const apiClient = new ApiClient();
