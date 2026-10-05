/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useDonorApplicationStatus,
  useApplyForDonor,
} from "@/hooks/use-donor";
import { useGetMe } from "@/hooks/auth.hook";
import {
  HeartHandshake,
  Clock,
  XCircle,
  AlertCircle,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  LogIn,
  UserPlus,
  MapPin,
  Calendar,
  Check,
  Droplet,
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

export default function ApplyDonorPage() {
  const { data: user, isLoading: userLoading } = useGetMe();

  const {
    data: statusData,
    isLoading: statusLoading,
    isError,
    refetch,
    isFetching,
  } = useDonorApplicationStatus();

  const applyMutation = useApplyForDonor();

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

  // 1. Loading State
  if (userLoading || (user && statusLoading)) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-3">
        <div className="relative flex h-12 w-12 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-red-500/20" />
          <Droplet className="h-6 w-6 text-red-500 animate-bounce" />
        </div>
        <p className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
          Checking donor status...
        </p>
      </div>
    );
  }

  // 2. User Not Logged In State
  if (!user) {
    return (
      <div className="mx-auto max-w-xl py-20 px-4">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#121620]/90 to-[#07090d]/90 p-8 sm:p-10 text-center backdrop-blur-2xl shadow-2xl">
          <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />
          
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-red-500/30 bg-red-500/10 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <HeartHandshake className="h-10 w-10" />
          </div>

          <h1 className="mt-6 text-2xl sm:text-3xl font-black text-white tracking-tight">
            Become a Life Saver 🩸
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
            Your blood donation can give someone a second chance at life. Sign in or register an account to apply as a verified donor.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-xs font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Link>

            <Link
              href="/register"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-red-600/25 transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
            >
              <UserPlus className="h-4 w-4" />
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Error Fetching Application Status
  if (isError) {
    return (
      <div className="mx-auto max-w-md py-16 px-4">
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center backdrop-blur-xl">
          <AlertCircle className="mx-auto mb-3 h-8 w-8 text-red-400" />
          <h3 className="text-sm font-bold text-white">System Error</h3>
          <p className="mt-1 text-xs text-red-300/80">Failed to load application status.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-white/20"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const appStatus = statusData?.applicationStatus || "NONE";
  const isDonorRole = statusData?.role === "DONOR" || user?.role === "DONOR";
  const profile = statusData?.donorProfile;

  return (
    <div className="relative mx-auto max-w-4xl space-y-8 p-4 sm:p-6 lg:py-12">
      {/* Background Glow Effects */}
      <div className="pointer-events-none absolute top-0 right-10 -z-10 h-72 w-72 rounded-full bg-red-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-10 -z-10 h-72 w-72 rounded-full bg-rose-600/10 blur-[120px]" />

      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[11px] font-bold text-red-400 mb-2">
            <Sparkles className="h-3.5 w-3.5" /> Donor Verification Portal
          </div>
          <h1 className="text-2xl font-black text-white sm:text-3xl tracking-tight">
            Blood Donor Application
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Submit your details to join our emergency blood donor network.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="self-start sm:self-center inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-zinc-300 transition hover:border-red-500/30 hover:bg-white/10 hover:text-white"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin text-red-400" : ""}`} />
          Sync Status
        </button>
      </div>

      {/* STATE 1: VERIFIED DONOR */}
      {(appStatus === "APPROVED" || isDonorRole) && (
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-[#0a0d14] to-black p-8 sm:p-10 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <h2 className="mt-5 text-xl font-black text-white sm:text-2xl">
              You are a Verified Blood Donor! 🎉
            </h2>
            <p className="mt-2 max-w-md text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Your application has been approved. Thank you for standing ready to save lives in critical emergencies.
            </p>

            <Link
              href="/donor"
              className="mt-8 inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 px-8 py-3.5 text-xs font-bold text-white shadow-xl shadow-red-600/25 transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
            >
              Access Donor Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      {/* STATE 2: PENDING REVIEW */}
      {appStatus === "PENDING" && !isDonorRole && (
        <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-[#0a0d14] to-black p-8 sm:p-10 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.15)]">
              <Clock className="h-10 w-10 animate-pulse" />
            </div>
            <h2 className="mt-5 text-xl font-black text-white sm:text-2xl">
              Application Under Review
            </h2>
            <p className="mt-2 max-w-md text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We received your application. Our moderation team is currently verifying your submitted location details.
            </p>

            {profile && (
              <div className="mt-8 w-full max-w-md rounded-2xl border border-white/10 bg-[#05070a]/90 p-5 text-left text-xs space-y-3 shadow-inner">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-zinc-500 font-medium">Selected Blood Group</span>
                  <span className="font-black text-sm text-red-500 px-2.5 py-0.5 rounded-lg border border-red-500/20 bg-red-500/10">
                    {profile.bloodGroup}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-zinc-500 font-medium">Region & Location</span>
                  <span className="font-semibold text-white">{profile.district}, {profile.division}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 font-medium">Full Address</span>
                  <span className="font-normal text-zinc-300 truncate max-w-[200px]">{profile.address}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STATE 3: APPLICATION FORM */}
      {(appStatus === "NONE" || appStatus === "REJECTED") && !isDonorRole && (
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0d14]/90 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
          {appStatus === "REJECTED" && (
            <div className="mb-8 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 text-xs text-rose-300">
              <div className="flex items-center gap-2 font-bold text-sm text-rose-400">
                <XCircle className="h-5 w-5" />
                Previous Application Was Rejected
              </div>
              <p className="mt-2 text-zinc-300 leading-relaxed">
                <strong className="text-white">Reason:</strong> {profile?.rejectReason || "Requirements not met."}
              </p>
              <p className="mt-1 text-zinc-400 text-[11px]">You may update your details below and resubmit.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-xs font-semibold text-red-400 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            {/* Blood Group Picker */}
            <div>
              <label className="mb-3 block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                1. Select Blood Group <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-8">
                {BLOOD_GROUPS.map((bg) => {
                  const isSelected = bloodGroup === bg;
                  return (
                    <button
                      key={bg}
                      type="button"
                      onClick={() => setBloodGroup(bg)}
                      className={`relative flex h-12 flex-col items-center justify-center rounded-2xl border text-xs font-black transition-all duration-300 ${
                        isSelected
                          ? "border-red-500 bg-gradient-to-b from-red-600 to-rose-700 text-white shadow-lg shadow-red-600/30 scale-105"
                          : "border-white/10 bg-[#05070a] text-zinc-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {bg}
                      {isSelected && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-red-600 shadow-md">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Division & District */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  2. Division <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-white/10 bg-[#05070a] px-4 py-3 text-xs font-medium text-white outline-none transition focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50"
                  >
                    {DIVISIONS.map((d) => (
                      <option key={d} value={d} className="bg-[#0a0d14] text-white">
                        {d} Division
                      </option>
                    ))}
                  </select>
                  <MapPin className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  3. District / City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mirpur, Uttara, Gazipur..."
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#05070a] px-4 py-3 text-xs text-white placeholder-zinc-600 outline-none transition focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50"
                  required
                />
              </div>
            </div>

            {/* Date of Birth & Address */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  4. Date of Birth <span className="text-zinc-500 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#05070a] px-4 py-3 text-xs text-white outline-none transition focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 [color-scheme:dark]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  5. Full Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="House #12, Road #4, Sector #3..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#05070a] px-4 py-3 text-xs text-white placeholder-zinc-600 outline-none transition focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={applyMutation.isPending}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-3.5 text-xs font-bold text-white shadow-xl shadow-red-600/25 transition-all duration-300 hover:scale-[1.01] hover:brightness-110 disabled:opacity-50"
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