export type UserRole = "ADMIN" | "DONOR" | "REQUESTER";
export type DonorApplicationStatus = "NONE" | "PENDING" | "APPROVED" | "REJECTED";
export type RequesterType = "PATIENT" | "HOSPITAL";

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
  requesterType?: RequesterType | null;
}

export interface IVerifyEmailPayload {
  email: string;
  otp: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IGoogleLoginPayload {
  idToken: string;
}

export interface IForgotPasswordPayload {
  email: string;
}

export interface IResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  donorApplicationStatus: DonorApplicationStatus;
  phone?: string | null;
  avatar?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAuthSuccessData {
  role: UserRole;
  user: IUser;
  accessToken: string;
  refreshToken?: string;
}

export interface IAuthResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}