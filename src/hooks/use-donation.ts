"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import type {
  IDonation,
  ICreateDonationPayload,
  IUpdateDonationPayload,
} from "@/types/donation.type";

export const donationKeys = {
  all: ["donations"] as const,
  myDonations: () => [...donationKeys.all, "my-donations"] as const,
};

export const useCreateDonation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ICreateDonationPayload) => {
      return await apiClient<any>("/donations", {
        method: "POST",
        body: payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: donationKeys.all });
    },
  });
};

export const useGetMyDonations = () => {
  return useQuery({
    queryKey: donationKeys.myDonations(),
    queryFn: async () => {
      const response = await apiClient<any>("/donations/my-donations", {
        method: "GET",
      });
      return (response?.data || response || []) as IDonation[];
    },
  });
};

export const useCompleteDonation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: IUpdateDonationPayload;
    }) => {
      return await apiClient<any>(`/donations/${id}/complete`, {
        method: "PATCH",
        body: payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: donationKeys.all });
    },
  });
};

export const useCancelDonation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await apiClient<any>(`/donations/${id}/cancel`, {
        method: "PATCH",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: donationKeys.all });
    },
  });
};