"use client";

import { LucideIcon } from "lucide-react";

interface DonorStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  badgeColor?: string;
}

export default function DonorStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: DonorStatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-5 backdrop-blur-xl transition duration-300 hover:border-red-500/30 hover:bg-[#0c101a]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-400">{title}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 group-hover:scale-110 transition duration-300">
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-2xl font-black text-white">{value}</h3>
        {subtitle && <p className="mt-1 text-[11px] font-medium text-zinc-500">{subtitle}</p>}
      </div>
    </div>
  );
}