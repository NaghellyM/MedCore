import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "../../../components/ui/field"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import type { OrderItem } from "../../../../core/types/medical"

type Props = {
    orders: OrderItem[]
    setOrders: (v: OrderItem[]) => void
    addOrder: () => void
    removeOrder: (i: number) => void
}

export default function OrdersSection({ orders, setOrders, addOrder, removeOrder }: Props) {
    return (
        <FieldSet>
            <FieldLegend>Órdenes</FieldLegend>
            <FieldGroup>
                {orders.length === 0 && <FieldDescription>Laboratorio, imagen o interconsulta.</FieldDescription>}
                {orders.map((o, idx) => (
                    <div key={`ord-${idx}`} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                        <Field><FieldLabel>Tipo</FieldLabel>
                            <Input value={o.type} placeholder="lab | imagen | interconsulta"
                                onChange={e => {
                                    const allowed = ["lab", "imagen", "interconsulta"]
                                    const v = allowed.includes(e.target.value) ? e.target.value : "lab"
                                    const copy = [...orders]; copy[idx].type = v as OrderItem["type"]; setOrders(copy)
                                }} />
                        </Field>
                        <Field><FieldLabel>Descripción</FieldLabel>
                            <Input value={o.description} placeholder="Cuadro hemático"
                                onChange={e => { const copy = [...orders]; copy[idx].description = e.target.value; setOrders(copy) }} />
                        </Field>
                        <Field><FieldLabel>Estado</FieldLabel>
                            <Input value={o.status || ""} placeholder="pendiente | en_proceso | listo"
                                onChange={e => { const copy = [...orders]; copy[idx].status = e.target.value as OrderItem["status"]; setOrders(copy) }} />
                        </Field>
                        <Button type="button" variant="outline" onClick={() => removeOrder(idx)}>Eliminar</Button>
                    </div>
                ))}
                <Button type="button" className="mt-2" onClick={addOrder}>+ Añadir orden</Button>
            </FieldGroup>
        </FieldSet>
    )
}
