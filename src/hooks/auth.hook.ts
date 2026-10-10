"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import type {
  IAuthResponse,
  IAuthSuccessData,
  IForgotPasswordPayload,
  IGoogleLoginPayload,
  ILoginPayload,
  IRegisterPayload,
  IResetPasswordPayload,
  IUser,
  IVerifyEmailPayload,
} from "@/types/auth.type";

export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

// ======================================================
// REGISTER MUTATION
// ======================================================
export const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: IRegisterPayload) => {
      return await apiClient<IAuthResponse>("/auth/register", {
        method: "POST",
        body: payload,
      });
    },
  });
};

// ======================================================
// VERIFY EMAIL MUTATION
// ======================================================
export const useVerifyEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: IVerifyEmailPayload) => {
      return await apiClient<IAuthResponse<IAuthSuccessData>>(
        "/auth/verify-email",
        {
          method: "POST",
          body: payload,
        }
      );
    },
    onSuccess: async (response) => {
      if (response?.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        if (response.data.refreshToken) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }
        await queryClient.refetchQueries({ queryKey: authKeys.me() });
      }
    },
  });
};

// ======================================================
// LOGIN MUTATION
// ======================================================
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ILoginPayload) => {
      return await apiClient<IAuthResponse<IAuthSuccessData>>("/auth/login", {
        method: "POST",
        body: payload,
      });
    },
    onSuccess: async (response) => {
      if (response?.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        if (response.data.refreshToken) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }
        await queryClient.refetchQueries({ queryKey: authKeys.me() });
      }
    },
  });
};

// ======================================================
// GOOGLE LOGIN MUTATION
// ======================================================
export const useGoogleLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: IGoogleLoginPayload) => {
      return await apiClient<IAuthResponse<IAuthSuccessData>>("/auth/google", {
        method: "POST",
        body: payload,
      });
    },
    onSuccess: async (response) => {
      if (response?.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        if (response.data.refreshToken) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }
        await queryClient.refetchQueries({ queryKey: authKeys.me() });
      }
    },
  });
};

// ======================================================
// FORGOT PASSWORD MUTATION
// ======================================================
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (payload: IForgotPasswordPayload) => {
      return await apiClient<IAuthResponse>("/auth/forgot-password", {
        method: "POST",
        body: payload,
      });
    },
  });
};

// ======================================================
// RESET PASSWORD MUTATION
// ======================================================
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (payload: IResetPasswordPayload) => {
      return await apiClient<IAuthResponse>("/auth/reset-password", {
        method: "POST",
        body: payload,
      });
    },
  });
};

// ======================================================
// REFRESH TOKEN MUTATION
// ======================================================
export const useRefreshToken = () => {
  return useMutation({
    mutationFn: async () => {
      return await apiClient<IAuthResponse<{ accessToken: string }>>(
        "/auth/refresh-token",
        {
          method: "POST",
        }
      );
    },
    onSuccess: (response) => {
      if (response?.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }
    },
  });
};

// ======================================================
// LOGOUT MUTATION
// ======================================================
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await apiClient<IAuthResponse>("/auth/logout", {
        method: "POST",
      });
    },
    onSettled: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      queryClient.clear();
    },
  });
};

// ======================================================
// GET ME QUERY
// ======================================================
export const useGetMe = () => {
  const isClient = typeof window !== "undefined";
  const token = isClient ? localStorage.getItem("accessToken") : null;
  const hasToken = Boolean(token && token.trim() !== "");

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: async () => {
      const response = await apiClient<IAuthResponse<IUser>>("/auth/me");
      return response?.data || response;
    },
    enabled: hasToken,
    staleTime: 1000 * 60 * 15, // 15 Minutes
    gcTime: 1000 * 60 * 30, // 30 Minutes
    retry: false,
  });
};