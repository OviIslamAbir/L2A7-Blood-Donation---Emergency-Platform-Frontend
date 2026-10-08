"use client";

import { useState } from "react";
import { useCreateBloodRequest } from "@/hooks/use-blood-request";
import type { Urgency } from "@/types/blood-request.type";
import { useRouter } from "next/navigation";
import { HeartPulse, Loader2 } from "lucide-react";
import { toast } from "sonner";

type BloodGroup =
  | "A_POSITIVE"
  | "A_NEGATIVE"
  | "B_POSITIVE"
  | "B_NEGATIVE"
  | "AB_POSITIVE"
  | "AB_NEGATIVE"
  | "O_POSITIVE"
  | "O_NEGATIVE";

export default function CreateBloodRequestPage() {
  const router = useRouter();
  const createMutation = useCreateBloodRequest();

  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "O_POSITIVE" as BloodGroup,
    units: 1,
    hospitalName: "",
    hospitalAddress: "",
    division: "Dhaka",
    district: "Dhaka",
    urgency: "NORMAL" as Urgency,
    neededAt: "",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Blood Request Created Successfully!");
        router.push("/requester/my-requests");
      },
      onError: (err: any) => {
        toast.error(err?.message || "Failed to create request.");
      },
    });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="border-b border-white/5 pb-4">
        <h1 className="text-xl font-black text-white">
          Create Emergency Blood Request
        </h1>
        <p className="text-xs text-zinc-400">
          Provide essential information to find compatible donors.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-white/10 bg-[#0a0d14] p-6"
      >
        <div>
          <label htmlFor="patientName" className="text-xs font-semibold text-zinc-400">
            Patient Full Name *
          </label>
          <input
            id="patientName"
            required
            type="text"
            value={formData.patientName}
            onChange={(e) =>
              setFormData({ ...formData, patientName: e.target.value })
            }
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white outline-none focus:border-red-500"
            placeholder="Patient Name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="bloodGroup" className="text-xs font-semibold text-zinc-400">
              Required Blood Group *
            </label>
            <select
              id="bloodGroup"
              value={formData.bloodGroup}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bloodGroup: e.target.value as BloodGroup,
                })
              }
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0a0d14] p-3 text-xs text-white outline-none focus:border-red-500"
            >
              {[
                "A_POSITIVE",
                "A_NEGATIVE",
                "B_POSITIVE",
                "B_NEGATIVE",
                "AB_POSITIVE",
                "AB_NEGATIVE",
                "O_POSITIVE",
                "O_NEGATIVE",
              ].map((bg) => (
                <option key={bg} value={bg}>
                  {bg.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="units" className="text-xs font-semibold text-zinc-400">
              Units / Bags *
            </label>
            <input
              id="units"
              required
              type="number"
              min={1}
              value={formData.units}
              onChange={(e) =>
                setFormData({ ...formData, units: Number(e.target.value) })
              }
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white outline-none focus:border-red-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="hospitalName" className="text-xs font-semibold text-zinc-400">
              Hospital Name *
            </label>
            <input
              id="hospitalName"
              required
              type="text"
              value={formData.hospitalName}
              onChange={(e) =>
                setFormData({ ...formData, hospitalName: e.target.value })
              }
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white outline-none focus:border-red-500"
              placeholder="e.g. Square Hospital"
            />
          </div>

          <div>
            <label htmlFor="hospitalAddress" className="text-xs font-semibold text-zinc-400">
              Hospital Address *
            </label>
            <input
              id="hospitalAddress"
              required
              type="text"
              value={formData.hospitalAddress}
              onChange={(e) =>
                setFormData({ ...formData, hospitalAddress: e.target.value })
              }
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white outline-none focus:border-red-500"
              placeholder="e.g. West Panthapath, Dhaka"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="urgency" className="text-xs font-semibold text-zinc-400">
              Urgency
            </label>
            <select
              id="urgency"
              value={formData.urgency}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  urgency: e.target.value as Urgency,
                })
              }
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0a0d14] p-3 text-xs text-white outline-none focus:border-red-500"
            >
              <option value="NORMAL">NORMAL</option>
              <option value="URGENT">URGENT</option>
              <option value="CRITICAL">CRITICAL</option>
            </select>
          </div>

          <div>
            <label htmlFor="neededAt" className="text-xs font-semibold text-zinc-400">
              Needed Date
            </label>
            <input
              id="neededAt"
              type="date"
              value={formData.neededAt}
              onChange={(e) =>
                setFormData({ ...formData, neededAt: e.target.value })
              }
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white outline-none focus:border-red-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="reason" className="text-xs font-semibold text-zinc-400">
            Medical Reason / Notes
          </label>
          <textarea
            id="reason"
            rows={3}
            value={formData.reason}
            onChange={(e) =>
              setFormData({ ...formData, reason: e.target.value })
            }
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white outline-none focus:border-red-500"
            placeholder="Short details about the operation or medical urgency..."
          />
        </div>

        <button
          type="submit"
          disabled={createMutation.isPending}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-3 text-xs font-bold text-white shadow-lg shadow-red-600/30 hover:brightness-110 disabled:opacity-50"
        >
          {createMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <HeartPulse className="h-4 w-4" />
          )}
          <span>
            {createMutation.isPending ? "Creating..." : "Submit Blood Request"}
          </span>
        </button>
      </form>
    </div>
  );
}