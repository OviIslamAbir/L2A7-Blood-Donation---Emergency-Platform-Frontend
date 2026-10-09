"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  User as UserIcon,
  Shield,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";

import { Logo } from "./logo";
import { useGetMe, useLogout } from "@/hooks/auth.hook";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const { data: user, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();

  useEffect(() => {
    setMounted(true);
  }, []);

  const tokenExists =
    mounted && typeof window !== "undefined"
      ? !!localStorage.getItem("accessToken")
      : false;
  const showLoading = mounted && isLoading && tokenExists;


  const getRoleAction = (role?: string) => {
    switch (role) {
      case "ADMIN":
        return {
          label: "Admin Panel",
          href: "/admin",
          icon: Shield,
        };
      case "DONOR":
        return {
          label: "Donor Panel",
          href: "/donor",
          icon: LayoutDashboard,
        };
      case "REQUESTER":
        return {
          label: "Requester Portal",
          href: "/requester",
          icon: HeartHandshake,
        };
      default:
        return {
          label: "Apply for Donor",
          href: "/apply-donor",
          icon: HeartHandshake,
        };
    }
  };

  const actionInfo = getRoleAction(user?.role);
  const ActionIcon = actionInfo.icon;

  const handleLogout = () => {
    setUserMenuOpen(false);
    setOpen(false);
    logout();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#07090d]/95 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />


        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "font-semibold text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {item.label}

                <span
                  className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>


        <div className="hidden items-center gap-3 md:flex">
          {!mounted ? (
            <div className="h-10 w-28 rounded-xl bg-white/5 opacity-50" />
          ) : showLoading ? (
            <div className="h-10 w-28 animate-pulse rounded-xl bg-white/5" />
          ) : user ? (
            <div className="relative flex items-center gap-3">
              <Link
                href={actionInfo.href}
                className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-gradient-to-r from-red-600/20 to-rose-600/10 px-4 py-2.5 text-xs font-bold text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all duration-300 hover:border-red-500/50 hover:bg-red-500/20 hover:text-white"
              >
                <ActionIcon className="h-4 w-4 text-red-400" />
                <span>{actionInfo.label}</span>
              </Link>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-1.5 pr-3 transition-all duration-300 hover:border-red-500/30 hover:bg-white/10"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-rose-600 text-xs font-bold uppercase text-white shadow-md">
                    {user.name ? user.name.charAt(0) : <UserIcon className="h-4 w-4" />}
                  </div>
                  <span className="max-w-[110px] truncate text-xs font-semibold text-zinc-200">
                    {user.name || "Account"}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 transition-transform duration-300 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-[#0a0d14]/95 p-2 shadow-2xl backdrop-blur-2xl z-50">
                    <div className="border-b border-white/5 px-3 py-2.5">
                      <p className="truncate text-xs font-bold text-white">
                        {user.name}
                      </p>
                      <p className="truncate text-[11px] text-zinc-400">
                        {user.email}
                      </p>
                      <div className="mt-1.5">
                        <span className="inline-block rounded-md border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-red-400">
                          {user.role}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 pt-1.5">
                    
                      <Link
                        href={
                          user.role === "ADMIN"
                            ? "/admin"
                            : user.role === "DONOR"
                            ? "/donor"
                            : "/requester"
                        }
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        <LayoutDashboard className="h-3.5 w-3.5 text-red-400" />
                        Dashboard Overview
                      </Link>

                      {user.role === "REQUESTER" && (
                        <Link
                          href="/apply-donor"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-amber-400 transition-colors hover:bg-amber-500/10"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          Apply for Donor
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-400 transition-colors hover:bg-rose-500/10"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-300 transition-all duration-300 hover:bg-white/5 hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/apply-donor"
                className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-600/30"
              >
                <Heart className="h-3.5 w-3.5 fill-white transition-transform duration-300 group-hover:scale-125" />
                <span>Join as Donor</span>
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-zinc-200 transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/10 hover:text-white"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>


      <div
        className={`overflow-hidden border-t border-white/5 bg-[#07090d]/98 backdrop-blur-xl transition-all duration-500 md:hidden ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? "border-l-2 border-red-500 bg-red-500/10 pl-5 text-red-400"
                      : "text-zinc-300 hover:bg-red-500/10 hover:pl-6 hover:text-red-400"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-white/5 pt-4">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-2 py-1">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-xs font-bold uppercase text-white">
                    {user.name ? user.name.charAt(0) : "U"}
                  </div>
                  <div className="overflow-hidden">
                    <p className="truncate text-xs font-bold text-white">
                      {user.name}
                    </p>
                    <p className="truncate text-[10px] text-zinc-400">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href={actionInfo.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-600/20 py-3 text-xs font-bold text-red-400"
                >
                  <ActionIcon className="h-4 w-4" />
                  {actionInfo.label}
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-3 text-xs font-semibold text-rose-400 hover:bg-rose-500/10"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/[0.03] py-3 text-center text-xs font-semibold text-zinc-300 hover:text-white"
                >
                  Login
                </Link>

                <Link
                  href="/apply-donor"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-3 text-xs font-bold text-white shadow-lg shadow-red-600/20"
                >
                  <Heart className="h-4 w-4 fill-white" />
                  Join as Donor
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}