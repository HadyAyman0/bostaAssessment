export interface ILoginBody {
  username: string; 
  password: string;
}

export interface ILoginResponse {
  token: string;
}

export interface ISignUpBody {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface ISignUpResponse {
  id: number;
}

export interface AuthUser {
  username: string;
  id?: number;
  email?: string;
}

export interface AuthState {
  token: string | null;
  user: AuthUser | null;
  setAuth: (token: string, user: AuthUser) => void;
  logout: () => void;
}
