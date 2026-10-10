"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";

export default function GoogleLoginComponent() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleGoogleSuccess = async (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.error("Google OAuth token is missing. Please try again.");
      return;
    }

    try {
      const res: any = await apiClient("/auth/google", {
        method: "POST",
        body: { idToken },
      });

      if (res && res.success === false) {
        toast.error(
          typeof res.message === "string"
            ? res.message
            : "Google OAuth authentication failed."
        );
        return;
      }

      // Save token if returned
      if (res?.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        if (res.data.refreshToken) {
          localStorage.setItem("refreshToken", res.data.refreshToken);
        }
        await queryClient.refetchQueries({ queryKey: ["auth", "me"] });
        queryClient.invalidateQueries({ queryKey: ["me"] });
      }

      toast.success("Login successful! Welcome back.");

      // 💡 Dynamic Role-based Redirect Fix
      const role = res?.data?.user?.role || res?.data?.role;

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
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || err?.message || "Google OAuth login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google authentication process failed. Please try again.");
  };

  return (
    <div className="flex w-full justify-center">
      <GoogleLogin
        theme="outline"
        shape="pill"
        text="continue_with"
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />
    </div>
  );
}