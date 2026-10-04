"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useDonorApplications,
  useApproveDonor,
  useRejectDonor,
} from "@/hooks/use-admin";
import AdminHeader from "@/components/admin/admin-header";
import {
  CheckCircle,
  XCircle,
  Clock,
  Search,
  X,
  Droplets,
  MapPin,
  RefreshCw,
  Eye,
} from "lucide-react";

interface DonorProfile {
  bloodGroup?: string;
  district?: string;
  division?: string;
}

interface DonorApplication {
  id: string;
  name?: string;
  email?: string;
  createdAt: string;
  donorProfile?: DonorProfile;
  donorApplicationStatus?: "PENDING" | "APPROVED" | "REJECTED";
}

interface RejectDonorPayload {
  reason: string;
}

interface RejectDonorRequest {
  userId: string;
  payload: RejectDonorPayload;
}

type FilterStatus = "ALL" | "PENDING" | "APPROVED" | "REJECTED";

export default function DonorApplicationsPage() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("ALL");
  const [search, setSearch] = useState<string>("");
  const [selectedUserForReject, setSelectedUserForReject] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState<string>("");

  const {
    data: applications = [],
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useDonorApplications();
  const approveMutation = useApproveDonor();
  const rejectMutation = useRejectDonor();

  const filteredApplications: DonorApplication[] = applications.filter(
    (app: DonorApplication): boolean => {
      const matchesSearch: boolean = Boolean(
        app.name?.toLowerCase().includes(search.toLowerCase()) ||
          app.email?.toLowerCase().includes(search.toLowerCase())
      );

      if (filterStatus === "ALL") return matchesSearch;
      return matchesSearch && app.donorApplicationStatus === filterStatus;
    }
  );

  const handleApprove = (userId: string): void => {
    approveMutation.mutate(userId);
  };

  const handleRejectSubmit = (): void => {
    if (!selectedUserForReject) return;

    const request: RejectDonorRequest = {
      userId: selectedUserForReject,
      payload: { reason: rejectReason.trim() || "Requirements not met." },
    };

    rejectMutation.mutate(request, {
      onSuccess: () => {
        setSelectedUserForReject(null);
        setRejectReason("");
      },
    });
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Donor Applications"
        description="Review incoming requester applications to become verified blood donors."
        action={
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-zinc-200 transition hover:border-red-500/30 hover:bg-white/10"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${
                isFetching ? "animate-spin text-red-400" : ""
              }`}
            />
            Refresh
          </button>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0a0d14] py-2.5 pl-10 pr-4 text-xs font-medium text-white placeholder-zinc-500 outline-none transition focus:border-red-500/40"
          />
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-[#0a0d14] p-1">
          {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                filterStatus === status
                  ? "bg-red-600 text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      {isLoading ? (
        <div className="space-y-3">
          {["skeleton-1", "skeleton-2", "skeleton-3", "skeleton-4"].map((key) => (
            <div
              key={key}
              className="h-20 animate-pulse rounded-2xl border border-white/10 bg-[#0a0d14]/70"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-400">
          Failed to load donor applications.
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/50 p-12 text-center text-zinc-500">
          No donor applications found for this filter.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d14]/80 backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-white/[0.02] uppercase text-zinc-400">
                <tr>
                  <th className="px-6 py-4 font-bold">Applicant</th>
                  <th className="px-6 py-4 font-bold">Blood Group</th>
                  <th className="px-6 py-4 font-bold">Location</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Applied Date</th>
                  <th className="px-6 py-4 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredApplications.map((app) => {
                  const status =
                    (app as any).donorApplicationStatus || "PENDING";
                  return (
                    <tr key={app.id} className="transition hover:bg-white/[0.02]">
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/donor-applications/${app.id}`}
                          className="group/item inline-block"
                        >
                          <p className="font-bold text-white transition group-hover/item:text-red-400 group-hover/item:underline">
                            {app.name}
                          </p>
                          <p className="text-[11px] text-zinc-500">{app.email}</p>
                        </Link>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-md border border-red-500/20 bg-red-500/10 px-2 py-0.5 font-bold text-red-400">
                          <Droplets className="h-3 w-3" />
                          {app.donorProfile?.bloodGroup || "N/A"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-zinc-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                          <span>
                            {app.donorProfile?.district ||
                              app.donorProfile?.division ||
                              "Not set"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                            status === "APPROVED"
                              ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                              : status === "REJECTED"
                              ? "border border-rose-500/20 bg-rose-500/10 text-rose-400"
                              : "border border-amber-500/20 bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          {status === "APPROVED" && <CheckCircle className="h-3 w-3" />}
                          {status === "REJECTED" && <XCircle className="h-3 w-3" />}
                          {status === "PENDING" && <Clock className="h-3 w-3" />}
                          {status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-zinc-500">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* 👁️ SINGLE APPLICATION VIEW BUTTON */}
                          <button
                            type="button"
                            onClick={() =>
                              router.push(`/admin/donor-applications/${app.id}`)
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400 transition hover:bg-red-500/20 hover:text-white"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>View</span>
                          </button>

                          {status === "PENDING" && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleApprove(app.id)}
                                disabled={approveMutation.isPending}
                                className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400 transition hover:bg-emerald-500/20 disabled:opacity-50"
                              >
                                Approve
                              </button>
                              <button
                                type="button"
                                onClick={() => setSelectedUserForReject(app.id)}
                                className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-bold text-rose-400 transition hover:bg-rose-500/20"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {selectedUserForReject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0d14] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="font-bold text-white">Reject Donor Application</h3>
              <button
                type="button"
                onClick={() => setSelectedUserForReject(null)}
                className="text-zinc-500 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <textarea
                rows={3}
                placeholder="Reason for rejection..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#05070a] p-3 text-xs text-white placeholder-zinc-600 outline-none focus:border-red-500/40"
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedUserForReject(null)}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-zinc-400 hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRejectSubmit}
                disabled={rejectMutation.isPending}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 disabled:opacity-50"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}