import { DashboardLayout } from "../../../layouts/layout";
import DoctorSidebar from "../../doctor/components/doctorSideBar";
import CreateEncounterPageForm from "../components/encounterForm";
export default function CreateEncounterPage() {
    return (
        <DashboardLayout
            sidebar={<DoctorSidebar />}
            showSearch={false}
            headerHeightClass="pt-[80px]"
            variant="inset"
            collapsible="offcanvas"
            mainClassName="pb-10 "
        >
            <div className="justify-center items-center pt-20 ">
                <CreateEncounterPageForm />
            </div>
        </DashboardLayout>
    );
}
    