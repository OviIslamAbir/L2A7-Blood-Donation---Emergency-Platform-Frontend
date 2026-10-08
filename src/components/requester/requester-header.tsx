"use client";

import { NotificationPopover } from "@/components/modules/notification/NotificationPopover";
import { User as UserIcon, Activity } from "lucide-react";

export default function RequesterHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#0a0d14]/80 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-zinc-400">Welcome Back,</span>
        <span className="text-xs font-black text-white">Requester Portal</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Realtime Notification Bell Dropdown */}
        <NotificationPopover />

        <div className="h-4 w-px bg-white/10" />

        <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-bold text-red-400">
          <Activity className="h-3.5 w-3.5" /> ACTIVE REQUESTER
        </span>

        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-rose-600 text-xs font-black text-white shadow-md">
          <UserIcon className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}