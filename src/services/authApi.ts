import { api } from "./api";
import type {
  ChangePasswordFormValues,
  LoginFormValues,
  RegisterFormValues,
  UpdateProfileFormValues,
} from "../types/auth";

export const authApi = {
  register: async (data: RegisterFormValues) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    const response = await api.post("/auth/register", payload);
    return response.data;
  },

  login: async (data: LoginFormValues) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    const response = await api.post("/auth/login", payload);
    return response.data;
  },

  forgot: async (email: string) => {
    const payload = { email };
    const response = await api.post("/auth/forgot-password", payload);
    return response.data;
  },

  resetPassword: async (token: string, password: string) => {
    const payload = { token, password };
    const response = await api.post("/auth/reset-password", payload);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  updateProfile: async (data: UpdateProfileFormValues) => {
    const response = await api.put("/auth/profile", data);
    return response.data;
  },

  updatePassword: async (data: ChangePasswordFormValues) => {
    const response = await api.put("/auth/change-password", data);
    return response.data;
  },
};
