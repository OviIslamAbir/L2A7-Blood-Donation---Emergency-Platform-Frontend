import { ofetch } from "ofetch";

const BASE_URL = "https://blood-donation-system-puce.vercel.app/api/v1";


export const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",
  async onRequest({ options }) {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const headers = new Headers(options.headers);
        headers.set("Authorization", `Bearer ${token}`);
        options.headers = headers;
      }
    }
  },
  async onResponseError({ response }) {
    const data = response._data;

  
    if (typeof data === "string" && data.includes("<!DOCTYPE")) {
      throw new Error("Backend endpoint not found (404) or server error.");
    }

    const backendMessage =
      data?.message ||
      data?.errorSources?.[0]?.message ||
      (Array.isArray(data?.errors) ? data.errors[0]?.message : null) ||
      data?.error;

    if (backendMessage) {
      throw new Error(backendMessage);
    }
  },
});

export default apiClient;