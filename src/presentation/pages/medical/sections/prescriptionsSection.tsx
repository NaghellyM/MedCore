import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "../../../components/ui/field"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import type { Medication } from "../../../../core/types/medical"

type Props = {
    medications: Medication[]
    setMedications: (v: Medication[]) => void
    addMedication: () => void
    removeMedication: (i: number) => void
}

export default function PrescriptionsSection({ medications, setMedications, addMedication, removeMedication }: Props) {
    return (
        <FieldSet>
            <FieldLegend>Prescripciones</FieldLegend>
            <FieldGroup>
                {medications.length === 0 && <FieldDescription>No hay prescripciones registradas.</FieldDescription>}
                {medications.map((m, idx) => (
                    <div key={`med-${idx}`} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                        {[
                            ["drug", "Fármaco", "Acetaminofén"],
                            ["dose", "Dosis", "500 mg"],
                            ["route", "Vía", "VO | IV | IM"],
                            ["frequency", "Frecuencia", "cada 8h"],
                        ].map(([k, label, ph]) => (
                            <Field key={k}><FieldLabel>{label}</FieldLabel>
                                <Input placeholder={ph as string}
                                    value={(m as any)[k] || ""}
                                    onChange={e => { const copy = [...medications]; (copy[idx] as any)[k] = e.target.value; setMedications(copy) }} />
                            </Field>
                        ))}
                        <Field><FieldLabel>Inicio</FieldLabel>
                            <Input type="date" value={m.start_date || ""}
                                onChange={e => { const copy = [...medications]; copy[idx].start_date = e.target.value; setMedications(copy) }} />
                        </Field>
                        <Button type="button" variant="outline" onClick={() => removeMedication(idx)}>Eliminar</Button>
                    </div>
                ))}
                <Button type="button" className="mt-2" onClick={addMedication}>+ Añadir prescripción</Button>
            </FieldGroup>
        </FieldSet>
    )
}
