import type { EncounterPayload } from "../../../core/types/medical"

export const mockEncounter: EncounterPayload = {
    patient: {
        document_type: "CC",
        document_number: "1029384756",
        first_name: "Valeria",
        last_name: "Gómez Ríos",
        birth_date: "1992-04-18",
        sex_at_birth: "F",
        contact: { phone: "+57 300 123 4567", email: "valeria.gomez@example.com" },
    },
    encounter: {
        date_time: "2025-10-20T10:30:00",
        location: "Consultorio 3, Piso 2",
        mode: "presencial",
        chief_complaint: "Dolor torácico intermitente desde anoche.",
        history_of_present_illness: "Inicio súbito, EVA 6/10, no irradiado, empeora con esfuerzo.",
        review_of_systems: "CV (+) dolor torácico; Resp (-) disnea; GI (-) náuseas.",
        physical_exam: "TA 118/76, FC 78 lpm, ruidos cardiacos rítmicos sin soplos.",
        patient_education: "Signos de alarma, reposo relativo, adherencia al tratamiento.",
        plan: "Control en 48h o antes si empeora. Solicitar troponinas y ECG.",
        vitals: { bp: "118/76", hr: "78", rr: "16", temp: "36.8", spo2: "98", weight: "64", height: "165", bmi: 23.51 },
        diagnoses: [
            { code: "R07.4", description: "Dolor torácico", type: "principal" },
            { code: "F41.1", description: "Trastorno de ansiedad generalizada", type: "secundario" },
        ],
        prescriptions: [
            { drug: "Acetaminofén", dose: "500 mg", route: "VO", frequency: "cada 8h", start_date: "2025-10-20" },
            { drug: "Omeprazol", dose: "20 mg", route: "VO", frequency: "cada 24h", start_date: "2025-10-20" },
        ],
        orders: [
            { type: "lab", description: "Troponina I", status: "pendiente" },
            { type: "imagen", description: "Radiografía de tórax PA", status: "pendiente" },
            { type: "interconsulta", description: "Cardiología", status: "en_proceso" },
        ],
        allergies: undefined,
        modeTelemedicine: undefined
    },
    allergies: [{ substance: "Penicilina", reaction: "Urticaria", severity: "moderada" }],
    audit: { created_at: "2025-10-20T10:35:00" },
}
