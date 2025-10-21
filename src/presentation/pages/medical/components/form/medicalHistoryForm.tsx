import React, { useState } from "react"
import type { EncounterPayload } from "../../../../../core/types/medical"
import { useMedicalHistoryForm } from "../../../../hooks/useMedicalHistoryForm"

import { DashboardLayout } from "../../../../layouts/DashboardLayout"
import { NurseSidebar } from "../../../nurse/components/nurseSidebar"
import PatientSection from "./sections/patientSectionForm"
import EncounterSection from "./sections/encounterSectionForm"
import VitalsSection from "./sections/vitalsSectionForm"
import PrescriptionsSection from "./sections/prescriptionsSectionForm"
import OrdersSection from "./sections/ordersSectionForm"
import ActionsBar from "./sections/actionsBarForm"
import DiagnosesSection from "./sections/diagnosesSectionForm"
import AllergiesSection from "./sections/allergiesSectioncForm"

type Props = { onSubmit: (payload: EncounterPayload) => Promise<void> | void }

export default function MedicalHistoryForm({ onSubmit }: Props) {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return
        setSubmitting(true)
        try {
            const payload = buildPayload()
            await onSubmit(payload)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <DashboardLayout
            sidebar={<NurseSidebar />}
            showSearch={true}
            headerHeightClass="pt-[80px]"
            contentMaxWidthClass="max-w-4xl"
            variant="inset"
            collapsible="offcanvas"
            mainClassName="pb-10 "
            sidebarClassName=""
            sidebarContentClassName=""
        >

            <div className="p-4">
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <PatientSection patient={patient} setPatient={setPatient} errors={errors} />
                    <EncounterSection encounter={encounter} setEncounter={setEncounter} errors={errors} />
                    <VitalsSection vitals={vitals} setVitals={setVitals} />
                    <AllergiesSection allergies={allergies} setAllergies={setAllergies} addAllergy={addAllergy} removeAllergy={removeAllergy} />
                    <PrescriptionsSection medications={medications} setMedications={setMedications} addMedication={addMedication} removeMedication={removeMedication} />
                    <DiagnosesSection diagnoses={diagnoses} setDiagnoses={setDiagnoses} addDiagnosis={addDiagnosis} removeDiagnosis={removeDiagnosis} error={errors.diagnoses} />
                    <OrdersSection orders={orders} setOrders={setOrders} addOrder={addOrder} removeOrder={removeOrder} />
                    <ActionsBar submitting={submitting} />
                </form>
            </div>
        </DashboardLayout>
    )
}
