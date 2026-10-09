/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { ShieldCheck, ArrowRight, RefreshCw, Mail } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useVerifyEmail } from "@/hooks/auth.hook";

export default function VerifyAccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [otp, setOtp] = useState("");

  const { mutate: verifyAccount, isPending } = useVerifyEmail();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email) {
      toast.error("Registration email parameter is missing.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      toast.error("Please enter a valid 6-digit verification code.");
      return;
    }

    verifyAccount(
      { email, otp },
      {
        onSuccess: (res) => {
          if (res && res.success === false) {
            toast.error(res.message || "Verification failed.");
            return;
          }

          if (res?.data?.accessToken) {
            localStorage.setItem("accessToken", res.data.accessToken);
          }

          toast.success("Account verified successfully! Welcome to LifeDrop.");
          router.push("/dashboard");
          router.refresh();
        },
        onError: (err: any) => {
          const errorMessage =
            err?.data?.message || err?.message || "Invalid or expired OTP.";
          toast.error(errorMessage);
        },
      }
    );
  }

  const handleResendOtp = () => {
    if (!email) {
      toast.error("Email address is missing.");
      return;
    }
    toast.info("Resending OTP to " + email);
  };

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0a0d14]/85 p-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] sm:p-8">
      
      <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-red-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-rose-600/10 blur-3xl" />

      <div className="relative z-10 space-y-6">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3 text-center"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-600/20 to-rose-600/10 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <ShieldCheck className="h-7 w-7" />
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Verify Your Account
          </h1>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Enter the 6-digit verification code sent to
            <br />
            <span className="inline-flex items-center gap-1.5 mt-1 font-semibold text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/20 text-xs">
              <Mail className="h-3 w-3 shrink-0" />
              {email || "your email"}
            </span>
          </p>
        </motion.div>

       
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-center text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              6-Digit Security Code
            </label>
            <Input
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(event) =>
                setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="0 0 0 0 0 0"
              aria-label="Verification code"
              className="h-14 w-full rounded-2xl border border-white/10 bg-[#05070a]/90 text-center text-xl font-black tracking-[0.4em] text-white placeholder:text-zinc-700 placeholder:font-normal placeholder:tracking-widest transition-all duration-300 focus:border-red-500/70 focus:ring-2 focus:ring-red-500/20 focus:bg-black/80"
            />
          </div>

          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={isPending || otp.length !== 6}
              className="group relative h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-rose-600 font-bold text-white shadow-[0_10px_30px_rgba(220,38,38,0.3)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_15px_40px_rgba(220,38,38,0.4)] disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider">
                {isPending ? (
                  <>
                    <Spinner className="size-4" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <span>Verify Account</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </Button>
          </motion.div>
        </form>

    
        <div className="space-y-3 pt-2 text-center text-xs">
          <p className="text-zinc-400">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResendOtp}
              className="inline-flex items-center gap-1 font-bold text-red-400 underline-offset-4 hover:underline focus:outline-none"
            >
              <RefreshCw className="h-3 w-3" /> Resend OTP
            </button>
          </p>

          <div className="border-t border-white/10 pt-3">
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 text-xs text-zinc-500 hover:text-zinc-300"
              onClick={() => router.push("/login")}
            >
              Back to Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}