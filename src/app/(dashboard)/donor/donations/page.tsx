"use client";

import { useState } from "react";
import {
  useGetMyDonations,
  useCompleteDonation,
  useCancelDonation,
} from "@/hooks/use-donation";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Calendar,
  Droplet,
  FileText,
  AlertCircle,
  HeartHandshake,
  Check,
  X,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

export default function DonorDonationsPage() {
  const { data: donations = [], isLoading, isError, refetch } = useGetMyDonations();
  const completeMutation = useCompleteDonation();
  const cancelMutation = useCancelDonation();

  const [activeNotesId, setActiveNotesId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  // Handle Complete Donation with optional notes
  const handleComplete = (id: string) => {
    completeMutation.mutate(
      {
        id,
        payload: {
          notes: noteText.trim() || "Donated blood successfully at hospital.",
        },
      },
      {
        onSuccess: () => {
          toast.success("Donation Marked as Completed! Thank you hero! ❤️");
          setActiveNotesId(null);
          setNoteText("");
        },
        onError: (err: any) => {
          toast.error(err?.message || "Error completing donation.");
        },
      }
    );
  };

  // Handle Cancel Donation
  const handleCancel = (id: string) => {
    cancelMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Donation appointment cancelled.");
      },
      onError: (err: any) => {
        toast.error(err?.message || "Error cancelling donation.");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center space-y-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
        <p className="text-xs font-semibold text-zinc-500">
          Loading your donation history...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0a0d14] p-6 text-center">
        <AlertCircle className="mb-2 h-8 w-8 text-rose-500" />
        <p className="text-sm font-bold text-white">Failed to load donations</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-3 flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h1 className="text-xl font-black text-white">My Blood Donations</h1>
          <p className="text-xs text-zinc-400">
            Track and manage your scheduled and completed blood donations.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400">
          <Droplet className="h-4 w-4 fill-red-500" />
          <span>{donations.length} Total Records</span>
        </div>
      </div>

      {/* Empty State */}
      {donations.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0a0d14]/50 p-8 text-center">
          <HeartHandshake className="mb-3 h-10 w-10 text-zinc-600" />
          <h3 className="text-sm font-bold text-white">No Donation Records Found</h3>
          <p className="mt-1 max-w-sm text-xs text-zinc-500">
            Accept matched blood requests to start saving lives. Your accepted donation schedule will show up here.
          </p>
        </div>
      ) : (
        /* Donations List Grid */
        <div className="space-y-4">
          {donations.map((d) => {
            const req = d.request;
            const isScheduled = d.status === "SCHEDULED";
            const isCompleted = d.status === "COMPLETED";
            const isCancelled = d.status === "CANCELLED";

            return (
              <div
                key={d.id}
                className={`relative rounded-2xl border p-5 transition duration-200 ${
                  isScheduled
                    ? "border-red-500/30 bg-gradient-to-r from-red-500/5 via-[#0a0d14] to-[#0a0d14]"
                    : "border-white/10 bg-[#0a0d14]"
                }`}
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  {/* Left Info Column */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 min-w-[2.5rem] items-center justify-center rounded-lg bg-red-600 px-2 text-xs font-black text-white shadow-lg shadow-red-600/30">
                        {req?.bloodGroup || "N/A"}
                      </span>
                      <span className="text-xs font-bold text-zinc-300">
                        {req?.units || 1} Bag(s) Required
                      </span>

                      {/* Status Badges */}
                      {isScheduled && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-400">
                          <Clock className="h-3 w-3" /> SCHEDULED
                        </span>
                      )}
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" /> COMPLETED
                        </span>
                      )}
                      {isCancelled && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-0.5 text-[10px] font-bold text-rose-400">
                          <XCircle className="h-3 w-3" /> CANCELLED
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white">
                      Patient: {req?.patientName || "Emergency Patient"}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                      <p className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-red-500" />
                        <span>
                          {req?.hospitalName}, {req?.hospitalAddress}
                        </span>
                      </p>
                      {req?.neededAt && (
                        <p className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                          <span>
                            Needed: {new Date(req.neededAt).toLocaleDateString()}
                          </span>
                        </p>
                      )}
                    </div>

                    {/* Donated Notes */}
                    {d.notes && (
                      <p className="mt-2 flex items-center gap-1.5 rounded-xl bg-white/5 p-2.5 text-[11px] text-zinc-300">
                        <FileText className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                        <span>Note: "{d.notes}"</span>
                      </p>
                    )}
                  </div>

                  {/* Right Action Column */}
                  {isScheduled && (
                    <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                      {activeNotesId === d.id ? (
                        <div className="w-full space-y-2 sm:w-64">
                          <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Add donation notes (optional)..."
                            className="w-full rounded-xl border border-white/10 bg-[#05070a] p-2.5 text-xs text-white outline-none focus:border-red-500/50"
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleComplete(d.id)}
                              disabled={completeMutation.isPending}
                              className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-emerald-600 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-50"
                            >
                              <Check className="h-3.5 w-3.5" /> Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveNotesId(null)}
                              className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-bold text-zinc-400 hover:bg-white/10"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveNotesId(d.id)}
                            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-red-600/20 hover:brightness-110"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Mark Completed</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCancel(d.id)}
                            disabled={cancelMutation.isPending}
                            className="flex items-center gap-1.5 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500/20 disabled:opacity-50"
                          >
                            <XCircle className="h-4 w-4" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      )}
                    </div>
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