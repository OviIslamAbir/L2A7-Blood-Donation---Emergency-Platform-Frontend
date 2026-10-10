"use client";

import Link from "next/link";
import {
  Users,
  UserCheck,
  Droplets,
  HeartHandshake,
  ClipboardList,
  ArrowRight,
  RefreshCw,
  Activity,
  ScrollText,
} from "lucide-react";
import { useAdminDashboard } from "@/hooks/use-admin";
import AdminStatCard from "@/components/admin/admin-stat-card";
import AdminHeader from "@/components/admin/admin-header";

export default function AdminDashboardPage() {
  const { data, isLoading, isError, refetch, isFetching } = useAdminDashboard();

  const totalUsers = data?.totalUsers ?? data?.users?.total ?? 0;
  const totalDonors = data?.totalDonors ?? data?.users?.donors ?? 0;
  const totalRequesters = data?.totalRequesters ?? data?.users?.requesters ?? 0;
  const pendingDonorApps =
    data?.pendingDonorApplications ?? data?.donorApplications?.pending ?? 0;
  const totalBloodRequests = data?.totalBloodRequests ?? 0;
  const totalDonations = data?.totalDonations ?? 0;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      description: "All registered accounts",
      icon: Users,
      iconClassName: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    {
      title: "Total Donors",
      value: totalDonors,
      description: "Verified blood donors",
      icon: HeartHandshake,
      iconClassName: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    },
    {
      title: "Requesters",
      value: totalRequesters,
      description: "Registered requesters",
      icon: UserCheck,
      iconClassName: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    },
    {
      title: "Blood Requests",
      value: totalBloodRequests,
      description: "Emergency requests created",
      icon: Droplets,
      iconClassName: "bg-red-500/10 text-red-400 border-red-500/20",
    },
    {
      title: "Pending Applications",
      value: pendingDonorApps,
      description: "Applications needing review",
      icon: ClipboardList,
      iconClassName: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    {
      title: "Total Donations",
      value: totalDonations,
      description: "Successful blood donations",
      icon: Activity,
      iconClassName: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
  ];

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Dashboard Overview"
        description="Monitor platform activity, manage accounts, and verify emergency blood requests."
        action={
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-zinc-200 backdrop-blur-xl transition hover:border-red-500/30 hover:bg-white/10 disabled:opacity-50"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${
                isFetching ? "animate-spin text-red-400" : ""
              }`}
            />
            <span>{isFetching ? "Refreshing..." : "Refresh Data"}</span>
          </button>
        }
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[
            "users",
            "donors",
            "requests",
            "applications",
            "donations",
            "overview",
          ].map((cardKey) => (
            <div
              key={cardKey}
              className="h-32 animate-pulse rounded-2xl border border-white/10 bg-[#0a0d14]/70"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 backdrop-blur-xl">
          <p className="font-bold text-red-400">
            Could not load dashboard metrics.
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            Please verify your backend connection or authentication token.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-xl bg-red-600 px-5 py-2 text-xs font-bold text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {stats.map((stat) => (
              <AdminStatCard key={stat.title} {...stat} />
            ))}
          </div>

          <section className="pt-2">
            <h2 className="mb-4 text-base font-bold text-white">
              Quick Management Shortcuts
            </h2>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "Review Applications",
                  description:
                    "Review pending donor applications and grant verified roles.",
                  href: "/admin/donor-applications",
                  badge: `${pendingDonorApps} Pending`,
                },
                {
                  title: "Manage Users",
                  description:
                    "Search users, activate/deactivate accounts or status.",
                  href: "/admin/users",
                  badge: "User Control",
                },
                {
                  title: "Verify Requests",
                  description:
                    "Verify emergency requests to notify matching donors.",
                  href: "/admin/blood-requests",
                  badge: "Urgent Actions",
                },
                {
                  title: "System Audit Logs",
                  description:
                    "Track administrative actions and system security logs.",
                  href: "/admin/audit-logs",
                  badge: "Security",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-[#0c101a]"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-400">
                      {item.badge}
                    </span>

                    <ArrowRight
                      size={18}
                      className="text-zinc-500 transition group-hover:translate-x-1 group-hover:text-red-400"
                    />
                  </div>

                  <h3 className="mt-4 font-bold text-white transition group-hover:text-red-400">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-zinc-400">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}