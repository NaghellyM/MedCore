// src/core/types/userCsv.types.ts

/** 
 * Representa una fila del archivo CSV que se importa en el sistema.
 * Cada campo debe coincidir con el encabezado del CSV.
 */
export interface UserCsv {
  /** Nombre completo del usuario */
  nombre: string

  /** Correo electrónico del usuario */
  correo: string

  /** Rol dentro del sistema */
  rol: "PACIENTE" | "MEDICO" | "ENFERMERA"
}
