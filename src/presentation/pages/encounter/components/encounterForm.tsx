import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import {
    Field, FieldGroup, FieldLabel, FieldLegend, FieldSet,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import CalendarEvent from "./calender";
import Swal from "sweetalert2";
import BackButton from "./button";

type EncounterFormValues = {
    patientName: string;
    document: string;
    type: "teleconsulta" | "consulta-presencial" | "";
    doctor: string;
    dateTime?: string;
};

type EncounterFormProps = {
    title?: string;
    initialValues?: Partial<EncounterFormValues>;
    submitLabel?: string;
    onSubmit: (values: EncounterFormValues) => void;
};

export default function EncounterForm({
    title = "Crear nueva consulta médica",
    initialValues,
    submitLabel = "Crear consulta",
    onSubmit,
}: EncounterFormProps) {

    const [values, setValues] = useState<EncounterFormValues>({
        patientName: "",
        document: "",
        type: "",
        doctor: "",
        dateTime: initialValues?.dateTime,
        ...initialValues,
    });

    useEffect(() => {
        setValues((v) => ({ ...v, ...initialValues }));
    }, [initialValues]);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const missing: string[] = [];
                if (!values.patientName?.trim()) missing.push("Nombre del paciente");
                if (!values.document?.trim()) missing.push("Número de documento");
                if (!values.type) missing.push("Tipo de consulta");
                if (!values.doctor) missing.push("Médico");
                if (!values.dateTime) missing.push("Fecha y hora");
                if (missing.length) {
                    Swal.fire({
                        icon: "warning",
                        title: "Campos incompletos",
                        html: `
                <div class="text-left">
                <p class="mb-2">Por favor completa:</p>
                <ul style="list-style:disc;margin-left:1rem">
                    ${missing.map((m) => `<li>${m}</li>`).join("")}
                </ul>
                </div>
            `,
                    });
                    return;
                }
                onSubmit(values);
            }}
        >
            <FieldSet >
                <FieldLegend className="flex items-center gap-2">{title}
                    <BackButton />
                </FieldLegend>

                <FieldGroup className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor="patientName">Nombre del paciente</FieldLabel>
                        <Input
                            id="patientName"
                            autoComplete="off"
                            value={values.patientName}
                            onChange={(e) => setValues({ ...values, patientName: e.target.value })}
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="document">Número de documento</FieldLabel>
                        <Input
                            id="document"
                            autoComplete="off"
                            value={values.document}
                            onChange={(e) => setValues({ ...values, document: e.target.value })}
                        />
                    </Field>
                </FieldGroup>

                <FieldGroup>
                    <Field>
                        <FieldLabel>Selecciona tipo de consulta médica</FieldLabel>
                        <Select
                            value={values.type}
                            onValueChange={(v: "teleconsulta" | "consulta-presencial") =>
                                setValues({ ...values, type: v })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Tipo de consulta" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="teleconsulta">Teleconsulta</SelectItem>
                                <SelectItem value="consulta-presencial">Consulta Presencial</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>

                    <Field>
                        <CalendarEvent
                            value={values.dateTime}
                            onChange={(iso) => setValues({ ...values, dateTime: iso })}
                            defaultTime="10:30:00"
                        />
                    </Field>

                    <Field>
                        <FieldLabel>Selecciona médico</FieldLabel>
                        <Select
                            value={values.doctor}
                            onValueChange={(v) => setValues({ ...values, doctor: v })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona médico" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="jorge-perez">Jorge Pérez</SelectItem>
                                <SelectItem value="maria-gonzalez">María González</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>

                    <div className="flex justify-center items-end mt-6 mb-6">
                        <Button className="btn" type="submit" >
                            {submitLabel}
                        </Button>
                    </div>
                </FieldGroup>
            </FieldSet>
        </form>
    );
}
