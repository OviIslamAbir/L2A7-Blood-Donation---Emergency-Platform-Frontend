"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AdminStats {
  totalUsers?: number;
  totalDonors?: number;
  totalRequesters?: number;
  totalBloodRequests?: number;
  pendingDonorApplications?: number;
  pendingBloodRequests?: number;
  totalDonations?: number;
  users?: {
    total: number;
    requesters: number;
    donors: number;
    admins: number;
    active: number;
    inactive: number;
  };
  donorApplications?: {
    pending: number;
    approved: number;
    rejected: number;
  };
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: "ADMIN" | "DONOR" | "REQUESTER";
  isActive: boolean;
  emailVerified?: boolean;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
  donorProfile?: {
    bloodGroup?: string;
    dateOfBirth?: string;
    division?: string;
    district?: string;
    address?: string;
  } | null;
}

export interface UsersQuery {
  search?: string;
  role?: string;
  isActive?: string;
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface UsersResult {
  meta: PaginationMeta;
  data: AdminUser[];
}

export interface RejectDonorPayload {
  reason?: string;
}

export interface UpdateUserStatusPayload {
  isActive: boolean;
}

export const adminKeys = {
  all: ["admin"] as const,
  dashboard: () => [...adminKeys.all, "dashboard"] as const,
  donorApplications: () => [...adminKeys.all, "donor-applications"] as const,
  pendingDonorApplications: () =>
    [...adminKeys.donorApplications(), "pending"] as const,
  users: (query: UsersQuery) => [...adminKeys.all, "users", query] as const,
  user: (userId: string) => [...adminKeys.all, "user", userId] as const,
};

// GET /admin/dashboard
export const useAdminDashboard = () => {
  return useQuery({
    queryKey: adminKeys.dashboard(),
    queryFn: async () => {
      const response = await apiClient<ApiResponse<AdminStats>>("/admin/dashboard", {
        method: "GET",
      });
      return response.data;
    },
  });
};

// GET /admin/donor-applications
export const useDonorApplications = () => {
  return useQuery({
    queryKey: adminKeys.donorApplications(),
    queryFn: async () => {
      const response = await apiClient<ApiResponse<AdminUser[]>>(
        "/admin/donor-applications",
        { method: "GET" }
      );
      return response.data;
    },
  });
};

// GET /admin/donor-applications/pending
export const usePendingDonorApplications = () => {
  return useQuery({
    queryKey: adminKeys.pendingDonorApplications(),
    queryFn: async () => {
      const response = await apiClient<ApiResponse<AdminUser[]>>(
        "/admin/donor-applications/pending",
        { method: "GET" }
      );
      return response.data;
    },
  });
};

// PATCH /admin/donor/:userId/approve
export const useApproveDonor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      return apiClient<ApiResponse<AdminUser>>(`/admin/donor/${userId}/approve`, {
        method: "PATCH",
      });
    },
    onSuccess: () => {
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
      payload: RejectDonorPayload;
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
      const response = await apiClient<ApiResponse<UsersResult>>("/admin/users", {
        method: "GET",
        query,
      });
      return response.data;
    },
  });
};

// GET /admin/users/:userId
export const useAdminUser = (userId: string) => {
  return useQuery({
    queryKey: adminKeys.user(userId),
    enabled: Boolean(userId),
    queryFn: async () => {
      const response = await apiClient<ApiResponse<AdminUser>>(
        `/admin/users/${userId}`,
        { method: "GET" }
      );
      return response.data;
    },
  });
};

// PATCH /admin/users/:userId/status
export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      payload,
    }: {
      userId: string;
      payload: UpdateUserStatusPayload;
    }) => {
      return apiClient<ApiResponse<AdminUser>>(`/admin/users/${userId}/status`, {
        method: "PATCH",
        body: payload,
      });
    },
    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all });
      queryClient.invalidateQueries({
        queryKey: adminKeys.user(variables.userId),
      });
    },
  });
};

// DELETE /admin/users/:userId
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      return apiClient<ApiResponse<null>>(`/admin/users/${userId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all });
    },
  });
};

// PATCH /admin/blood-requests/:requestId/verify
export const useVerifyBloodRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestId: string) => {
      return apiClient<ApiResponse<unknown>>(
        `/admin/blood-requests/${requestId}/verify`,
        { method: "PATCH" }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all });
      queryClient.invalidateQueries({ queryKey: ["blood-requests"] });
    },
  });
};