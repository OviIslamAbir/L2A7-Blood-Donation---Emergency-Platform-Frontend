import Link from "next/link";
import type { ReactNode } from "react";
import {
  Activity,
  ArrowRight,
  HeartHandshake,
  HeartPulse,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-[#05070a] text-white selection:bg-red-500 selection:text-white">
      {/* Global Background Mesh Grid & Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative isolate min-h-[calc(100vh-80px)] overflow-hidden">
        {/* Dynamic Ambient Glows */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-red-600/20 to-rose-600/10 blur-[150px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-[450px] w-[450px] rounded-full bg-red-900/10 blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-32">
          {/* Hero Left Content */}
          <div>
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold tracking-wide text-red-400 backdrop-blur-2xl transition-colors hover:border-red-500/40">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-red-500" />
              </span>
              <HeartPulse className="h-4 w-4" />
              <span>Emergency Blood Network</span>
            </div>

            {/* Main Title */}
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              Every Drop Counts. <br />
              <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-400 bg-clip-text text-transparent">
                Save a Life Today.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              LifeDrop connects compassionate blood donors with patients in urgent need. Real-time matching, verified donors, and instant request processing when every second matters.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="group relative h-13 overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-7 text-base font-semibold shadow-lg shadow-red-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-600/40 active:scale-95"
              >
                <Link href="/register" className="flex items-center justify-center">
                  <HeartPulse className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  Become a Donor
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 rounded-xl border-white/10 bg-white/[0.03] px-7 text-base font-semibold text-zinc-200 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white hover:scale-[1.02] active:scale-95"
              >
                <Link href="/login" className="flex items-center justify-center">
                  <Search className="mr-2 h-4 w-4 text-zinc-400" />
                  Find Blood Donor
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/5 pt-8 text-xs font-medium text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Verified Donors</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-red-400" />
                <span>Active Community</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-rose-400" />
                <span>24/7 Emergency Support</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visuals Grid */}
          <div className="relative mx-auto w-full max-w-xl">
            {/* Center Background Light */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/15 blur-[100px]" />

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <StatCard
                icon={<Users className="h-6 w-6 text-red-400" />}
                value="Active Donors"
                description="Ready to respond in real-time"
              />

              <StatCard
                icon={<Search className="h-6 w-6 text-rose-400" />}
                value="Quick Search"
                description="Filter by location & group"
              />

              <StatCard
                icon={<HeartHandshake className="h-6 w-6 text-red-400" />}
                value="Direct Match"
                description="Fast donor-to-patient link"
              />

              <StatCard
                icon={<ShieldCheck className="h-6 w-6 text-emerald-400" />}
                value="100% Safe"
                description="Protected user data"
              />
            </div>

            {/* Floating Center Pulse Badge */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-red-500/30 bg-[#090d14]/90 shadow-2xl shadow-red-600/40 backdrop-blur-2xl">
                <div className="absolute inset-0 animate-ping rounded-3xl bg-red-500/10" />
                <HeartPulse className="relative h-9 w-9 animate-pulse text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS SECTION
      ===================================================== */}
      <section className="relative border-t border-white/5 bg-[#07090e]/80 py-24 sm:py-32 backdrop-blur-md">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/10 bg-red-500/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-400">
              <Sparkles className="h-3.5 w-3.5" />
              Simple Process
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Save a life in{" "}
              <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">
                3 simple steps
              </span>
            </h2>

            <p className="mt-4 text-base text-zinc-400 sm:text-lg">
              Designed to fast-track connections when time is critical.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <FeatureCard
              number="01"
              icon={<Users className="h-6 w-6" />}
              title="Create Account"
              description="Register in minutes as a willing donor or requester with basic details."
            />

            <FeatureCard
              number="02"
              icon={<Search className="h-6 w-6" />}
              title="Find or Request"
              description="Search for matched blood types near you or post an urgent blood request."
            />

            <FeatureCard
              number="03"
              icon={<HeartHandshake className="h-6 w-6" />}
              title="Connect & Help"
              description="Directly contact available donors and coordinate the donation quickly."
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA SECTION
      ===================================================== */}
      <section className="relative overflow-hidden border-t border-white/5 bg-[#05070a] py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[140px]" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-600 to-rose-600 shadow-xl shadow-red-600/30">
            <HeartPulse className="h-8 w-8 animate-pulse text-white" />
          </div>

          <h2 className="mt-8 text-3xl font-black tracking-tight sm:text-5xl">
            Ready to make a difference? <br />
            <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">
              Become a hero today.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Join the LifeDrop network now. Your willingness to give can give someone another tomorrow.
          </p>

          <Button
            asChild
            size="lg"
            className="group mt-10 h-13 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-8 text-base font-semibold shadow-xl shadow-red-600/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-red-600/40 active:scale-95"
          >
            <Link href="/register" className="flex items-center">
              Join LifeDrop Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

/* =====================================================
   COMPONENTS
===================================================== */

function StatCard({
  icon,
  value,
  description,
}: {
  icon: ReactNode;
  value: string;
  description: string;
}) {
  return (
    <Card className="group relative overflow-hidden border-white/10 bg-[#0a0d14]/70 text-white shadow-xl backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-950/20">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-red-500/10 blur-2xl transition-all duration-500 group-hover:bg-red-500/20" />

      <CardContent className="relative p-6">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:scale-110 group-hover:border-red-500/30 group-hover:bg-red-500/10">
          {icon}
        </div>

        <h3 className="text-lg font-bold text-white tracking-wide">{value}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{description}</p>
      </CardContent>
    </Card>
  );
}

function FeatureCard({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="group relative overflow-hidden border-white/5 bg-[#0a0d14]/80 text-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-red-500/20 hover:shadow-2xl hover:shadow-red-950/20">
      <div className="pointer-events-none absolute -right-2 -top-6 select-none text-8xl font-black text-white/[0.03] transition-colors duration-300 group-hover:text-red-500/[0.07]">
        {number}
      </div>

      <CardContent className="relative p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white">
          {icon}
        </div>

        <h3 className="mt-6 text-xl font-bold tracking-tight text-white">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{description}</p>

        <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-red-400 transition-colors group-hover:text-red-300">
          <span>Learn more</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </CardContent>
    </Card>
  );
}