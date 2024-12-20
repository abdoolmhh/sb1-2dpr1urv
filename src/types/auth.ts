export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher';
  subjects?: string[];
  classes?: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}