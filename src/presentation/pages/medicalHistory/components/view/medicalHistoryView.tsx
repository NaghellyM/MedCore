import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../../components/ui/tabs"
import { DashboardLayout } from "../../../../layouts/layout"
import { NurseSidebar } from "../../../nurse/components/nurseSidebar"
import type { EncounterPayload } from "../../../../../core/types/medical"

import OrdersSectionView from "./sections/ordersSectionView"
import PatientSectionView from "./sections/patientSectionView"
import EncounterSectionView from "./sections/encounterSectionView"
import VitalsSectionView from "./sections/vitalsSectionView"
import PrescriptionsSectionView from "./sections/prescriptionsSectionView"
import AllergiesSectionView from "./sections/allergiesSectionView"
import JsonPane from "./parts/JsonPane"
import Toolbar from "./parts/Toolbar"

type Props = { data: EncounterPayload; onEdit?: () => void; onBack?: () => void }

export default function MedicalHistoryView({ data, onBack }: Props) {
    const { patient, encounter } = data
    const allergies = data?.allergies ?? encounter?.allergies ?? []
    const prescriptions = encounter?.prescriptions ?? []
    const orders = encounter?.orders ?? []

    const handleExport = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `historia-clinica-${patient?.document_number ?? "record"}.json`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <DashboardLayout
            sidebar={<NurseSidebar />}
            showSearch={false}
            headerHeightClass="pt-[80px]"
            contentMaxWidthClass="max-w-4xl"
            variant="inset"
            collapsible="offcanvas"
            mainClassName="pb-10"
        >
            <div className="p-4">
                <Tabs defaultValue="resumen" className="w-full">
                    <div className="flex items-center justify-between mb-4 ">
                        <TabsList>
                            <TabsTrigger value="resumen">Historia Clínica</TabsTrigger>
                            <TabsTrigger value="json">JSON</TabsTrigger>
                        </TabsList>

                        <Toolbar
                            onExport={handleExport}
                            onPrint={() => window.print()}
                            onBack={onBack}
                        />
                    </div>

                    <TabsContent value="resumen">
                        <PatientSectionView patient={patient} />
                        <EncounterSectionView encounter={encounter} />
                        <VitalsSectionView vitals={encounter?.vitals} />
                        <AllergiesSectionView allergies={allergies} />
                        <PrescriptionsSectionView prescriptions={prescriptions} />
                        <OrdersSectionView orders={orders} />
                    </TabsContent>

                    <TabsContent value="json">
                        <JsonPane data={data} />
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}
