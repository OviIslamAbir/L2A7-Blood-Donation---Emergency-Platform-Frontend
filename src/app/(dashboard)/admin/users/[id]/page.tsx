"use client";

import { useParams, useRouter } from "next/navigation";
import { useAdminUser, useUpdateUserStatus, useDeleteUser } from "@/hooks/use-admin";
import AdminHeader from "@/components/admin/admin-header";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Droplets,
  Power,
  Trash2,
  Activity,
  User as UserIcon,
} from "lucide-react";

export default function SingleUserPage() {
  const params = useParams();
  const router = useRouter();
  
  const rawId = params?.id;
  const userId = typeof rawId === "string" ? rawId : Array.isArray(rawId) ? rawId[0] : "";

  const { data: user, isLoading, isError } = useAdminUser(userId);
  const updateStatusMutation = useUpdateUserStatus();
  const deleteUserMutation = useDeleteUser();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-xs font-semibold text-zinc-500 animate-pulse">
        Loading user details...
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center text-xs text-red-400">
        <p className="font-bold">User profile could not be loaded.</p>
        <button
          type="button"
          onClick={() => router.back()}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 font-bold text-white hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <AdminHeader title={`User: ${user.name || "N/A"}`} description={`Account ID: ${user.id}`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Profile Card */}
        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-6 backdrop-blur-xl">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 text-2xl font-black text-white shadow-xl">
              {user.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="h-8 w-8" />}
            </div>
            <h2 className="mt-4 text-base font-bold text-white">{user.name}</h2>
            <p className="text-xs text-zinc-500">{user.email}</p>

            <div className="mt-4 flex gap-2">
              <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[10px] font-bold uppercase text-red-400">
                {user.role}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                  user.isActive
                    ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                    : "border border-zinc-500/20 bg-zinc-500/10 text-zinc-500"
                }`}
              >
                {user.isActive ? "ACTIVE" : "INACTIVE"}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3 border-t border-white/5 pt-4 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-zinc-500" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-zinc-500" />
              <span>{user.phone || "No contact phone"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-zinc-500" />
              <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {user.role !== "ADMIN" && (
            <div className="mt-6 flex flex-col gap-2 border-t border-white/5 pt-4">
              <button
                type="button"
                onClick={() =>
                  updateStatusMutation.mutate({
                    userId: user.id,
                    payload: { isActive: !user.isActive },
                  })
                }
                disabled={updateStatusMutation.isPending}
                className="flex items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 py-2.5 text-xs font-bold text-amber-400 hover:bg-amber-500/20 disabled:opacity-50"
              >
                <Power className="h-3.5 w-3.5" />
                {user.isActive ? "Deactivate Account" : "Activate Account"}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirm("Soft delete this user account?")) {
                    deleteUserMutation.mutate(user.id, {
                      onSuccess: () => router.push("/admin/users"),
                    });
                  }
                }}
                disabled={deleteUserMutation.isPending}
                className="flex items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 py-2.5 text-xs font-bold text-rose-400 hover:bg-rose-500/20 disabled:opacity-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete User
              </button>
            </div>
          )}
        </div>

        {/* Right Info Details */}
        <div className="space-y-6 lg:col-span-2">
          {user.donorProfile ? (
            <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-6 backdrop-blur-xl">
              <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                <Droplets className="h-4 w-4 text-red-500" />
                Donor Profile Information
              </h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 text-xs">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <p className="text-zinc-500">Blood Group</p>
                  <p className="mt-1 text-sm font-bold text-red-400">
                    {user.donorProfile.bloodGroup || "N/A"}
                  </p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <p className="text-zinc-500">District / Division</p>
                  <p className="mt-1 font-semibold text-white">
                    {user.donorProfile.district || "N/A"}, {user.donorProfile.division || "N/A"}
                  </p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 sm:col-span-2">
                  <p className="text-zinc-500">Residential Address</p>
                  <p className="mt-1 font-semibold text-white">
                    {user.donorProfile.address || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/50 p-6 text-xs text-zinc-500">
              No donor profile created for this user.
            </div>
          )}

          <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-6 backdrop-blur-xl">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white">
              <Activity className="h-4 w-4 text-red-500" />
              Blood Requests Created ({user.bloodRequests?.length || 0})
            </h3>

            {user.bloodRequests && user.bloodRequests.length > 0 ? (
              <div className="mt-4 space-y-2">
                {user.bloodRequests.map((req: any) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs"
                  >
                    <div>
                      <p className="font-bold text-white">Patient: {req.patientName}</p>
                      <p className="text-[11px] text-zinc-500">{req.hospitalName}</p>
                    </div>
                    <span className="rounded-md border border-red-500/20 bg-red-500/10 px-2 py-0.5 font-bold text-red-400">
                      {req.bloodGroup}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-xs text-zinc-500">
                No emergency blood requests created by this user yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}