import { SidebarMenuItems } from "./SidebarMenuItems";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "../../ui/sidebar";

export function SidebarGroupComponent({ label, items }: any) {
    return (
        <SidebarGroup className="h-auto w-full bg-white">
            <SidebarGroupLabel className="font-bold text-sm text-cuidarte-accent font-sans">{label}</SidebarGroupLabel>
            <SidebarGroupContent className="font-sans">
                <SidebarMenuItems items={items} />
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
