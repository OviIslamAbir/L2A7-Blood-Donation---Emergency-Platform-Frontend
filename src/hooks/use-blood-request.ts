"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import type {
  ICreateBloodRequestPayload,
  IUpdateBloodRequestPayload,
  IBloodRequest,
} from "@/types/blood-request.type";

export const bloodRequestKeys = {
  all: ["blood-requests"] as const,
  myRequests: () => [...bloodRequestKeys.all, "my-requests"] as const,
  single: (id: string) => [...bloodRequestKeys.all, "single", id] as const,
};

// 1. POST /blood-requests (Create Blood Request)
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
      queryClient.invalidateQueries({ queryKey: bloodRequestKeys.all });
    },
  });
};

// 2. GET /blood-requests (Get Requester's Blood Requests)
export const useGetMyBloodRequests = () => {
  return useQuery({
    queryKey: bloodRequestKeys.myRequests(),
    queryFn: async () => {
      const response = await apiClient<any>("/blood-requests", {
        method: "GET",
      });

      if (Array.isArray(response)) return response as IBloodRequest[];
      if (Array.isArray(response?.data)) return response.data as IBloodRequest[];
      if (Array.isArray(response?.requests)) return response.requests as IBloodRequest[];
      if (Array.isArray(response?.data?.requests)) return response.data.requests as IBloodRequest[];

      return [] as IBloodRequest[];
    },
  });
};

// 3. GET /blood-requests/:id (Get Single Blood Request)
export const useGetSingleBloodRequest = (requestId: string) => {
  return useQuery({
    queryKey: bloodRequestKeys.single(requestId),
    queryFn: async () => {
      const response = await apiClient<any>(`/blood-requests/${requestId}`, {
        method: "GET",
      });
      return (response?.data || response) as IBloodRequest;
    },
    enabled: !!requestId && requestId !== "undefined" && requestId.trim() !== "",
    retry: false,
  });
};

// 4. PATCH /blood-requests/:id (Update Pending Blood Request)
export const useUpdateBloodRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: IUpdateBloodRequestPayload;
    }) => {
      return await apiClient<any>(`/blood-requests/${id}`, {
        method: "PATCH",
        body: payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bloodRequestKeys.all });
    },
  });
};

// 5. DELETE /blood-requests/:id (Cancel Blood Request - Exact match with backend)
export const useCancelBloodRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: string) => {
      return await apiClient<any>(`/blood-requests/${requestId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bloodRequestKeys.all });
    },
  });
};

// 6. POST /donor-matches/match/:requestId (Trigger Donor Matching Service)
export const useMatchDonorsForRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: string) => {
      return await apiClient<any>(`/donor-matches/${requestId}/match`, {
        method: "POST",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bloodRequestKeys.all });
      queryClient.invalidateQueries({ queryKey: ["donor-matches"] });
    },
  });
};