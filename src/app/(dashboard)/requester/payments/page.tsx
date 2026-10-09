"use client";

import { useGetMyPayments } from "@/hooks/use-payment";
import type { IPayment } from "@/types/payment.type";
import {
  CreditCard,
  Smartphone,
  ShieldCheck,
  AlertCircle,
  Clock,
  XCircle,
  Loader2,
  Receipt,
  Calendar,
} from "lucide-react";

export default function RequesterPaymentsPage() {
  const { data: payments = [], isLoading } = useGetMyPayments();

  const getStatusBadge = (status: IPayment["status"]) => {
    switch (status) {
      case "PAID":
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" /> PAID
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[11px] font-bold text-amber-400">
            <Clock className="h-3.5 w-3.5" /> PENDING
          </span>
        );
      case "FAILED":
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-[11px] font-bold text-rose-400">
            <XCircle className="h-3.5 w-3.5" /> FAILED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-zinc-500/20 bg-zinc-500/10 px-2.5 py-1 text-[11px] font-bold text-zinc-400">
            <AlertCircle className="h-3.5 w-3.5" /> {status}
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center space-y-3">
        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
        <p className="text-xs font-semibold text-zinc-500">
          Loading payment history...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-1 border-b border-white/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-black text-white">Payment History</h1>
          <p className="text-xs text-zinc-400">
            View all your transaction receipts and fee records.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0a0d14] px-3 py-1.5 text-xs text-zinc-400">
          <Receipt className="h-4 w-4 text-red-400" />
          <span>
            Total Transactions:{" "}
            <strong className="text-white">{payments.length}</strong>
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {payments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#0a0d14] p-12 text-center">
            <CreditCard className="mx-auto h-10 w-10 text-zinc-600" />
            <h3 className="mt-3 text-sm font-bold text-zinc-300">
              No Payments Found
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              You haven&apos;t processed any payments yet.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d14]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="border-b border-white/10 bg-white/[0.02] text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  <tr>
                    <th className="px-5 py-3.5">Transaction ID / Request</th>
                    <th className="px-5 py-3.5">Gateway</th>
                    <th className="px-5 py-3.5">Amount</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="transition hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-4">
                        <div className="font-bold text-white">
                          {payment.request?.patientName ? (
                            <span>Patient: {payment.request.patientName}</span>
                          ) : (
                            <span>Payment #{payment.id.slice(-6)}</span>
                          )}
                        </div>
                        <div className="mt-0.5 font-mono text-[10px] text-zinc-500">
                          Trx: {payment.transactionId || payment.id}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 font-semibold text-zinc-300">
                          {payment.provider === "BKASH" ? (
                            <>
                              <Smartphone className="h-3.5 w-3.5 text-pink-400" />
                              <span>bKash</span>
                            </>
                          ) : (
                            <>
                              <CreditCard className="h-3.5 w-3.5 text-blue-400" />
                              <span>Stripe / Card</span>
                            </>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="text-sm font-black text-white">
                          {payment.amount} {payment.currency || "BDT"}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        {getStatusBadge(payment.status)}
                      </td>

                      <td className="px-5 py-4 text-zinc-400">
                        <div className="flex items-center gap-1 text-[11px]">
                          <Calendar className="h-3 w-3 text-zinc-500" />
                          {new Date(payment.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}