"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";

export interface DonorProfile {
  id: string;
  userId: string;
  bloodGroup: string;
  dateOfBirth?: string | null;
  division: string;
  district: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  appliedAt?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  rejectReason?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface DonorProfileResponse {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: string;
  donorProfile: DonorProfile;
}

export interface DonorApplicationStatus {
  role: string;
  applicationStatus: "NONE" | "PENDING" | "APPROVED" | "REJECTED";
  donorProfile: DonorProfile | null;
}

export interface ApplyDonorPayload {
  bloodGroup: string;
  dateOfBirth?: string;
  division: string;
  district: string;
  address: string;
  latitude?: number;
  longitude?: number;
}

export interface UpdateDonorProfilePayload {
  bloodGroup?: string;
  dateOfBirth?: string;
  division?: string;
  district?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

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