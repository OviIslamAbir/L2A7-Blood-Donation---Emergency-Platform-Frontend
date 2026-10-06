export type Urgency = "NORMAL" | "HIGH" | "CRITICAL";
export type RequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "MATCHING"
  | "DONOR_FOUND"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface ICreateBloodRequestPayload {
  patientName: string;
  bloodGroup: string;
  units: number;
  hospitalName: string;
  hospitalAddress: string;
  division?: string;
  district?: string;
  latitude?: number;
  longitude?: number;
  urgency?: Urgency;
  neededAt?: string;
  reason?: string;
}

export interface IUpdateBloodRequestPayload extends Partial<ICreateBloodRequestPayload> {}

export interface IBloodRequest {
  id: string;
  requesterId: string;
  requesterType: string;
  patientName: string;
  bloodGroup: string;
  units: number;
  hospitalName: string;
  hospitalAddress: string;
  division?: string | null;
  district?: string | null;
  urgency: Urgency;
  neededAt?: string | null;
  reason?: string | null;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}