"use client";

import { useParams, useRouter } from "next/navigation";
import { useAdminUser, useApproveDonor, useRejectDonor } from "@/hooks/use-admin";
import AdminHeader from "@/components/admin/admin-header";
import { ArrowLeft, CheckCircle2, XCircle, Clock, Droplets, MapPin, Calendar } from "lucide-react";
import { useState } from "react";

export default function SingleDonorApplicationPage() {
  const params = useParams();
  const router = useRouter();

  const rawId = params?.id;
  const userId = typeof rawId === "string" ? rawId : Array.isArray(rawId) ? rawId[0] : "";

  const { data: user, isLoading, isError } = useAdminUser(userId);
  const approveMutation = useApproveDonor();
  const rejectMutation = useRejectDonor();

  const [rejectReason, setRejectReason] = useState("");
  const [showRejectInput, setShowRejectInput] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-xs font-semibold text-zinc-500 animate-pulse">
        Loading donor application details...
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center text-xs text-red-400">
        <p className="font-bold">Donor application details could not be found.</p>
        <button
          type="button"
          onClick={() => router.back()}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 font-bold text-white hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4" /> Go Back
        </button>
      </div>
    );
  }

  const status = user.donorApplicationStatus || "PENDING";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <AdminHeader title={`Application: ${user.name}`} description="Review applicant credentials." />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-6 backdrop-blur-xl">
          <div className="text-center">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase ${
                status === "APPROVED"
                  ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                  : status === "REJECTED"
                  ? "border border-rose-500/20 bg-rose-500/10 text-rose-400"
                  : "border border-amber-500/20 bg-amber-500/10 text-amber-400"
              }`}
            >
              {status === "APPROVED" && <CheckCircle2 className="h-3.5 w-3.5" />}
              {status === "REJECTED" && <XCircle className="h-3.5 w-3.5" />}
              {status === "PENDING" && <Clock className="h-3.5 w-3.5" />}
              {status}
            </span>

            <h3 className="mt-4 text-base font-bold text-white">{user.name}</h3>
            <p className="text-xs text-zinc-500">{user.email}</p>
          </div>

          {status === "PENDING" && (
            <div className="mt-6 space-y-3 border-t border-white/5 pt-4">
              <button
                type="button"
                onClick={() =>
                  approveMutation.mutate(user.id, {
                    onSuccess: () => router.push("/admin/donor-applications"),
                  })
                }
                disabled={approveMutation.isPending}
                className="w-full rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-lg transition hover:bg-emerald-700 disabled:opacity-50"
              >
                Approve Application
              </button>

              {!showRejectInput ? (
                <button
                  type="button"
                  onClick={() => setShowRejectInput(true)}
                  className="w-full rounded-xl border border-rose-500/30 bg-rose-500/10 py-2.5 text-xs font-bold text-rose-400 hover:bg-rose-500/20"
                >
                  Reject Application
                </button>
              ) : (
                <div className="space-y-2 pt-2">
                  <textarea
                    rows={2}
                    placeholder="Reason for rejection..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#05070a] p-2.5 text-xs text-white placeholder-zinc-600 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      rejectMutation.mutate(
                        { userId: user.id, payload: { reason: rejectReason } },
                        { onSuccess: () => router.push("/admin/donor-applications") }
                      )
                    }
                    disabled={rejectMutation.isPending}
                    className="w-full rounded-xl bg-rose-600 py-2 text-xs font-bold text-white hover:bg-rose-700 disabled:opacity-50"
                  >
                    Confirm Rejection
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-6 backdrop-blur-xl">
            <h3 className="text-sm font-bold text-white">Application Credentials</h3>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 text-xs">
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <p className="text-zinc-500">Blood Group</p>
                <p className="mt-1 text-sm font-bold text-red-400">{user.donorProfile?.bloodGroup || "N/A"}</p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <p className="text-zinc-500">Location</p>
                <p className="mt-1 font-semibold text-white">
                  {user.donorProfile?.district || "N/A"}, {user.donorProfile?.division || "N/A"}
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 sm:col-span-2">
                <p className="text-zinc-500">Address</p>
                <p className="mt-1 font-semibold text-white">{user.donorProfile?.address || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}