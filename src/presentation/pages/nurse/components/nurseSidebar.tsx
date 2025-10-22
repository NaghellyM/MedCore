import {
    Search,
    ClipboardPlus,
    HeartPlus,
    BriefcaseMedical,
    Activity,
    Siren,
    Settings,
    BookUser,
    User,
    LayoutGrid,
} from "lucide-react";

import { SidebarMenuButton } from "../../../components/ui/sidebar";
import { SidebarGroupComponent } from "../../../components/globals/sidebar/SidebarGroup";
import { SidebarBase } from "../../../components/globals/sidebar/sidebarBase";

const patientsItems = [
    {
        title: "Buscar pacientes",
        url: "#",
        icon: Search,
    },
    {
        title: "Registro de procedimientos",
        url: "#",
        icon: ClipboardPlus,
    },
    {
        title: "Registro de signos vitales",
        url: "#",
        icon: HeartPlus,
    },
    {
        title: "Medicamentos pacientes",
        url: "#",
        icon: BriefcaseMedical,
    },
];

const monitorItems = [
    {
        title: "Monitoreo en tiempo real",
        url: "#",
        icon: Activity,
    },
    {
        title: "Alertas de inventario",
        url: "#",
        icon: Siren,
    },
];

const profileItems = [
    {
        title: "Mi perfil",
        url: "#",
        icon: User,
    },
    {
        title: "Configuración",
        url: "#",
        icon: Settings,
    },
    {
        title: "Contactos de emergencia",
        url: "#",
        icon: BookUser,
    },
];

export function NurseSidebar() {
    return (
        <SidebarBase label= "Nurse Sidebar" >
                <SidebarMenuButton className="font-sans" asChild>
                    <a href="#" className="flex items-center gap-2 p-2 hover:bg-cuidarte-tertiary/10 rounded-md">
                        <LayoutGrid className="text-cuidarte-primary" />
                        <span className="font-semibold text-slate-700">INICIO</span>
                    </a>
                </SidebarMenuButton>
                <SidebarGroupComponent label="GESTIÓN DE PACIENTES" items={patientsItems} />
                <SidebarGroupComponent label="MONITOREO CLÍNICO" items={monitorItems} />
                <SidebarGroupComponent label="MI PERFIL" items={profileItems} />
        </SidebarBase>
    );
}

