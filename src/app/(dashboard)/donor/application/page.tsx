"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useDonorApplicationStatus,
  useApplyForDonor,
} from "@/hooks/use-donor";
import {
  HeartHandshake,
  Droplets,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DIVISIONS = [
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

export default function DonorApplicationPage() {
  const {
    data: statusData,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useDonorApplicationStatus();

  const applyMutation = useApplyForDonor();

  // Form State
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [division, setDivision] = useState("Dhaka");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!district.trim() || !address.trim()) {
      setErrorMsg("District and Address are required.");
      return;
    }

    applyMutation.mutate(
      {
        bloodGroup,
        dateOfBirth: dateOfBirth || undefined,
        division,
        district: district.trim(),
        address: address.trim(),
      },
      {
        onError: (err: any) => {
          setErrorMsg(err?.message || "Failed to submit application.");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-72 items-center justify-center text-xs font-semibold text-zinc-500 animate-pulse">
        Checking donor application status...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center text-xs text-red-400">
        <AlertCircle className="mx-auto mb-2 h-6 w-6 text-red-400" />
        Failed to load application status.
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-3 block mx-auto rounded-xl bg-white/10 px-4 py-2 font-bold text-white hover:bg-white/20"
        >
          Try Again
        </button>
      </div>
    );
  }

  const appStatus = statusData?.applicationStatus || "NONE";
  const isDonorRole = statusData?.role === "DONOR";
  const profile = statusData?.donorProfile;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-black text-white sm:text-2xl">
            <HeartHandshake className="h-6 w-6 text-red-500" />
            Donor Application
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Join our emergency blood response registry and save lives in real-time.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:border-red-500/30 hover:bg-white/10"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin text-red-400" : ""}`} />
          Sync Status
        </button>
      </div>

      {/* STATE 1: ALREADY APPROVED / IS DONOR */}
      {(appStatus === "APPROVED" || isDonorRole) && (
        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-[#0a0d14] to-black p-8 backdrop-blur-xl">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-xl">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-white">You are a Verified Blood Donor!</h2>
            <p className="mt-1 max-w-md text-xs text-zinc-400">
              Your application has been approved by the platform administrators. Your profile is now visible for urgent emergency blood requests.
            </p>

            {profile && (
              <div className="mt-6 grid w-full max-w-lg gap-3 sm:grid-cols-3 text-left text-xs">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <span className="text-[10px] text-zinc-500 uppercase">Blood Group</span>
                  <p className="mt-0.5 font-bold text-red-400 text-sm">{profile.bloodGroup}</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <span className="text-[10px] text-zinc-500 uppercase">Location</span>
                  <p className="mt-0.5 font-semibold text-white">{profile.district}, {profile.division}</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <span className="text-[10px] text-zinc-500 uppercase">Approved Date</span>
                  <p className="mt-0.5 font-semibold text-emerald-400">
                    {profile.approvedAt ? new Date(profile.approvedAt).toLocaleDateString() : "Verified"}
                  </p>
                </div>
              </div>
            )}

            <Link
              href="/donor/profile"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg transition hover:brightness-110"
            >
              Manage Donor Profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      {/* STATE 2: PENDING APPROVAL */}
      {appStatus === "PENDING" && !isDonorRole && (
        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-[#0a0d14] to-black p-8 backdrop-blur-xl">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-xl">
              <Clock className="h-8 w-8 animate-pulse" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-white">Application Under Review</h2>
            <p className="mt-1 max-w-md text-xs text-zinc-400">
              Your donor registration request was submitted successfully and is currently under administrative review.
            </p>

            {profile && (
              <div className="mt-6 w-full max-w-md rounded-xl border border-white/10 bg-[#05070a] p-4 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-500">Blood Group:</span>
                  <span className="font-bold text-red-400">{profile.bloodGroup}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-500">District / Division:</span>
                  <span className="text-white">{profile.district}, {profile.division}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Address:</span>
                  <span className="text-zinc-300">{profile.address}</span>
                </div>
              </div>
            )}

            <p className="mt-6 text-[11px] text-amber-400/80">
              ⚡ You will receive an email and system notification as soon as an admin reviews your application.
            </p>
          </div>
        </div>
      )}

      {/* STATE 3: APPLICATION FORM (NONE or REJECTED) */}
      {(appStatus === "NONE" || appStatus === "REJECTED") && !isDonorRole && (
        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          {appStatus === "REJECTED" && (
            <div className="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-400">
              <div className="flex items-center gap-2 font-bold">
                <XCircle className="h-4 w-4" />
                Previous Application Rejected
              </div>
              <p className="mt-1 text-zinc-300">
                Reason: {profile?.rejectReason || "Requirements not met."}. You can update your details and re-apply below.
              </p>
            </div>
          )}

          <div className="border-b border-white/5 pb-4">
            <h2 className="text-sm font-bold text-white">Donor Eligibility & Profile Form</h2>
            <p className="mt-0.5 text-xs text-zinc-500">
              Please provide accurate blood group and location data so requesters can reach you during emergencies.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {errorMsg && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
                {errorMsg}
              </div>
            )}

            {/* Blood Group Selector */}
            <div>
              <label className="mb-2 block text-xs font-bold text-zinc-300">
                Select Blood Group <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                {BLOOD_GROUPS.map((bg) => (
                  <button
                    key={bg}
                    type="button"
                    onClick={() => setBloodGroup(bg)}
                    className={`flex h-11 items-center justify-center rounded-xl border text-xs font-black transition ${
                      bloodGroup === bg
                        ? "border-red-500 bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105"
                        : "border-white/10 bg-[#05070a] text-zinc-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            {/* Division & District */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-zinc-300">
                  Division <span className="text-red-500">*</span>
                </label>
                <select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#05070a] px-4 py-2.5 text-xs text-white outline-none focus:border-red-500/40"
                >
                  {DIVISIONS.map((d) => (
                    <option key={d} value={d} className="bg-[#0a0d14] text-white">
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-zinc-300">
                  District <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dhaka, Gazipur, Mirpur..."
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#05070a] px-4 py-2.5 text-xs text-white placeholder-zinc-600 outline-none focus:border-red-500/40"
                  required
                />
              </div>
            </div>

            {/* Date of Birth & Full Address */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-zinc-300">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#05070a] px-4 py-2.5 text-xs text-white outline-none focus:border-red-500/40"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-zinc-300">
                  Full Residential Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. House #12, Road #4, Sector 10, Uttara"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#05070a] px-4 py-2.5 text-xs text-white placeholder-zinc-600 outline-none focus:border-red-500/40"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={applyMutation.isPending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-3 text-xs font-bold text-white shadow-lg transition hover:brightness-110 disabled:opacity-50"
              >
                {applyMutation.isPending ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Submit Donor Application
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}