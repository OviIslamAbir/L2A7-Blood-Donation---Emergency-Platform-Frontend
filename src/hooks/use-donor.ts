"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { ApplyDonorPayload, UpdateDonorProfilePayload } from "@/types/donor";



export const donorKeys = {
  all: ["donor"] as const,
  profile: () => [...donorKeys.all, "profile"] as const,
  applicationStatus: () => [...donorKeys.all, "application-status"] as const,
};


export function useDonorProfile() {
  return useQuery({
    queryKey: donorKeys.profile(),
    queryFn: async () => {
      const response = await apiClient<any>("/donors/profile", { method: "GET" });
      return response.data || response;
    },
  });
}


export function useDonorApplicationStatus() {
  return useQuery({
    queryKey: donorKeys.applicationStatus(),
    queryFn: async () => {
      const response = await apiClient<any>("/donors/application-status", { method: "GET" });
      return response.data || response;
    },
  });
}

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