"use client";

import { useGetMyMatches, useAcceptMatch, useRejectMatch } from "@/hooks/use-donor-match";
import { useCreateDonation } from "@/hooks/use-donation";
import { Check, X, MapPin, Calendar, Clock, Droplet, ShieldAlert, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function DonorMatchesPage() {
  const { data: matches = [], isLoading, isError, refetch } = useGetMyMatches();
  const acceptMutation = useAcceptMatch();
  const rejectMutation = useRejectMatch();
  const createDonationMutation = useCreateDonation();

  const handleAccept = (match: any) => {
    acceptMutation.mutate(match.id, {
      onSuccess: () => {
        // Automatically schedule a donation entry
        createDonationMutation.mutate(
          {
            requestId: match.requestId,
            notes: "Accepted from emergency match portal.",
          },
          {
            onSuccess: () => {
              toast.success("Blood Request Accepted & Scheduled for Donation!");
            },
            onError: (err: any) => {
              toast.success("Request Accepted!");
            },
          }
        );
      },
      onError: (err: any) => {
        toast.error(err?.message || "Failed to accept blood request.");
      },
    });
  };

  const handleReject = (matchId: string) => {
    rejectMutation.mutate(matchId, {
      onSuccess: () => {
        toast.success("Request rejected successfully.");
      },
      onError: (err: any) => {
        toast.error(err?.message || "Failed to reject request.");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center space-y-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
        <p className="text-xs font-semibold text-zinc-500">Searching for matched blood requests...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0a0d14] p-6 text-center">
        <AlertCircle className="h-8 w-8 text-rose-500 mb-2" />
        <p className="text-sm font-bold text-white">Failed to load matches</p>
        <button
          onClick={() => refetch()}
          className="mt-3 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h1 className="text-xl font-black text-white">Emergency Blood Matches</h1>
          <p className="text-xs text-zinc-400">
            Compatible blood requests matching your group and location.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400">
          <Droplet className="h-4 w-4 fill-red-500" />
          <span>{matches.length} Matched</span>
        </div>
      </div>

      {/* Empty State */}
      {matches.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0a0d14]/50 p-8 text-center">
          <Sparkles className="h-10 w-10 text-zinc-600 mb-3" />
          <h3 className="text-sm font-bold text-white">No Matched Requests Found</h3>
          <p className="mt-1 text-xs text-zinc-500 max-w-sm">
            You currently have no new emergency blood matches. We will notify you as soon as a patient needs your blood group nearby!
          </p>
        </div>
      ) : (
        /* Matches Grid */
        <div className="grid gap-4 md:grid-cols-2">
          {matches.map((match) => {
            const req = match.request;
            const isCritical = req?.urgency === "CRITICAL";

            return (
              <div
                key={match.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-5 transition duration-200 ${
                  isCritical
                    ? "border-red-500/40 bg-gradient-to-b from-red-500/10 to-[#0a0d14]"
                    : "border-white/10 bg-[#0a0d14]"
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-600 text-xs font-black text-white shadow-lg shadow-red-600/30">
                        {req?.bloodGroup || "N/A"}
                      </span>
                      {isCritical && (
                        <span className="flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400 animate-pulse">
                          <ShieldAlert className="h-3 w-3" /> CRITICAL
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-extrabold uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                        {match.matchScore}% Match Score
                      </span>
                      {match.distanceKm !== null && match.distanceKm !== undefined && (
                        <p className="mt-0.5 text-[10px] text-zinc-500">
                          {match.distanceKm} km away
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="mt-3 space-y-1.5">
                    <h3 className="text-base font-bold text-white">
                      {req?.patientName || "Anonymous Patient"}
                    </h3>
                    <p className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" />
                      <span>
                        {req?.hospitalName}, {req?.hospitalAddress}
                      </span>
                    </p>
                    {req?.neededAt && (
                      <p className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <Calendar className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        <span>Needed by: {new Date(req.neededAt).toLocaleDateString()}</span>
                      </p>
                    )}
                    {req?.reason && (
                      <p className="mt-2 rounded-xl bg-white/5 p-2.5 text-[11px] text-zinc-300 italic">
                        "{req.reason}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Status Actions */}
                <div className="mt-5 border-t border-white/5 pt-3">
                  {match.status === "NOTIFIED" ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleAccept(match)}
                        disabled={acceptMutation.isPending}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition disabled:opacity-50"
                      >
                        <Check className="h-4 w-4" />
                        <span>Accept Request</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReject(match.id)}
                        disabled={rejectMutation.isPending}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-bold text-zinc-300 hover:bg-white/10 transition disabled:opacity-50"
                      >
                        <X className="h-4 w-4" />
                        <span>Decline</span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-1">
                      <span
                        className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full border ${
                          match.status === "ACCEPTED"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : "border-zinc-500/30 bg-zinc-500/10 text-zinc-400"
                        }`}
                      >
                        Status: {match.status}
                      </span>
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