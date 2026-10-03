"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function GoogleLoginComponent() {
  const router = useRouter();

  const googleLogin = async (
    variables: { idToken: string },
    callbacks: {
      onSuccess: (res: { success: boolean; message?: unknown; data?: { accessToken: string } }) => void;
      onError: (err: unknown) => void;
    }
  ) => {
    try {
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(variables),
      });
      const result = await response.json();

      if (!response.ok) {
        callbacks.onError(result);
        return;
      }

      callbacks.onSuccess(result);
    } catch (error) {
      callbacks.onError(error);
    }
  };

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.error("Google OAuth token is missing. Please try again.");
      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: (res: { success: boolean; message?: unknown; data?: { accessToken: string } }) => {
          if (res && res.success === false) {
            toast.error(
              typeof res.message === "string"
                ? res.message
                : "Google OAuth authentication failed."
            );
            return;
          }

          if (res?.data?.accessToken) {
            localStorage.setItem("accessToken", res.data.accessToken);
          }

          toast.success("Login successful! Welcome back.");
          router.push("/dashboard");
          router.refresh();
        },
        onError: (err: any) => {
          const errorMessage = err?.data?.message || err?.message || "Google OAuth login failed. Please try again.";
          toast.error(errorMessage);
        },
      }
    );
  };

  const handleGoogleError = () => {
    toast.error("Google authentication process failed. Please try again.");
  };

  return (
    <GoogleLogin
      theme="outline"
      shape="pill"
      text="continue_with"
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
    />
  );
}