// PatientSectionView.tsx
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "../../../../../components/ui/field"
import type { EncounterPayload } from "../../../../../../core/types/medical"
import { fmt } from "../../../utils/format"

type Props = { patient: EncounterPayload["patient"] }

export default function PatientSectionView({ patient }: Props) {
    return (
        <FieldSet>
            <FieldLegend>Datos básicos del paciente</FieldLegend>
            <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel>Nombres y apellidos</FieldLabel>
                        <p className="text-sm">
                            {fmt(`${patient?.first_name ?? ""} ${patient?.last_name ?? ""}`.trim())}
                        </p>
                    </Field>
                    <Field>
                        <FieldLabel>Documento</FieldLabel>
                        <p className="text-sm">
                            {fmt([patient?.document_type, patient?.document_number].filter(Boolean).join(" "))}
                        </p>
                    </Field>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Field><FieldLabel>Fecha de nacimiento</FieldLabel><p className="text-sm">{fmt(patient?.birth_date)}</p></Field>
                    <Field><FieldLabel>Sexo biológico</FieldLabel><p className="text-sm">{fmt(patient?.sex_at_birth)}</p></Field>
                    <Field>
                        <FieldLabel>Contacto</FieldLabel>
                        <p className="text-sm">
                            {fmt([patient?.contact?.phone].filter(Boolean).join(" · "))}
                        </p>
                    </Field>
                    <Field>
                        <FieldLabel>Correo electrónico</FieldLabel>
                        <p className="text-sm">
                            {fmt([patient?.contact?.email].filter(Boolean).join(" · "))}
                        </p>
                    </Field>
                    <br />
                </div>
            </FieldGroup>
        </FieldSet>
    )
}
