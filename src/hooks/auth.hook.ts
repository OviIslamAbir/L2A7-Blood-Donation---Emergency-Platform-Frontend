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

// 1. Register Hook
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

// 2. Verify Email (OTP) Hook
export const useVerifyEmail = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (payload: IVerifyEmailPayload) => {
			return await apiClient<IAuthResponse<IAuthSuccessData>>(
				"/auth/verify-email",
				{
					method: "POST",
					body: payload,
				},
			);
		},
		onSuccess: (response) => {
			if (response?.data?.accessToken) {
				localStorage.setItem("accessToken", response.data.accessToken);
				queryClient.invalidateQueries({ queryKey: ["me"] });
			}
		},
	});
};

// 3. Login Hook
export const useLogin = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (payload: ILoginPayload) => {
			return await apiClient<IAuthResponse<IAuthSuccessData>>("/auth/login", {
				method: "POST",
				body: payload,
			});
		},
		onSuccess: (response) => {
			if (response?.data?.accessToken) {
				localStorage.setItem("accessToken", response.data.accessToken);
				queryClient.invalidateQueries({ queryKey: ["me"] });
			}
		},
	});
};

// 4. Google Login Hook
export const useGoogleLogin = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (payload: IGoogleLoginPayload) => {
			return await apiClient<IAuthResponse<IAuthSuccessData>>(
				"/auth/google-login",
				{
					method: "POST",
					body: payload,
				},
			);
		},
		onSuccess: (response) => {
			if (response?.data?.accessToken) {
				localStorage.setItem("accessToken", response.data.accessToken);
				queryClient.invalidateQueries({ queryKey: ["me"] });
			}
		},
	});
};

// 5. Forgot Password Hook
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

// 6. Reset Password Hook
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

// 7. Refresh Token Hook
export const useRefreshToken = () => {
	return useMutation({
		mutationFn: async () => {
			return await apiClient<IAuthResponse<{ accessToken: string }>>(
				"/auth/refresh-token",
				{
					method: "POST",
				},
			);
		},
		onSuccess: (response) => {
			if (response?.data?.accessToken) {
				localStorage.setItem("accessToken", response.data.accessToken);
			}
		},
	});
};

// 8. Logout Hook
export const useLogout = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			return await apiClient<IAuthResponse>("/auth/logout", {
				method: "POST",
			});
		},
		onSuccess: () => {
			localStorage.removeItem("accessToken");
			queryClient.clear();
		},
	});
};

// 9. Fetch Logged-in User Profile (Instant Cache Optimized)
export const useGetMe = () => {
	const isClient = typeof window !== "undefined";
	const hasToken = isClient ? !!localStorage.getItem("accessToken") : false;

	return useQuery({
		queryKey: ["me"],
		queryFn: async () => {
			const response = await apiClient<IAuthResponse<IUser>>("/auth/me");
			return response.data;
		},
		enabled: hasToken, // ⚡ Token na thakle API request-i jabe na
		staleTime: 1000 * 60 * 15, // ⚡ 15 min cache active thakbe
		gcTime: 1000 * 60 * 30, // ⚡ 30 min garbage collection
		retry: false,
	});
};