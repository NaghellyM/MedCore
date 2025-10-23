import { useEffect, useMemo, useState } from "react"
import Swal from "sweetalert2"

import { DashboardLayout } from "../../../layouts/layout"
import MedicalHistoryView from "../components/view/medicalHistoryView"
import type { EncounterPayload } from "../../../../core/types/medical"

import { Button } from "../../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import DoctorSidebar from "../../doctor/components/doctorSideBar"

// Clave única para localStorage (debe coincidir con donde guardas)
const STORAGE_KEY = "medical_histories"

type EncounterRecord = {
    id: string
    createdAt?: string
    updatedAt?: string
} & EncounterPayload

export function PreviewMedicalHistory() {
    const [records, setRecords] = useState<EncounterRecord[]>([])
    const [selected, setSelected] = useState<EncounterRecord | null>(null)
    const [loading, setLoading] = useState(true)

    // Cargar desde localStorage
    const load = () => {
        setLoading(true)
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            const list: EncounterRecord[] = raw ? JSON.parse(raw) : []
            setRecords(Array.isArray(list) ? list : [])
        } catch {
            setRecords([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        load()
    }, [])

    const total = records.length
    const ordered = useMemo(
        () =>
            [...records].sort((a, b) => {
                const da = new Date(a.updatedAt ?? a.createdAt ?? 0).getTime()
                const db = new Date(b.updatedAt ?? b.createdAt ?? 0).getTime()
                return db - da
            }),
        [records]
    )

    const handleView = (rec: EncounterRecord) => setSelected(rec)

    const handleDelete = async (id: string) => {
        const res = await Swal.fire({
            icon: "warning",
            title: "Eliminar historia",
            text: "Esta acción no se puede deshacer. ¿Deseas continuar?",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        })
        if (!res.isConfirmed) return

        const next = records.filter(r => r.id !== id)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        setRecords(next)
        if (selected?.id === id) setSelected(null)

        await Swal.fire({ icon: "success", title: "Eliminada", timer: 1200, showConfirmButton: false })
    }

    const handleClearAll = async () => {
        if (!total) return
        const res = await Swal.fire({
            icon: "warning",
            title: "Limpiar todo",
            text: `Se eliminarán ${total} historias locales.`,
            showCancelButton: true,
            confirmButtonText: "Eliminar todo",
            cancelButtonText: "Cancelar",
        })
        if (!res.isConfirmed) return
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
        setRecords([])
        setSelected(null)
        await Swal.fire({ icon: "success", title: "Limpieza completa", timer: 1200, showConfirmButton: false })
    }

    // Vista detalle (reutiliza tu componente actual)
    if (selected) {
        return (
            <MedicalHistoryView
                data={selected}
                onBack={() => setSelected(null)}
            />
        )
    }

    // Vista listado
    return (
        <DashboardLayout
            sidebar={<DoctorSidebar />}
            showSearch={false}
            headerHeightClass="pt-[80px]"
            contentMaxWidthClass="max-w-5xl"
            variant="inset"
            collapsible="offcanvas"
            mainClassName="pb-10 "
        >
            <div className="p-4 space-y-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Historias clínicas locales</CardTitle>
                        <div className="flex gap-2">
                            <Button variant="secondary" onClick={load} disabled={loading}>
                                {loading ? "Actualizando..." : "Actualizar"}
                            </Button>
                            <Button variant="destructive" onClick={handleClearAll} disabled={!total}>
                                Limpiar todo
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="p-6">Cargando…</div>
                        ) : !total ? (
                            <div className="p-6 text-sm text-muted-foreground">
                                No hay historias guardadas. Crea una desde el formulario para verla aquí.
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Paciente</TableHead>
                                        <TableHead>Documento</TableHead>
                                        <TableHead>Tipo consulta</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {ordered.map((r) => {
                                        const patient = r.patient
                                        const doc = patient?.document_number ?? patient?.document_number ?? ""
                                        const patientName =
                                            [patient?.first_name ?? patient?.first_name, patient?.last_name ?? patient?.last_name]
                                                .filter(Boolean)
                                                .join(" ") || "—"
                                        const dt = new Date(r.updatedAt ?? r.createdAt ?? Date.now())
                                        const tipo = r.encounter?.type ?? "—"
                                        return (
                                            <TableRow key={r.id} className="hover:bg-muted/40">
                                                <TableCell>{dt.toLocaleString()}</TableCell>
                                                <TableCell>{patientName}</TableCell>
                                                <TableCell>{doc || "—"}</TableCell>
                                                <TableCell className="capitalize">{tipo?.toString().replace("-", " ")}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex gap-2 justify-end">
                                                        <Button onClick={() => handleView(r)}>Ver</Button>
                                                        {/* Si luego agregas edición local, podrías navegar o abrir form con initialValues */}
                                                        {/* <Button variant="outline" onClick={() => navigate(`/encounters/${r.id}/edit-local`)}>Editar</Button> */}
                                                        <Button variant="destructive" onClick={() => handleDelete(r.id)}>Eliminar</Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
