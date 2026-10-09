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
          toast.success("Redirecting to payment gateway...");
          
          const redirectUrl =
            res?.checkoutUrl ||
            res?.bkashUrl ||
            res?.data?.checkoutUrl ||
            res?.data?.bkashUrl;

          if (redirectUrl) {
            
            window.location.href = redirectUrl;
          } else {
            toast.error("Payment redirect URL missing from server.");
          }
        },
        onError: (err: any) => {
          toast.error(err?.message || "Failed to initiate payment.");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0d14] p-6 shadow-2xl">
        {/* Header */}
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

        <div className="my-5 space-y-4">
          <p className="text-xs text-zinc-400">
            Assistance fee for donor matching & emergency notification dispatch for{" "}
            <strong className="text-white">{patientName}</strong>.
          </p>

          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">
              Total Payable Amount
            </span>
            <h2 className="mt-1 text-3xl font-black text-white">500 BDT</h2>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-xs font-semibold text-zinc-400">
              Select Payment Gateway
            </legend>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setProvider("BKASH")}
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
                className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition ${
                  provider === "STRIPE"
                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                    : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10"
                }`}
              >
                <CreditCard className="h-4 w-4" /> Card / Stripe
              </button>
            </div>
          </fieldset>
        </div>

      
        <button
          type="button"
          onClick={handlePayment}
          disabled={createPaymentMutation.isPending}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-3.5 text-xs font-bold text-white shadow-lg shadow-red-600/30 transition hover:brightness-110 disabled:opacity-50"
        >
          {createPaymentMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ShieldCheck className="h-4 w-4" />
          )}
          <span>
            {createPaymentMutation.isPending
              ? "Connecting Gateway..."
              : `Pay 500 BDT with ${provider}`}
          </span>
        </button>
      </div>
    </div>
  );
}