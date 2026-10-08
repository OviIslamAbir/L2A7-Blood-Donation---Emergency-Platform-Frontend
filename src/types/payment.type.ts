import { IBloodRequest } from "./blood-request.type";

export type PaymentProvider = "STRIPE" | "BKASH";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED";

export interface ICreatePaymentPayload {
  requestId: string;
  amount: number;
  provider: PaymentProvider;
}

export interface IPayment {
  id: string;
  userId: string;
  requestId: string;
  amount: number;
  currency: string;
  provider: PaymentProvider;
  status: PaymentStatus;
  transactionId?: string;
  paidAt?: string;
  createdAt: string;
  request?: IBloodRequest;
}