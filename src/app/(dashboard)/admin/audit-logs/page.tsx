"use client";

import { useState } from "react";
import {
  ScrollText,
  RefreshCw,
  Search,
  Filter,
  User,
  Activity,
  Calendar,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuditLogs, AuditLogItem } from "@/hooks/use-admin";
import AdminHeader from "@/components/admin/admin-header";

export default function AuditLogsPage() {
  const [page, setPage] = useState(1);
  const [entityFilter, setEntityFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");

  const { data, isLoading, isError, refetch, isFetching } = useAuditLogs({
    page,
    limit: 15,
    entity: entityFilter || undefined,
    action: actionFilter || undefined,
  });

  const logs: AuditLogItem[] = data?.data || (Array.isArray(data) ? data : []);
  const meta = data?.meta || { totalPages: 1, total: logs.length };

  const getActionBadgeClass = (action: string) => {
    const act = action.toUpperCase();
    if (act.includes("CREATE") || act.includes("APPROVE"))
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
    if (act.includes("DELETE") || act.includes("REJECT"))
      return "border-red-500/30 bg-red-500/10 text-red-400";
    if (act.includes("UPDATE") || act.includes("STATUS"))
      return "border-amber-500/30 bg-amber-500/10 text-amber-400";
    return "border-blue-500/30 bg-blue-500/10 text-blue-400";
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Audit Logs"
        description="Track all administrative actions, user state changes, and critical system events."
        action={
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-200 backdrop-blur-xl transition hover:border-red-500/30 hover:bg-white/10 disabled:opacity-50"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isFetching ? "animate-spin text-red-400" : ""}`}
            />
            <span>Refresh Logs</span>
          </button>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-4 backdrop-blur-xl">
        <div className="relative flex-1 min-w-[200px]">
          <Filter className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Filter by Entity (e.g. USER, DONOR)..."
            value={entityFilter}
            onChange={(e) => {
              setEntityFilter(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-white/10 bg-[#05070a] py-2 pl-9 pr-3 text-xs text-white placeholder-zinc-600 outline-none focus:border-red-500/50"
          />
        </div>

        <div className="relative flex-1 min-w-[200px]">
          <Activity className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Filter by Action (e.g. APPROVE_DONOR)..."
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-white/10 bg-[#05070a] py-2 pl-9 pr-3 text-xs text-white placeholder-zinc-600 outline-none focus:border-red-500/50"
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d14]/80 backdrop-blur-xl">
        {isLoading ? (
          <div className="space-y-3 p-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-12 w-full animate-pulse rounded-xl bg-white/5"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="p-8 text-center text-red-400">
            <p className="font-bold">Failed to load audit logs.</p>
            <p className="mt-1 text-xs text-zinc-500">
              Please make sure the audit logs endpoint is accessible.
            </p>
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-zinc-500">
            <ScrollText className="mx-auto h-10 w-10 text-zinc-600" />
            <p className="mt-2 text-xs font-semibold">No audit logs found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-white/[0.02] text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                <tr>
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Action</th>
                  <th className="py-3.5 px-4">Entity</th>
                  <th className="py-3.5 px-4">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="transition hover:bg-white/[0.02]"
                  >
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                        <span>
                          {new Date(log.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {log.user ? (
                        <div>
                          <p className="font-bold text-white">{log.user.name}</p>
                          <p className="text-[10px] text-zinc-500">
                            {log.user.email}
                          </p>
                        </div>
                      ) : (
                        <span className="text-zinc-500">System / Anonymous</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block rounded-lg border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${getActionBadgeClass(
                          log.action
                        )}`}
                      >
                        {log.action}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-400">
                      <span className="text-white font-bold">{log.entity}</span>
                      {log.entityId && (
                        <span className="ml-1.5 text-[10px] text-zinc-500">
                          (ID: {log.entityId.slice(0, 8)}...)
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-zinc-400 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Globe className="h-3 w-3 text-zinc-600" />
                        <span>{log.ipAddress || "N/A"}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {meta.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-white/5 px-4 py-3 text-xs text-zinc-400">
            <span>
              Page {page} of {meta.totalPages}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                disabled={page >= meta.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}