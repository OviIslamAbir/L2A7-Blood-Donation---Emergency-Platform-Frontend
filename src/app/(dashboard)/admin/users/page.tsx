"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useAdminUsers,
  useUpdateUserStatus,
  useDeleteUser,
} from "@/hooks/use-admin";
import AdminHeader from "@/components/admin/admin-header";
import {
  Search,
  Shield,
  UserCheck,
  HeartHandshake,
  Trash2,
  Power,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Eye,
} from "lucide-react";

export default function ManageUsersPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<string>("");
  const [isActive, setIsActive] = useState<string>("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch, isFetching } = useAdminUsers({
    search: search || undefined,
    role: role || undefined,
    isActive: isActive || undefined,
    page,
    limit: 10,
  });

  const updateStatusMutation = useUpdateUserStatus();
  const deleteUserMutation = useDeleteUser();

  const handleToggleStatus = (userId: string, currentStatus: boolean) => {
    updateStatusMutation.mutate({
      userId,
      payload: { isActive: !currentStatus },
    });
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to soft delete this user?")) {
      deleteUserMutation.mutate(userId);
    }
  };

  const users = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Manage Users"
        description="View and control platform users across ADMIN, DONOR, and REQUESTER roles."
        action={
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-zinc-200 transition hover:border-red-500/30 hover:bg-white/10"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${
                isFetching ? "animate-spin text-red-400" : ""
              }`}
            />
            Refresh
          </button>
        }
      />

      {/* Search & Filters */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-white/10 bg-[#0a0d14] py-2.5 pl-10 pr-4 text-xs font-medium text-white placeholder-zinc-500 outline-none transition focus:border-red-500/40"
          />
        </div>

        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setPage(1);
          }}
          className="rounded-xl border border-white/10 bg-[#0a0d14] px-3.5 py-2.5 text-xs font-semibold text-zinc-300 outline-none focus:border-red-500/40"
        >
          <option value="">All Roles</option>
          <option value="ADMIN">ADMIN</option>
          <option value="DONOR">DONOR</option>
          <option value="REQUESTER">REQUESTER</option>
        </select>

        <select
          value={isActive}
          onChange={(e) => {
            setIsActive(e.target.value);
            setPage(1);
          }}
          className="rounded-xl border border-white/10 bg-[#0a0d14] px-3.5 py-2.5 text-xs font-semibold text-zinc-300 outline-none focus:border-red-500/40"
        >
          <option value="">All Account Statuses</option>
          <option value="true">Active Only</option>
          <option value="false">Inactive Only</option>
        </select>
      </div>

      {/* Users Table */}
      {isLoading ? (
        <div className="space-y-3">
          {["user-skeleton-1", "user-skeleton-2", "user-skeleton-3", "user-skeleton-4", "user-skeleton-5"].map((skeleton) => (
            <div
              key={skeleton}
              className="h-16 animate-pulse rounded-2xl border border-white/10 bg-[#0a0d14]/70"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-400">
          Failed to load users list.
        </div>
      ) : users.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/50 p-12 text-center text-zinc-500">
          No user accounts found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d14]/80 backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-white/[0.02] uppercase text-zinc-400">
                <tr>
                  <th className="px-6 py-4 font-bold">User</th>
                  <th className="px-6 py-4 font-bold">Role</th>
                  <th className="px-6 py-4 font-bold">Account Status</th>
                  <th className="px-6 py-4 font-bold">Joined</th>
                  <th className="px-6 py-4 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user: any) => (
                  <tr key={user.id} className="transition hover:bg-white/[0.02]">
                    {/* User Column - Clickable Name */}
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="group/item inline-block"
                      >
                        <p className="font-bold text-white transition group-hover/item:text-red-400 group-hover/item:underline">
                          {user.name}
                        </p>
                        <p className="text-[11px] text-zinc-500">{user.email}</p>
                      </Link>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          user.role === "ADMIN"
                            ? "border border-purple-500/20 bg-purple-500/10 text-purple-400"
                            : user.role === "DONOR"
                            ? "border border-red-500/20 bg-red-500/10 text-red-400"
                            : "border border-blue-500/20 bg-blue-500/10 text-blue-400"
                        }`}
                      >
                        {user.role === "ADMIN" && <Shield className="h-3 w-3" />}
                        {user.role === "DONOR" && <HeartHandshake className="h-3 w-3" />}
                        {user.role === "REQUESTER" && <UserCheck className="h-3 w-3" />}
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          user.isActive
                            ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                            : "border border-zinc-500/20 bg-zinc-500/10 text-zinc-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            user.isActive ? "bg-emerald-400" : "bg-zinc-500"
                          }`}
                        />
                        {user.isActive ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-zinc-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions Column with View Details Button */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* 👁️ SINGLE PAGE BUTTON */}
                        <button
                          type="button"
                          onClick={() => router.push(`/admin/users/${user.id}`)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400 transition hover:bg-red-500/20 hover:text-white"
                          title="View Single User Profile"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>View Details</span>
                        </button>

                        {user.role !== "ADMIN" && (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                handleToggleStatus(user.id, user.isActive)
                              }
                              disabled={updateStatusMutation.isPending}
                              className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
                                user.isActive
                                  ? "border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                                  : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                              }`}
                            >
                              <Power className="mr-1 inline h-3 w-3" />
                              {user.isActive ? "Deactivate" : "Activate"}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteUser(user.id)}
                              disabled={deleteUserMutation.isPending}
                              className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-1.5 text-rose-400 transition hover:bg-rose-500/20"
                              title="Delete User"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-white/5 px-6 py-4">
              <p className="text-xs text-zinc-500">
                Page {meta.page} of {meta.totalPages} ({meta.total} Total Users)
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-300 transition hover:bg-white/10 disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPage((p) => Math.min(p + 1, meta.totalPages))
                  }
                  disabled={page === meta.totalPages}
                  className="rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-300 transition hover:bg-white/10 disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}