
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function VerifyAccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [otp, setOtp] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email) {
      toast.error("Registration email is missing.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      toast.error("Enter the 6-digit verification code.");
      return;
    }

    // Connect this action to your actual OTP verification hook.
    // The API response must determine whether verification succeeded.
    toast.info("Connect the OTP verification API to continue.");
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Verify your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter the verification code sent to {email || "your email"}.
        </p>
      </div>

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
        />

        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700"
          disabled={pending}
        >
          Verify Account
        </Button>
      </form>

      <Button
        type="button"
        variant="link"
        className="w-full"
        onClick={() => router.push("/login")}
      >
        Back to Login
      </Button>
    </div>
  );
}