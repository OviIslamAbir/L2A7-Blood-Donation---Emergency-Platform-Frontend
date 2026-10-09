"use client";

import Link from "next/link";
import { XCircle, RefreshCw } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="w-full max-w-md rounded-2xl border border-rose-500/20 bg-[#0a0d14] p-8 shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400">
          <XCircle className="h-10 w-10" />
        </div>

        <h1 className="mt-5 text-xl font-black text-white">Payment Cancelled or Failed</h1>
        <p className="mt-2 text-xs text-zinc-400">
          The transaction was not completed. You can try processing the payment again from your request portal.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/requester/my-requests"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-3 text-xs font-bold text-white shadow-lg hover:brightness-110"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again from My Requests</span>
          </Link>
        </div>
      </div>
    </div>
  );
}