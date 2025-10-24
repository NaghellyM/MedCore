import { ApiUrls } from "../../environments/environments";
import { apiPost } from "../../infrastructure/http/apiPost";

export interface LoginResponse {
  message: string;
  accessToken?: string;
  refreshToken?: string;
}

export async function verifyEmail(email: string, code: string): Promise<LoginResponse> {
  const url = `${ApiUrls.msSecurity}/auth/verify-email`;
  const data = { email, verificationCode: code };
  return apiPost<LoginResponse>(url, data);
}

export interface ResendVerificationResponse {
  message: string;
}


export async function requestVerificationCode(
  email: string
): Promise<ResendVerificationResponse> {
  const url = `${ApiUrls.msSecurity}/auth/resend-verification`;
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error("El correo es requerido.");
  }

  return apiPost<ResendVerificationResponse>(url, { email: normalizedEmail });
}