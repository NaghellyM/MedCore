import { useEffect, useState } from "react"
import { doctorsService } from "../../../../core/services/doctorsService"
import { DoctorCard } from "../../doctor/components/DoctorCard"
import { Search, ArrowLeftCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface Especializacion {
  id: string
  nombre: string
  departamento?: { nombre: string }
}

interface DoctorApi {
  id: string
  fullname: string
  identificacion?: string
  especializacion: Especializacion
  status: string
}

interface DoctorCardData {
  id: string
  name: string
  identification: string
  specialty: string
  status: "ACTIVE" | "INACTIVE" | "PENDING" | "UNKNOWN"
  avatar: string
}

export default function DoctorsList() {
  const [doctors, setDoctors] = useState<DoctorCardData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<"active" | "inactive" | "pending" | "">("")
  const [specialties, setSpecialties] = useState<Especializacion[]>([])
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20
  const [totalPages, setTotalPages] = useState(1)

  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const navigate = useNavigate()

  // 🔹 Debounce búsqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm)
      setCurrentPage(1)
      if (searchTerm.trim()) {
        setStatusFilter("")
        setSelectedSpecialty("")
      }
    }, 500)
    return () => clearTimeout(handler)
  }, [searchTerm])

  // 🔹 Cargar especialidades
  useEffect(() => {
    const loadSpecialties = async () => {
      try {
        const response = await doctorsService.getSpecialties()
        const especialidades = response || []
        setSpecialties(especialidades)
      } catch (error) {
        console.error("❌ Error al cargar especialidades:", error)
      }
    }

    loadSpecialties()
  }, [])

  // 🔹 Obtener doctores
  const fetchDoctors = async () => {
    try {
      setLoading(true)
      setError(null)
      let response: any

      if (debouncedSearch.trim()) {
        response = await doctorsService.searchByNameOrId(debouncedSearch, currentPage, itemsPerPage)
      } else if (selectedSpecialty) {
        response = await doctorsService.filterBySpecialty(selectedSpecialty)
        console.log("Respuesta por especialidad:", response)
      } else if (statusFilter) {
        response = await doctorsService.filterByStatus(statusFilter, currentPage, itemsPerPage)
      } else {
        response = await doctorsService.getAll(currentPage, itemsPerPage)
      }

      // 🧩 Si el backend devuelve texto de error
      if (typeof response === "string") {
        if (response.toLowerCase().includes("no se encontraron")) {
          setDoctors([])
          setTotalPages(1)
          return
        } else throw new Error(response)
      }

      // 🔹 Ahora tomamos los doctores correctamente
      const users: any[] = response.doctors || response.users || []

      if (!users.length) {
        setDoctors([])
        setTotalPages(1)
        return
      }

      const xmappedDoctors: DoctorCardData[] = users.map((doc: DoctorApi) => ({
        id: doc.id,
        name: doc.fullname,
        identification: doc.identificacion || "N/A",
        specialty: doc.especializacion?.nombre || "Sin especialidad",
        status: doc.status?.toUpperCase() || "UNKNOWN",
        avatar: `https://avatar.iran.liara.run/public/boy`,
      }))

      setDoctors(mappedDoctors)
      setTotalPages(1) // sin paginación
    } catch (err) {
      console.error("Error al obtener doctores:", err)
      setError("No se pudieron cargar los doctores.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [statusFilter, selectedSpecialty, currentPage, debouncedSearch])

  // 🔹 Filtros
  const handleStatusChange = (status: "active" | "inactive" | "pending") => {
    setStatusFilter(status)
    setSelectedSpecialty("")
    setSearchTerm("")
    setCurrentPage(1)
  }

  const handleSpecialtyChange = (value: string) => {
    setSelectedSpecialty(value)
    setStatusFilter("")
    setSearchTerm("")
    setCurrentPage(1)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    setCurrentPage(newPage)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-800">👩‍⚕️ Listado de Doctores</h1>
        <button
          onClick={() => navigate("/adminpage")}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-blue-300"
        >
          <ArrowLeftCircle size={22} />
          <span>Volver al panel</span>
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <button
          onClick={() => handleStatusChange("active")}
          className={`px-4 py-2 rounded-full font-medium shadow transition ${
            statusFilter === "active" ? "bg-green-600 text-white shadow-md scale-105" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Activos
        </button>
        <button
          onClick={() => handleStatusChange("inactive")}
          className={`px-4 py-2 rounded-full font-medium shadow transition ${
            statusFilter === "inactive" ? "bg-red-600 text-white shadow-md scale-105" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Inactivos
        </button>
        <button
          onClick={() => handleStatusChange("pending")}
          className={`px-4 py-2 rounded-full font-medium shadow transition ${
            statusFilter === "pending" ? "bg-yellow-500 text-white shadow-md scale-105" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Pendientes
        </button>

        <select
          value={selectedSpecialty}
          onChange={(e) => handleSpecialtyChange(e.target.value)}
          className="px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm hover:border-gray-400 focus:ring-2 focus:ring-blue-300 transition"
        >
          <option value="">Todas las especialidades</option>
          {specialties.map((spec) => (
            <option key={spec.id} value={spec.nombre}>
              {spec.nombre} ({spec.departamento?.nombre || "Sin departamento"})
            </option>
          ))}
        </select>

        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-300 w-full sm:w-80 ml-auto transition">
          <Search className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Buscar por nombre o identificación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Contenido principal */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-4">Cargando doctores...</p>
          </div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : doctors.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="Sin resultados"
            className="w-20 h-20 mb-4 opacity-70"
          />
          <p className="text-lg font-medium">No se encontraron doctores.</p>
          <p className="text-sm text-gray-400">
            Intenta cambiar los filtros o realizar otra búsqueda.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
