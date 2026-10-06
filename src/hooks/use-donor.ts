"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { ApplyDonorPayload, UpdateDonorProfilePayload } from "@/types/donor";



export const donorKeys = {
  all: ["donor"] as const,
  profile: () => [...donorKeys.all, "profile"] as const,
  applicationStatus: () => [...donorKeys.all, "application-status"] as const,
};

// GET /donor/profile
export function useDonorProfile() {
  return useQuery({
    queryKey: donorKeys.profile(),
    queryFn: async () => {
      const response = await apiClient<any>("/donors/profile", { method: "GET" });
      return response.data || response;
    },
  });
}

// GET /donor/application-status
export function useDonorApplicationStatus() {
  return useQuery({
    queryKey: donorKeys.applicationStatus(),
    queryFn: async () => {
      const response = await apiClient<any>("/donors/application-status", { method: "GET" });
      return response.data || response;
    },
  });
}

// POST /auth/apply-donor
export function useApplyForDonor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ApplyDonorPayload) => {
      return apiClient<any>("/auth/apply-donor", {
        method: "POST",
        body: payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: donorKeys.all });
    },
  });
}

// PATCH /donor/profile
export function useUpdateDonorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateDonorProfilePayload) => {
      return apiClient<any>("/donor/profile", {
        method: "PATCH",
        body: payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: donorKeys.profile() });
      queryClient.invalidateQueries({ queryKey: donorKeys.applicationStatus() });
    },
  });
}