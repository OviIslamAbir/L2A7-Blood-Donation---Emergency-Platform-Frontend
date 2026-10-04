export type AdminRole = "ADMIN" | "DONOR" | "REQUESTER";

export interface AdminStats {
  totalUsers: number;
  totalDonors: number;
  totalRequesters: number;
  totalBloodRequests: number;
  pendingDonorApplications: number;
  pendingBloodRequests: number;
  totalDonations: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: AdminRole;
  isActive: boolean;
  emailVerified?: boolean;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
  donorProfile?: {
    bloodGroup?: string;
    dateOfBirth?: string;
    division?: string;
    district?: string;
    address?: string;
  } | null;
}

export interface DonorApplication extends AdminUser {
  donorProfile?: {
    bloodGroup?: string;
    dateOfBirth?: string;
    division?: string;
    district?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
  } | null;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface UsersResult {
  meta: PaginationMeta;
  data: AdminUser[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}