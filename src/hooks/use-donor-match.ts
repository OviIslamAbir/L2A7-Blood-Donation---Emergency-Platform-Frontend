"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import type { IDonorMatch } from "@/types/donor-match.type";

export const matchKeys = {
  all: ["donor-matches"] as const,
  myMatches: () => [...matchKeys.all, "my-matches"] as const,
};

// GET /donor-matches/my-matches
export const useGetMyMatches = () => {
  return useQuery({
    queryKey: matchKeys.myMatches(),
    queryFn: async () => {
      const response = await apiClient<any>("/donor-matches/my-matches", {
        method: "GET",
      });

      // Backend: { message, totalMatches, matches } or { data: { matches } }
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
      queryClient.invalidateQueries({ queryKey: ["donations"] });
      queryClient.invalidateQueries({ queryKey: ["my-notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unread-notifications-count"] });
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
      queryClient.invalidateQueries({ queryKey: ["my-notifications"] });
    },
  });
};