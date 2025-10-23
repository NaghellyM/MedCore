import { Field, FieldGroup, FieldSet } from "../../../../../components/ui/field"
import { Button } from "../../../../../components/ui/button"
import { useNavigate } from "react-router-dom";

type Props = { submitting?: boolean }

export default function ActionsBar({ submitting }: Props) {
    const navigate = useNavigate();
    return (
        <FieldSet>
            <FieldGroup>
                <Field orientation="responsive">
                    <Button className="bg-blue-600 text-white" type="submit" disabled={!!submitting}>
                        {submitting ? "Guardando..." : "Guardar historia clínica"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => navigate("/medicalHistory")}>Cancelar</Button>
                </Field>
            </FieldGroup>
        </FieldSet>
    )
}
