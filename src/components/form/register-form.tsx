/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { GoogleLogin } from "@react-oauth/google";
import { useRegister, useGoogleLogin } from "@/hooks/auth.hook";
import {
  User,
  Mail,
  Lock,
  Building2,
  UserCheck,
  RefreshCw,
  Droplets,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

export function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();
  const googleLoginMutation = useGoogleLogin();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requesterType, setRequesterType] = useState<"PATIENT" | "HOSPITAL">(
    "PATIENT"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    registerMutation.mutate(
      { name, email, password, requesterType },
      {
        onSuccess: () => {
          // 💡 Dynamic Email Redirect to /register/verify-account
          router.push(
            `/register/verify-account?email=${encodeURIComponent(email)}`
          );
        },
        onError: (err: any) => {
          const msg = err?.message || "Registration failed. Please try again.";
          setErrorMsg(msg);
          toast.error(msg);
        },
      }
    );
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    if (!credentialResponse.credential) return;

    googleLoginMutation.mutate(
      { idToken: credentialResponse.credential },
      {
        onSuccess: (data) => {
          // Save Access Token if returned
          if (data?.data?.accessToken) {
            localStorage.setItem("accessToken", data.data.accessToken);
          }

          toast.success("Google Authentication successful.");

          // 💡 Dynamic Redirect based on (dashboard) routes
          const role = data?.data?.user?.role || data?.data?.role;

          if (role === "ADMIN") {
            router.push("/admin");
          } else if (role === "DONOR") {
            router.push("/donor");
          } else if (role === "REQUESTER") {
            router.push("/requester");
          } else {
            router.push("/");
          }

          router.refresh();
        },
        onError: (err: any) => {
          const msg = err?.message || "Google Authentication failed.";
          setErrorMsg(msg);
          toast.error(msg);
        },
      }
    );
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0a0d14]/85 p-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] sm:p-8">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-red-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-rose-600/10 blur-3xl" />

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-600/20 to-rose-600/10 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <Droplets className="h-7 w-7" />
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Create Account
          </h1>
          <p className="text-xs text-zinc-400">
            Join the emergency response platform as an Individual or Hospital
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

        {/* Google OAuth Section */}
        <div className="space-y-3 border-b border-white/10 pb-5">
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setErrorMsg("Google Login failed")}
              theme="filled_black"
              shape="circle"
            />
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative bg-[#0a0d14] px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Or Register With Email
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Requester Type Selection */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRequesterType("PATIENT")}
                className={`flex items-center justify-center gap-2 rounded-xl border p-2.5 text-xs font-bold transition-all duration-200 ${
                  requesterType === "PATIENT"
                    ? "border-red-500 bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30 scale-[1.02]"
                    : "border-white/10 bg-[#05070a]/90 text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
              >
                <UserCheck className="h-4 w-4" />
                Patient / Individual
              </button>

              <button
                type="button"
                onClick={() => setRequesterType("HOSPITAL")}
                className={`flex items-center justify-center gap-2 rounded-xl border p-2.5 text-xs font-bold transition-all duration-200 ${
                  requesterType === "HOSPITAL"
                    ? "border-red-500 bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30 scale-[1.02]"
                    : "border-white/10 bg-[#05070a]/90 text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
              >
                <Building2 className="h-4 w-4" />
                Hospital / Org
              </button>
            </div>
          </div>

          {/* Full Name / Hospital Name */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300">
              {requesterType === "HOSPITAL" ? "Hospital Name" : "Full Name"}
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                required
                placeholder={
                  requesterType === "HOSPITAL"
                    ? "e.g. Square Hospital"
                    : "e.g. Rahim Ahmed"
                }
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#05070a]/90 py-2.5 pl-10 pr-4 text-xs text-white placeholder-zinc-600 outline-none transition-all duration-200 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#05070a]/90 py-2.5 pl-10 pr-4 text-xs text-white placeholder-zinc-600 outline-none transition-all duration-200 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#05070a]/90 py-2.5 pl-10 pr-4 text-xs text-white placeholder-zinc-600 outline-none transition-all duration-200 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.div whileTap={{ scale: 0.98 }} className="pt-2">
            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-3 text-xs font-bold text-white shadow-[0_10px_30px_rgba(220,38,38,0.3)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_15px_40px_rgba(220,38,38,0.4)] disabled:opacity-50"
            >
              {registerMutation.isPending ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Register & Verify Email</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </motion.div>
        </form>

        {/* Redirect */}
        <p className="text-center text-xs text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-red-400 underline-offset-4 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}