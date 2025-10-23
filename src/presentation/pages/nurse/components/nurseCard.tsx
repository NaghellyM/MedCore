interface NurseCardProps {
  fullname: string
  identificacion: string
  rol: string
  status: string
}

export function NurseCard({ fullname, identificacion, rol, status }: NurseCardProps) {
  const normalizedStatus = status?.toUpperCase()

  const statusConfig = {
    ACTIVE: { text: "Activo", color: "bg-green-200 text-green-800" },
    INACTIVE: { text: "Inactivo", color: "bg-red-200 text-red-800" },
    PENDING: { text: "Pendiente", color: "bg-yellow-200 text-yellow-800" },
  }

  const { text, color } = statusConfig[normalizedStatus] || statusConfig.INACTIVE

  // Avatar aleatorio (hombre o mujer)
  const gender = Math.random() > 0.5 ? "boy" : "girl"
  const avatarUrl = `https://avatar.iran.liara.run/public/${gender}?username=${encodeURIComponent(fullname)}`

  return (
    <div className="relative border rounded-xl p-5 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 bg-gradient-to-br from-white via-blue-50 to-blue-100 flex flex-col items-center text-center">
      
      {/* Estado */}
      <span
        className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${color}`}
      >
        {text}
      </span>

      {/* Avatar */}
      <div className="w-24 h-24 rounded-full mb-4 overflow-hidden border-4 border-blue-200 shadow-inner bg-white flex items-center justify-center">
        <img
          src={avatarUrl}
          alt={fullname}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Nombre */}
      <h3 className="font-bold text-xl text-gray-800 mb-1">{fullname}</h3>

      {/* Identificación */}
      <p className="text-sm text-gray-500 mb-2">ID: {identificacion}</p>

      {/* Rol */}
      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-200 to-blue-300 text-blue-800 shadow-sm uppercase">
        {rol}
      </span>
    </div>
  )
}
