import { Search } from "lucide-react";
import { ButtonPDF, ButtonViewDetails } from "../../../components/globals/buttonPDF";

export function PatientPageContent() {
    return (
        <div className="w-full">
            <div className=" p-3 sm:p-4"> 
                <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Electrocardiograma, Análisis de sangre..."
                            className="w-full border border-slate-300 rounded-lg py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-cuidarte-primary"
                        />
                    </div>
                    <select className="w-full sm:w-44 border border-slate-300 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-cuidarte-primary">
                        <option value="last_24_hours">Últimas 24 horas</option>
                        <option value="last_week">Última semana</option>
                        <option value="last_month">Últimos 30 días</option>
                    </select>
                </div>
            </div>

            <div className="mt-6">
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <article className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
                        <h3 className="text-base sm:text-lg font-semibold">Examen de Sangre - 01/09/2023</h3>
                        <p className="mt-1 text-sm text-slate-600">Resultados: Todo dentro de los parámetros normales.</p>
                        <div className="mt-4 flex flex-wrap justify-center items-center gap-2">
                            <ButtonViewDetails />
                            <ButtonPDF />
                        </div>
                    </article>

                    <article className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
                        <h3 className="text-base sm:text-lg font-semibold">Radiografía de Tórax - 15/08/2023</h3>
                        <p className="mt-1 text-sm text-slate-600">Resultados: No se observan anomalías.</p>
                        <div className="mt-4 flex flex-wrap justify-center items-center gap-2">
                            <ButtonViewDetails />
                            <ButtonPDF />
                        </div>
                    </article>

                    <article className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
                        <h3 className="text-base sm:text-lg font-semibold">Análisis de Orina - 30/07/2023</h3>
                        <p className="mt-1 text-sm text-slate-600">Resultados: Leve presencia de proteínas.</p>
                        <div className="mt-4 flex flex-wrap justify-center items-center gap-2">
                            <ButtonViewDetails />
                            <ButtonPDF />
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}
