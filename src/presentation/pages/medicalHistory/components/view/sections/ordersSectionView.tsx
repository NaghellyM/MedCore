// OrdersSectionView.tsx
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "../../../../../components/ui/field"
import type { OrderItem } from "../../../../../../core/types/medical"
import { fmt } from "../../../utils/format"

export default function OrdersSectionView({ orders }: { orders: OrderItem[] }) {
    return (
        <FieldSet>
            <FieldLegend>Órdenes</FieldLegend>
            <FieldGroup>
                {!orders?.length ? (
                    <FieldDescription>No hay órdenes registradas.</FieldDescription>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="text-left">
                                <tr className="border-b">
                                    <th className="py-2 pr-4">Tipo</th>
                                    <th className="py-2 pr-4">Descripción</th>
                                    <th className="py-2">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o, i) => (
                                    <tr key={`ord-${i}`} className="border-b last:border-0">
                                        <td className="py-2 pr-4 capitalize">{fmt(o?.type)}</td>
                                        <td className="py-2 pr-4">{fmt(o?.description)}</td>
                                        <td className="py-2 capitalize">{fmt(o?.status)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </FieldGroup>
        </FieldSet>
    )
}
