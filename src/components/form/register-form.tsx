"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { motion } from "motion/react";
import {
  Eye,
  EyeOff,
  UserPlus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { patientRegistrationSchema } from "@/validation";
import { useRegister } from "@/hooks/auth.hook";

type PatientRegistrationValues = z.infer<typeof patientRegistrationSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: registration, isPending } = useRegister();

  const defaultValues: PatientRegistrationValues = {
    name: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: patientRegistrationSchema,
    },
    onSubmit: async ({ value }) => {
      registration(
        {
          name: value.name,
          email: value.email,
          password: value.password,
          requesterType: "INDIVIDUAL",
        },
        {
          onSuccess: (res) => {
            if (res && res.success === false) {
              toast.error(res.message || "Registration failed. Please try again.");
              return;
            }

            toast.success(res.message || "Registration initiated! Please verify your email.");
            const params = new URLSearchParams({ email: value.email });
            router.push(`/register/verify-account?${params.toString()}`);
          },
          onError: (err: any) => {
            const errorMessage =
              err?.data?.message || err?.message || "Registration failed. Please try again.";
            toast.error(errorMessage);
          },
        }
      );
    },
  });

  return (
    <div className="w-full space-y-6">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3 text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/[0.07] text-red-400 shadow-[0_0_35px_rgba(239,68,68,0.12)]">
          <UserPlus className="h-7 w-7" />
        </div>

        <h1 className="text-3xl font-black tracking-tight text-white">
          Create an Account
        </h1>

        <p className="text-sm text-zinc-400">
          Join the LifeDrop blood donation network.
        </p>
      </motion.div>

      {/* Main Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
        className="space-y-5"
      >
        <FieldGroup className="space-y-4">
          {/* Full Name */}
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="space-y-2">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400"
                  >
                    Full Name
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="John Doe"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="name"
                    className="h-12 border-white/[0.08] bg-[#0a0d14]/80 text-zinc-100 placeholder:text-zinc-600 transition-all duration-300 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                  />

                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Email */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="space-y-2">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400"
                  >
                    Email Address
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="you@example.com"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="email"
                    className="h-12 border-white/[0.08] bg-[#0a0d14]/80 text-zinc-100 placeholder:text-zinc-600 transition-all duration-300 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                  />

                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Phone Number */}
          <form.Field name="contactNumber">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="space-y-2">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400"
                  >
                    Phone Number
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    placeholder="01712345678"
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="tel"
                    className="h-12 border-white/[0.08] bg-[#0a0d14]/80 text-zinc-100 placeholder:text-zinc-600 transition-all duration-300 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                  />

                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="space-y-2">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400"
                  >
                    Password
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className="h-12 border-white/[0.08] bg-[#0a0d14]/80 pr-11 text-zinc-100 placeholder:text-zinc-600 transition-all duration-300 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-red-400 focus:outline-none"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Confirm Password */}
          <form.Field name="confirmPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="space-y-2">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400"
                  >
                    Confirm Password
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className="h-12 border-white/[0.08] bg-[#0a0d14]/80 pr-11 text-zinc-100 placeholder:text-zinc-600 transition-all duration-300 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-red-400 focus:outline-none"
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {isInvalid && (
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
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Register Now</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Button>
          </motion.div>
        </FieldGroup>
      </form>

      {/* Social Register Separator & Google OAuth */}
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

      {/* Login Redirect */}
      <p className="text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-red-400 underline-offset-4 transition-colors hover:text-red-300 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}