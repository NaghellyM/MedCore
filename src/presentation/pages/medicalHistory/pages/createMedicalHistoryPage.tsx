import React, { useState } from "react"
import Swal from "sweetalert2"
import type { EncounterPayload } from "../../../../core/types/medical"
import { useMedicalHistoryForm } from "../../../hooks/useMedicalHistoryForm"

import { DashboardLayout } from "../../../layouts/layout"
import PatientSection from "../components/form/sections/patientSectionForm"
import EncounterSection from "../components/form/sections/encounterSectionForm"
import VitalsSection from "../components/form/sections/vitalsSectionForm"
import PrescriptionsSection from "../components/form/sections/prescriptionsSectionForm"
import OrdersSection from "../components/form/sections/ordersSectionForm"
import ActionsBar from "../components/form/sections/actionsBarForm"
import DiagnosesSection from "../components/form/sections/diagnosesSectionForm"
import AllergiesSection from "../components/form/sections/allergiesSectioncForm"
import DoctorSidebar from "../../doctor/components/doctorSideBar"

// Si alguien aún quiere enganchar otra lógica externa, el onSubmit es opcional.
type Props = { onSubmit?: (payload: EncounterPayload) => Promise<void> | void }

const STORAGE_KEY = "medical_histories" 

export default function CreateMedicalHistory({ onSubmit }: Props) {
    const {
        patient, setPatient,
        encounter, setEncounter,
        vitals, setVitals,
        allergies, setAllergies, addAllergy, removeAllergy,
        medications, setMedications, addMedication, removeMedication,
        diagnoses, setDiagnoses, addDiagnosis, removeDiagnosis,
        orders, setOrders, addOrder, removeOrder,
        errors, validate, buildPayload,
    } = useMedicalHistoryForm()

    const [submitting, setSubmitting] = useState(false)

    // Helpers de persistencia local
    const saveLocally = (payload: EncounterPayload) => {
        const list: any[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
        const id =
            (typeof crypto !== "undefined" && "randomUUID" in crypto && crypto.randomUUID()) ||
            `${Date.now()}`
        const record = { id, ...payload, createdAt: new Date().toISOString() }
        list.push(record)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
        // Verificación simple de que el guardado se realizó
        const check = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
            .some((r: any) => r.id === id)
        return { ok: check, record }
    }

    const resetForm = () => {
        // Reinicia los estados principales de tu hook.
        // Ajusta los valores por defecto según tu implementación real.
        setPatient({
            idType: "", idNumber: "", firstName: "", lastName: "", birthDate: "", sex: "",
        } as any)
        setEncounter({
            type: "", reason: "", date: "", providerId: "", location: "",
        } as any)
        setVitals({} as any)
        setAllergies([])
        setMedications([])
        setDiagnoses([])
        setOrders([])
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validación previa del formulario
        const isValid = validate()
        if (!isValid) {
            await Swal.fire({
                icon: "error",
                title: "Faltan datos",
                text: "Revisa los campos obligatorios antes de continuar.",
                confirmButtonText: "Entendido",
            })
            return
        }

        setSubmitting(true)
        try {
            const payload = buildPayload()

            // Guardado local (sin API)
            const { ok,  } = saveLocally(payload)

            if (!ok) {
                await Swal.fire({
                    icon: "error",
                    title: "No se pudo guardar",
                    text: "Ocurrió un problema al guardar la historia en el navegador.",
                    confirmButtonText: "Intentar de nuevo",
                })
                return
            }

            // Lógica opcional adicional del consumidor del componente
            if (onSubmit) {
                await onSubmit(payload)
            }

            await Swal.fire({
                icon: "success",
                title: "¡Historia creada!",
                text: `Se creó correctamente la consulta `,
                confirmButtonText: "Aceptar",
            })

            // Limpia el formulario para una nueva creación
            resetForm()
        } catch (err: any) {
            await Swal.fire({
                icon: "error",
                title: "Error inesperado",
                text: err?.message ?? "Algo salió mal al crear la historia.",
                confirmButtonText: "Cerrar",
            })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <DashboardLayout
            sidebar={<DoctorSidebar />}
            showSearch={true}
            headerHeightClass="pt-[80px]"
            contentMaxWidthClass="max-w-4xl"
            variant="inset"
            collapsible="offcanvas"
            mainClassName="pb-10 "
        >
            <div className="p-4">
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <PatientSection patient={patient} setPatient={setPatient} errors={errors} />
                    <EncounterSection encounter={encounter} setEncounter={setEncounter} errors={errors} />
                    <VitalsSection vitals={vitals} setVitals={setVitals} />
                    <AllergiesSection
                        allergies={allergies}
                        setAllergies={setAllergies}
                        addAllergy={addAllergy}
                        removeAllergy={removeAllergy}
                    />
                    <PrescriptionsSection
                        medications={medications}
                        setMedications={setMedications}
                        addMedication={addMedication}
                        removeMedication={removeMedication}
                    />
                    <DiagnosesSection
                        diagnoses={diagnoses}
                        setDiagnoses={setDiagnoses}
                        addDiagnosis={addDiagnosis}
                        removeDiagnosis={removeDiagnosis}
                        error={errors.diagnoses}
                    />
                    <OrdersSection
                        orders={orders}
                        setOrders={setOrders}
                        addOrder={addOrder}
                        removeOrder={removeOrder}
                    />
                    <ActionsBar submitting={submitting} />
                </form>
            </div>
        </DashboardLayout>
    )
}
