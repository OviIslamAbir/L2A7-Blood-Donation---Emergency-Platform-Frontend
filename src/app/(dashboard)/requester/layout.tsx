import type { ReactNode } from "react";
import RequesterSidebar from "@/components/requester/requester-sidebar";
import RequesterHeader from "@/components/requester/requester-header";

export default function RequesterLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#05070a] text-white selection:bg-red-500 selection:text-white">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-260px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-red-600/[0.08] blur-[150px]" />
        <div className="absolute -left-40 top-[40%] h-[450px] w-[450px] rounded-full bg-red-700/[0.04] blur-[140px]" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        <RequesterSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <RequesterHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}