import { SidebarMenuItem, SidebarMenuButton } from "../../ui/sidebar";
import { Link } from "react-router-dom";

export function SidebarMenuItems({ items }: any) {
    return (
        
        <>
            {items.map((item: any) => (
                <SidebarMenuItem key={item.title} className="list-none">
                    <SidebarMenuButton asChild>
                        <Link to={item.url}>
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.title}
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </>
    );
}
