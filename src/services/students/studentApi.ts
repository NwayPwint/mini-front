import { api } from "../api";
export const studentApi = {
  getDashboard: async () => {
    const response = await api.get("/student/dashboard");
    return response.data;
  },
};
