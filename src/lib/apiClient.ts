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
    // If server sends non-JSON or HTML 404/500 error page, format clean error msg
    if (typeof response._data === "string" && response._data.includes("<!DOCTYPE")) {
      response._data = {
        success: false,
        message: "Backend endpoint not found (404) or server error.",
      };
    }
  },
});

export default apiClient;