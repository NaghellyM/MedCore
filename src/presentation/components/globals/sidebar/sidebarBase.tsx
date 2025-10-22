import { Sidebar, SidebarContent, SidebarTrigger } from "../../ui/sidebar";

export function SidebarBase({ children, }: any) {
    return (
        <Sidebar className="md:py-40 self-start h-full bg-white" collapsible="icon" >
            <SidebarContent className="bg-white  sticky top-[88px]">
                <SidebarTrigger className="py-5 px-3 flex justify-start md:hidden "  />
                {children}
            </SidebarContent>
        </Sidebar>
    );
}
