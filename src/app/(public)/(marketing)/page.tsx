import Link from "next/link";
import type { ReactNode } from "react";
import * as motion from "motion/react-client";
import {
  Activity,
  ArrowRight,
  Droplets,
  Heart,
  HeartHandshake,
  HeartPulse,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

/* ---------------- Data ---------------- */

const trust = [
  { icon: ShieldCheck, text: "Donor Network", color: "text-emerald-400" },
  { icon: Users, text: "Connected Community", color: "text-red-400" },
  { icon: Activity, text: "24/7 Support", color: "text-rose-400" },
];

const network = [
  { icon: Activity, label: "Emergency Network", status: "ONLINE", color: "text-red-400" },
  { icon: Users, label: "Donor Connection", status: "ACTIVE", color: "text-rose-400" },
  { icon: ShieldCheck, label: "Secure Platform", status: "PROTECTED", color: "text-emerald-400" },
  { icon: HeartPulse, label: "LifeDrop Core", status: "READY", color: "text-red-400" },
];

const steps = [
  {
    icon: Users,
    title: "Create Account",
    description:
      "Register as a donor or requester and build your profile in just a few steps.",
  },
  {
    icon: Search,
    title: "Find or Request",
    description:
      "Search for suitable donors or create an urgent blood request with the required details.",
  },
  {
    icon: HeartHandshake,
    title: "Connect & Help",
    description:
      "Connect with the right people and coordinate the next step through LifeDrop.",
  },
];

const benefits = [
  { icon: Search, title: "Discover", text: "Find suitable donors through structured search." },
  { icon: Zap, title: "Connect", text: "Reduce unnecessary steps between requests and donors." },
  { icon: ShieldCheck, title: "Protect", text: "Keep important platform operations secured." },
];

const bars = [30, 48, 38, 70, 55, 82, 64, 92, 72, 100, 78, 88];

const particles = [
  { pos: "left-[10%] top-[20%]", size: "h-1.5 w-1.5", y: -16 },
  { pos: "left-[85%] top-[17%]", size: "h-1 w-1", y: 14 },
  { pos: "left-[78%] top-[70%]", size: "h-2 w-2", y: -20 },
  { pos: "left-[15%] top-[75%]", size: "h-2 w-2", y: 18 },
  { pos: "left-[48%] top-[30%]", size: "h-1 w-1", y: -12 },
];

/* ---------------- Helpers ---------------- */

const loop = { repeat: Infinity, ease: "easeInOut" as const };
const spin = { repeat: Infinity, ease: "linear" as const };

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay },
});

const primaryBtn =
  "group relative inline-flex h-14 items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-7 text-base font-semibold text-white shadow-[0_10px_40px_rgba(220,38,38,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_55px_rgba(220,38,38,0.5)] active:scale-95";

const ghostBtn =
  "group inline-flex h-14 items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-7 text-base font-semibold text-zinc-200 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-red-500/[0.06] hover:text-white active:scale-95";

const shine =
  "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full";

const gradientText =
  "bg-gradient-to-r from-red-500 via-rose-400 to-red-500 bg-clip-text text-transparent";

/* ---------------- Page ---------------- */

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070a] text-white selection:bg-red-500">
      {/* ===== Background ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:55px_55px]" />

        <div className="absolute inset-x-0 top-[-280px] flex justify-center">
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
            transition={{ duration: 7, ...loop }}
            className="h-[650px] w-[900px] rounded-full bg-red-600/[0.12] blur-[150px]"
          />
        </div>
        <div className="absolute -left-40 top-[35%] h-[450px] w-[450px] rounded-full bg-red-700/[0.07] blur-[130px]" />
        <div className="absolute -right-40 top-[55%] h-[500px] w-[500px] rounded-full bg-rose-600/[0.07] blur-[140px]" />

        {particles.map((p, i) => (
          <motion.span
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={i}
            animate={{ y: [0, p.y, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 4 + i * 0.6, delay: i * 0.4, ...loop }}
            className={`absolute rounded-full bg-red-500 shadow-[0_0_16px_rgba(239,68,68,0.8)] ${p.pos} ${p.size}`}
          />
        ))}
      </div>

      {/* ===== Hero ===== */}
      <section className="relative isolate min-h-[calc(100vh-80px)]">
        <div className="relative mx-auto grid max-w-7xl gap-16 px-4 pb-24 pt-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-28">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-20"
          >
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-red-500/20 bg-red-500/[0.08] px-4 py-2 text-xs font-semibold tracking-wide text-red-400 backdrop-blur-xl transition-colors hover:border-red-500/40 hover:bg-red-500/[0.12]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
              </span>
              <HeartPulse className="h-4 w-4" />
              Emergency Blood Network
            </div>

            <h1 className="max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.04em] sm:text-6xl lg:text-7xl xl:text-[78px]">
              Every Drop
              <br />
              <span className={`relative inline-block ${gradientText}`}>
                Counts.
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
                  className="absolute -bottom-2 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-red-500 to-transparent"
                />
              </span>
              <br />
              <span>Save a Life Today.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              LifeDrop connects compassionate blood donors with people in
              urgent need. Discover donors, create requests, and build a
              stronger emergency blood network when every second matters.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/register" className={primaryBtn}>
                <span className={shine} />
                <HeartPulse className="relative h-5 w-5 shrink-0 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
                <span className="relative whitespace-nowrap">Become a Donor</span>
                <ArrowRight className="relative h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link href="/donors" className={ghostBtn}>
                <Search className="h-4 w-4 shrink-0 text-zinc-500 transition-colors group-hover:text-red-400" />
                <span className="whitespace-nowrap">Find Blood Donor</span>
                <ArrowRight className="h-4 w-4 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-4 border-t border-white/5 pt-7 text-xs font-medium text-zinc-500">
              {trust.map(({ icon: Icon, text, color }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 transition-colors hover:text-zinc-300"
                >
                  <Icon className={`h-4 w-4 ${color}`} />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto flex h-[500px] w-full max-w-[500px] items-center justify-center"
          >
            <div className="absolute h-[300px] w-[300px] rounded-full bg-red-600/25 blur-[100px]" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 26, ...spin }}
              className="absolute h-[380px] w-[380px] rounded-full border border-red-500/15"
            >
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-red-500 shadow-[0_0_25px_rgba(239,68,68,1)]" />
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, ...spin }}
              className="absolute h-[310px] w-[310px] rounded-full border border-dashed border-red-500/25"
            >
              <span className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-rose-300 shadow-[0_0_22px_rgba(251,113,133,0.9)]" />
            </motion.div>

            <div className="absolute h-[230px] w-[230px] rounded-full border border-white/5" />

            {/* Core */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, ...loop }}
              className="relative z-10 flex h-40 w-40 items-center justify-center rounded-full border border-red-500/30 bg-gradient-to-br from-red-600/25 via-[#0d0b10] to-black shadow-[0_0_100px_rgba(220,38,38,0.3)]"
            >
              <div className="absolute inset-3 rounded-full border border-red-500/10" />
              <motion.span
                animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-red-500/40"
              />
              <motion.div
                animate={{ scale: [1, 1.18, 1, 1.12, 1] }}
                transition={{
                  duration: 1.6,
                  times: [0, 0.15, 0.3, 0.45, 1],
                  repeat: Infinity,
                }}
              >
                <Heart
                  className="h-14 w-14 fill-red-500 text-red-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.8)]"
                  strokeWidth={1.4}
                />
              </motion.div>
            </motion.div>

            <FloatingCard
              className="left-0 top-2 sm:left-2"
              icon={<Users className="h-4 w-4 text-red-400" />}
              title="Donor Network"
              value="Active"
              delay={0}
            />
            <FloatingCard
              className="right-0 top-8 sm:right-2"
              icon={<Zap className="h-4 w-4 text-yellow-400" />}
              title="Matching"
              value="Fast"
              delay={0.8}
            />
            <FloatingCard
              className="bottom-8 left-0 sm:left-2"
              icon={<MapPin className="h-4 w-4 text-rose-400" />}
              title="Location"
              value="Nearby"
              delay={1.6}
            />
            <FloatingCard
              className="bottom-2 right-0 sm:right-2"
              icon={<ShieldCheck className="h-4 w-4 text-emerald-400" />}
              title="Security"
              value="Protected"
              delay={2.4}
            />

            {[
              "left-[22%] top-[15%] h-6 w-6 rotate-12 text-red-500/30",
              "right-[22%] top-[18%] h-5 w-5 -rotate-12 text-red-400/25",
              "bottom-[16%] left-[48%] h-6 w-6 text-red-500/30",
            ].map((cls, i) => (
              <motion.span
                key={cls}
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4 + i, delay: i * 0.7, ...loop }}
                className="absolute"
              >
                <Droplets className={`absolute ${cls}`} />
              </motion.span>
            ))}
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05070a] to-transparent" />
      </section>

      {/* ===== Network strip ===== */}
      <section className="relative border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 py-6 sm:justify-between sm:px-6 lg:px-8">
          {network.map(({ icon: Icon, label, status, color }) => (
            <div key={label} className="flex items-center gap-3 text-xs">
              <Icon className={`h-4 w-4 ${color}`} />
              <span className="text-zinc-400">{label}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-2.5 py-0.5 text-[9px] font-bold tracking-wider text-emerald-400">
                <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                {status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section className="relative overflow-hidden border-b border-white/5 bg-[#07090e] py-24 sm:py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.05] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal()} className="mx-auto max-w-2xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/15 bg-red-500/[0.06] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
              <Sparkles className="h-3.5 w-3.5" />
              Simple Process
            </div>
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              From request to{" "}
              <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">
                real connection.
              </span>
            </h2>
            <p className="mt-5 text-base leading-7 text-zinc-400 sm:text-lg">
              A simple experience designed to connect people faster when
              support matters most.
            </p>
          </motion.div>

          <div className="relative mt-16">
            {/* Chain line */}
            <div className="absolute left-[16%] right-[16%] top-[75px] hidden h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent md:block">
              <motion.span
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-red-500 shadow-[0_0_18px_rgba(239,68,68,1)]"
              />
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {steps.map(({ icon: Icon, title, description }, i) => (
                <motion.div
                  key={title}
                  {...reveal(i * 0.12)}
                  whileHover={{ y: -12 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0a0d14]/80 p-8 shadow-xl backdrop-blur-xl transition-colors duration-500 hover:border-red-500/30 hover:shadow-[0_25px_70px_rgba(220,38,38,0.12)]"
                >
                  <span className="pointer-events-none absolute -right-2 -top-8 text-[100px] font-black leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-red-500/[0.08]">
                    0{i + 1}
                  </span>
                  <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-500/5 blur-3xl transition-colors duration-500 group-hover:bg-red-500/20" />

                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-7 text-xl font-bold tracking-tight">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-400">{description}</p>
                    <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-red-400">
                      <span className="h-px w-6 bg-red-500/50 transition-all duration-500 group-hover:w-10" />
                      LifeDrop
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Why LifeDrop ===== */}
      <section className="relative overflow-hidden border-b border-white/5 py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Visual */}
          <motion.div
            {...reveal()}
            className="relative mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-red-950/30 via-[#090b10] to-black p-8 shadow-[0_30px_100px_rgba(0,0,0,0.4)]"
          >
            <span className="absolute right-0 top-0 h-48 w-48 rounded-full bg-red-600/15 blur-[80px]" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    LifeDrop System
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">Connected Care</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
                  <HeartPulse className="h-6 w-6 text-red-500" />
                </div>
              </div>

              <div className="mt-10 flex h-40 items-end gap-2">
                {bars.map((h, i) => (
                  <motion.div
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.05, ease: "easeOut" }}
                    className="flex-1 rounded-t-lg bg-gradient-to-t from-red-700/20 to-red-500/80 transition-colors hover:to-red-300"
                  />
                ))}
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {[
                  { value: "24/7", label: "Network" },
                  { value: "Fast", label: "Matching" },
                  { value: "Safe", label: "Access" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-white/5 bg-white/[0.025] p-3 transition-colors hover:border-red-500/25"
                  >
                    <p className="text-lg font-bold">{s.value}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div {...reveal(0.15)}>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/15 bg-red-500/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
              <Zap className="h-3.5 w-3.5" />
              Why LifeDrop
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
              A smarter way to build a
              <span className="text-red-500"> blood network.</span>
            </h2>

            <p className="mt-6 leading-8 text-zinc-400">
              LifeDrop brings donor discovery, emergency requests, matching,
              notifications, and donation workflows into one focused platform.
            </p>

            <div className="mt-8 space-y-4">
              {benefits.map(({ icon: Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:translate-x-1 hover:border-red-500/25 hover:bg-red-500/[0.04]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/15 bg-red-500/10 text-red-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-500/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-400">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.12] blur-[140px]" />

        <motion.div
          {...reveal()}
          className="relative mx-auto max-w-4xl px-4 text-center sm:px-6"
        >
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
            <motion.span
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-3xl border border-red-500/40 bg-red-500/10"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.8, ...loop }}
              className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-600 to-rose-600 shadow-[0_0_45px_rgba(220,38,38,0.45)]"
            >
              <HeartPulse className="h-8 w-8 text-white" />
            </motion.div>
          </div>

          <h2 className="mt-7 text-3xl font-black tracking-tight sm:text-5xl">
            Ready to make a difference?
            <br />
            <span className={gradientText}>Become part of LifeDrop.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
            One connection can make a meaningful difference. Join the network
            and help make blood support easier to reach.
          </p>

          <div className="mt-10">
            <Link href="/register" className={`${primaryBtn} px-8`}>
              <span className={shine} />
              <span className="relative">Join LifeDrop Now</span>
              <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

/* ---------------- Small component ---------------- */

function FloatingCard({
  className,
  icon,
  title,
  value,
  delay,
}: {
  className?: string;
  icon: ReactNode;
  title: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, delay, ...loop }}
      className={`absolute z-30 w-max rounded-2xl border border-white/10 bg-[#080a0f]/90 px-3.5 py-2.5 shadow-2xl backdrop-blur-2xl ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/5 bg-white/[0.04]">
          {icon}
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-500">{title}</p>
          <p className="mt-0.5 text-xs font-bold">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}