"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import type { IDonorMatch } from "@/types/donor-match.type";

export const matchKeys = {
  all: ["donor-matches"] as const,
  myMatches: () => [...matchKeys.all, "my-matches"] as const,
  forRequest: (requestId: string) => [...matchKeys.all, "request", requestId] as const,
};


export const useGetMatchesForRequest = (requestId: string) => {
  return useQuery({
    queryKey: matchKeys.forRequest(requestId),
    queryFn: async () => {
      const response = await apiClient<any>(`/donor-matches/${requestId}`, {
        method: "GET",
      });
      const matchesData =
        response?.data?.matches ||
        response?.matches ||
        response?.data ||
        [];
      return matchesData as IDonorMatch[];
    },
    enabled: !!requestId,
  });
};


export const useGetMyMatches = () => {
  return useQuery({
    queryKey: matchKeys.myMatches(),
    queryFn: async () => {
      const response = await apiClient<any>("/donor-matches/my-matches", {
        method: "GET",
      });
      const matchesData =
        response?.data?.matches ||
        response?.matches ||
        response?.data ||
        [];
      return matchesData as IDonorMatch[];
    },
  });
};


export const useAcceptMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (matchId: string) => {
      return await apiClient<any>(`/donor-matches/${matchId}/accept`, {
        method: "PATCH",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: matchKeys.all });
      queryClient.invalidateQueries({ queryKey: ["blood-requests"] });
    },
  });
};

export const useRejectMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (matchId: string) => {
      return await apiClient<any>(`/donor-matches/${matchId}/reject`, {
        method: "PATCH",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: matchKeys.all });
    },
  });
};