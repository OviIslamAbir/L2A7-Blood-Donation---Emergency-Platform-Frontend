"use client";

import { useState } from "react";
import {
  useGetMyBloodRequests,
  useMatchDonorsForRequest,
  useCancelBloodRequest,
} from "@/hooks/use-blood-request";
import type { IBloodRequest } from "@/types/blood-request.type";
import CheckoutModal from "@/components/requester/checkout-modal";
import MatchedDonorsModal from "@/components/requester/matched-donors-model";
import EditRequestModal from "@/components/requester/edit-request-modal";
import {
  Search,
  MapPin,
  CreditCard,
  ShieldAlert,
  X,
  Users,
  Edit,
  Loader2,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

export default function MyBloodRequestsPage() {
  const { data: requests = [], isLoading, refetch } = useGetMyBloodRequests();
  const matchMutation = useMatchDonorsForRequest();
  const cancelMutation = useCancelBloodRequest();

  // Modal States
  const [paymentReq, setPaymentReq] = useState<{ id: string; name: string } | null>(null);
  const [viewMatchesReq, setViewMatchesReq] = useState<{ id: string; name: string } | null>(null);
  const [editReq, setEditReq] = useState<IBloodRequest | null>(null);

  const handleMatchDonors = (requestId: string) => {
    matchMutation.mutate(requestId, {
      onSuccess: (res: any) => {
        toast.success(res?.message || "Compatible donors matched!");
        refetch();
      },
      onError: (err: any) => {
        toast.error(err?.message || "Failed to match donors.");
      },
    });
  };

  const handleCancel = (requestId: string) => {
    cancelMutation.mutate(requestId, {
      onSuccess: () => {
        toast.success("Request cancelled successfully.");
        refetch();
      },
      onError: (err: any) => {
        toast.error(err?.message || "Failed to cancel request.");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center space-y-3">
        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
        <p className="text-xs font-semibold text-zinc-500">
          Loading your blood requests...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="border-b border-white/5 pb-4">
        <h1 className="text-xl font-black text-white">My Blood Requests</h1>
        <p className="text-xs text-zinc-400">
          Track donor matching progress, trigger algorithms, edit details, or pay processing fees.
        </p>
      </div>

      <div className="space-y-4">
        {requests.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#0a0d14] p-8 text-center text-xs text-zinc-500">
            No blood requests created yet.
          </div>
        ) : (
          requests.map((req) => (
            <div
              key={req.id}
              className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-[#0a0d14] p-5 sm:flex-row sm:items-center"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex h-7 min-w-[2.5rem] items-center justify-center rounded-lg bg-red-600 px-2.5 text-xs font-black text-white shadow-md">
                    {req.bloodGroup.replace("_", " ")}
                  </span>
                  <span className="text-xs font-bold text-zinc-300">
                    {req.units} Bag(s)
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-extrabold text-zinc-400">
                    STATUS: {req.status}
                  </span>
                  {req.urgency === "CRITICAL" && (
                    <span className="flex items-center gap-1 rounded-md bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400 border border-red-500/30">
                      <ShieldAlert className="h-3 w-3" /> CRITICAL
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white">{req.patientName}</h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-red-500" />
                    {req.hospitalName}, {req.hospitalAddress}
                  </span>
                  {req.neededAt && (
                    <span className="flex items-center gap-1.5 text-zinc-500">
                      <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                      Needed: {new Date(req.neededAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 sm:justify-end">
                {/* View Matched Donors Modal Button */}
                <button
                  type="button"
                  onClick={() => setViewMatchesReq({ id: req.id, name: req.patientName })}
                  className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-zinc-300 hover:bg-white/10 hover:text-white"
                >
                  <Users className="h-3.5 w-3.5 text-blue-400" />
                  <span>View Matches</span>
                </button>

                {(req.status === "PENDING" || req.status === "MATCHING") && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleMatchDonors(req.id)}
                      disabled={matchMutation.isPending}
                      className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-50"
                    >
                      <Search className="h-3.5 w-3.5" />
                      <span>Find Donors</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditReq(req)}
                      className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-zinc-300 hover:bg-white/10"
                    >
                      <Edit className="h-3.5 w-3.5 text-amber-400" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentReq({ id: req.id, name: req.patientName })}
                      className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-xs font-bold text-red-400 hover:bg-red-500/20"
                    >
                      <CreditCard className="h-3.5 w-3.5" />
                      <span>Pay Fee</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCancel(req.id)}
                      disabled={cancelMutation.isPending}
                      className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-zinc-400 hover:bg-white/10 hover:text-rose-400"
                    >
                      <X className="h-3.5 w-3.5" />
                      <span>Cancel</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      {paymentReq && (
        <CheckoutModal
          requestId={paymentReq.id}
          patientName={paymentReq.name}
          isOpen={!!paymentReq}
          onClose={() => setPaymentReq(null)}
        />
      )}

      {viewMatchesReq && (
        <MatchedDonorsModal
          requestId={viewMatchesReq.id}
          patientName={viewMatchesReq.name}
          isOpen={!!viewMatchesReq}
          onClose={() => setViewMatchesReq(null)}
        />
      )}

      {editReq && (
        <EditRequestModal
          request={editReq}
          isOpen={!!editReq}
          onClose={() => setEditReq(null)}
          onSuccess={refetch}
        />
      )}
    </div>
  );
}