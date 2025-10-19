import { useState } from "react";
import { AdminSidebar } from "./components/adminSidebar";
import { AdminRegisterUser } from "./pages/admiRegisterUser";
import { AdminRegisterCSV } from "./pages/admiRegisterCSV";
import { SidebarProvider } from "../../components/ui/sidebar";
import UserHeader from "../../components/globals/header";

export function AdminDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <UserHeader showSearch={true} />

            <SidebarProvider>
                <div className="flex pt-[80px]">
                    <div className="md:hidden">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-4"
                            aria-label="Abrir menú lateral"
                        >
                            <span className="text-2xl">☰</span>
                        </button>
                    </div>
                    <div className={`${sidebarOpen ? "block" : "hidden"} md:block md:w-64 shrink-0`}>
                        <AdminSidebar />
                    </div>
                    <main className="flex-1 p-4 sm:p-6 lg:p-8 flex justify-center">
                        <div className="inline-flex w-auto max-w-full flex-col lg:flex-row items-stretch gap-6 lg:gap-8 border rounded-lg bg-white shadow p-4 sm:p-6">
                            <section className="w-full max-w-md mx-auto">
                                <AdminRegisterCSV />
                            </section>
                            <section className="w-full max-w-md mx-auto">
                                <AdminRegisterUser />
                            </section>
                        </div>
                    </main>
                </div>
            </SidebarProvider>
        </>
    );
}
