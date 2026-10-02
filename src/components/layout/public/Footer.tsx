
import Link from "next/link";
import {
  ArrowUpRight,
  Heart,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

const platformLinks = [
  { label: "Find Donors", href: "/donors" },
  { label: "Request Blood", href: "/requests" },
  { label: "Blood Requests", href: "/requests" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "FAQ & Help", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#06080c] text-zinc-300">
      {/* 3D ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-red-600/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-rose-600/10 blur-[120px]" />

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="group mb-5 inline-flex items-center gap-3 text-2xl font-black text-white"
            >
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 shadow-xl shadow-red-600/25 transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:shadow-red-600/40">
                <span className="absolute inset-0 animate-ping rounded-2xl bg-red-500/10" />

                <HeartPulse className="relative h-6 w-6" />
              </span>

              <span>
                Life<span className="text-red-500">Drop</span>
              </span>
            </Link>

            <p className="max-w-md text-sm leading-7 text-zinc-500">
              A real-time emergency blood donation platform connecting
              voluntary donors with patients during critical moments.
            </p>

            {/* Newsletter */}
            <div className="mt-7 max-w-md">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                Stay Updated
              </p>

              <div className="mt-3 flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-red-500/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-red-500/10"
                />

                <button
                  type="button"
                  className="group flex h-11 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-red-600/40"
                >
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Platform
            </h3>

            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1 text-sm text-zinc-500 transition-all duration-300 hover:translate-x-1 hover:text-red-500"
                  >
                    {link.label}

                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Company
            </h3>

            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1 text-sm text-zinc-500 transition-all duration-300 hover:translate-x-1 hover:text-red-500"
                  >
                    {link.label}

                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Emergency Support
            </h3>

            <div className="space-y-4 text-sm">
              <a
                href="tel:+8801800000000"
                className="group flex items-center gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/10 bg-red-500/10 text-red-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-red-500 group-hover:text-white">
                  <Phone className="h-4 w-4" />
                </span>

                <span>
                  <span className="block font-semibold text-zinc-300">
                    +880 1800-000000
                  </span>

                  <span className="text-xs text-zinc-600">
                    24/7 Emergency
                  </span>
                </span>
              </a>

              <a
                href="mailto:support@lifedrop.com"
                className="group flex items-center gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/10 bg-red-500/10 text-red-500 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-red-500 group-hover:text-white">
                  <Mail className="h-4 w-4" />
                </span>

                <span className="break-all text-zinc-500 transition-colors group-hover:text-red-400">
                  support@lifedrop.com
                </span>
              </a>

              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/10 bg-red-500/10 text-red-500">
                  <MapPin className="h-4 w-4" />
                </span>

                <span className="text-zinc-500">Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative border-t border-white/5 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-zinc-600 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} LifeDrop Platform. All rights
            reserved.
          </p>

          <p className="flex items-center gap-1.5">
            Made with
            <Heart className="h-3.5 w-3.5 animate-pulse fill-red-600 text-red-600" />
            for humanity.
          </p>
        </div>
      </div>
    </footer>
  );
}

