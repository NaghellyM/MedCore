
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { AdminSidebar } from "./components/adminSidebar";
import { AdminRegisterCSV } from "./pages/admiRegisterCSV";
import { AdminRegisterUser } from "./pages/admiRegisterUser";
export function AdminDashboard() {
    return (
        <DashboardLayout
            sidebar={<AdminSidebar />}
            showSearch={true}
            headerHeightClass="pt-[80px]"
            contentMaxWidthClass="max-w-7xl"
            variant="inset"
            collapsible="offcanvas"
            mainClassName="pb-10 "
            sidebarClassName=""
            sidebarContentClassName=""
        >
            <div className="min-h-[calc(100vh-5rem)] w-full">
                <AdminRegisterUser />
                <AdminRegisterCSV />

            </div>
        </DashboardLayout>
    );
}
