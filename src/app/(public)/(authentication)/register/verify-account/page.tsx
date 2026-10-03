"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useVerifyEmail } from "@/hooks";


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

  return (
    <div className="w-full space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3 text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/[0.07] text-red-400 shadow-[0_0_35px_rgba(239,68,68,0.12)]">
          <ShieldCheck className="h-7 w-7" />
        </div>

        <h1 className="text-3xl font-black tracking-tight text-white">
          Verify your account
        </h1>

        <p className="text-sm text-zinc-400">
          Enter the 6-digit code sent to{" "}
          <span className="font-semibold text-red-400">{email || "your email"}</span>.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          value={otp}
          onChange={(event) =>
            setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
          }
          placeholder="Enter 6-digit OTP"
          aria-label="Verification code"
          className="h-12 border-white/[0.08] bg-[#0a0d14]/80 text-center text-lg font-bold tracking-[0.3em] text-zinc-100 placeholder:text-zinc-600 placeholder:font-normal placeholder:tracking-normal transition-all duration-300 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
        />

        <motion.div whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            disabled={isPending || otp.length !== 6}
            className="group relative h-12 w-full overflow-hidden rounded-xl bg-red-600 font-bold text-white shadow-[0_10px_35px_rgba(220,38,38,0.22)] transition-all duration-300 hover:bg-red-500 hover:shadow-[0_15px_45px_rgba(220,38,38,0.32)] disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
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

      <Button
        type="button"
        variant="link"
        className="w-full text-zinc-400 hover:text-red-400"
        onClick={() => router.push("/login")}
      >
        Back to Login
      </Button>
    </div>
  );
}