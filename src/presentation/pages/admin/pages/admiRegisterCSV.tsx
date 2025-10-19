import { useRef } from "react";
import { ArrowUpFromLine } from "lucide-react";

export function AdminRegisterCSV() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleIconClick = () => fileInputRef.current?.click();

  return (
    <div className="p-4 sm:p-6 w-full max-w-md mx-auto text-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Carga de Archivo CSV</h1>
      <p className="text-gray-600 mb-6">
        Sube tu archivo CSV para importar usuarios. Asegúrate de que el archivo esté en el formato correcto.
      </p>

      <div className="flex items-center justify-center border-dashed border-2 border-gray-300 p-6 rounded-lg">
        <button
          type="button"
          onClick={handleIconClick}
          className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-700"
        >
          <ArrowUpFromLine className="w-6 h-6" />
          <span className="text-base sm:text-lg">
            Arrastra tu archivo CSV aquí o haz clic para seleccionar
          </span>
        </button>
        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      <div className="flex justify-center mt-4">
        <button className="bg-cuidarte-accent text-white px-6 py-2 rounded-md hover:bg-cuidarte-accent-dark">
          Subir y Validar Usuarios
        </button>
      </div>
    </div>
  );
}
