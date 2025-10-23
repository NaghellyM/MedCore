import Swal from "sweetalert2"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { motion } from "framer-motion"
import { UserForm } from "../components/adminUserForm"
import { registerUser } from "../../../../core/services/patientService"
import { doctorsService } from "../../../../core/services/doctorsService"
import type { RegisterUserDto } from "../../../../core/models/user"
import { validationSchema } from "../../../../core/validators/validationSchema"
import { UserPlus } from "lucide-react"

export function AdminRegisterUser() {
  const [loading, setLoading] = useState(false)
  const [specialties, setSpecialties] = useState<{ id: string; name: string }[]>([])

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterUserDto>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      current_password: "",
      date_of_birth: "",
      role: "PACIENTE",
      fullname: "",
    },
  })

  const selectedRole = watch("role")

  useEffect(() => {
    const loadSpecialties = async () => {
      try {
        const response = await doctorsService.getSpecialties()
        console.log("📋 Especialidades recibidas:", response)

        // ✅ Validamos y mapeamos correctamente los datos
        if (response && Array.isArray(response.especialidades)) {
          const mapped = response.especialidades.map((esp: any) => ({
            id: esp.id,
            name: `${esp.nombre} (${esp.departamento?.nombre || "Sin departamento"})`,
          }))
          setSpecialties(mapped)
        } else {
          console.warn("⚠️ Formato inesperado en la respuesta:", response)
        }
      } catch (error) {
        console.error("❌ Error al cargar especialidades:", error)
      }
    }

    loadSpecialties()
  }, [])

  const onSubmit = async (data: RegisterUserDto) => {
    setLoading(true)
    try {
      await registerUser(data)
      Swal.fire({
        icon: "success",
        title: "Usuario registrado con éxito",
        showConfirmButton: false,
        timer: 2000,
      })
      reset()
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "No se pudo registrar",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 0 30px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-sm border border-gray-100 p-8 rounded-2xl shadow-md w-full max-w-md transition-all"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-6"
        >
          <motion.div
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="bg-blue-100 p-3 rounded-full mb-2"
          >
            <UserPlus className="text-blue-600 w-8 h-8" />
          </motion.div>

          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            Registrar Usuario
          </h2>
        </motion.div>

        <UserForm
            control={control}
            onSubmit={handleSubmit(onSubmit)}
            errors={errors}
            loading={loading}
            specialties={specialties}
            selectedRole={selectedRole}
            />
      </motion.div>
    </div>
  )
}
