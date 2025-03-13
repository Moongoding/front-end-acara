import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IActivation, IRegister, ILogin } from "@/types/Auth";

const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
  activation: (payload: IActivation) =>
    instance.post(`${endpoint.AUTH}/activation`, payload),
  // login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),
  login: async (payload: ILogin) => {
    try {
      console.log("Sending login request:", payload);
      const response = await instance.post(`${endpoint.AUTH}/login`, payload);
      console.log("Login API Response:", response);
      return response;
    } catch (error) {
      console.error("Login API Error:", error.response?.data || error.message);
      throw error;
    }
  },
  getProfileWithToken: (token: string) =>
    instance.get(`${endpoint.AUTH}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default authServices;
