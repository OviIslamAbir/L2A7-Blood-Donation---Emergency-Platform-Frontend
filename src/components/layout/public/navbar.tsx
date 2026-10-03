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

  const tokenExists = mounted && typeof window !== "undefined" ? !!localStorage.getItem("accessToken") : false;
  const showLoading = mounted && isLoading && tokenExists;

  const handleLogout = () => {
    setUserMenuOpen(false);
    setOpen(false);
    logout();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#07090d]/95 backdrop-blur-xl">
      {/* Top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {item.label}

                {/* Animated & Active underline */}
                <span
                  className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {!mounted ? (
            <div className="h-10 w-28 rounded-xl bg-white/5 opacity-50" />
          ) : showLoading ? (
            <div className="h-10 w-28 animate-pulse rounded-xl bg-white/5" />
          ) : user ? (
            <div className="relative flex items-center gap-3">
              {/* Dashboard Link */}
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition-all duration-300 hover:bg-red-500/20 hover:text-white shadow-[0_0_20px_rgba(239,68,68,0.15)]"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>

              {/* User Dropdown Menu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-1.5 pr-3 transition-all duration-300 hover:border-red-500/30 hover:bg-white/10"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 font-bold text-white uppercase text-xs shadow-md">
                    {user.name ? user.name.charAt(0) : <UserIcon className="h-4 w-4" />}
                  </div>
                  <span className="max-w-[110px] truncate text-sm font-medium text-zinc-200">
                    {user.name || "Account"}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform duration-300 ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Popup */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-white/10 bg-[#0a0d14]/95 p-2 shadow-2xl backdrop-blur-2xl">
                    <div className="px-3 py-2.5 border-b border-white/5">
                      <p className="text-xs font-bold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
                    </div>

                    <div className="pt-1.5 space-y-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        <LayoutDashboard className="h-3.5 w-3.5 text-red-400" />
                        Dashboard
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/10"
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
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:bg-white/5 hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-600/30"
              >
                <span className="absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 group-hover:left-[130%]" />

                <Heart className="relative h-4 w-4 fill-white transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />

                <span className="relative">Join as Donor</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-zinc-200 transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/10 hover:text-white"
            aria-label="Toggle navigation"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
                  className={`rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
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
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 font-bold text-white uppercase text-sm">
                    {user.name ? user.name.charAt(0) : "U"}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">{user.name}</p>
                    <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-red-600/20 border border-red-500/30 py-3 text-sm font-bold text-red-400"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Go to Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-3 text-sm font-semibold text-red-400 hover:bg-red-500/10"
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
                  className="rounded-xl border border-white/10 bg-white/[0.03] py-3 text-center text-sm font-semibold text-zinc-300 transition-all hover:bg-white/5 hover:text-white"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20"
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