import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldError } from "../../../components/ui/field"
import { Input } from "../../../components/ui/input"
import { Switch } from "../../../components/ui/switch"

type Props = {
    encounter: any
    setEncounter: (v: any) => void
    errors: Record<string, string>
}

export default function EncounterSection({ encounter, setEncounter, errors }: Props) {
    return (
        <FieldSet>
            <FieldLegend>Datos consulta</FieldLegend>
            <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Field>
                        <FieldLabel htmlFor="date_time">Fecha y hora *</FieldLabel>
                        <Input id="date_time" type="datetime-local"
                            value={encounter.date_time}
                            onChange={e => setEncounter({ ...encounter, date_time: e.target.value })}
                            aria-invalid={!!errors.date_time}
                        />
                        {errors.date_time && <FieldError>{errors.date_time}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="location">Ubicación</FieldLabel>
                        <Input id="location" placeholder="Consultorio 3, Piso 2"
                            value={encounter.location}
                            onChange={e => setEncounter({ ...encounter, location: e.target.value })}
                        />
                    </Field>
                    <Field orientation="horizontal">
                        <Switch id="telemed" checked={encounter.modeTelemedicine}
                            onCheckedChange={(v: boolean) => setEncounter({ ...encounter, modeTelemedicine: v })}
                        />
                        <FieldLabel htmlFor="telemed">Teleconsulta</FieldLabel>
                    </Field>
                </div>

                <FieldSeparator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor="chief">Motivo de consulta *</FieldLabel>
                        <Input id="chief" placeholder="Dolor torácico..."
                            value={encounter.chief_complaint}
                            onChange={e => setEncounter({ ...encounter, chief_complaint: e.target.value })}
                            aria-invalid={!!errors.chief_complaint}
                        />
                        {errors.chief_complaint && <FieldError>{errors.chief_complaint}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="hpi">Anamnesis (HPI)</FieldLabel>
                        <Input id="hpi" placeholder="Inicio súbito hace 2 horas..."
                            value={encounter.history_of_present_illness}
                            onChange={e => setEncounter({ ...encounter, history_of_present_illness: e.target.value })}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="ros">Revisión por sistemas</FieldLabel>
                        <Input id="ros" placeholder="Respiratorio +; CV +; GI - ..."
                            value={encounter.review_of_systems}
                            onChange={e => setEncounter({ ...encounter, review_of_systems: e.target.value })}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="pe">Examen físico</FieldLabel>
                        <Input id="pe" placeholder="TA 120/80, dolor a la palpación..."
                            value={encounter.physical_exam}
                            onChange={e => setEncounter({ ...encounter, physical_exam: e.target.value })}
                        />
                    </Field>
                </div>
            </FieldGroup>
        </FieldSet>
    )
}
