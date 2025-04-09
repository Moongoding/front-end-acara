import environment from "@/config/environment";
import { sessionExtended } from "@/types/Auth";
import axios from "axios";
import { error } from "console";
import { promises } from "dns";
import { request } from "http";
import { getSession } from "next-auth/react";

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 60 * 1000,
});
// console.log("Base URL Axios:", process.env.NEXT_PUBLIC_API_URL);
// console.log("Base URL Axios:", environment.API_URL);

instance.interceptors.request.use(
  async (request) => {
    const session: sessionExtended | null = await getSession();
    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default instance;
