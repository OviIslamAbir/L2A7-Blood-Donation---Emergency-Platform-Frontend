export type DonationStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED";

export interface ICreateDonationPayload {
  requestId: string;
  notes?: string;
}

export interface IUpdateDonationPayload {
  notes?: string;
}

export interface IDonation {
  id: string;
  donorId: string;
  requestId: string;
  status: DonationStatus;
  donatedAt?: string | null;
  notes?: string | null;
  createdAt: string;
  request: {
    id: string;
    patientName: string;
    bloodGroup: string;
    units: number;
    hospitalName: string;
    hospitalAddress: string;
    urgency: string;
    status: string;
    neededAt?: string | null;
  };
}