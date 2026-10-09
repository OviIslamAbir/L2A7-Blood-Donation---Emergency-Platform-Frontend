"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface AdminStatCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
  iconClassName?: string;
  trend?: string;
  trendUp?: boolean;
}

export default function AdminStatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName = "bg-red-500/10 text-red-400 border-red-500/20",
  trend,
  trendUp = true,
}: AdminStatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-5 backdrop-blur-xl transition-all duration-300 hover:border-red-500/30 hover:bg-[#0d111a] hover:shadow-[0_10px_30px_rgba(220,38,38,0.1)]"
    >
      
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-red-500/5 blur-2xl transition-all duration-500 group-hover:bg-red-500/15" />

      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          {title}
        </p>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${iconClassName} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <h3 className="text-3xl font-black tracking-tight text-white">
          {typeof value === "number" ? value.toLocaleString() : value}
        </h3>

        {trend && (
          <span
            className={`text-xs font-bold ${
              trendUp ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {trendUp ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>

      <p className="mt-2 text-xs font-medium text-zinc-500">{description}</p>
    </motion.div>
  );
}