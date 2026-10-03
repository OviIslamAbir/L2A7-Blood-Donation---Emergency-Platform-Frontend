"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import {
  CheckCircle2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/* ---------------- Schema ---------------- */

const contactSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(3, "Subject is required."),
  message: z.string().min(10, "Message must contain at least 10 characters."),
});

type ContactFormData = z.infer<typeof contactSchema>;

/* ---------------- Data ---------------- */

const contactItems = [
  {
    icon: Mail,
    title: "Email",
    value: "support@lifedrop.com",
    description: "Reach us anytime",
    href: "mailto:support@lifedrop.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+880 1XXX-XXXXXX", // TODO: replace with the real number
    description: "Phone support",
    href: undefined as string | undefined,
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Dhaka, Bangladesh",
    description: "LifeDrop Network",
    href: undefined as string | undefined,
  },
];

const particles = [
  { pos: "left-[9%] top-[22%]", size: "h-1.5 w-1.5", y: -16 },
  { pos: "right-[13%] top-[18%]", size: "h-1 w-1", y: 14 },
  { pos: "left-[16%] bottom-[20%]", size: "h-1 w-1", y: -12 },
  { pos: "right-[8%] bottom-[28%]", size: "h-2 w-2", y: -18 },
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

const inputClass =
  "border-white/[0.08] bg-white/[0.03] text-zinc-100 placeholder:text-zinc-600 transition-all duration-300 focus-visible:border-red-500/50 focus-visible:ring-2 focus-visible:ring-red-500/15 aria-invalid:border-red-500/60";

/* ---------------- Page ---------------- */

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactFormData) {
    // TODO: connect the backend contact endpoint here.
    // Right now nothing is sent anywhere.
    console.log(data);

    toast.success("Message submitted successfully.", {
      description: "Our support team will get back to you soon.",
    });
    reset();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070a] text-white selection:bg-red-500">
      {/* ===== Background ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:55px_55px]" />

        <div className="absolute inset-x-0 top-[-260px] flex justify-center">
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
            key={`${p.pos}-${p.size}`}
            animate={{ y: [0, p.y, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 4 + i * 0.6, delay: i * 0.5, ...loop }}
            className={`absolute rounded-full bg-red-500 shadow-[0_0_16px_rgba(239,68,68,0.8)] ${p.pos} ${p.size}`}
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
              <MessageSquare className="h-3.5 w-3.5" />
              Contact LifeDrop
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              We&apos;re here
              <br />
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-500 bg-clip-text text-transparent">
                when you need us.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              Have a question about blood requests, donor registration, or
              using LifeDrop? Send us a message and our support team will help
              you navigate the platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5 text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                SUPPORT TEAM
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.06] px-3 py-1.5 text-red-400">
                <Sparkles className="h-3 w-3" />
                WE REPLY BY EMAIL
              </span>
            </div>
          </motion.div>

          {/* Hero visual */}
          <div className="pointer-events-none absolute right-0 top-0 hidden h-64 w-64 items-center justify-center lg:flex">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, ...spin }}
              className="absolute inset-4 rounded-full border border-dashed border-red-500/20"
            >
              <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)]" />
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, ...spin }}
              className="absolute inset-14 rounded-full border border-red-500/20"
            >
              <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 rounded-full bg-rose-400 shadow-[0_0_15px_rgba(251,113,133,1)]" />
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.4, ...loop }}
              className="flex h-20 w-20 items-center justify-center rounded-3xl border border-red-500/25 bg-[#0a0d14]/90 shadow-[0_0_60px_rgba(220,38,38,0.25)] backdrop-blur-xl"
            >
              <MessageSquare className="h-9 w-9 text-red-500" />
            </motion.div>
          </div>
        </section>

        <div className="my-16 h-px bg-gradient-to-r from-transparent via-red-500/25 to-transparent" />

        {/* ===== Content ===== */}
        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Left */}
          <motion.div {...reveal()}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
              Get In Touch
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Let&apos;s talk.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-400">
              Whether you need assistance or simply want to learn more about
              LifeDrop, we&apos;re ready to listen.
            </p>

            <div className="mt-8 space-y-4">
              {contactItems.map((item, i) => (
                <ContactInfo key={item.title} {...item} delay={i * 0.1} />
              ))}
            </div>

            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-[#0a0d14]/70 p-5 shadow-lg backdrop-blur-xl">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-zinc-200">
                  Your privacy matters
                </p>
                <p className="mt-1 text-sm leading-6 text-zinc-400">
                  We only use the details you share to respond to your
                  message.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            {...reveal(0.15)}
            className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0a0d14]/80 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
            <span className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-red-600/[0.1] blur-[100px]" />

            <div className="relative flex items-center justify-between gap-4 border-b border-white/[0.06] px-6 pb-6 pt-7 sm:px-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-500">
                  Support Request
                </p>
                <h3 className="mt-2 text-2xl font-black text-zinc-100">
                  Send a Message
                </h3>
              </div>
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, ...loop }}
                className="hidden h-11 w-11 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.08] text-red-500 sm:flex"
              >
                <Send className="h-5 w-5" />
              </motion.div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="relative space-y-5 px-6 pb-7 pt-7 sm:px-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Name" id="name" error={errors.name?.message}>
                  <Input
                    id="name"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    {...register("name")}
                    className={`h-12 ${inputClass}`}
                  />
                </FormField>

                <FormField label="Email" id="email" error={errors.email?.message}>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                    className={`h-12 ${inputClass}`}
                  />
                </FormField>
              </div>

              <FormField label="Subject" id="subject" error={errors.subject?.message}>
                <Input
                  id="subject"
                  placeholder="How can we help?"
                  aria-invalid={!!errors.subject}
                  {...register("subject")}
                  className={`h-12 ${inputClass}`}
                />
              </FormField>

              <FormField label="Message" id="message" error={errors.message?.message}>
                <Textarea
                  id="message"
                  rows={7}
                  placeholder="Write your message here..."
                  aria-invalid={!!errors.message}
                  {...register("message")}
                  className={`resize-none ${inputClass}`}
                />
              </FormField>

              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-rose-600 font-bold text-white shadow-[0_10px_35px_rgba(220,38,38,0.3)] transition-all duration-300 hover:shadow-[0_15px_50px_rgba(220,38,38,0.5)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </Button>
              </motion.div>

              <p className="flex items-center justify-center gap-2 pt-1 text-xs text-zinc-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/80" />
                We&apos;ll reply to the email address you provide.
              </p>
            </form>
          </motion.div>
        </section>

        <div className="mt-14 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-4 py-2 text-xs text-zinc-500">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            LifeDrop Emergency Blood Network
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------------- Small components ---------------- */

function FormField({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400"
      >
        {label}
      </Label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="text-xs font-medium text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

function ContactInfo({
  icon: Icon,
  title,
  value,
  description,
  href,
  delay,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  value: string;
  description: string;
  href?: string;
  delay: number;
}) {
  const content = (
    <>
      <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-red-500/0 blur-3xl transition-colors duration-500 group-hover:bg-red-500/15" />

      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 transition-all duration-300 group-hover:rotate-3 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-red-600/30 group-hover:to-rose-500/10 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.3)]">
        <Icon className="h-5 w-5" />
      </div>

      <div className="relative min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
          {title}
        </p>
        <p className="mt-0.5 truncate font-semibold text-zinc-100">{value}</p>
        <p className="text-xs text-zinc-500">{description}</p>
      </div>
    </>
  );

  const cls =
    "group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0a0d14]/75 p-4 shadow-lg backdrop-blur-xl transition-colors duration-300 hover:border-red-500/30";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ x: 6 }}
    >
      {href ? (
        <a href={href} className={cls}>
          {content}
        </a>
      ) : (
        <div className={cls}>{content}</div>
      )}
    </motion.div>
  );
}