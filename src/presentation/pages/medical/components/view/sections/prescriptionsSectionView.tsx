// PrescriptionsSectionView.tsx
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "../../../../../components/ui/field"
import type { PrescriptionItem } from "../../../../../../core/types/medical"
import { fmt } from "../../../utils/format"

export default function PrescriptionsSectionView({ prescriptions }: { prescriptions: PrescriptionItem[] }) {
    return (
        <FieldSet>
            <FieldLegend>Prescripciones</FieldLegend>
            <FieldGroup>
                {!prescriptions?.length ? (
                    <FieldDescription>No hay prescripciones registradas.</FieldDescription>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="text-left">
                                <tr className="border-b">
                                    <th className="py-2 pr-4">Fármaco</th>
                                    <th className="py-2 pr-4">Dosis</th>
                                    <th className="py-2 pr-4">Vía</th>
                                    <th className="py-2 pr-4">Frecuencia</th>
                                    <th className="py-2">Inicio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prescriptions.map((m, i) => (
                                    <tr key={`med-${i}`} className="border-b last:border-0">
                                        <td className="py-2 pr-4">{fmt(m?.drug)}</td>
                                        <td className="py-2 pr-4">{fmt(m?.dose)}</td>
                                        <td className="py-2 pr-4">{fmt(m?.route)}</td>
                                        <td className="py-2 pr-4">{fmt(m?.frequency)}</td>
                                        <td className="py-2">{fmt(m?.start_date)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </FieldGroup>
        </FieldSet>
    )
}
