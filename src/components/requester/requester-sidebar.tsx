"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  HeartHandshake,
  CreditCard,
  Droplets,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/requester",
    icon: LayoutDashboard,
  },
  {
    label: "New Blood Request",
    href: "/requester/create-request",
    icon: PlusCircle,
  },
  {
    label: "My Requests",
    href: "/requester/my-requests",
    icon: HeartHandshake,
  },
  {
    label: "Payment History",
    href: "/requester/payments",
    icon: CreditCard,
  },
];

export default function RequesterSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-white/10 bg-[#0a0d14]/90 backdrop-blur-xl">
      {/* Brand Header */}
      <div className="flex h-16 items-center gap-3 border-b border-white/5 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-rose-600 shadow-lg shadow-red-600/30">
          <Droplets className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-black tracking-wide text-white">
            Blood<span className="text-red-500">Pulse</span>
          </h2>
          <p className="text-[10px] font-semibold text-zinc-500">
            REQUESTER PANEL
          </p>
        </div>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 space-y-1 p-4">
        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          Navigation
        </p>
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/requester" && pathname?.startsWith(item.href));
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