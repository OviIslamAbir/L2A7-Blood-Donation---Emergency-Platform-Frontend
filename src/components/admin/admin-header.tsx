"use client";

import type { ReactNode } from "react";
import { useGetMe } from "@/hooks/auth.hook";
import { NotificationPopover } from "@/components/modules/notification/NotificationPopover";
import { ShieldCheck, Sparkles, User as UserIcon } from "lucide-react";

interface AdminHeaderProps {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export default function AdminHeader({
  title = "Admin Dashboard",
  description = "Manage users, donor requests, and system preferences.",
  action,
}: AdminHeaderProps) {
  const { data: user } = useGetMe();

  return (
    <header className="sticky top-0 z-40 flex flex-col gap-4 border-b border-white/10 bg-[#0a0d14]/80 px-6 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-black tracking-tight text-white sm:text-2xl">
            {title}
          </h1>
          <Sparkles className="h-4 w-4 text-red-500" />
        </div>
        <p className="mt-0.5 text-xs text-zinc-400">{description}</p>
      </div>

      {/* Header Right Actions & Profile */}
      <div className="flex items-center gap-3">
        {action}

        {/* 🔔 Reusable Notification Popover */}
        <NotificationPopover />

        <div className="h-4 w-px bg-white/10" />

        {/* Admin Role Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-bold text-red-400">
          <ShieldCheck className="h-3.5 w-3.5" /> SYSTEM ADMIN
        </span>

        {/* User Profile Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-rose-600 text-xs font-black text-white shadow-md border border-red-500/30">
          {user?.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="h-4 w-4" />}
        </div>
      </div>
    </header>
  );
}