"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  HeartHandshake,
  User,
  Droplets,
  Bell,
  LogOut,
  Crosshair,
  Award,
} from "lucide-react";
import { useGetUnreadNotificationCount } from "@/hooks/use-notification";

const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/donor",
    icon: LayoutDashboard,
  },
  {
    label: "Matched Requests",
    href: "/donor/matches",
    icon: Crosshair,
  },
  {
    label: "My Donations",
    href: "/donor/donations",
    icon: Award,
  },
  {
    label: "Donor Application",
    href: "/donor/application",
    icon: HeartHandshake,
  },
  {
    label: "My Profile",
    href: "/donor/profile",
    icon: User,
  },
];

export default function DonorSidebar() {
  const pathname = usePathname();
  const { data: unreadCount = 0 } = useGetUnreadNotificationCount();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-white/10 bg-[#0a0d14]/90 backdrop-blur-xl">
      {/* Brand Logo Header */}
      <div className="flex h-16 items-center justify-between border-b border-white/5 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-rose-600 shadow-lg shadow-red-600/30">
            <Droplets className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-black tracking-wide text-white">
              Blood<span className="text-red-500">Pulse</span>
            </h2>
            <p className="text-[10px] font-semibold text-zinc-500">DONOR PANEL</p>
          </div>
        </div>

        {/* Global Notification Badge Indicator */}
        {unreadCount > 0 && (
          <div className="flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-400">
            <Bell className="h-3 w-3" />
            <span>{unreadCount}</span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 space-y-1 p-4">
        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          Menu Navigation
        </p>
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/donor" && pathname?.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/20"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Logout Footer */}
      <div className="border-t border-white/5 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3.5 py-2.5 text-xs font-bold text-rose-400 transition hover:bg-rose-500/20"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout Account</span>
        </button>
      </div>
    </aside>
  );
}