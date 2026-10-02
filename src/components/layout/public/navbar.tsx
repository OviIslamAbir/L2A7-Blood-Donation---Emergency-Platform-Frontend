
"use client";

import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

import { Logo } from "./logo";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Find Donors", href: "/donors" },
  { label: "Blood Requests", href: "/requests" },
  { label: "About Us", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#07090d]/95 backdrop-blur-xl">
      {/* Top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative py-2 text-sm font-medium text-zinc-300 transition-all duration-300 hover:text-white"
            >
              {item.label}

              {/* Animated underline */}
              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
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
            {/* Shine */}
            <span className="absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 group-hover:left-[130%]" />

            <Heart className="relative h-4 w-4 fill-white transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />

            <span className="relative">Join as Donor</span>
          </Link>
        </div>

        {/* Mobile */}
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
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3.5 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:bg-red-500/10 hover:pl-6 hover:text-red-400"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-white/5 pt-4">
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
          </div>
        </nav>
      </div>
    </header>
  );
}

