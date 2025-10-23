"use client"
import MedicalHistoryView from "./components/view/medicalHistoryView"
import { mockEncounter } from "./encounter.mock"

export default function Page() {
  return (
    <MedicalHistoryView
      data={mockEncounter}
      onEdit={() => alert("Ir a editar")}
      onBack={() => history.back()}
    />
  )
}
  