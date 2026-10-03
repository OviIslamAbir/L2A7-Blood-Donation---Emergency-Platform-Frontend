import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | LifeDrop",
  description: "Sign in or register for LifeDrop platform.",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen w-full bg-[#05070a]">{children}</div>;
}