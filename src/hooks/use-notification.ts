"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import type { INotificationQuery } from "@/types/notification";

export const notificationKeys = {
  all: ["notifications"] as const,
  myNotifications: (query?: INotificationQuery) =>
    [...notificationKeys.all, "my-notifications", query] as const,
  unreadCount: () => [...notificationKeys.all, "unread-count"] as const,
};

// 1. GET /notifications (Donor - Get Notifications)
export const useGetMyNotifications = (query: INotificationQuery = {}) => {
  const queryParams = new URLSearchParams(
    Object.entries(query).reduce((acc, [key, val]) => {
      if (val !== undefined) acc[key] = String(val);
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  return useQuery({
    queryKey: notificationKeys.myNotifications(query),
    queryFn: async () => {
      const res = await apiClient<any>(`/notifications?${queryParams}`, {
        method: "GET",
      });
      return res?.data || res;
    },
  });
};

// 2. GET /notifications/unread-count (Donor - Unread Count)
export const useGetUnreadNotificationCount = () => {
  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: async () => {
      const res = await apiClient<any>("/notifications/unread-count", {
        method: "GET",
      });
      return res?.data?.unreadCount ?? res?.unreadCount ?? 0;
    },
    refetchInterval: 15000, // Every 15 seconds
  });
};

// 3. PATCH /notifications/:id/read (Donor - Mark Notification Read)
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      return await apiClient<any>(`/notifications/${notificationId}/read`, {
        method: "PATCH",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
};

// 4. PATCH /notifications/read-all (Donor - Mark All Read)
export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await apiClient<any>("/notifications/read-all", {
        method: "PATCH",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
};

// 5. DELETE /notifications/:id (Donor - Delete Notification)
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      return await apiClient<any>(`/notifications/${notificationId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
};