import { useState } from "react";
import { PatientPageContent } from "./page/patientPage";
import { PatientSidebar } from "./components/patientSidebar";
import { SidebarProvider } from "../../components/ui/sidebar";
import UserHeader from "../../components/globals/header";

export function PatientDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <UserHeader showSearch={true} />
            <SidebarProvider className="justify-center">
                <div className="min-h-[calc(100vh-5rem)]">
                    <div className="mx-auto max-w-7xl px-4">
                        <div className="flex flex-row md:flex-row gap-4 pt-40">
                            <div className="md:hidden">
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="p-2 "
                                    aria-label=""
                                >
                                    <span className="text-2xl leading-none">☰</span>
                                </button>
                            </div>
                            <div
                                className={`w-full md:w-64 ${sidebarOpen ? "block" : "hidden"
                                    } md:block`} 
                            >
                                <PatientSidebar />
                            </div>
                            <main className="flex justify-center w-full">
                                <PatientPageContent />
                            </main>
                        </div>
                    </div>
                </div>
            </SidebarProvider>
        </>
    );
}
