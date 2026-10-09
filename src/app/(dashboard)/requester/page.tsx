"use client";

import Link from "next/link";
import { useGetMyBloodRequests } from "@/hooks/use-blood-request";
import { useGetMyPayments } from "@/hooks/use-payment";
import {
  PlusCircle,
  HeartHandshake,
  CreditCard,
  ArrowRight,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function RequesterDashboardPage() {
  const { data: requests = [] } = useGetMyBloodRequests();
  const { data: payments = [] } = useGetMyPayments();

  const activeRequests = requests.filter(
    (r) => r.status === "PENDING" || r.status === "MATCHING"
  ).length;
  const completedDonations = requests.filter(
    (r) => r.status === "COMPLETED"
  ).length;

  return (
    <div className="space-y-6">
      
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-red-950/40 via-[#0a0d14] to-black p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">
              Emergency Requester Hub
            </span>
            <h1 className="text-xl font-black text-white sm:text-2xl">
              Post Blood Requests & Find Donors Nearby
            </h1>
            <p className="text-xs text-zinc-400">
              Request blood bags, manage active cases, and make payments seamlessly.
            </p>
          </div>

          <Link
            href="/requester/create-request"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg transition hover:brightness-110"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create New Request</span>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400">
              Active Requests
            </span>
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <h3 className="mt-3 text-2xl font-black text-white">{activeRequests}</h3>
          <p className="mt-1 text-[11px] text-zinc-500">Matching or Pending</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400">
              Completed Donations
            </span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <h3 className="mt-3 text-2xl font-black text-white">
            {completedDonations}
          </h3>
          <p className="mt-1 text-[11px] text-zinc-500">Blood received</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400">
              Payments Processed
            </span>
            <CreditCard className="h-4 w-4 text-red-400" />
          </div>
          <h3 className="mt-3 text-2xl font-black text-white">
            {payments.length}
          </h3>
          <p className="mt-1 text-[11px] text-zinc-500">Transactions record</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/requester/my-requests"
          className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0a0d14] p-5 transition hover:border-red-500/30"
        >
          <div className="flex items-center gap-3">
            <HeartHandshake className="h-5 w-5 text-red-500" />
            <div>
              <h4 className="text-sm font-bold text-white">Manage My Requests</h4>
              <p className="text-xs text-zinc-400">
                View status and trigger donor matching
              </p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-zinc-500" />
        </Link>

        <Link
          href="/requester/payments"
          className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0a0d14] p-5 transition hover:border-red-500/30"
        >
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-red-500" />
            <div>
              <h4 className="text-sm font-bold text-white">Payment Receipts</h4>
              <p className="text-xs text-zinc-400">
                Track bKash and Stripe payments
              </p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-zinc-500" />
        </Link>
      </div>
    </div>
  );
}