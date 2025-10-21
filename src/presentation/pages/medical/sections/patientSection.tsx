import {
    Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet,
} from "../../../components/ui/field"
import { Input } from "../../../components/ui/input"

type Props = {
    patient: any
    setPatient: (v: any) => void
    errors: Record<string, string>
}

export default function PatientSection({ patient, setPatient, errors }: Props) {
    return (
        <FieldSet className="">
            <FieldLegend>Historia Clínica</FieldLegend>
            <FieldDescription>Datos básicos del paciente.</FieldDescription>
            <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Field>
                        <FieldLabel htmlFor="document_type">Tipo de documento *</FieldLabel>
                        <Input id="document_type" placeholder="CC | CE | PAS"
                            value={patient.document_type}
                            onChange={e => setPatient({ ...patient, document_type: e.target.value })}
                            aria-invalid={!!errors.document_type}
                        />
                        {errors.document_type && <FieldError>{errors.document_type}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="document_number">Número *</FieldLabel>
                        <Input id="document_number" placeholder="1234567890"
                            value={patient.document_number}
                            onChange={e => setPatient({ ...patient, document_number: e.target.value })}
                            aria-invalid={!!errors.document_number}
                        />
                        {errors.document_number && <FieldError>{errors.document_number}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="birth_date">Fecha de nacimiento</FieldLabel>
                        <Input id="birth_date" type="date"
                            value={patient.birth_date}
                            onChange={e => setPatient({ ...patient, birth_date: e.target.value })}
                        />
                    </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Field>
                        <FieldLabel htmlFor="first_name">Nombres *</FieldLabel>
                        <Input id="first_name" placeholder="Ana María"
                            value={patient.first_name}
                            onChange={e => setPatient({ ...patient, first_name: e.target.value })}
                            aria-invalid={!!errors.first_name}
                        />
                        {errors.first_name && <FieldError>{errors.first_name}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="last_name">Apellidos *</FieldLabel>
                        <Input id="last_name" placeholder="Pérez López"
                            value={patient.last_name}
                            onChange={e => setPatient({ ...patient, last_name: e.target.value })}
                            aria-invalid={!!errors.last_name}
                        />
                        {errors.last_name && <FieldError>{errors.last_name}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="sex_at_birth">Sexo biológico</FieldLabel>
                        <Input id="sex_at_birth" placeholder="F | M | Intersex"
                            value={patient.sex_at_birth}
                            onChange={e => setPatient({ ...patient, sex_at_birth: e.target.value })}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
                        <Input id="phone" placeholder="+57 300 000 0000"
                            value={patient.phone}
                            onChange={e => setPatient({ ...patient, phone: e.target.value })}
                        />
                    </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" placeholder="paciente@email.com"
                            value={patient.email}
                            onChange={e => setPatient({ ...patient, email: e.target.value })}
                        />
                    </Field>
                </div>
            </FieldGroup>
        </FieldSet>
    )
}
