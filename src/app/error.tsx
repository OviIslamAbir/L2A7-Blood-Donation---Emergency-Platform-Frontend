"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  AlertTriangle,
  RotateCcw,
  Home,
  ChevronDown,
  Terminal,
  LifeBuoy,
} from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.error("LifeDrop Application Error:", error);
  }, [error]);

  return (
    <div className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden p-4">
      {/* Background Grid & Gradient Orbs */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.08)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-red-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-72 w-72 rounded-full bg-rose-600/15 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0a0d14]/85 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.7)]">
        {/* Subtle Top Glow Border */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

        <div className="space-y-6 text-center">
          {/* Animated Hazard Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative mx-auto flex h-20 w-20 items-center justify-center"
          >
            <span className="absolute inset-0 animate-ping rounded-3xl bg-red-600/20 duration-1000" />
            <div className="relative flex h-full w-full items-center justify-center rounded-3xl border border-red-500/40 bg-gradient-to-br from-red-600/20 via-red-950/30 to-black text-red-500 shadow-[0_0_35px_rgba(239,68,68,0.3)]">
              <AlertTriangle className="h-10 w-10 animate-pulse" />
            </div>
          </motion.div>

          {/* Heading & Subtitle */}
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              System Interrupted
            </span>
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Unexpected Error Occurred
            </h1>
            <p className="mx-auto max-w-sm text-xs leading-relaxed text-zinc-400">
              Something went wrong while processing this action. Don't worry, your data is safe and our systems remain operational.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => reset()}
              className="group relative flex h-12 w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 font-bold text-xs uppercase tracking-wider text-white shadow-[0_10px_35px_rgba(220,38,38,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_15px_45px_rgba(220,38,38,0.5)]"
            >
              <RotateCcw className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180" />
              <span>Re-attempt Action</span>
            </motion.button>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/"
                className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] text-xs font-bold text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <Home className="h-4 w-4 text-zinc-400" />
                <span>Return Home</span>
              </Link>

              <Link
                href="/contact"
                className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] text-xs font-bold text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <LifeBuoy className="h-4 w-4 text-zinc-400" />
                <span>Support</span>
              </Link>
            </div>
          </div>

          {/* Collapsible Error Technical Details */}
          <div className="border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>{showDetails ? "Hide" : "Show"} Error Logs</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-300 ${
                  showDetails ? "rotate-180" : ""
                }`}
              />
            </button>

            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 overflow-hidden rounded-xl border border-red-500/20 bg-black/60 p-3 text-left font-mono text-[10px] text-red-300/80"
              >
                <p className="break-all font-bold">
                  {error?.name}: {error?.message}
                </p>
                {error?.digest && (
                  <p className="mt-1 text-zinc-600">Digest: {error.digest}</p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}