"use client";

import { useState } from "react";
import { useCreatePayment } from "@/hooks/use-payment";
import type { PaymentProvider } from "@/types/payment.type";
import { X, CreditCard, Smartphone, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CheckoutModalProps {
  requestId: string;
  patientName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({
  requestId,
  patientName,
  isOpen,
  onClose,
}: CheckoutModalProps) {
  const [provider, setProvider] = useState<PaymentProvider>("BKASH");
  const createPaymentMutation = useCreatePayment();

  if (!isOpen) return null;

  const handlePayment = () => {
    createPaymentMutation.mutate(
      { requestId, amount: 500, provider },
      {
        onSuccess: (res: any) => {
          toast.success("Redirecting to secure gateway...");
          const checkoutUrl =
            res?.checkoutUrl ||
            res?.bkashUrl ||
            res?.data?.checkoutUrl ||
            res?.data?.bkashUrl;

          if (checkoutUrl) {
            window.location.href = checkoutUrl;
          } else {
            toast.error("Payment redirect URL missing.");
          }
        },
        onError: (err: any) => {
          toast.error(err?.message || "Failed to initiate payment.");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0d14] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-base font-bold text-white">
            Emergency Assistance Fee
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-400 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="my-4 space-y-3">
          <p className="text-xs text-zinc-400">
            Emergency processing fee to find verified donors for{" "}
            <strong className="text-white">{patientName}</strong>.
          </p>

          <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center">
            <span className="text-2xl font-black text-red-500">500 BDT</span>
          </div>

          <div className="space-y-2 pt-2">
            <p className="text-xs font-semibold text-zinc-400">
              Select Payment Gateway
            </p>
            <div
              className="grid grid-cols-2 gap-3"
              role="radiogroup"
              aria-label="Payment provider"
            >
              <button
                type="button"
                onClick={() => setProvider("BKASH")}
                aria-pressed={provider === "BKASH"}
                className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition ${
                  provider === "BKASH"
                    ? "border-pink-500 bg-pink-500/10 text-pink-400"
                    : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10"
                }`}
              >
                <Smartphone className="h-4 w-4" /> bKash Gateway
              </button>

              <button
                type="button"
                onClick={() => setProvider("STRIPE")}
                aria-pressed={provider === "STRIPE"}
                className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition ${
                  provider === "STRIPE"
                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                    : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10"
                }`}
              >
                <CreditCard className="h-4 w-4" /> Card / Stripe
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePayment}
          disabled={createPaymentMutation.isPending}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-3 text-xs font-bold text-white shadow-lg shadow-red-600/30 hover:brightness-110 disabled:opacity-50"
        >
          {createPaymentMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ShieldCheck className="h-4 w-4" />
          )}
          <span>
            {createPaymentMutation.isPending
              ? "Connecting..."
              : "Pay Now & Match Donors"}
          </span>
        </button>
      </div>
    </div>
  );
}