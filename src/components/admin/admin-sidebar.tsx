"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Droplets,
  Home,
  LogOut,
  ShieldCheck,
  ChevronRight,
  X,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { useLogout } from "@/hooks/auth.hook";

const sidebarNavItems = [
  {
    title: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Donor Applications",
    href: "/admin/donor-applications",
    icon: ClipboardList,
  },
  {
    title: "Manage Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Blood Requests",
    href: "/admin/blood-requests",
    icon: Droplets,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { mutate: logout } = useLogout();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar Toggle Button */}
      <div className="fixed top-3 left-4 z-50 flex items-center gap-2 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0a0d14]/90 text-white shadow-xl backdrop-blur-xl hover:border-red-500/30"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Unified Sidebar Container */}
      <aside
        className={`fixed bottom-0 top-0 z-40 flex w-64 flex-col border-r border-white/10 bg-[#07090d]/95 backdrop-blur-2xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-[70px] items-center border-b border-white/5 px-6">
          <Link
            href="/"
            className="flex items-center gap-3 transition hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/30 bg-red-600/20 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
              <ShieldCheck className="h-5 w-5 text-red-500" />
            </div>

            <div>
              <span className="text-base font-black tracking-wider text-white">
                Life<span className="text-red-500">Drop</span>
              </span>
              <span className="ml-1.5 rounded bg-red-500/10 px-1.5 py-0.5 text-[9px] font-bold text-red-400 uppercase border border-red-500/20">
                Admin
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 space-y-1.5 px-3 py-6">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Main Menu
          </p>

          {sidebarNavItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`group relative flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "border border-red-500/30 bg-red-500/10 text-white shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive
                        ? "text-red-400"
                        : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  />
                  <span>{item.title}</span>
                </div>

                {isActive && (
                  <ChevronRight className="h-4 w-4 text-red-400" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2 border-t border-white/5 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-zinc-400 transition hover:bg-white/5 hover:text-white"
          >
            <Home className="h-4 w-4 text-zinc-500" />
            <span>Main Website</span>
          </Link>

          <button
            type="button"
            onClick={() => logout()}
            className="flex w-full items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-3.5 py-2.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/15 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout Admin</span>
          </button>
        </div>
      </aside>
    </>
  );
}