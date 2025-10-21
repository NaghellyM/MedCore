import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "../../../components/ui/field"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import type { Allergy } from "../../../../core/types/medical"

type Props = {
    allergies: Allergy[]
    setAllergies: (v: Allergy[]) => void
    addAllergy: () => void
    removeAllergy: (i: number) => void
}

export default function AllergiesSection({ allergies, setAllergies, addAllergy, removeAllergy }: Props) {
    return (
        <FieldSet>
            <FieldLegend>Alergias</FieldLegend>
            <FieldGroup>
                {allergies.length === 0 && <FieldDescription>No hay alergias registradas.</FieldDescription>}
                {allergies.map((a, idx) => (
                    <div key={`alg-${idx}`} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <Field><FieldLabel>Sustancia</FieldLabel>
                            <Input value={a.substance} placeholder="Penicilina"
                                onChange={e => { const copy = [...allergies]; copy[idx].substance = e.target.value; setAllergies(copy) }} />
                        </Field>
                        <Field><FieldLabel>Reacción</FieldLabel>
                            <Input value={a.reaction} placeholder="Urticaria"
                                onChange={e => { const copy = [...allergies]; copy[idx].reaction = e.target.value; setAllergies(copy) }} />
                        </Field>
                        <Field><FieldLabel>Severidad</FieldLabel>
                            <Input value={a.severity} placeholder="leve | moderada | severa"
                                onChange={e => { const copy = [...allergies]; copy[idx].severity = e.target.value; setAllergies(copy) }} />
                        </Field>
                        <Button type="button" variant="outline" onClick={() => removeAllergy(idx)}>Eliminar</Button>
                    </div>
                ))}
                <Button type="button" className="mt-2" onClick={addAllergy}>+ Añadir alergia</Button>
            </FieldGroup>
        </FieldSet>
    )
}
