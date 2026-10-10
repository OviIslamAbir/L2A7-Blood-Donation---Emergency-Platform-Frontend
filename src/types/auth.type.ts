export interface IRegisterPayload {
	name: string;
	email: string;
	password: string;
	requesterType?: "INDIVIDUAL" | "ORGANIZATION" | null;
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
	role: string;
	isActive: boolean;
	emailVerified: boolean;
	donorApplicationStatus: string;
}

export interface IAuthSuccessData {
  role: string;
	user: IUser;
	accessToken: string;
	refreshToken: string;
}

export interface IAuthResponse<T = any> {
	success: boolean;
	statusCode: number;
	message: string;
	data: T;
}
