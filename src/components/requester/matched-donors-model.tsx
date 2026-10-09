"use client";

import { useGetMatchesForRequest } from "@/hooks/use-donor-match";
import { X, User, Phone, Mail, MapPin, Award, CheckCircle2, Clock, Loader2 } from "lucide-react";

interface MatchedDonorsModalProps {
  requestId: string;
  patientName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function MatchedDonorsModal({
  requestId,
  patientName,
  isOpen,
  onClose,
}: MatchedDonorsModalProps) {
  const { data: matches = [], isLoading } = useGetMatchesForRequest(requestId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
      <div className="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-2xl border border-white/10 bg-[#0a0d14] p-6 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">
              Matched Donors for {patientName}
            </h3>
            <p className="text-xs text-zinc-400">
              List of compatible donors notified for this request.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-400 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="my-4 flex-1 overflow-y-auto space-y-3 pr-1">
          {isLoading ? (
            <div className="flex h-40 flex-col items-center justify-center space-y-2">
              <Loader2 className="h-6 w-6 animate-spin text-red-500" />
              <p className="text-xs text-zinc-500">Finding matched donors...</p>
            </div>
          ) : matches.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-xs text-zinc-500">
              No donors matched yet. Click &quot;Find Donors&quot; to notify compatible candidates.
            </div>
          ) : (
            matches.map((match) => {
              const donorUser = match.donor?.user;
              const isAccepted = match.status === "ACCEPTED";

              return (
                <div
                  key={match.id}
                  className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-600/20 text-xs font-bold text-red-400">
                        <User className="h-4 w-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        {donorUser?.name || "Anonymous Donor"}
                      </h4>
                      <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/20">
                        <Award className="h-3 w-3" /> {match.matchScore}% Score
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 pt-1">
                      {match.distanceKm !== null && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-red-400" /> {match.distanceKm} km away
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-zinc-500" /> {donorUser?.email || "N/A"}
                      </span>
                    </div>

                    {isAccepted && donorUser?.phone && (
                      <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-400">
                        <Phone className="h-3.5 w-3.5" />
                        <span>Contact: {donorUser.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {isAccepted ? (
                      <span className="flex items-center gap-1 rounded-lg bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="h-3.5 w-3.5" /> ACCEPTED
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-bold text-zinc-400 border border-white/5">
                        <Clock className="h-3.5 w-3.5" /> {match.status}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-white/10 pt-4 text-right">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white hover:bg-white/10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}