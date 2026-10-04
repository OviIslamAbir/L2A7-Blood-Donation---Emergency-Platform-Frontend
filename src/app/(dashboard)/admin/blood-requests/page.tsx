"use client";

import { useAdminBloodRequests, useVerifyBloodRequest } from "@/hooks/use-admin";
import AdminHeader from "@/components/admin/admin-header";
import {
  Droplets,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  RefreshCw,
  ShieldCheck,
  User,
} from "lucide-react";

export default function AdminBloodRequestsPage() {
  const { data: requests = [], isLoading, isError, refetch, isFetching } = useAdminBloodRequests();
  const verifyMutation = useVerifyBloodRequest();

  const handleVerify = (requestId: string) => {
    verifyMutation.mutate(requestId);
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Blood Requests"
        description="Verify pending emergency blood requests to activate real-time donor notifications."
        action={
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-zinc-200 transition hover:border-red-500/30 hover:bg-white/10"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin text-red-400" : ""}`} />
            Refresh
          </button>
        }
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {["request-skeleton-1", "request-skeleton-2", "request-skeleton-3", "request-skeleton-4"].map((key) => (
            <div key={key} className="h-40 animate-pulse rounded-2xl border border-white/10 bg-[#0a0d14]/70" />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-400">
          Failed to load blood requests. Please check backend router setup.
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/50 p-12 text-center text-zinc-500">
          No blood requests found.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {requests.map((req: any) => {
            const isPending = req.status === "PENDING";
            const isVerified = req.status === "VERIFIED";

            return (
              <div
                key={req.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-5 backdrop-blur-xl transition duration-300 hover:border-red-500/30 hover:bg-[#0c101a]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400">
                      <Droplets className="h-3.5 w-3.5" />
                      Group: {req.bloodGroup}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        isVerified
                          ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                          : "border border-amber-500/20 bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {isVerified ? <ShieldCheck className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      {req.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-semibold text-white">
                      <User className="h-3.5 w-3.5 text-zinc-500" />
                      <span>Patient: {req.patientName}</span>
                    </div>

                    <div className="flex items-center gap-2 text-zinc-400">
                      <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                      <span>{req.hospitalName}, {req.location || req.district || "N/A"}</span>
                    </div>

                    <div className="flex items-center gap-2 text-zinc-400">
                      <Phone className="h-3.5 w-3.5 text-zinc-500" />
                      <span>Contact: {req.contactNumber || "N/A"}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-3">
                  <span className="text-[10px] text-zinc-500">
                    Requested: {new Date(req.createdAt).toLocaleDateString()}
                  </span>

                  {isPending ? (
                    <button
                      type="button"
                      onClick={() => handleVerify(req.id)}
                      disabled={verifyMutation.isPending}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2 text-xs font-bold text-white shadow-lg transition hover:brightness-110 disabled:opacity-50"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Verify Request
                    </button>
                  ) : (
                    <span className="text-[11px] font-bold text-emerald-400">Verified & Active</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}