
import { SidebarMenuButton } from "../../../components/ui/sidebar";
import { SidebarBase } from "../../../components/globals/sidebar/sidebarBase";
import { SidebarGroupComponent } from "../../../components/globals/sidebar/SidebarGroup";
import {
  LayoutGrid,
  Calendar,
  User,
  Video,
  Activity,
  ArrowRight,
} from "lucide-react";

// Grupo principal (conserva nombres e íconos)
const gestionClinicaItems = [
  { title: "Agenda", url: "#", icon: Calendar },
  { title: "Pacientes", url: "#", icon: User },
  { title: "Telemedicina", url: "#", icon: Video },
  { title: "Medicamentos", url: "#", icon: Activity },
  { title: "Derivaciones", url: "#", icon: ArrowRight },
];

export default function DoctorSidebar() {
  return (
    <SidebarBase label="Doctor Sidebar">
      <SidebarMenuButton className="font-sans" asChild>
        <a
          href="#"
          className="flex items-center gap-2 hover:bg-cuidarte-tertiary/10 p-2 rounded-md"
        >
          <LayoutGrid />
          <span>Dashboard</span>
        </a>
      </SidebarMenuButton>

      <SidebarGroupComponent label="GESTIÓN CLÍNICA" items={gestionClinicaItems} />
    </SidebarBase>
  );
}
