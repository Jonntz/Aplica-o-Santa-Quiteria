/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from "react"; // <-- Adicionado 'type'
import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import type { User } from "../types"; // <-- Adicionado 'type'

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, userData: User) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const response = await api.get("/auth/me");
          setUser(response.data);
        } catch (error) {
          console.error("Sessão expirada ou inválida: ", error);
          localStorage.removeItem("accessToken");
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = (accessToken: string, userData: User) => {
    localStorage.setItem("accessToken", accessToken);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Erro ao fazer logout no servidor", error);
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
