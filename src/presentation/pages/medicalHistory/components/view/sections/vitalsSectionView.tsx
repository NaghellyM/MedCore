// VitalsSectionView.tsx
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "../../../../../components/ui/field"
import type { EncounterPayload } from "../../../../../../core/types/medical"
import { fmt } from "../../../utils/format"
import { useBMI } from "../../../utils/useBMI"

type Props = { vitals: EncounterPayload["encounter"]["vitals"] }

export default function VitalsSectionView({ vitals }: Props) {
    const bmi = useBMI(
        vitals?.height != null ? Number(vitals.height) : null,
        vitals?.weight != null ? Number(vitals.weight) : null,
        vitals?.bmi != null ? Number(vitals.bmi) : null
    )

    return (
        <FieldSet>
            <FieldLegend>Signos vitales</FieldLegend>
            <FieldGroup>
                <div className="grid grid-cols-2 md:grid-cols-8 gap-4">
                    <Field><FieldLabel>TA</FieldLabel><p className="text-sm">{fmt(vitals?.bp)}</p></Field>
                    <Field><FieldLabel>FC</FieldLabel><p className="text-sm">{fmt(vitals?.hr)}</p></Field>
                    <Field><FieldLabel>FR</FieldLabel><p className="text-sm">{fmt(vitals?.rr)}</p></Field>
                    <Field><FieldLabel>Temp</FieldLabel><p className="text-sm">{fmt(vitals?.temp)}</p></Field>
                    <Field><FieldLabel>SpO₂</FieldLabel><p className="text-sm">{fmt(vitals?.spo2)}</p></Field>
                    <Field><FieldLabel>Peso (kg)</FieldLabel><p className="text-sm">{fmt(vitals?.weight)}</p></Field>
                    <Field><FieldLabel>Talla (cm)</FieldLabel><p className="text-sm">{fmt(vitals?.height)}</p></Field>
                    <Field><FieldLabel>IMC</FieldLabel><p className="text-sm">{bmi ?? "—"}</p></Field>
                </div>
            </FieldGroup>
        </FieldSet>
    )
}
