/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
"use client";

import { useState, useEffect } from "react";
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
  ArrowLeft,
  ShieldCheck,
  LogIn,
  UserPlus,
  MapPin,
  Calendar,
  Check,
  Droplet,
  Heart,
  Users,
  Zap,
  Home,
  Building2,
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
  // 💡 Hydration Fix: Track mounted state
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // 1. Loading State (isMounted false থাকা অবস্থায়ও এটি দেখাবে, ফলে SSR & Client match করবে)
  if (!isMounted || userLoading || (user && statusLoading)) {
    return (
      <div className="relative min-h-screen w-full bg-black text-white flex flex-col items-center justify-center gap-4">
        <div className="fixed inset-0 bg-black -z-50 pointer-events-none" />
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-red-500/20" />
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 shadow-lg shadow-red-600/40">
            <Droplet className="h-6 w-6 text-white animate-bounce" />
          </div>
        </div>
        <p className="text-xs font-bold tracking-widest text-zinc-400 uppercase animate-pulse">
          Checking donor verification status...
        </p>
      </div>
    );
  }

  // 2. User Not Logged In State
  if (!user) {
    return (
      <div className="relative min-h-screen w-full bg-black text-white py-16 px-4">
        <div className="fixed inset-0 bg-black -z-50 pointer-events-none" />
        <div className="mx-auto max-w-xl">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#09090b] p-8 sm:p-12 text-center backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
            <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-rose-600/10 blur-3xl pointer-events-none" />

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-500/20 to-rose-500/10 text-red-500 shadow-[0_0_40px_rgba(239,68,68,0.25)]">
              <HeartHandshake className="h-10 w-10" />
            </div>

            <h1 className="mt-6 text-2xl sm:text-3xl font-black text-white tracking-tight">
              Become a Life Saver 🩸
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
              Your single blood donation can give up to 3 people a second chance at life. Sign in or register an account to apply as a verified donor.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/login"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-3.5 text-xs font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20"
              >
                <LogIn className="h-4 w-4 text-zinc-400" />
                Sign In
              </Link>

              <Link
                href="/register"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 px-7 py-3.5 text-xs font-bold text-white shadow-xl shadow-red-600/30 transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
              >
                <UserPlus className="h-4 w-4" />
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Error Fetching Application Status
  if (isError) {
    return (
      <div className="relative min-h-screen w-full bg-black text-white py-16 px-4">
        <div className="fixed inset-0 bg-black -z-50 pointer-events-none" />
        <div className="mx-auto max-w-md">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center backdrop-blur-xl shadow-2xl">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/20 text-red-400 border border-red-500/30">
              <AlertCircle className="h-6 w-6" />
            </div>
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
      </div>
    );
  }

  const appStatus = statusData?.applicationStatus || "NONE";
  const isDonorRole = statusData?.role === "DONOR" || user?.role === "DONOR";
  const profile = statusData?.donorProfile;

  return (
    <div className="relative min-h-screen w-full bg-black text-white p-4 sm:p-6 lg:py-10">
      <div className="fixed inset-0 bg-black -z-50 pointer-events-none" />

      <div className="relative mx-auto max-w-4xl space-y-6">
        {/* Background Glow Effects */}
        <div className="pointer-events-none absolute top-0 right-10 -z-10 h-80 w-80 rounded-full bg-red-600/10 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-0 left-10 -z-10 h-80 w-80 rounded-full bg-rose-600/10 blur-[130px]" />

        {/* Navigation Top Action */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Top Banner Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-bold text-red-400 mb-2 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <Sparkles className="h-3.5 w-3.5" /> Donor Verification Portal
            </div>
            <h1 className="text-2xl font-black text-white sm:text-3xl tracking-tight">
              Blood Donor Application
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              Submit your location & blood group to join our active emergency donor registry.
            </p>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="self-start sm:self-center inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-zinc-300 transition hover:border-red-500/30 hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin text-red-400" : ""}`} />
            Sync Status
          </button>
        </div>

        {/* Highlight Features Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#09090b] p-3.5 backdrop-blur-xl">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
              <Heart className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Save 3 Lives</p>
              <p className="text-[10px] text-zinc-500">Per blood donation</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#09090b] p-3.5 backdrop-blur-xl">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Verified Network</p>
              <p className="text-[10px] text-zinc-500">Trusted community</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#09090b] p-3.5 backdrop-blur-xl">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Instant Alerts</p>
              <p className="text-[10px] text-zinc-500">Urgent requests in area</p>
            </div>
          </div>
        </div>

        {/* STATE 1: VERIFIED DONOR */}
        {(appStatus === "APPROVED" || isDonorRole) && (
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-black to-black p-8 sm:p-12 backdrop-blur-2xl shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <h2 className="mt-5 text-xl font-black text-white sm:text-2xl">
                You are a Verified Blood Donor! 🎉
              </h2>
              <p className="mt-2 max-w-md text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Your application has been approved by the admin team. Thank you for standing ready to save lives in critical emergencies.
              </p>

              <Link
                href="/donor"
                className="mt-8 inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 px-8 py-3.5 text-xs font-bold text-white shadow-xl shadow-red-600/30 transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
              >
                Access Donor Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        {/* STATE 2: PENDING REVIEW */}
        {appStatus === "PENDING" && !isDonorRole && (
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-black to-black p-8 sm:p-12 backdrop-blur-2xl shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.2)]">
                <Clock className="h-10 w-10 animate-pulse" />
              </div>
              <h2 className="mt-5 text-xl font-black text-white sm:text-2xl">
                Application Under Review
              </h2>
              <p className="mt-2 max-w-md text-xs sm:text-sm text-zinc-400 leading-relaxed">
                We received your application. Our admin team is verifying your location details. You will be notified once approved.
              </p>

              {profile && (
                <div className="mt-8 w-full max-w-md rounded-2xl border border-white/10 bg-[#09090b] p-5 text-left text-xs space-y-3 shadow-inner">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                    <span className="text-zinc-500 font-medium">Selected Blood Group</span>
                    <span className="font-black text-sm text-red-500 px-3 py-0.5 rounded-lg border border-red-500/20 bg-red-500/10">
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
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#09090b] p-6 sm:p-10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
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

            <form onSubmit={handleSubmit} className="space-y-7">
              {errorMsg && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-xs font-semibold text-red-400 flex items-center gap-2.5">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {errorMsg}
                </div>
              )}

              {/* Blood Group Picker */}
              <div>
                <label className="mb-3.5 flex items-center justify-between text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  <span>
                    Select Blood Group <span className="text-red-500">*</span>
                  </span>
                  <span className="text-[10px] text-zinc-500 lowercase font-normal">choose your exact type</span>
                </label>

                <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-8">
                  {BLOOD_GROUPS.map((bg) => {
                    const isSelected = bloodGroup === bg;
                    return (
                      <button
                        key={bg}
                        type="button"
                        onClick={() => setBloodGroup(bg)}
                        className={`relative flex h-14 flex-col items-center justify-center rounded-2xl border text-xs font-black transition-all duration-300 ${
                          isSelected
                            ? "border-red-500 bg-gradient-to-b from-red-600 to-rose-700 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] scale-105"
                            : "border-white/10 bg-black text-zinc-400 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <Droplet className={`h-3.5 w-3.5 mb-0.5 ${isSelected ? "text-white" : "text-zinc-600"}`} />
                        <span>{bg}</span>
                        {isSelected && (
                          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-red-600 shadow-md">
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Division & District */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    2. Division <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-2xl border border-white/10 bg-black transition focus-within:border-red-500/50">
                    <select
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                      className="w-full appearance-none rounded-2xl bg-transparent px-4 py-3.5 pl-10 text-xs font-medium text-white outline-none"
                    >
                      {DIVISIONS.map((d) => (
                        <option key={d} value={d} className="bg-[#09090b] text-white">
                          {d} Division
                        </option>
                      ))}
                    </select>
                    <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    3. District / City <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-2xl border border-white/10 bg-black transition focus-within:border-red-500/50">
                    <input
                      type="text"
                      placeholder="e.g. Mirpur, Uttara, Dhanmondi..."
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full rounded-2xl bg-transparent px-4 py-3.5 pl-10 text-xs text-white placeholder-zinc-600 outline-none"
                      required
                    />
                    <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  </div>
                </div>
              </div>

              {/* Date of Birth & Address */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    4. Date of Birth <span className="text-zinc-500 font-normal">(Optional)</span>
                  </label>
                  <div className="relative rounded-2xl border border-white/10 bg-black transition focus-within:border-red-500/50">
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full rounded-2xl bg-transparent px-4 py-3.5 pl-10 text-xs text-white outline-none [color-scheme:dark]"
                    />
                    <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    5. Full Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-2xl border border-white/10 bg-black transition focus-within:border-red-500/50">
                    <input
                      type="text"
                      placeholder="House #12, Road #4, Sector #3..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded-2xl bg-transparent px-4 py-3.5 pl-10 text-xs text-white placeholder-zinc-600 outline-none"
                      required
                    />
                    <Home className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={applyMutation.isPending}
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 py-4 text-xs font-bold text-white shadow-xl shadow-red-600/30 transition-all duration-300 hover:scale-[1.01] hover:brightness-110 disabled:opacity-50"
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
    </div>
  );
}