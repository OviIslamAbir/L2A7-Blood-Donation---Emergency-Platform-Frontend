"use client";

import { useForm } from "@tanstack/react-form";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  KeyRound,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";

import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useForgotPassword } from "@/hooks/auth.hook";

const floatingItems = [
  {
    icon: KeyRound,
    label: "Secure Recovery",
    className: "left-0 top-10",
    delay: 0.2,
  },
  {
    icon: ShieldCheck,
    label: "Encrypted OTP",
    className: "bottom-12 right-0",
    delay: 0.5,
  },
];

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    onSubmit: async ({ value }: { value: ForgotPasswordValues }) => {
      forgotPassword(
        { email: value.email },
        {
          onSuccess: (res) => {
            if (res && res.success === false) {
              toast.error(res.message || "Failed to send reset code.");
              return;
            }

            toast.success(
              res?.message || "Password reset OTP sent to your email!"
            );
            const params = new URLSearchParams({ email: value.email });
            router.push(`/forgot-password/reset?${params.toString()}`);
          },
          onError: (err: any) => {
            const errorMessage =
              err?.data?.message ||
              err?.message ||
              "Something went wrong. Please try again.";
            toast.error(errorMessage);
          },
        }
      );
    },
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070a] text-white">
      
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:55px_55px]" />
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-red-600/[0.07] blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-rose-600/[0.06] blur-[140px]" />
      </div>

      <div className="relative grid min-h-screen lg:grid-cols-2">
       
        <section className="flex min-h-screen flex-col p-6 sm:p-10 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl transition-opacity hover:opacity-80"
            >
              <Logo />
              <span className="text-xl font-black tracking-tight">
                Life<span className="text-red-500">Drop</span>
              </span>
            </Link>
          </motion.div>

          <div className="flex flex-1 items-center justify-center py-12">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full max-w-md space-y-6"
            >
             
              <div className="space-y-3 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/[0.07] text-red-400 shadow-[0_0_35px_rgba(239,68,68,0.12)]">
                  <KeyRound className="h-7 w-7" />
                </div>

                <h1 className="text-3xl font-black tracking-tight text-white">
                  Forgot Password?
                </h1>

                <p className="text-sm text-zinc-400">
                  Enter your registered email address to receive a verification OTP.
                </p>
              </div>

          
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  void form.handleSubmit();
                }}
                className="space-y-5"
              >
                <FieldGroup className="space-y-4">
                  <form.Field name="email">
                    {(field) => {
                      const invalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={invalid} className="space-y-2">
                          <FieldLabel
                            htmlFor="email"
                            className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400"
                          >
                            Email address
                          </FieldLabel>

                          <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={field.state.value}
                            onChange={(event) =>
                              field.handleChange(event.target.value)
                            }
                            onBlur={field.handleBlur}
                            aria-invalid={invalid}
                            className="h-12 border-white/[0.08] bg-[#0a0d14]/80 text-zinc-100 placeholder:text-zinc-600 transition-all duration-300 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                          />

                          {invalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>

                  <motion.div whileTap={{ scale: 0.98 }} className="pt-2">
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="group relative h-12 w-full overflow-hidden rounded-xl bg-red-600 font-bold text-white shadow-[0_10px_35px_rgba(220,38,38,0.22)] transition-all duration-300 hover:bg-red-500 hover:shadow-[0_15px_45px_rgba(220,38,38,0.32)] disabled:opacity-70"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isPending ? (
                          <>
                            <Spinner className="size-4" />
                            <span>Sending Code...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Reset OTP</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </span>

                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    </Button>
                  </motion.div>
                </FieldGroup>
              </form>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition-colors hover:text-red-400"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            </motion.div>
          </div>

          <p className="text-center text-xs text-zinc-700">
            Connecting donors with those in need.
          </p>
        </section>

        
        <section className="relative hidden items-center justify-center overflow-hidden border-l border-white/[0.04] bg-[#080a10] lg:flex">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.08] blur-[120px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#080a10_75%)]" />
          </div>

          <div className="relative flex h-[580px] w-[580px] items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute h-[500px] w-[500px] rounded-full border border-red-500/[0.10]"
            >
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-red-500 shadow-[0_0_20px_#ef4444]" />
              <span className="absolute bottom-8 right-12 h-1.5 w-1.5 rounded-full bg-rose-400 shadow-[0_0_15px_#fb7185]" />
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute h-[390px] w-[390px] rounded-full border border-dashed border-red-500/[0.16]"
            >
              <span className="absolute right-10 top-12 h-2 w-2 rounded-full bg-rose-400 shadow-[0_0_18px_#fb7185]" />
            </motion.div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              className="absolute h-[280px] w-[280px] rounded-full border border-red-500/[0.18]"
            />

            <motion.div
              animate={{
                y: [0, -15, 0],
                rotateY: [0, 12, 0, -12, 0],
                rotateZ: [0, 3, 0, -3, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative z-10 flex h-56 w-56 items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 0.85, 1], opacity: [0.5, 0.25, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-2 h-16 w-32 rounded-full bg-red-600/30 blur-2xl"
              />

              <div
                className="relative flex h-44 w-40 items-center justify-center"
                style={{ filter: "drop-shadow(0 0 35px rgba(239,68,68,0.35))" }}
              >
                <svg
                  viewBox="0 0 200 230"
                  className="h-full w-full overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <defs>
                    <linearGradient
                      id="bloodDropGradient"
                      x1="45"
                      y1="20"
                      x2="160"
                      y2="215"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#ff8585" />
                      <stop offset="0.35" stopColor="#ef4444" />
                      <stop offset="0.72" stopColor="#b91c1c" />
                      <stop offset="1" stopColor="#450a0a" />
                    </linearGradient>

                    <radialGradient
                      id="bloodDropShine"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientTransform="translate(68 73) rotate(57) scale(105 68)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" stopOpacity=".45" />
                      <stop offset="1" stopColor="#fff" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <path
                    d="M100 8C100 8 23 102 23 148C23 191 57 222 100 222C143 222 177 191 177 148C177 102 100 8 100 8Z"
                    fill="url(#bloodDropGradient)"
                    stroke="#fb7185"
                    strokeOpacity=".6"
                    strokeWidth="2"
                  />

                  <path
                    d="M100 8C100 8 23 102 23 148C23 191 57 222 100 222C143 222 177 191 177 148C177 102 100 8 100 8Z"
                    fill="url(#bloodDropShine)"
                  />

                  <path
                    d="M59 124C64 105 80 78 91 63"
                    stroke="white"
                    strokeLinecap="round"
                    strokeOpacity=".55"
                    strokeWidth="8"
                  />

                  <path
                    d="M48 151C48 138 53 127 57 120"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeOpacity=".3"
                    strokeWidth="4"
                  />
                </svg>

                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2"
                >
                  <HeartPulse className="h-12 w-12 text-white/90 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
                </motion.div>
              </div>
            </motion.div>

            {floatingItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: [0, -10, 0] }}
                  transition={{
                    opacity: { duration: 0.7, delay: item.delay },
                    y: { duration: 5, delay: item.delay, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className={`absolute ${item.className} z-20 flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#0c0f16]/90 px-4 py-3 shadow-[0_15px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-200">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-12 left-12 right-12 z-20"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.06] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-red-400">
              <Sparkles className="h-3.5 w-3.5" />
              Account Security
            </div>

            <h2 className="max-w-xl text-3xl font-black leading-tight tracking-tight text-white">
              Recover your account &
              <span className="block bg-gradient-to-r from-red-500 to-rose-300 bg-clip-text text-transparent">
                stay connected.
              </span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-zinc-500">
              We take security seriously. Reset your password safely with
              our one-time verification system.
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition-colors hover:text-red-400"
            >
              Explore LifeDrop
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </section>
      </div>
    </main>
  );
}