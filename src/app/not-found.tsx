"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  FileQuestion,
  Home,
  ArrowLeft,
  Droplets,
  Search,
  HeartPulse,
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden p-4">
      {/* Ambient Background Lights */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.08)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-red-600/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/3 h-80 w-80 rounded-full bg-rose-600/15 blur-[130px]" />

      <div className="relative z-10 mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0a0d14]/85 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.7)]">
        {/* Subtle Top Glow Border */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

        <div className="space-y-6 text-center">
          {/* Glowing 404 Display */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative mx-auto flex flex-col items-center justify-center"
          >
            <div className="relative">
              <h1 className="text-7xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 sm:text-8xl select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center blur-2xl opacity-40 bg-red-600/50 -z-10" />
            </div>

            <div className="mt-[-10px] inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.25)]">
              <FileQuestion className="h-3.5 w-3.5" />
              Page Not Found
            </div>
          </motion.div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-white sm:text-2xl">
              Lost in the Pipeline?
            </h2>
            <p className="mx-auto max-w-sm text-xs leading-relaxed text-zinc-400">
              The page you are looking for doesn't exist, was removed, or is temporarily unavailable on the LifeDrop network.
            </p>
          </div>

          {/* Quick Platform Shortcuts */}
          <div className="space-y-2 text-left">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-1">
              Popular Destinations
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/donors"
                className="group flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-xs font-semibold text-zinc-300 transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-white"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 group-hover:scale-110 transition-transform">
                  <Search className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Find Donors</p>
                  <p className="text-[10px] text-zinc-500">Search blood bank</p>
                </div>
              </Link>

              <Link
                href="/requests"
                className="group flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-xs font-semibold text-zinc-300 transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-white"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 group-hover:scale-110 transition-transform">
                  <HeartPulse className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Blood Requests</p>
                  <p className="text-[10px] text-zinc-500">Emergency posts</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Back Home Button */}
          <div className="pt-2">
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                href="/"
                className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 font-bold text-xs uppercase tracking-wider text-white shadow-[0_10px_35px_rgba(220,38,38,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_15px_45px_rgba(220,38,38,0.5)]"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                <span>Return to Homepage</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}