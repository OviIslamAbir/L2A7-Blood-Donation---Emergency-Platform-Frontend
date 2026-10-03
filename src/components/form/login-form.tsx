"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { motion } from "motion/react";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  UserRound,
  Droplets,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import GoogleLoginComponent from "@/components/modules/google-login/GoogleLogin";
import { useLogin } from "@/hooks/auth.hook";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type LoginValues = z.infer<typeof loginSchema>;

const demoAccounts = [
  {
    role: "Admin",
    icon: ShieldCheck,
    email: process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL ?? "",
    password: process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD ?? "",
  },
  {
    role: "Requester",
    icon: UserRound,
    email: process.env.NEXT_PUBLIC_DEMO_REQUESTER_EMAIL ?? "",
    password: process.env.NEXT_PUBLIC_DEMO_REQUESTER_PASSWORD ?? "",
  },
  {
    role: "Donor",
    icon: Droplets,
    email: process.env.NEXT_PUBLIC_DEMO_DONOR_EMAIL ?? "",
    password: process.env.NEXT_PUBLIC_DEMO_DONOR_PASSWORD ?? "",
  },
];

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      authenticate(value);
    },
  });

  function authenticate(values: LoginValues) {
    login(values, {
      onSuccess: (response) => {
        if (response && response.success === false) {
          toast.error(response.message || "Login failed.");
          return;
        }

        if (response?.data?.accessToken) {
          localStorage.setItem("accessToken", response.data.accessToken);
        }

        toast.success("Login successful.");
        router.push("/dashboard");
        router.refresh();
      },
      onError: (err: any) => {
        const errorMessage =
          err?.data?.message || err?.message || "Unable to login. Check credentials.";
        toast.error(errorMessage);
      },
    });
  }

  function handleDemoLogin(account: (typeof demoAccounts)[number]) {
    if (!account.email || !account.password) {
      toast.error(`${account.role} demo account is not configured.`);
      return;
    }

    authenticate({
      email: account.email,
      password: account.password,
    });
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3 text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/[0.07] text-red-400 shadow-[0_0_35px_rgba(239,68,68,0.12)]">
          <Droplets className="h-7 w-7" />
        </div>

        <h1 className="text-3xl font-black tracking-tight text-white">
          Welcome back
        </h1>

        <p className="text-sm text-zinc-400">
          Login to your LifeDrop account.
        </p>
      </motion.div>

      {/* Main Form */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
        className="space-y-5"
      >
        <FieldGroup className="space-y-4">
          {/* Email Field */}
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

          {/* Password Field with Forgot Password Link */}
          <form.Field name="password">
            {(field) => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={invalid} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <FieldLabel
                      htmlFor="password"
                      className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400"
                    >
                      Password
                    </FieldLabel>

                    <Link
                      href="/forgot-password"
                      className="text-xs text-red-400 transition-colors hover:text-red-300 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      aria-invalid={invalid}
                      className="h-12 border-white/[0.08] bg-[#0a0d14]/80 pr-11 text-zinc-100 placeholder:text-zinc-600 transition-all duration-300 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-red-400 focus:outline-none"
                      onClick={() => setShowPassword((value) => !value)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {invalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Submit Button */}
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
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Login to Account</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Button>
          </motion.div>
        </FieldGroup>
      </form>

      {/* Social Login Separator & Google OAuth */}
      <div className="space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/[0.08]" />
          </div>
          <div className="relative bg-[#05070a] px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Or continue with
          </div>
        </div>

        <div className="flex justify-center pt-1">
          <GoogleLoginComponent />
        </div>
      </div>

      {/* Quick Demo Login Widget */}
      <div className="space-y-3.5 rounded-2xl border border-white/[0.07] bg-[#0a0d14]/70 p-4 backdrop-blur-xl">
        <div className="text-center">
          <div className="mb-1 flex items-center justify-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-red-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              Quick Demo Login
            </h2>
          </div>

          <p className="text-xs text-zinc-500">
            Select a role to test the application instantly.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {demoAccounts.map((account, index) => {
            const Icon = account.icon;

            return (
              <motion.div
                key={account.role}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => handleDemoLogin(account)}
                  className="h-auto w-full flex-col gap-1.5 rounded-xl border-white/[0.07] bg-white/[0.02] py-2.5 text-zinc-400 transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/[0.06] hover:text-red-400"
                >
                  <Icon className="size-4" />
                  <span className="text-[11px] font-semibold">
                    {account.role}
                  </span>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Register Redirect */}
      <p className="text-center text-sm text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-red-400 underline-offset-4 transition-colors hover:text-red-300 hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}