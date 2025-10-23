import Papa from "papaparse"
import { userCsvSchema } from "./userCsvSchema"

/**
 * Parsea y valida un archivo CSV de usuarios.
 * @param {File} file - Archivo CSV cargado por el usuario
 * @returns {Promise<{ data: Array, errors: Array }>}
 */
export async function parseAndValidateCsv(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const validUsers = []
        const errors = []

        for (let i = 0; i < results.data.length; i++) {
          const row = results.data[i]
          try {
            const validUser = await userCsvSchema.validate(row, { abortEarly: false })
            validUsers.push(validUser)
          } catch (validationError) {
            errors.push({
              row: i + 1,
              errors: validationError.errors,
              data: row,
            })
          }
        }

        resolve({ data: validUsers, errors })
      },
      error: (err) => reject({ message: "Error al leer el CSV", error: err }),
    })
  })
}
