"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: "ADMIN" | "DONOR" | "REQUESTER";
  isActive: boolean;
  donorApplicationStatus?: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
  donorProfile?: {
    id: string;
    bloodGroup?: string;
    dateOfBirth?: string;
    division?: string;
    district?: string;
    address?: string;
    approvedAt?: string | null;
    rejectedAt?: string | null;
    rejectReason?: string | null;
  } | null;
  bloodRequests?: any[];
}

export interface UsersQuery {
  search?: string;
  role?: string;
  isActive?: string;
  page?: number;
  limit?: number;
}

export interface AuditLogsQuery {
  entity?: string;
  action?: string;
  userId?: string;
  page?: number;
  limit?: number;
}

export const adminKeys = {
  all: ["admin"] as const,
  dashboard: () => [...adminKeys.all, "dashboard"] as const,
  donorApplications: () => [...adminKeys.all, "donor-applications"] as const,
  users: (query: UsersQuery) => [...adminKeys.all, "users", query] as const,
  user: (userId: string) => [...adminKeys.all, "user", userId] as const,
  bloodRequests: () => [...adminKeys.all, "blood-requests"] as const,
  auditLogs: (query: AuditLogsQuery) => [...adminKeys.all, "audit-logs", query] as const,
};

// GET /admin/dashboard
export const useAdminDashboard = () => {
  return useQuery({
    queryKey: adminKeys.dashboard(),
    queryFn: async () => {
      const response = await apiClient<ApiResponse<any>>("/admin/dashboard", { method: "GET" });
      return response.data;
    },
  });
};

// GET /admin/donor-applications
export const useDonorApplications = () => {
  return useQuery({
    queryKey: adminKeys.donorApplications(),
    queryFn: async () => {
      const response = await apiClient<any>("/admin/donor-applications", { method: "GET" });
      return response.data || response || [];
    },
  });
};

/// PATCH /admin/donor/:userId/approve
export const useApproveDonor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      return apiClient<ApiResponse<AdminUser>>(`/admin/donor/${userId}/approve`, {
        method: "PATCH",
      });
    },
    onSuccess: () => {
      // Invalidate all admin queries to immediately update UI
      queryClient.invalidateQueries({ queryKey: adminKeys.all });
    },
  });
};

// PATCH /admin/donor/:userId/reject
export const useRejectDonor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      payload,
    }: {
      userId: string;
      payload: { reason?: string };
    }) => {
      return apiClient<ApiResponse<AdminUser>>(`/admin/donor/${userId}/reject`, {
        method: "PATCH",
        body: payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all });
    },
  });
};

// GET /admin/users
export const useAdminUsers = (query: UsersQuery) => {
  return useQuery({
    queryKey: adminKeys.users(query),
    queryFn: async () => {
      const response = await apiClient<any>("/admin/users", {
        method: "GET",
        query,
      });
      return response.data || response;
    },
  });
};

// GET /admin/users/:userId
export const useAdminUser = (userId: string) => {
  return useQuery({
    queryKey: adminKeys.user(userId),
    enabled: Boolean(userId && userId.trim() !== ""),
    queryFn: async () => {
      const response = await apiClient<any>(`/admin/users/${userId}`, { method: "GET" });
      return response.data || response;
    },
  });
};

// PATCH /admin/users/:userId/status
export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, payload }: { userId: string; payload: { isActive: boolean } }) => {
      return apiClient<ApiResponse<AdminUser>>(`/admin/users/${userId}/status`, {
        method: "PATCH",
        body: payload,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all });
      queryClient.invalidateQueries({ queryKey: adminKeys.user(variables.userId) });
    },
  });
};

// DELETE /admin/users/:userId
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      return apiClient<ApiResponse<null>>(`/admin/users/${userId}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all });
    },
  });
};

// GET /admin/blood-requests
export const useAdminBloodRequests = () => {
  return useQuery({
    queryKey: adminKeys.bloodRequests(),
    queryFn: async () => {
      try {
        const response = await apiClient<any>("/admin/blood-requests", { method: "GET" });
        const raw = response?.data?.data || response?.data || response;
        if (Array.isArray(raw)) return raw;
      } catch {
        const response = await apiClient<any>("/blood-requests", { method: "GET" });
        const raw = response?.data?.data || response?.data || response;
        if (Array.isArray(raw)) return raw;
      }
      return [];
    },
  });
};

// PATCH /admin/blood-requests/:requestId/verify
export const useVerifyBloodRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestId: string) => {
      return apiClient<ApiResponse<unknown>>(`/admin/blood-requests/${requestId}/verify`, { method: "PATCH" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all });
    },
  });
};

