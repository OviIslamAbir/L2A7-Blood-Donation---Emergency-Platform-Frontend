"use client";

import { useDonorApplicationStatus } from "@/hooks/use-donor";
import { NotificationPopover } from "@/components/modules/notification/NotificationPopover";
import { Droplets, ShieldCheck, Clock, User as UserIcon } from "lucide-react";

export default function DonorHeader() {
  const { data: statusData } = useDonorApplicationStatus();

  const role = statusData?.role || "REQUESTER";
  const appStatus = statusData?.applicationStatus || "NONE";

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#0a0d14]/80 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-zinc-400">Welcome Back,</span>
        <span className="text-xs font-black text-white">Donor Panel</span>
      </div>

      <div className="flex items-center gap-4">
        {/* 🔥 Notification Popover (Added Here) */}
        <NotificationPopover />

        <div className="h-4 w-px bg-white/10" />

        {/* Donor Status Badge */}
        {role === "DONOR" ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" /> VERIFIED DONOR
          </span>
        ) : appStatus === "PENDING" ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-bold text-amber-400">
            <Clock className="h-3.5 w-3.5 animate-pulse" /> REVIEW PENDING
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-bold text-red-400">
            <Droplets className="h-3.5 w-3.5" /> REQUESTER
          </span>
        )}

        {/* Profile Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-rose-600 text-xs font-black text-white shadow-md">
          <UserIcon className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}