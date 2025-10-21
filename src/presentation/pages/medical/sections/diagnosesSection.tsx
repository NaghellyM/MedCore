import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "../../../components/ui/field"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import type { Diagnosis } from "../../../../core/types/medical"

type Props = {
    diagnoses: Diagnosis[]
    setDiagnoses: (v: Diagnosis[]) => void
    addDiagnosis: () => void
    removeDiagnosis: (i: number) => void
    error?: string
}

export default function DiagnosesSection({ diagnoses, setDiagnoses, addDiagnosis, removeDiagnosis, error }: Props) {
    return (
        <FieldSet>
            <FieldLegend>Diagnósticos</FieldLegend>
            <FieldGroup>
                {diagnoses.length === 0 && <FieldDescription>Incluye al menos un diagnóstico principal.</FieldDescription>}
                {diagnoses.map((d, idx) => (
                    <div key={`dx-${idx}`} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                        <Field><FieldLabel>Código (CIE-10)</FieldLabel>
                            <Input value={d.code || ""} placeholder="R07.4"
                                onChange={e => { const copy = [...diagnoses]; copy[idx].code = e.target.value; setDiagnoses(copy) }} />
                        </Field>
                        <Field><FieldLabel>Descripción *</FieldLabel>
                            <Input value={d.description} placeholder="Dolor torácico"
                                onChange={e => { const copy = [...diagnoses]; copy[idx].description = e.target.value; setDiagnoses(copy) }}
                                aria-invalid={!!error}
                            />
                        </Field>
                        <Field><FieldLabel>Tipo</FieldLabel>
                            <Input value={d.type} placeholder="principal | secundario"
                                onChange={e => {
                                    const v = e.target.value === "principal" ? "principal" : "secundario"
                                    const copy = [...diagnoses]; copy[idx].type = v as Diagnosis["type"]; setDiagnoses(copy)
                                }} />
                        </Field>
                        <Button type="button" variant="outline" onClick={() => removeDiagnosis(idx)}>Eliminar</Button>
                    </div>
                ))}
                {error && <FieldError>{error}</FieldError>}
                <Button type="button" className="mt-2" onClick={addDiagnosis}>+ Añadir diagnóstico</Button>
            </FieldGroup>
        </FieldSet>
    )
}
