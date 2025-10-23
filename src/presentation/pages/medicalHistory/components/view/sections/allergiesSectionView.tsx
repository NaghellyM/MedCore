// AllergiesSectionView.tsx
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "../../../../../components/ui/field"
// Update the import to use the correct type name
import type { Allergy } from "../../../../../../core/types/medical"
import { fmt } from "../../../utils/format"
export default function AllergiesSectionView({ allergies }: { allergies: Allergy[] }) {
    return (
        <FieldSet>
            <FieldLegend>Alergias</FieldLegend>
            <FieldGroup>
                {!allergies?.length ? (
                    <FieldDescription>No hay alergias registradas.</FieldDescription>
                ) : (
                    <ul className="list-disc pl-6 space-y-1">
                        {allergies.map((a, i) => (
                            <li key={`alg-${i}`} className="text-sm">
                                <span className="font-medium">{fmt(a?.substance)}</span>
                                {a?.reaction ? ` — ${a.reaction}` : ""}
                                {a?.severity ? ` (${a.severity})` : ""}
                            </li>
                        ))}
                    </ul>
                )}
            </FieldGroup>
        </FieldSet>
    )
}
