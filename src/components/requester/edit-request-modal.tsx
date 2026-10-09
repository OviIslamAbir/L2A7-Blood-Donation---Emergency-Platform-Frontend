"use client";

import { useState, useEffect } from "react";
import { useUpdateBloodRequest } from "@/hooks/use-blood-request";
import type { IBloodRequest, Urgency, IUpdateBloodRequestPayload } from "@/types/blood-request.type";
import { X, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EditRequestModalProps {
  request: IBloodRequest;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditRequestModal({
  request,
  isOpen,
  onClose,
  onSuccess,
}: EditRequestModalProps) {
  const updateMutation = useUpdateBloodRequest();

  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "" as BloodGroup,
    units: 1,
    hospitalName: "",
    hospitalAddress: "",
    urgency: "NORMAL" as Urgency,
    neededAt: "",
    reason: "",
  });

  useEffect(() => {
    if (request) {
      setFormData({
        patientName: request.patientName || "",
        bloodGroup: request.bloodGroup,
        units: request.units || 1,
        hospitalName: request.hospitalName || "",
        hospitalAddress: request.hospitalAddress || "",
        urgency: request.urgency || "NORMAL",
        neededAt: request.neededAt
          ? new Date(request.neededAt).toISOString().split("T")[0]
          : "",
        reason: request.reason || "",
      });
    }
  }, [request]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 💡 Fix: Clean payload to match backend Zod & Prisma expectation
    const cleanedPayload: IUpdateBloodRequestPayload = {
      patientName: formData.patientName.trim(),
      bloodGroup: formData.bloodGroup,
      units: Number(formData.units),
      hospitalName: formData.hospitalName.trim(),
      hospitalAddress: formData.hospitalAddress.trim(),
      urgency: formData.urgency,
      ...(formData.neededAt && {
        neededAt: new Date(formData.neededAt).toISOString(),
      }),
      ...(formData.reason?.trim() && {
        reason: formData.reason.trim(),
      }),
    };

    updateMutation.mutate(
      { id: request.id, payload: cleanedPayload },
      {
        onSuccess: () => {
          toast.success("Request updated successfully!");
          onSuccess();
          onClose();
        },
        onError: (err: any) => {
          toast.error(err?.message || "Failed to update request.");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0a0d14] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-base font-bold text-white">Edit Blood Request</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-400 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="my-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400">Patient Name</label>
            <input
              required
              type="text"
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-zinc-400">Blood Group</label>
              <select
                value={formData.bloodGroup}
                onChange={(e) =>
                  setFormData({ ...formData, bloodGroup: e.target.value as BloodGroup })
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
              <label className="text-xs font-semibold text-zinc-400">Units / Bags</label>
              <input
                required
                type="number"
                min={1}
                value={formData.units}
                onChange={(e) => setFormData({ ...formData, units: Number(e.target.value) })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-zinc-400">Hospital Name</label>
              <input
                required
                type="text"
                value={formData.hospitalName}
                onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400">Hospital Address</label>
              <input
                required
                type="text"
                value={formData.hospitalAddress}
                onChange={(e) => setFormData({ ...formData, hospitalAddress: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-zinc-400">Urgency</label>
              <select
                value={formData.urgency}
                onChange={(e) =>
                  setFormData({ ...formData, urgency: e.target.value as Urgency })
                }
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#0a0d14] p-3 text-xs text-white outline-none focus:border-red-500"
              >
                <option value="NORMAL">NORMAL</option>
                <option value="URGENT">URGENT</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400">Needed Date</label>
              <input
                type="date"
                value={formData.neededAt}
                onChange={(e) => setFormData({ ...formData, neededAt: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400">Reason</label>
            <textarea
              rows={2}
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white outline-none focus:border-red-500"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-bold text-white hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="flex w-1/2 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-600/20 hover:brightness-110 disabled:opacity-50"
            >
              {updateMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

type BloodGroup = IBloodRequest["bloodGroup"];