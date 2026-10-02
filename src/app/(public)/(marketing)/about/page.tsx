import type { Metadata } from "next";
import Link from "next/link";
import * as motion from "motion/react-client";
import {
  Activity,
  ArrowRight,
  Bell,
  CheckCircle2,
  Droplets,
  Heart,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About | LifeDrop",
  description:
    "Learn about LifeDrop, a modern blood donation and emergency assistance platform.",
};

const values = [
  {
    icon: HeartHandshake,
    title: "Community First",
    description:
      "We make it easier for donors and patients to connect during important moments through a simple and accessible platform.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Security",
    description:
      "Secure authentication and structured platform operations help protect users and their important information.",
  },
  {
    icon: Users,
    title: "Connected Donors",
    description:
      "Our donor network helps people discover compatible blood support when it is needed.",
  },
];

const features = [
  "Find compatible blood donors",
  "Create and manage blood requests",
  "Donor matching support",
  "Donation tracking",
  "Real-time notifications",
  "Secure payment integration",
];

const steps = [
  {
    icon: Users,
    title: "Connect",
    description: "Donors and people requesting blood enter the platform.",
  },
  {
    icon: Zap,
    title: "Match",
    description: "The platform helps connect requests with suitable donors.",
  },
  {
    icon: Bell,
    title: "Support",
    description: "Notifications and donation tracking keep everyone connected.",
  },
];

const stats = [
  { value: "24/7", label: "Access" },
  { value: "Fast", label: "Matching" },
  { value: "Secure", label: "Platform" },
];

const loop = { repeat: Infinity, ease: "easeInOut" as const };
const spin = { repeat: Infinity, ease: "linear" as const };

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay },
});

const primaryBtn =
  "group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-6 text-sm font-semibold text-white shadow-[0_0_30px_rgba(220,38,38,0.3)] transition-all hover:shadow-[0_0_50px_rgba(220,38,38,0.5)]";

const ghostBtn =
  "inline-flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm font-semibold text-white transition-colors hover:border-red-500/30 hover:bg-white/[0.08]";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070a] text-white selection:bg-red-500">
      {/* ===== Background ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:55px_55px]" />
        <div className="absolute -left-44 -top-36 h-[450px] w-[450px] rounded-full bg-red-600/10 blur-[130px]" />
        <div className="absolute -right-44 top-[30%] h-[500px] w-[500px] rounded-full bg-rose-600/10 blur-[140px]" />
        <div className="absolute -bottom-52 left-[35%] h-[500px] w-[500px] rounded-full bg-red-500/5 blur-[140px]" />

        {[
          { pos: "left-[12%] top-[20%]", size: "h-1.5 w-1.5", y: -16 },
          { pos: "left-[82%] top-[16%]", size: "h-1 w-1", y: 14 },
          { pos: "left-[72%] top-[52%]", size: "h-2 w-2", y: -20 },
          { pos: "left-[18%] top-[68%]", size: "h-1.5 w-1.5", y: 18 },
        ].map((p, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, p.y, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 4 + i, delay: i * 0.5, ...loop }}
            className={`absolute rounded-full bg-red-500 shadow-[0_0_16px_rgba(239,68,68,0.8)] ${p.pos} ${p.size}`}
          />
        ))}
      </div>

      {/* ===== Hero ===== */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              About LifeDrop
            </div>

            <h1 className="mt-7 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Technology that
              <span className="block bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent">
                connects lives.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              LifeDrop is a modern blood donation and emergency assistance
              platform designed to make donor discovery, blood requests,
              matching, donations, notifications, and payments easier to
              manage.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/donors" className={primaryBtn}>
                Find Donors
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/requests" className={ghostBtn}>
                View Blood Requests
              </Link>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/5 bg-white/[0.025] px-4 py-3 backdrop-blur-xl transition-colors hover:border-red-500/20"
                >
                  <p className="text-lg font-bold">{s.value}</p>
                  <p className="text-xs text-zinc-500">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto flex h-[430px] w-full max-w-[500px] items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, ...spin }}
              className="absolute h-[340px] w-[340px] rounded-full border border-red-500/15"
            >
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-red-500 shadow-[0_0_25px_rgba(239,68,68,1)]" />
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 16, ...spin }}
              className="absolute h-[270px] w-[270px] rounded-full border border-dashed border-red-500/25"
            >
              <span className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-rose-300 shadow-[0_0_20px_rgba(251,113,133,0.9)]" />
            </motion.div>

            <div className="absolute h-[200px] w-[200px] rounded-full border border-white/5" />

            {/* Heart core */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, ...loop }}
              className="relative z-10 flex h-40 w-40 items-center justify-center rounded-full border border-red-500/30 bg-gradient-to-br from-red-600/30 via-red-950/80 to-black shadow-[0_0_80px_rgba(220,38,38,0.3)]"
            >
              <motion.span
                animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
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
                  className="h-14 w-14 fill-red-500 text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.7)]"
                  strokeWidth={1.5}
                />
              </motion.div>
            </motion.div>

            <FloatingCard
              className="left-0 top-12"
              icon={<Droplets className="h-4 w-4 text-red-400" />}
              title="Smart Match"
              value="Instant"
              delay={0}
            />
            <FloatingCard
              className="right-0 top-28"
              icon={<Activity className="h-4 w-4 text-rose-400" />}
              title="Active Support"
              value="24/7"
              delay={1}
            />
            <FloatingCard
              className="bottom-10 left-10"
              icon={<Users className="h-4 w-4 text-red-400" />}
              title="Community"
              value="Connected"
              delay={2}
            />
          </motion.div>
        </div>
      </section>

      {/* ===== Values ===== */}
      <section className="relative border-y border-white/5 bg-white/[0.015] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal()} className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
              What We Believe
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Built around people,
              <span className="text-red-500"> not just technology.</span>
            </h2>
            <p className="mt-5 leading-7 text-zinc-400">
              Every part of LifeDrop is designed around making the blood
              donation experience simpler, faster, and more connected.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                {...reveal(i * 0.12)}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl transition-colors duration-500 hover:border-red-500/30 hover:bg-red-500/[0.035] hover:shadow-[0_20px_60px_rgba(220,38,38,0.12)]"
              >
                <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-500/5 blur-3xl transition-colors duration-500 group-hover:bg-red-500/20" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-500 transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-red-600/25 group-hover:to-rose-500/10 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="text-5xl font-black text-white/[0.04]">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold">{title}</h3>
                  <p className="mt-3 leading-7 text-zinc-400">{description}</p>

                  <div className="mt-6 h-px w-0 bg-gradient-to-r from-red-500 to-transparent transition-all duration-700 group-hover:w-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section className="relative py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div {...reveal()}>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
              One Connected Platform
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              From request to
              <span className="text-red-500"> real connection.</span>
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-zinc-400">
              LifeDrop brings the important parts of the blood donation journey
              into one connected experience.
            </p>

            <div className="mt-8 space-y-3">
              {features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.025] p-4 transition-all duration-300 hover:translate-x-1 hover:border-red-500/25 hover:bg-red-500/[0.05]"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-red-500 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm text-zinc-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Steps */}
          <motion.div
            {...reveal(0.15)}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl sm:p-8"
          >
            <span className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-600/15 blur-[80px]" />

            <div className="relative">
              {steps.map(({ icon: Icon, title, description }, i) => (
                <div key={title}>
                  <div className="group flex gap-4">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-red-500/25 bg-[#0b0d11] text-red-500 shadow-[0_0_25px_rgba(220,38,38,0.1)] transition-all duration-300 group-hover:border-red-500/60 group-hover:bg-red-500/10">
                      <Icon className="h-5 w-5" />
                      <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full border border-red-500/30 bg-red-950 px-1 text-[9px] font-bold text-red-400">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="pt-1">
                      <h3 className="font-bold">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-zinc-400">
                        {description}
                      </p>
                    </div>
                  </div>

                  {i < steps.length - 1 && (
                    <div className="relative my-2 ml-7 h-10 w-px overflow-hidden bg-white/10">
                      <motion.span
                        animate={{ y: ["-100%", "250%"] }}
                        transition={{
                          duration: 1.6,
                          delay: i * 0.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-x-0 h-5 bg-gradient-to-b from-transparent via-red-500 to-transparent"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative px-4 pb-24 sm:px-6 lg:px-8">
        <motion.div
          {...reveal()}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-950/70 via-[#100709] to-black px-6 py-16 text-center shadow-[0_30px_100px_rgba(220,38,38,0.15)] sm:px-12"
        >
          <span className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-red-600/20 blur-[100px]" />

          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.8, ...loop }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/25 bg-red-500/10 shadow-[0_0_40px_rgba(239,68,68,0.3)]"
            >
              <Heart className="h-7 w-7 fill-red-500 text-red-500" />
            </motion.div>

            <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
              Be part of the
              <span className="text-red-500"> LifeDrop community.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-400">
              Whether you want to donate blood or need to find a donor,
              LifeDrop is built to make the connection easier.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/register" className={primaryBtn}>
                Join LifeDrop
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/donors" className={ghostBtn}>
                Explore Donors
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function FloatingCard({
  className,
  icon,
  title,
  value,
  delay,
}: {
  className?: string;
  icon: React.ReactNode;
  title: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, delay, ...loop }}
      className={`absolute z-20 rounded-2xl border border-white/10 bg-black/70 px-4 py-3 shadow-2xl backdrop-blur-xl ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10">
          {icon}
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-zinc-500">
            {title}
          </p>
          <p className="text-sm font-bold">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}