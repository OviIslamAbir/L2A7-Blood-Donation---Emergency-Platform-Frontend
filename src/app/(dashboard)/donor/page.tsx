/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import Link from "next/link";
import { useDonorApplicationStatus } from "@/hooks/use-donor";
import DonorStatCard from "@/components/donor/donor-stat-card";
import {
  Heart,
  Droplets,
  ShieldCheck,
  Clock,
  ArrowRight,
  MapPin,
  Calendar,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function DonorDashboardPage() {
  const { data: statusData, isLoading, isError } = useDonorApplicationStatus();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-3 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-28 rounded-2xl border border-white/10 bg-[#0a0d14]/70" />
        ))}
      </div>
    );
  }

  const role = statusData?.role || "REQUESTER";
  const status = statusData?.applicationStatus || "NONE";
  const profile = statusData?.donorProfile;

  return (
    <div className="space-y-6">
      
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-red-950/40 via-[#0a0d14] to-black p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-400 uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> Emergency Response Portal
            </span>
            <h1 className="text-xl font-black text-white sm:text-2xl">
              Welcome to Your Donor Hub
            </h1>
            <p className="text-xs text-zinc-400">
              Manage your blood donation availability, track emergency requests, and update contact details.
            </p>
          </div>

          <Link
            href="/donor/application"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg transition hover:brightness-110"
          >
            {role === "DONOR" ? "View Donor Status" : "Apply to Become Donor"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <DonorStatCard
          title="Donor Profile Status"
          value={role === "DONOR" ? "APPROVED" : status}
          subtitle={role === "DONOR" ? "Ready for emergency calls" : "Application review pending"}
          icon={role === "DONOR" ? ShieldCheck : Clock}
        />

        <DonorStatCard
          title="Blood Group Registered"
          value={profile?.bloodGroup || "Not Set"}
          subtitle={profile?.bloodGroup ? "Medical profile linked" : "Submit application to set"}
          icon={Droplets}
        />

        <DonorStatCard
          title="Registered Location"
          value={profile?.district || "N/A"}
          subtitle={profile?.division ? `${profile.division} Division` : "Location pending"}
          icon={MapPin}
        />
      </div>

      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-6 backdrop-blur-xl lg:col-span-2">
          <h2 className="flex items-center gap-2 text-sm font-bold text-white">
            <Heart className="h-4 w-4 text-red-500" />
            Registered Donor Details
          </h2>

          {profile ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 text-xs">
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                <span className="text-zinc-500">Blood Group</span>
                <p className="mt-1 text-sm font-bold text-red-400">{profile.bloodGroup}</p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                <span className="text-zinc-500">Location</span>
                <p className="mt-1 font-semibold text-white">
                  {profile.district}, {profile.division}
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5 sm:col-span-2">
                <span className="text-zinc-500">Address</span>
                <p className="mt-1 font-semibold text-white">{profile.address}</p>
              </div>
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/10 p-6 text-center text-xs text-amber-400">
              <AlertCircle className="mx-auto mb-2 h-6 w-6" />
              You haven't submitted a donor application yet. Apply now to register your blood group.
            </div>
          )}
        </div>

       
        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-6 backdrop-blur-xl">
          <h2 className="text-sm font-bold text-white">Quick Actions</h2>
          <div className="mt-4 space-y-2.5">
            <Link
              href="/donor/profile"
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs font-semibold text-zinc-300 transition hover:border-red-500/30 hover:text-white"
            >
              <span>Edit Donor Profile</span>
              <ArrowRight className="h-3.5 w-3.5 text-zinc-500" />
            </Link>

            <Link
              href="/donor/application"
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs font-semibold text-zinc-300 transition hover:border-red-500/30 hover:text-white"
            >
              <span>Check Application Status</span>
              <ArrowRight className="h-3.5 w-3.5 text-zinc-500" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}