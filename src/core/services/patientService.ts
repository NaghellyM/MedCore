import http from "../../infrastructure/http/http"
import type { RegisterUserDto } from "../models/user"
import { ApiUrls } from "../../environments/environments"

export async function registerUser(user: RegisterUserDto) {
  const response = await http.post(`${ApiUrls.msSecurity}/auth/sign-up`, user)
  console.log("respondeme sapa", response.data);  
  return response.data
}
