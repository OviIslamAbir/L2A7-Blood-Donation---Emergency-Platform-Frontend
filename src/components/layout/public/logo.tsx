import Link from "next/link";
import { HeartPulse } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5 font-bold tracking-tight">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-red-600 via-rose-500 to-red-500 text-white shadow-lg shadow-red-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        <HeartPulse className="h-6 w-6 animate-pulse" />
      </div>
      <span className="text-zinc-900 dark:text-white font-black text-xl">
        Life<span className="text-red-600 dark:text-red-500">Drop</span>
      </span>
    </Link>
  );
}