export interface DonorProfile {
  id: string;
  userId: string;
  bloodGroup: string;
  dateOfBirth?: string | null;
  division: string;
  district: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  appliedAt?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  rejectReason?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface DonorProfileResponse {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: string;
  donorProfile: DonorProfile;
}

export interface DonorApplicationStatus {
  role: string;
  applicationStatus: "NONE" | "PENDING" | "APPROVED" | "REJECTED";
  donorProfile: DonorProfile | null;
}

export interface ApplyDonorPayload {
  bloodGroup: string;
  dateOfBirth?: string;
  division: string;
  district: string;
  address: string;
  latitude?: number;
  longitude?: number;
}

export interface UpdateDonorProfilePayload {
  bloodGroup?: string;
  dateOfBirth?: string;
  division?: string;
  district?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}