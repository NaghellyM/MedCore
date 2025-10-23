// EncounterSectionView.tsx
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "../../../../../components/ui/field"
import type { EncounterPayload } from "../../../../../../core/types/medical"
import { fmt, fmtDateTime } from "../../../utils/format"

type Props = { encounter: EncounterPayload["encounter"] }

export default function EncounterSectionView({ encounter }: Props) {
    const mode = encounter?.mode ?? (encounter?.modeTelemedicine ? "teleconsulta" : "presencial")

    return (
        <FieldSet>
            <FieldLegend>Detalles de la consulta</FieldLegend>
            <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Field><FieldLabel>Fecha y hora</FieldLabel><p className="text-sm">{fmtDateTime(encounter?.date_time)}</p></Field>
                    <Field><FieldLabel>Ubicación</FieldLabel><p className="text-sm">{fmt(encounter?.location)}</p></Field>
                    <Field><FieldLabel>Modalidad</FieldLabel><p className="text-sm capitalize">{fmt(mode)}</p></Field>
                </div>

                <FieldSeparator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field><FieldLabel>Motivo de consulta</FieldLabel><p className="text-sm whitespace-pre-wrap">{fmt(encounter?.chief_complaint)}</p></Field>
                    <Field><FieldLabel>Anamnesis (HPI)</FieldLabel><p className="text-sm whitespace-pre-wrap">{fmt(encounter?.history_of_present_illness)}</p></Field>
                    <Field><FieldLabel>Revisión por sistemas</FieldLabel><p className="text-sm whitespace-pre-wrap">{fmt(encounter?.review_of_systems)}</p></Field>
                    <Field><FieldLabel>Examen físico</FieldLabel><p className="text-sm whitespace-pre-wrap">{fmt(encounter?.physical_exam)}</p></Field>
                </div>
            </FieldGroup>
        </FieldSet>
    )
}
