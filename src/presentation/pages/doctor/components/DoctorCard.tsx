interface DoctorCardProps {
  doctor: {
    id: string
    name: string
    identification: string
    specialty: string
    active: boolean
    avatar?: string
    status?: string // 👈 opcional por compatibilidad futura
  }
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  // 🔹 Normalizar el estado
  const normalizedStatus = doctor.status
    ? doctor.status.toUpperCase()
    : doctor.active
    ? "ACTIVE"
    : "INACTIVE"

  // 🔹 Configuración de colores y textos por estado
  const statusConfig = {
    ACTIVE: { text: "Activo", color: "bg-green-200 text-green-800" },
    INACTIVE: { text: "Inactivo", color: "bg-red-200 text-red-800" },
    PENDING: { text: "Pendiente", color: "bg-yellow-200 text-yellow-800" },
  }

  const { text, color } = statusConfig[normalizedStatus] || statusConfig.INACTIVE

  // 🔹 Si no tiene avatar, generamos uno aleatorio
  const gender = Math.random() > 0.5 ? "boy" : "girl"
  const avatarUrl = `https://avatar.iran.liara.run/public/${gender}?username=${encodeURIComponent(name)}`

  return (
    <div className="relative border rounded-xl p-5 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 bg-gradient-to-br from-white via-blue-50 to-blue-100 flex flex-col items-center text-center">
      
      {/* 🔹 Badge de estado */}
      <span
        className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${color}`}
      >
        {text}
      </span>

      {/* 🔹 Avatar */}
      <div className="w-24 h-24 rounded-full mb-4 overflow-hidden border-4 border-blue-200 shadow-inner bg-white flex items-center justify-center">
        <img
          src={avatarUrl}
          alt={doctor.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 🔹 Nombre */}
      <h3 className="font-bold text-xl text-gray-800 mb-1">{doctor.name}</h3>

      {/* 🔹 Identificación */}
      <p className="text-sm text-gray-500 mb-2">ID: {doctor.identification}</p>

      {/* 🔹 Especialidad */}
      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-200 via-pink-200 to-pink-300 text-purple-800 shadow-sm">
        {doctor.specialty}
      </span>
    </div>
  )
}
