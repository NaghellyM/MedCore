import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { useNavigate } from "react-router-dom"
import { parseAndValidateCsv } from "../../../../core/validators/csvValidationService"
// import { uploadUsers } from "../../../../core/services/userImportService"

export function AdminRegisterCSV() {
  const [errors, setErrors] = useState<string[]>([])
  const [validUsers, setValidUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return
    const file = acceptedFiles[0]
    setLoading(true)

    try {
      const { validRows, errors } = await parseAndValidateCsv(file)
      setValidUsers(validRows)
      setErrors(errors)
    } catch {
      setErrors(["Error al procesar el archivo CSV."])
    } finally {
      setLoading(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    multiple: false,
  })

  const handleUpload = async () => {
    if (validUsers.length === 0 || errors.length > 0) return
    try {
      // await uploadUsers(validUsers)
      alert("Usuarios importados correctamente ✅")
      setValidUsers([])
    } catch {
      alert("Error al subir los usuarios ❌")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Importar Usuarios CSV
        </h1>

        {/* Zona Drag & Drop */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-6 rounded-xl text-center transition-all cursor-pointer ${
            isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-50"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-blue-600 font-medium">Suelta el archivo aquí...</p>
          ) : (
            <p className="text-gray-600">
              Arrastra tu archivo CSV o{" "}
              <span className="text-blue-600 font-semibold">haz clic</span> para seleccionarlo
            </p>
          )}
        </div>

        {/* Estado de carga */}
        {loading && (
          <p className="mt-4 text-blue-600 font-medium text-center animate-pulse">
            Procesando archivo...
          </p>
        )}

        {/* Errores */}
        {errors.length > 0 && (
          <div className="mt-4 text-red-600 text-left">
            <p className="font-semibold mb-2">Errores encontrados:</p>
            <ul className="list-disc ml-6 space-y-1 text-sm">
              {errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Archivo válido */}
        {validUsers.length > 0 && errors.length === 0 && (
          <p className="mt-4 text-green-600 font-semibold text-center">
            {validUsers.length} usuarios listos para subir ✅
          </p>
        )}

        {/* Botón subir */}
        <button
          onClick={handleUpload}
          disabled={validUsers.length === 0 || errors.length > 0 || loading}
          className={`mt-6 w-full py-2.5 rounded-lg font-semibold text-white transition-all ${
            validUsers.length > 0 && errors.length === 0 && !loading
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? "Subiendo..." : "Subir Usuarios"}
        </button>

        {/* Botón volver */}
        <button
          onClick={() => navigate("/adminpage")}
          className="mt-3 w-full py-2.5 rounded-lg font-semibold border border-gray-300 hover:bg-gray-100 transition-all"
        >
          ← Volver al Panel de Administración
        </button>
      </div>
    </div>
  )
}
