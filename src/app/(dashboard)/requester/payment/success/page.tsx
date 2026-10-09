"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="w-full max-w-md rounded-2xl border border-emerald-500/20 bg-[#0a0d14] p-8 shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <h1 className="mt-5 text-xl font-black text-white">Payment Successful!</h1>
        <p className="mt-2 text-xs text-zinc-400">
          Your emergency assistance payment has been verified. We are matching nearby compatible blood donors for your request.
        </p>

        <div className="my-6 rounded-xl border border-white/5 bg-white/5 p-4 text-left space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400">Status</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> PAID
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400">Amount</span>
            <span className="font-bold text-white">500.00 BDT</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href="/requester/my-requests"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-3 text-xs font-bold text-white shadow-lg hover:brightness-110"
          >
            <span>Go to My Requests</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/requester/payments"
            className="rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-bold text-zinc-300 hover:bg-white/10"
          >
            View Payment Receipts
          </Link>
        </div>
      </div>
    </div>
  );
}