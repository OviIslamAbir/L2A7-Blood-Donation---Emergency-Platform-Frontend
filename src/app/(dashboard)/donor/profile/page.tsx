/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
"use client";

import { useState, useEffect } from "react";
import { useDonorProfile, useUpdateDonorProfile } from "@/hooks/use-donor";
import {
  CheckCircle2,
  RefreshCw,
  Save,
  ShieldCheck,
} from "lucide-react";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DIVISIONS = [
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

export default function DonorProfilePage() {
  const { data: userData, isLoading, isError } = useDonorProfile();
  const updateMutation = useUpdateDonorProfile();

  const profile = userData?.donorProfile;

  const [bloodGroup, setBloodGroup] = useState("O+");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [division, setDivision] = useState("Dhaka");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (profile) {
      if (profile.bloodGroup) setBloodGroup(profile.bloodGroup);
      if (profile.dateOfBirth) setDateOfBirth(profile.dateOfBirth.split("T")[0]);
      if (profile.division) setDivision(profile.division);
      if (profile.district) setDistrict(profile.district);
      if (profile.address) setAddress(profile.address);
    }
  }, [profile]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    updateMutation.mutate(
      {
        bloodGroup,
        dateOfBirth: dateOfBirth || undefined,
        division,
        district,
        address,
      },
      {
        onSuccess: () => {
          setSuccessMsg("Donor profile updated successfully!");
        },
        onError: (err: any) => {
          setErrorMsg(err?.message || "Failed to update profile.");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-72 items-center justify-center text-xs font-semibold text-zinc-500 animate-pulse">
        Loading donor profile...
      </div>
    );
  }

  if (isError || !userData) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center text-xs text-red-400">
        Donor profile not found or user is not an approved donor.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
   
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-6 backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 text-2xl font-black text-white shadow-xl">
              {userData.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white sm:text-xl">{userData.name}</h1>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  <ShieldCheck className="h-3 w-3" /> VERIFIED DONOR
                </span>
              </div>
              <p className="mt-0.5 text-xs text-zinc-400">{userData.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-center">
              <p className="text-[10px] text-zinc-400">Blood Group</p>
              <p className="text-base font-black text-red-400">{profile?.bloodGroup || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

     
      <div className="rounded-2xl border border-white/10 bg-[#0a0d14]/80 p-6 backdrop-blur-xl sm:p-8 shadow-2xl">
        <div className="border-b border-white/5 pb-4">
          <h2 className="text-sm font-bold text-white">Edit Donor Credentials & Availability</h2>
          <p className="mt-0.5 text-xs text-zinc-500">
            Keep your location up to date to receive nearby emergency blood requests.
          </p>
        </div>

        <form onSubmit={handleUpdate} className="mt-6 space-y-5">
          {successMsg && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
              {errorMsg}
            </div>
          )}

        
          <div>
            <label className="mb-2 block text-xs font-bold text-zinc-300">Blood Group</label>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
              {BLOOD_GROUPS.map((bg) => (
                <button
                  key={bg}
                  type="button"
                  onClick={() => setBloodGroup(bg)}
                  className={`flex h-11 items-center justify-center rounded-xl border text-xs font-black transition ${
                    bloodGroup === bg
                      ? "border-red-500 bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105"
                      : "border-white/10 bg-[#05070a] text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

         
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-zinc-300">Division</label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#05070a] px-4 py-2.5 text-xs text-white outline-none focus:border-red-500/40"
              >
                {DIVISIONS.map((d) => (
                  <option key={d} value={d} className="bg-[#0a0d14] text-white">
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-zinc-300">District</label>
              <input
                type="text"
                placeholder="e.g. Mirpur, Gazipur..."
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#05070a] px-4 py-2.5 text-xs text-white placeholder-zinc-600 outline-none focus:border-red-500/40"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-zinc-300">Date of Birth</label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#05070a] px-4 py-2.5 text-xs text-white outline-none focus:border-red-500/40"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-zinc-300">Residential Address</label>
              <input
                type="text"
                placeholder="House #12, Road #4..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#05070a] px-4 py-2.5 text-xs text-white placeholder-zinc-600 outline-none focus:border-red-500/40"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-3 text-xs font-bold text-white shadow-lg transition hover:brightness-110 disabled:opacity-50 sm:w-auto sm:px-8"
            >
              {updateMutation.isPending ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Profile Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}