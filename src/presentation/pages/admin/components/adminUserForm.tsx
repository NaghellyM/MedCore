import { Controller } from "react-hook-form"
import { motion } from "framer-motion"

interface Props {
  control: any
  onSubmit: any
  errors: any
  loading: boolean
  specialties: { id: string; name: string }[]
  selectedRole: string
}

export function UserForm({
  control,
  onSubmit,
  errors,
  loading,
  specialties,
  selectedRole,
}: Props) {
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 text-left">
      {/* Nombre completo */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre completo
        </label>
        <Controller
          name="fullname"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Ej: Dr. Juan Pérez"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
        />
        {errors.fullname && (
          <p className="text-red-500 text-sm mt-1">{errors.fullname.message}</p>
        )}
      </div>

      {/* Identificación */}
<div>
  <label className="block text-sm font-medium text-gray-700">
    Identificación
  </label>
  <Controller
    name="identificacion"
    control={control}
    render={({ field }) => (
      <input
        {...field}
        type="text"
        placeholder="Ej: 1002389234"
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    )}
  />
  {errors.identificacion && (
    <p className="text-red-500 text-sm mt-1">
      {errors.identificacion.message}
    </p>
  )}
</div>
 
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="email"
              placeholder="usuario@correo.com"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Contraseña */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <Controller
          name="current_password"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="password"
              placeholder="********"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
        />
        {errors.current_password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.current_password.message}
          </p>
        )}
      </div>

      {/* Fecha de nacimiento */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fecha de nacimiento
        </label>
        <Controller
          name="date_of_birth"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="date"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
        />
        {errors.date_of_birth && (
          <p className="text-red-500 text-sm mt-1">
            {errors.date_of_birth.message}
          </p>
        )}
      </div>

      {/* Rol */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Rol</label>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="PACIENTE">Paciente</option>
              <option value="MEDICO">Médico</option>
              <option value="ENFERMERA">Enfermera</option>
              <option value="ADMINISTRADOR">Administrador</option>
            </select>
          )}
        />
      </div>

      {/* Especialidad (solo si es médico) */}
      {selectedRole === "MEDICO" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-700">
            Especialidad
          </label>
          <Controller
            name="specialization"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Selecciona una especialidad</option>
                {specialties.map((sp) => (
                  <option key={sp.id} value={sp.id}>
                    {sp.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.specialization && (
            <p className="text-red-500 text-sm mt-1">
              {errors.specialization.message}
            </p>
          )}
        </motion.div>
      )}

      {/* Botón */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={loading}
        type="submit"
        className={`w-full py-2 mt-4 text-white rounded-lg ${
          loading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 transition-all"
        }`}
      >
        {loading ? "Registrando..." : "Registrar"}
      </motion.button>
    </form>
  )
}
