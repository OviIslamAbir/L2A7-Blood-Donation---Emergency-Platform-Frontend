import type { Metadata } from "next";
import * as motion from "motion/react-client";
import {
  ArrowUpRight,
  Bell,
  Droplets,
  HeartPulse,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services | LifeDrop",
  description:
    "Explore LifeDrop blood donation, donor matching, emergency requests, and connected healthcare services.",
};

const services = [
  {
    icon: Search,
    title: "Donor Matching",
    tag: "SMART MATCH",
    description:
      "Connect blood requests with compatible donors based on blood group, location, and available information.",
  },
  {
    icon: Droplets,
    title: "Blood Requests",
    tag: "EMERGENCY",
    description:
      "Create and manage emergency blood requests with important patient, blood group, urgency, and location details.",
  },
  {
    icon: Bell,
    title: "Notifications",
    tag: "REAL-TIME",
    description:
      "Receive important updates about requests, donor matches, donations, and critical platform activity.",
  },
  {
    icon: MapPin,
    title: "Location Support",
    tag: "LOCATION",
    description:
      "Use donor and request location information to make emergency coordination faster and more efficient.",
  },
  {
    icon: HeartPulse,
    title: "Donation Tracking",
    tag: "TRACKING",
    description:
      "Keep track of completed and historical blood donations directly through your personal dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    tag: "SECURITY",
    description:
      "Authentication and role-based access help protect accounts and sensitive platform information.",
  },
];

const particles = [
  { pos: "left-[8%] top-[20%]", size: "h-1.5 w-1.5", color: "bg-red-500", y: -18, d: 4 },
  { pos: "right-[12%] top-[25%]", size: "h-1 w-1", color: "bg-rose-400", y: 15, d: 5 },
  { pos: "left-[15%] bottom-[20%]", size: "h-1 w-1", color: "bg-red-400/70", y: -12, d: 6 },
  { pos: "right-[8%] bottom-[30%]", size: "h-2 w-2", color: "bg-red-500/40", y: -18, d: 4.5 },
];

const loop = { repeat: Infinity, ease: "easeInOut" as const };

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070a] text-white selection:bg-red-500">
      {/* ===== Background ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:55px_55px]" />

        <div className="absolute inset-x-0 top-[-280px] flex justify-center">
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
            transition={{ duration: 7, ...loop }}
            className="h-[650px] w-[900px] rounded-full bg-red-600/[0.1] blur-[150px]"
          />
        </div>

        <div className="absolute -left-40 top-[35%] h-[450px] w-[450px] rounded-full bg-red-700/[0.06] blur-[140px]" />
        <div className="absolute -right-40 bottom-[5%] h-[500px] w-[500px] rounded-full bg-rose-600/[0.06] blur-[150px]" />

        {particles.map((p, i) => (
          <motion.span
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={i}
            animate={{ y: [0, p.y, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: p.d, delay: i * 0.6, ...loop }}
            className={`absolute rounded-full shadow-[0_0_16px_rgba(239,68,68,0.7)] ${p.pos} ${p.size} ${p.color}`}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        {/* ===== Hero ===== */}
        <section className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-red-400 backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5" />
              LifeDrop Services
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Everything you need
              <br />
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-500 bg-clip-text text-transparent">
                to save a life.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              From finding compatible donors to managing emergency blood
              requests, LifeDrop connects the entire donation workflow in one
              secure platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5 text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                NETWORK ONLINE
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.06] px-3 py-1.5 text-red-400">
                <Zap className="h-3 w-3" />
                REAL-TIME SUPPORT
              </span>
            </div>
          </motion.div>

          {/* Hero visual */}
          <div className="pointer-events-none absolute right-0 top-0 hidden h-64 w-64 items-center justify-center lg:flex">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-dashed border-red-500/20"
            >
              <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)]" />
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-14 rounded-full border border-red-500/20"
            >
              <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 rounded-full bg-rose-400 shadow-[0_0_15px_rgba(251,113,133,1)]" />
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.4, ...loop }}
              className="flex h-20 w-20 items-center justify-center rounded-3xl border border-red-500/25 bg-[#0a0d14]/90 shadow-[0_0_60px_rgba(220,38,38,0.25)] backdrop-blur-xl"
            >
              <HeartPulse className="h-9 w-9 text-red-500" />
            </motion.div>
          </div>
        </section>

        <div className="my-16 h-px bg-gradient-to-r from-transparent via-red-500/25 to-transparent" />

        {/* ===== Services ===== */}
        <section>
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                Core Services
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Built around real emergencies.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-zinc-500">
              Every feature is designed to make the connection between people
              who need blood and people who can help simpler.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, tag, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0a0d14]/80 p-7 shadow-lg backdrop-blur-xl transition-colors duration-500 hover:border-red-500/30 hover:shadow-[0_20px_60px_rgba(220,38,38,0.12)]"
              >
                {/* hover glow */}
                <span className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-red-500/0 blur-3xl transition-colors duration-700 group-hover:bg-red-500/15" />
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/0 to-transparent transition-all duration-700 group-hover:via-red-500/70" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.15em] text-zinc-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[9px] font-bold tracking-[0.15em] text-zinc-500 transition-colors group-hover:border-red-500/25 group-hover:text-red-400">
                      {tag}
                    </span>
                  </div>

                  <div className="mt-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/15 bg-red-500/[0.07] text-red-500 transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 group-hover:border-red-500/30 group-hover:bg-gradient-to-br group-hover:from-red-600/25 group-hover:to-rose-500/10 group-hover:shadow-[0_0_35px_rgba(239,68,68,0.25)]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 flex items-center gap-2 text-xl font-bold text-zinc-100">
                    {title}
                    <ArrowUpRight className="h-4 w-4 -translate-x-1 translate-y-1 text-red-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    {description}
                  </p>

                  <div className="mt-7 h-px w-0 bg-gradient-to-r from-red-500 to-transparent transition-all duration-700 group-hover:w-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== CTA ===== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mt-20 overflow-hidden rounded-3xl border border-red-500/15 bg-[#0a0d14]/80 p-8 shadow-[0_20px_80px_rgba(220,38,38,0.08)] backdrop-blur-xl sm:p-12"
        >
          <span className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-red-600/15 blur-[100px]" />

          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-red-400">
                <HeartPulse className="h-4 w-4" />
                Connected Care
              </div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                One platform.
                <br />
                <span className="text-zinc-500">A network that cares.</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">
                LifeDrop brings donors, requesters, and emergency blood
                workflows together so help can move faster.
              </p>
            </div>

            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.4, ...loop }}
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-rose-500 shadow-[0_0_40px_rgba(239,68,68,0.45)]"
            >
              <Droplets className="h-7 w-7 text-white" />
            </motion.div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}