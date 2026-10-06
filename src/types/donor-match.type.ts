export type MatchStatus = "NOTIFIED" | "ACCEPTED" | "REJECTED" | "EXPIRED";

export interface IDonorMatch {
  id: string;
  requestId: string;
  donorId: string;
  distanceKm?: number | null;
  matchScore: number;
  status: MatchStatus;
  notifiedAt: string;
  respondedAt?: string | null;
  createdAt: string;
  request?: {
    id: string;
    patientName: string;
    bloodGroup: string;
    units: number;
    hospitalName: string;
    hospitalAddress: string;
    urgency: string;
    status: string;
  };
  donor?: {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
      phone?: string | null;
    };
  };
}