/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useGetMe } from "@/hooks/auth.hook";
import {
  User as UserIcon,
  Mail,
  ShieldCheck,
  Phone,
  MapPin,
  Calendar,
  Save,
  RefreshCw,
  Sparkles,
  ArrowLeft,
  Building2,
  Home,
  Droplet,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export default function RequesterProfilePage() {
  const [isMounted, setIsMounted] = useState(false);
  const { data: user, isLoading, refetch, isFetching } = useGetMe();

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {

      
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  // 1. Loading State
  if (!isMounted || isLoading) {
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
          Loading profile details...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-black text-white p-4 sm:p-6 lg:py-10">
      <div className="fixed inset-0 bg-black -z-50 pointer-events-none" />

      <div className="relative mx-auto max-w-4xl space-y-6">
        {/* Background Glow Effects */}
        <div className="pointer-events-none absolute top-0 right-10 -z-10 h-80 w-80 rounded-full bg-red-600/10 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-0 left-10 -z-10 h-80 w-80 rounded-full bg-rose-600/10 blur-[130px]" />

        {/* Back Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/requester"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 transition hover:border-red-500/30 hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin text-red-400" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Header Title */}
        <div className="border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-bold text-red-400 mb-2 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <Sparkles className="h-3.5 w-3.5" /> Account Settings
          </div>
          <h1 className="text-2xl font-black text-white sm:text-3xl tracking-tight">
            My Profile
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Manage your personal information and contact details.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Column: Avatar & Overview */}
          <div className="md:col-span-1 space-y-4">
            <div className="rounded-3xl border border-white/10 bg-[#09090b] p-6 text-center backdrop-blur-2xl shadow-xl">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-red-600/30 to-rose-600/20 border border-red-500/30 text-3xl font-black text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                {user?.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="h-10 w-10" />}
              </div>

              <h2 className="mt-4 text-lg font-bold text-white truncate">
                {user?.name || "Requester User"}
              </h2>
              <p className="text-xs text-zinc-400 truncate">{user?.email}</p>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified Requester
              </div>

              <div className="mt-6 border-t border-white/5 pt-4 text-left text-xs space-y-2.5">
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Role</span>
                  <span className="font-bold text-white uppercase">{user?.role || "REQUESTER"}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Account Status</span>
                  <span className="font-bold text-emerald-400">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Edit Profile Form */}
          <div className="md:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-[#09090b] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 mb-6 flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-red-500" />
                Personal Information
              </h3>

              <form onSubmit={handleUpdateProfile} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="mb-2 block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative rounded-2xl border border-white/10 bg-black transition focus-within:border-red-500/50">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full rounded-2xl bg-transparent px-4 py-3.5 pl-10 text-xs text-white placeholder-zinc-600 outline-none"
                      required
                    />
                    <UserIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  </div>
                </div>

                {/* Email Address (Read-only) */}
                <div>
                  <label className="mb-2 block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Email Address <span className="text-[10px] text-zinc-500 font-normal">(Non-editable)</span>
                  </label>
                  <div className="relative rounded-2xl border border-white/5 bg-zinc-900/50 opacity-70">
                    <input
                      type="email"
                      value={user?.email || ""}
                      readOnly
                      className="w-full rounded-2xl bg-transparent px-4 py-3.5 pl-10 text-xs text-zinc-400 outline-none cursor-not-allowed"
                    />
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  </div>
                </div>

                {/* Phone & District */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <div className="relative rounded-2xl border border-white/10 bg-black transition focus-within:border-red-500/50">
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full rounded-2xl bg-transparent px-4 py-3.5 pl-10 text-xs text-white placeholder-zinc-600 outline-none"
                      />
                      <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                      City / District
                    </label>
                    <div className="relative rounded-2xl border border-white/10 bg-black transition focus-within:border-red-500/50">
                      <input
                        type="text"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        placeholder="e.g. Dhaka, Mirpur"
                        className="w-full rounded-2xl bg-transparent px-4 py-3.5 pl-10 text-xs text-white placeholder-zinc-600 outline-none"
                      />
                      <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    </div>
                  </div>
                </div>

                {/* Full Address */}
                <div>
                  <label className="mb-2 block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Full Address
                  </label>
                  <div className="relative rounded-2xl border border-white/10 bg-black transition focus-within:border-red-500/50">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House #, Road #, Area..."
                      className="w-full rounded-2xl bg-transparent px-4 py-3.5 pl-10 text-xs text-white placeholder-zinc-600 outline-none"
                    />
                    <Home className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-red-600/30 transition hover:brightness-110 disabled:opacity-50"
                  >
                    {isUpdating ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Updating Profile...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Profile Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}