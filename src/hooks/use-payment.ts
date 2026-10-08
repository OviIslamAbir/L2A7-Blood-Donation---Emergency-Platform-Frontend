// src/hooks/use-payment.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import type { ICreatePaymentPayload, IPayment } from "@/types/payment.type";

export const paymentKeys = {
  all: ["payments"] as const,
  myPayments: () => [...paymentKeys.all, "my-payments"] as const,
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ICreatePaymentPayload) => {
      return await apiClient<any>("/payments/create", {
        method: "POST",
        body: payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all });
    },
  });
};

export const useGetMyPayments = () => {
  return useQuery({
    queryKey: paymentKeys.myPayments(),
    queryFn: async () => {
      const response = await apiClient<any>("/payments/my-payments", { method: "GET" });
      return (response?.data || response || []) as IPayment[];
    },
  });
};