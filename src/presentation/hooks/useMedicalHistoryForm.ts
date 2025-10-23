import { useState } from "react"
import type {
    Allergy, Diagnosis, Medication, OrderItem, EncounterPayload, Vitals
} from "../../core/types/medical"

const required = (v?: string) => !!(v && v.trim().length > 0)
const removeAt = <T,>(arr: T[], idx: number) => arr.filter((_, i) => i !== idx)

export function useMedicalHistoryForm() {
    // Paciente
    const [patient, setPatient] = useState({
        document_type: "", document_number: "", first_name: "", last_name: "",
        birth_date: "", sex_at_birth: "", phone: "", email: "",
    })

    // Encuentro
    const [encounter, setEncounter] = useState({
        date_time: "", location: "", modeTelemedicine: false, chief_complaint: "",
        history_of_present_illness: "", review_of_systems: "", physical_exam: "",
        patient_education: "", plan: "",
    })

    // Signos vitales
    const [vitals, setVitals] = useState<Vitals>({
        bp: "", hr: "", rr: "", temp: "", spo2: "", weight: "", height: "", bmi: null,
    })

    // Listas
    const [allergies, setAllergies] = useState<Allergy[]>([])
    const [medications, setMedications] = useState<Medication[]>([])
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
    const [orders, setOrders] = useState<OrderItem[]>([])

    // Errores
    const [errors, setErrors] = useState<Record<string, string>>({})

    // —— Mutadores de listas
    const addAllergy = () => setAllergies(a => [...a, { substance: "", reaction: "", severity: "" }])
    const removeAllergy = (i: number) => setAllergies(a => removeAt(a, i))

    const addMedication = () => setMedications(m => [...m, { drug: "", dose: "", route: "", frequency: "" }])
    const removeMedication = (i: number) => setMedications(m => removeAt(m, i))

    const addDiagnosis = () =>
        setDiagnoses(d => [...d, { description: "", type: d.some(x => x.type === "principal") ? "secundario" : "principal" }])
    const removeDiagnosis = (i: number) => setDiagnoses(d => removeAt(d, i))

    const addOrder = () => setOrders(o => [...o, { type: "lab", description: "" } as OrderItem])
    const removeOrder = (i: number) => setOrders(o => removeAt(o, i))

    // —— Validación
    const validate = () => {
        const e: Record<string, string> = {}
        if (!required(patient.first_name)) e.first_name = "Requerido"
        if (!required(patient.last_name)) e.last_name = "Requerido"
        if (!required(patient.document_type)) e.document_type = "Requerido"
        if (!required(patient.document_number)) e.document_number = "Requerido"
        if (!required(encounter.date_time)) e.date_time = "Requerido"
        if (!required(encounter.chief_complaint)) e.chief_complaint = "Requerido"
        if (diagnoses.length === 0 || !diagnoses.some(d => d.type === "principal"))
            e.diagnoses = "Incluye al menos un diagnóstico principal"
        setErrors(e)
        return Object.keys(e).length === 0
    }

    // —— Payload
    const buildPayload = (): EncounterPayload => {
        const h = parseFloat(vitals.height || "")
        const w = parseFloat(vitals.weight || "")
        const bmi = h && w ? +(w / Math.pow(h / 100, 2)).toFixed(2) : undefined

        return {
            patient: {
                document_type: patient.document_type,
                document_number: patient.document_number,
                first_name: patient.first_name,
                last_name: patient.last_name,
                birth_date: patient.birth_date || undefined,
                sex_at_birth: patient.sex_at_birth || undefined,
                contact: { phone: patient.phone || undefined, email: patient.email || undefined },
            },
            encounter: {
                date_time: encounter.date_time,
                location: encounter.location || null,
                mode: encounter.modeTelemedicine ? "teleconsulta" : "presencial",
                chief_complaint: encounter.chief_complaint,
                history_of_present_illness: encounter.history_of_present_illness || "",
                review_of_systems: encounter.review_of_systems || "",
                physical_exam: encounter.physical_exam || "",
                patient_education: encounter.patient_education || "",
                plan: encounter.plan || "",
                vitals: { ...vitals, bmi: typeof bmi === "number" ? bmi : null },
                diagnoses: diagnoses.map(d => ({ ...d, code: d.code || undefined })),
                prescriptions: medications,
                orders: orders.map(o => ({ ...o, status: o.status || "pendiente" })),
            },
            audit: { created_at: new Date().toISOString() },
        }
    }

    return {
        // estado
        patient, setPatient,
        encounter, setEncounter,
        vitals, setVitals,
        allergies, setAllergies,
        medications, setMedications,
        diagnoses, setDiagnoses,
        orders, setOrders,
        errors,
        // acciones
        addAllergy, removeAllergy,
        addMedication, removeMedication,
        addDiagnosis, removeDiagnosis,
        addOrder, removeOrder,
        validate, buildPayload,
    }
}
