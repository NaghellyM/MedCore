
import { SidebarBase } from "../../../components/globals/sidebar/sidebarBase";
import { SidebarGroupComponent } from "../../../components/globals/sidebar/SidebarGroup";
import {
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
      <SidebarGroupComponent label="GESTIÓN CLÍNICA" items={gestionClinicaItems} />
    </SidebarBase>
  );
}
