import { useEffect, useState } from "react"
import { NurseCard } from "../../nurse/components/NurseCard"
import { nursesService } from "../../../../core/services/nursesService"
import { Search, ArrowLeftCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface NurseApi {
  id: string
  fullname: string
  identificacion: string
  role: string
  status: string
}

interface NurseCardData {
  id: string
  fullname: string
  identificacion: string
  role: string
  status: string
}

export default function NursesList() {
  const [nurses, setNurses] = useState<NurseCardData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<"active" | "inactive" | "pending" | "">("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9
  const [totalPages, setTotalPages] = useState(1)

  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const navigate = useNavigate()

  // 🔹 Debounce para búsqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm)
      setCurrentPage(1)
      if (searchTerm.trim()) setStatusFilter("")
    }, 500)
    return () => clearTimeout(handler)
  }, [searchTerm])

  // 🔹 Obtener enfermeros
  const fetchNurses = async () => {
    try {
      setLoading(true)
      setError(null)

      let response: any
      if (debouncedSearch.trim()) {
        response = await nursesService.searchByNameOrId(debouncedSearch)
      } else if (statusFilter) {
        response = await nursesService.filterByStatus(statusFilter)
      } else {
        response = await nursesService.getAll()
      }

      console.log("🩺 Respuesta del backend (nurses):", response)

      let users: any[] = []
      if (Array.isArray(response)) {
        users = response
      } else if (Array.isArray(response.users)) {
        users = response.users
      } else if (Array.isArray(response.data)) {
        users = response.data
      } else if (response && typeof response === "object") {
        const nestedArray = Object.values(response).find(Array.isArray)
        if (nestedArray) users = nestedArray
      }

      if (!Array.isArray(users)) {
        console.warn("⚠️ No se encontró lista de enfermeros:", response)
        users = []
      }

      const total = users.length
      setTotalPages(Math.ceil(total / itemsPerPage))
      const start = (currentPage - 1) * itemsPerPage
      const end = start + itemsPerPage
      const paginatedUsers = users.slice(start, end)

      const mappedNurses: NurseCardData[] = paginatedUsers.map((n: NurseApi) => ({
        id: n.id,
        fullname: n.fullname,
        identificacion: n.identificacion || "N/A",
        role: n.role || "ENFERMERA",
        status: n.status?.toUpperCase() || "INACTIVE",
      }))

      setNurses(mappedNurses)
    } catch (err) {
      console.error("Error al obtener enfermeros:", err)
      setError("No se pudieron cargar los enfermeros.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNurses()
  }, [statusFilter, currentPage, debouncedSearch])

  // 🔹 Filtros
  const handleStatusChange = (status: "active" | "inactive" | "pending") => {
    setStatusFilter(status)
    setSearchTerm("")
    setCurrentPage(1)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    setCurrentPage(newPage)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Título y botón */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          👩‍⚕️ Listado de Enfermeros
        </h1>

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
            statusFilter === "active"
              ? "bg-green-600 text-white shadow-md scale-105"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Activos
        </button>

        <button
          onClick={() => handleStatusChange("inactive")}
          className={`px-4 py-2 rounded-full font-medium shadow transition ${
            statusFilter === "inactive"
              ? "bg-red-600 text-white shadow-md scale-105"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Inactivos
        </button>

        <button
          onClick={() => handleStatusChange("pending")}
          className={`px-4 py-2 rounded-full font-medium shadow transition ${
            statusFilter === "pending"
              ? "bg-yellow-500 text-white shadow-md scale-105"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Pendientes
        </button>

        {/* Búsqueda */}
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
            <p className="text-gray-500 mt-4">Cargando enfermeros...</p>
          </div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : nurses.length === 0 ? (
        <p className="text-gray-500 text-center">
          No se encontraron enfermeros para los filtros o búsqueda.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nurses.map((nurse) => (
              <NurseCard
                key={nurse.id}
                fullname={nurse.fullname}
                identificacion={nurse.identificacion}
                rol={nurse.role}
                status={nurse.status}
              />
            ))}
          </div>

          {/* Paginación */}
          <div className="flex items-center justify-center mt-8 gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
            >
              ← Anterior
            </button>
            <span className="text-gray-700 font-medium">
              Página <span className="font-bold">{currentPage}</span> de {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
            >
              Siguiente →
            </button>
          </div>
        </>
      )}
    </div>
  )
}
