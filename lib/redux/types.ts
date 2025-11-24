export interface User {
  id: number;
  email: string;
  name: string;
  balance: number;
}

export interface UserState {
  user: User | null;
  token: string | null;
}