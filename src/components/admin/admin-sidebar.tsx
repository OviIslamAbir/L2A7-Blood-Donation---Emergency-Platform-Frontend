"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  User as UserIcon,
  ScrollText,
  Bell,
} from "lucide-react";
import { toast } from "sonner";

import { useGetMe, useLogout } from "@/hooks/auth.hook";
import { useGetUnreadNotificationCount } from "@/hooks/use-notification";

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
  {
    title: "Audit Logs",
    href: "/admin/audit-logs",
    icon: ScrollText,
  },
  {
    title: "Admin Profile",
    href: "/admin/profile",
    icon: UserIcon,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: user } = useGetMe();
  const { mutate: logout, isPending } = useLogout();
  const { data: unreadCount = 0 } = useGetUnreadNotificationCount();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        toast.success("Logged out successfully.");
        router.push("/login");
        router.refresh();
      },
      onError: (err: any) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        toast.error(err?.message || "Logged out.");
        router.push("/login");
        router.refresh();
      },
    });
  };

  return (
    <>
      {/* Mobile Toggle Button */}
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
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 border-0 bg-black/70 p-0 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed bottom-0 top-0 z-40 flex w-64 flex-col border-r border-white/10 bg-[#0a0d14]/90 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-white/5 px-6">
          <Link
            href="/"
            className="flex items-center gap-3 transition hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/30 bg-gradient-to-br from-red-600 to-rose-600 shadow-lg shadow-red-600/30">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>

            <div>
              <h2 className="text-sm font-black tracking-wide text-white">
                Life<span className="text-red-500">Drop</span>
              </h2>
              <p className="text-[10px] font-semibold text-zinc-500">
                ADMIN PANEL
              </p>
            </div>
          </Link>

          {/* Unread Notification Badge */}
          {unreadCount > 0 && (
            <div className="flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.2)]">
              <Bell className="h-3 w-3 animate-pulse text-red-400" />
              <span>{unreadCount}</span>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <div className="flex-1 space-y-1 p-4 overflow-y-auto">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Main Menu
          </p>

          {sidebarNavItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname?.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/20"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </div>

                {isActive && <ChevronRight className="h-3.5 w-3.5 opacity-80" />}
              </Link>
            );
          })}
        </div>

        {/* Bottom Actions & User Profile */}
        <div className="border-t border-white/5 p-4 space-y-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-xs font-bold text-zinc-400 transition hover:bg-white/5 hover:text-white"
          >
            <Home className="h-4 w-4 text-zinc-500" />
            <span>Main Website</span>
          </Link>

          {user && (
            <Link
              href="/admin/profile"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-2.5 transition hover:bg-white/5 hover:border-white/10"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600/20 text-xs font-bold uppercase text-red-400 border border-red-500/20 shrink-0">
                {user.name ? user.name.charAt(0) : <UserIcon className="h-4 w-4" />}
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-xs font-bold text-white">
                  {user.name || "Admin"}
                </p>
                <p className="truncate text-[10px] text-zinc-400">
                  {user.email}
                </p>
              </div>
            </Link>
          )}

          <button
            type="button"
            onClick={handleLogout}
            disabled={isPending}
            className="flex w-full items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3.5 py-2.5 text-xs font-bold text-rose-400 transition hover:bg-rose-500/20 disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" />
            <span>{isPending ? "Logging out..." : "Logout Admin"}</span>
          </button>
        </div>
      </aside>
    </>
  );
}