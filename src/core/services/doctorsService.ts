import http from "../../infrastructure/http/http"
import { ApiUrls } from "../../environments/environments";

export const doctorsService = {
  async getAll() {
    const response = await http.get(`${ApiUrls.msSecurity}/users/by-role-status?role=medico`)
    return response.data
  },
  

  async searchByNameOrId(query: string) {
    const response = await http.get(`${ApiUrls.msSecurity}/users/search-by-role?query=${query}&role=medico`)
    return response.data
  },

  async filterBySpecialty(specialty: string) {
    const response = await http.get(`${ApiUrls.msSecurity}/users/doctors/by-specialty?specialty=${specialty}`)
    return response.data
  },

  async filterByStatus(status: "active" | "inactive" | "pending") {
    try {
      const response = await http.get(
        `${ApiUrls.msSecurity}/users/by-role-status?role=medico&status=${status.toUpperCase()}`
      )

      console.log("🔍 API Response:", response.data)

      return {
        users: response.data?.users || [],
      }
    } catch (err) {
      console.error("❌ Error fetching doctors by status:", err)
      return { users: [] }
    }
  },

  async getSpecialties() {
    const response = await http.get(`${ApiUrls.msSecurity}/specialties`)
    return response.data
  },
}
