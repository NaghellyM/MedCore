// DiagnosesSectionView.tsx
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "../../../../../components/ui/field"
import type { DiagnosisItem } from "../../../../../../core/types/medical"
import { fmt } from "../../../utils/format"

export default function DiagnosesSectionView({ diagnoses }: { diagnoses: DiagnosisItem[] }) {
    return (
        <FieldSet>
            <FieldLegend>Diagnósticos</FieldLegend>
            <FieldGroup>
                {!diagnoses?.length ? (
                    <FieldDescription>No hay diagnósticos registrados.</FieldDescription>
                ) : (
                    <ul className="divide-y">
                        {diagnoses.map((d, i) => (
                            <li key={`dx-${i}`} className="py-2 text-sm flex items-center justify-between">
                                <div>
                                    <div className="font-medium">{fmt(d?.description)}</div>
                                    <div className="text-xs text-muted-foreground">{fmt(d?.code)}</div>
                                </div>
                                <span className="text-xs px-2 py-1 rounded-full border capitalize">
                                    {fmt(d?.date)}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </FieldGroup>
        </FieldSet>
    )
}
