/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import {
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldAlert,
  Mail,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

import { useResetPassword } from "@/hooks/auth.hook";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const resetPasswordMutation = useResetPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email) {
      const msg = "Reset email parameter is missing from the URL.";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      const msg = "Please enter a valid 6-digit OTP code.";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    if (newPassword.length < 6) {
      const msg = "Password must be at least 6 characters long.";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    if (newPassword !== confirmPassword) {
      const msg = "Passwords do not match!";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    resetPasswordMutation.mutate(
      {
        email,
        otp,
        newPassword,
      },
      {
        onSuccess: (res: any) => {
          if (res && res.success === false) {
            setErrorMsg(res.message || "Failed to reset password.");
            toast.error(res.message || "Failed to reset password.");
            return;
          }

          toast.success("Password reset successfully! Please login.");
          router.push("/login");
        },
        onError: (err: any) => {
          const errorMessage =
            err?.data?.message || err?.message || "Invalid OTP or request failed.";
          setErrorMsg(errorMessage);
          toast.error(errorMessage);
        },
      }
    );
  };

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0a0d14]/85 p-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] sm:p-8">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-red-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-rose-600/10 blur-3xl" />

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3 text-center"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-600/20 to-rose-600/10 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <KeyRound className="h-7 w-7" />
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Reset Password
          </h1>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Enter the 6-digit code sent to
            <br />
            <span className="inline-flex items-center gap-1.5 mt-1 font-semibold text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/20 text-xs">
              <Mail className="h-3 w-3 shrink-0" />
              {email || "your email"}
            </span>
          </p>
        </motion.div>

        {/* Error Alert */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-semibold text-red-400"
          >
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* OTP Input */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300">
              6-Digit OTP Code
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              required
              placeholder="0 0 0 0 0 0"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              className="w-full rounded-xl border border-white/10 bg-[#05070a]/90 py-2.5 px-4 text-center text-lg font-black tracking-[0.3em] text-white placeholder:text-zinc-700 placeholder:font-normal placeholder:tracking-normal outline-none transition-all duration-200 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
            />
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type={showNewPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#05070a]/90 py-2.5 pl-10 pr-10 text-xs text-white placeholder-zinc-600 outline-none transition-all duration-200 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#05070a]/90 py-2.5 pl-10 pr-10 text-xs text-white placeholder-zinc-600 outline-none transition-all duration-200 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.div whileTap={{ scale: 0.98 }} className="pt-2">
            <button
              type="submit"
              disabled={resetPasswordMutation.isPending}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-3 text-xs font-bold text-white shadow-[0_10px_30px_rgba(220,38,38,0.3)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_15px_40px_rgba(220,38,38,0.4)] disabled:opacity-50"
            >
              {resetPasswordMutation.isPending ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <span>Reset Password</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </motion.div>
        </form>

        {/* Back Navigation */}
        <div className="border-t border-white/10 pt-3 text-center">
          <Link
            href="/login"
            className="text-xs text-zinc-400 hover:text-red-400 transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Suspense
        fallback={
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
            <RefreshCw className="h-4 w-4 animate-spin text-red-500" />
            Loading...
          </div>
        }
      >
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}