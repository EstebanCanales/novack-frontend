"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { api } from "@/lib/api";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_creator: boolean;
  supplier?: {
    id: string;
    supplier_name: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    tokens: { access_token: string; refresh_token?: string },
    userData: User
  ) => void;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay tokens guardados al cargar la app
    const accessToken = localStorage.getItem("access_token");
    const userData = localStorage.getItem("user");

    if (accessToken && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (
    tokens: { access_token: string; refresh_token?: string },
    userData: User
  ) => {
    localStorage.setItem("access_token", tokens.access_token);
    if (tokens.refresh_token) {
      localStorage.setItem("refresh_token", tokens.refresh_token);
    }
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${tokens.access_token}`;
  };

  const logout = () => {
    const refreshToken = localStorage.getItem("refresh_token");

    // Llamar al endpoint de logout si hay refresh token
    if (refreshToken) {
      api
        .post("/auth/logout", { refresh_token: refreshToken })
        .catch(console.error);
    }

    // Limpiar localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    // Limpiar header de autorización
    delete api.defaults.headers.common["Authorization"];

    setUser(null);
  };

  const refreshToken = async (): Promise<boolean> => {
    const refreshTokenValue = localStorage.getItem("refresh_token");

    if (!refreshTokenValue) {
      return false;
    }

    try {
      const { data } = await api.post("/auth/refresh-token", {
        refresh_token: refreshTokenValue,
      });

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("refresh_token", data.refresh_token);
        }
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.access_token}`;
        return true;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }

    return false;
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
