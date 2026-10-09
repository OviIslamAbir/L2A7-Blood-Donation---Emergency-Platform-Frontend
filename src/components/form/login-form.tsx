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
  ArrowRight,
  Lock,
  Mail,
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

        // 💡 Extract user role and redirect dynamically based on folder structure
        const role = response?.data?.user?.role || response?.data?.role;

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
        const errorMessage =
          err?.data?.message ||
          err?.message ||
          "Unable to login. Check credentials.";
        toast.error(errorMessage);
      },
    });
  }

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0a0d14]/85 p-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] sm:p-8">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-rose-600/10 blur-3xl" />

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
            Welcome Back
          </h1>

          <p className="text-xs text-zinc-400">
            Log in to manage emergency requests and donor activities.
          </p>
        </motion.div>

        {/* Form */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
          className="space-y-4"
        >
          <FieldGroup className="space-y-4">
            {/* Email Field */}
            <form.Field name="email">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={invalid} className="space-y-1.5">
                    <FieldLabel
                      htmlFor="email"
                      className="text-[11px] font-bold uppercase tracking-wider text-zinc-300"
                    >
                      Email Address
                    </FieldLabel>

                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
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
                        className="h-11 border-white/10 bg-[#05070a]/90 pl-10 text-xs text-zinc-100 placeholder:text-zinc-600 transition-all duration-200 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
                      />
                    </div>

                    {invalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Password Field */}
            <form.Field name="password">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={invalid} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <FieldLabel
                        htmlFor="password"
                        className="text-[11px] font-bold uppercase tracking-wider text-zinc-300"
                      >
                        Password
                      </FieldLabel>

                      <Link
                        href="/forgot-password"
                        className="text-[11px] font-semibold text-red-400 transition-colors hover:text-red-300 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        onBlur={field.handleBlur}
                        aria-invalid={invalid}
                        className="h-11 border-white/10 bg-[#05070a]/90 pl-10 pr-10 text-xs text-zinc-100 placeholder:text-zinc-600 transition-all duration-200 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
                      />

                      <button
                        type="button"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-red-400 focus:outline-none"
                        onClick={() => setShowPassword((v) => !v)}
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
            <motion.div whileTap={{ scale: 0.98 }} className="pt-1">
              <Button
                type="submit"
                disabled={isPending}
                className="group relative h-11 w-full overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-rose-600 font-bold text-xs text-white shadow-[0_10px_30px_rgba(220,38,38,0.3)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_15px_40px_rgba(220,38,38,0.4)] disabled:opacity-60"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isPending ? (
                    <>
                      <Spinner className="size-4" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Login to Account</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Button>
            </motion.div>
          </FieldGroup>
        </form>

        {/* Separator & Google OAuth */}
        <div className="space-y-3 pt-1">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative bg-[#0a0d14] px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Or continue with
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLoginComponent />
          </div>
        </div>

        {/* Redirect */}
        <p className="text-center text-xs text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-red-400 underline-offset-4 hover:underline"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}