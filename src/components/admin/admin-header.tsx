"use client";

import type { ReactNode } from "react";
import { useGetMe } from "@/hooks/auth.hook";
import { Shield, Sparkles } from "lucide-react";

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
    <div className="flex flex-col gap-4 border-b border-white/5 bg-[#07090d]/60 px-6 py-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            {title}
          </h1>
          <Sparkles className="h-4 w-4 text-red-500" />
        </div>
        <p className="mt-1 text-xs text-zinc-400 sm:text-sm">{description}</p>
      </div>

      <div className="flex items-center gap-3">
        {action}

        <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#0a0d14] px-3.5 py-2 sm:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-500/30 bg-red-600/20 text-red-400">
            <Shield className="h-4 w-4" />
          </div>

          <div className="text-left">
            <p className="text-xs font-bold text-white">
              {user?.name || "System Admin"}
            </p>
            <p className="text-[10px] text-zinc-500">Role: ADMIN</p>
          </div>
        </div>
      </div>
    </div>
  );
}