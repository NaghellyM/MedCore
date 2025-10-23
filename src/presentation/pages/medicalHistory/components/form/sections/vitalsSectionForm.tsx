import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "../../../../../components/ui/field"
import { Input } from "../../../../../components/ui/input"
import type { Vitals } from "../../../../../../core/types/medical"

type Props = { vitals: Vitals; setVitals: (v: Vitals) => void }

export default function VitalsSection({ vitals, setVitals }: Props) {
    return (
        <FieldSet>
            <FieldLegend>Signos vitales</FieldLegend>
            <FieldGroup>
                <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                    {[
                        ["bp", "TA (mmHg)", "120/80"],
                        ["hr", "FC (lpm)", "72"],
                        ["rr", "FR (rpm)", "16"],
                        ["temp", "Temp (°C)", "36.7"],
                        ["spo2", "SpO₂ (%)", "98"],
                        ["weight", "Peso (kg)", "70"],
                        ["height", "Talla (cm)", "170"],
                    ].map(([key, label, ph]) => (
                        <Field key={key}>
                            <FieldLabel htmlFor={key as string}>{label}</FieldLabel>
                            <Input id={key as string} placeholder={ph as string}
                                value={(vitals as any)[key] || ""}
                                onChange={e => setVitals({ ...vitals, [key as string]: e.target.value })}
                            />
                        </Field>
                    ))}
                </div>
            </FieldGroup>
        </FieldSet>
    )
}
