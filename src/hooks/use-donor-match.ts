"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import type { IDonorMatch } from "@/types/donor-match.type";

export const matchKeys = {
  all: ["donor-matches"] as const,
  myMatches: () => [...matchKeys.all, "my-matches"] as const,
  forRequest: (requestId: string) => [...matchKeys.all, "request", requestId] as const,
};

// GET /donor-matches/request/:requestId (Get Matches for a Specific Request)
export const useGetMatchesForRequest = (requestId: string) => {
  return useQuery({
    queryKey: matchKeys.forRequest(requestId),
    queryFn: async () => {
      const response = await apiClient<any>(`/donor-matches/request/${requestId}`, {
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

// GET /donor-matches/my-matches (For Donor)
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

// PATCH /donor-matches/:id/accept
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

// PATCH /donor-matches/:id/reject
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