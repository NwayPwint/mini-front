import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "../services/authApi";
import type { RegisterFormValues, LoginFormValues } from "../types/auth";
import type { UserRole } from "../types/role";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
  phone?: string | null;
  address?: string | null;
  bio?: string | null;
  weeklyTargetHours?: number | null;
  createdAt?: string;
  passwordChangedAt?: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User) => void;
  register: (data: RegisterFormValues) => Promise<boolean>;
  login: (data: LoginFormValues) => Promise<boolean>;
  forgot: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const extractErrorMessage = (error: unknown, defaultMsg: string): string => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const err = error as { response?: { data?: { message?: string } } };
    if (err.response?.data?.message) {
      return err.response.data.message;
    }
  }
  return defaultMsg;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      setUser: (user: User) => set({ user }),

      register: async (data: RegisterFormValues) => {
        set({ isLoading: true, error: null });
        try {
          await authApi.register(data);
          set({ isLoading: false });
          return true;
        } catch (error) {
          const errorMessage = extractErrorMessage(
            error,
            "Registration failed. Please try again.",
          );
          set({ error: errorMessage, isLoading: false });
          return false;
        }
      },

      login: async (data: LoginFormValues) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login(data);
          localStorage.setItem("token", response.data.token);
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch (error) {
          const errorMessage = extractErrorMessage(
            error,
            "Login failed. Please try again.",
          );
          set({ error: errorMessage, isLoading: false });
          return false;
        }
      },
      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null, isAuthenticated: false });
      },
      forgot: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          await authApi.forgot(email);
          set({ isLoading: false });
          return true;
        } catch (error) {
          const errorMessage = extractErrorMessage(
            error,
            "Forgot password request failed. Please try again.",
          );
          set({ error: errorMessage, isLoading: false });
          return false;
        }
      },

      resetPassword: async (token: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          await authApi.resetPassword(token, password);
          set({ isLoading: false });
          return true;
        } catch (error) {
          const errorMessage = extractErrorMessage(
            error,
            "Password reset failed. Please try again.",
          );
          set({ error: errorMessage, isLoading: false });
          return false;
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
