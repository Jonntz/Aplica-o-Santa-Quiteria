export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string | null;
  category: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}