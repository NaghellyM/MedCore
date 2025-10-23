import http from "../../infrastructure/http/http"
import type { RegisterUserDto } from "../models/user"
import { ApiUrls } from "../../environments/environments"

export async function registerUser(user: RegisterUserDto) {
  console.log("esto es lo que mellega el register");
  
  const response = await http.post(`${ApiUrls.msSecurity}/auth/sign-up`, user)
  return response.data
}
