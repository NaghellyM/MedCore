import { Button } from "../../../components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import CalendarEvent from "./calender";

export default function EncounterForm() {

    return (
        <FieldSet className="">
            <FieldLegend>Crear nueva consulta médica</FieldLegend>
            <FieldGroup className="grid grid-cols-2 gap-4">
                <Field>
                    <FieldLabel htmlFor="username">Nombre del paciente</FieldLabel>
                    <Input id="username" autoComplete="off" aria-invalid />
                </Field>
                <Field>
                    <FieldLabel htmlFor="document">Número de documento</FieldLabel>
                    <Input id="document" autoComplete="off" aria-invalid />
                </Field>
            </FieldGroup>

            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="name">Selecciona tipo de consulta médica</FieldLabel>
                    <Select>
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
                    <CalendarEvent />
                </Field>

                <Field>
                    <FieldLabel htmlFor="name">Selecciona medico</FieldLabel>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona medico" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            <SelectItem value="jorge-perez">Jorge Pérez</SelectItem>
                            <SelectItem value="maria-gonzalez">María González</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>
                <div className="flex justify-center items-end mt-6 mb-6">
                    <Button className="bg-cuidarte-accent h-auto w-fit whitespace-nowrap">
                        Crear consulta
                    </Button>
                </div>
            </FieldGroup>
        </FieldSet>
    );
}