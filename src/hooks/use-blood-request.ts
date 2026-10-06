"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import type {
  ICreateBloodRequestPayload,
  IUpdateBloodRequestPayload,
  IBloodRequest,
} from "@/types/blood-request.type";

export const useCreateBloodRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ICreateBloodRequestPayload) => {
      return await apiClient<any>("/blood-requests", {
        method: "POST",
        body: payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-blood-requests"] });
    },
  });
};

export const useGetMyBloodRequests = () => {
  return useQuery({
    queryKey: ["my-blood-requests"],
    queryFn: async () => {
      const res = await apiClient<any>("/blood-requests/my-requests", { method: "GET" });
      return (res?.data?.requests || res?.requests || []) as IBloodRequest[];
    },
  });
};

export const useCancelBloodRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestId: string) => {
      return await apiClient<any>(`/blood-requests/${requestId}/cancel`, {
        method: "PATCH",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-blood-requests"] });
    },
  });
};